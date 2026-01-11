
import express from "express";
import multer from "multer";
import fs from "fs";
import { supabase } from "./supabase.js";
import { model } from "./gemini.js";

const app = express();
const upload = multer({ dest: "uploads/" });
console.log("Gemini Key Loaded:", process.env.GEMINI_API_KEY ? "YES" : "NO");

app.post("/api/upload-item", upload.single("image"), async (req, res) => {
  try {
    const imageBase64 = fs.readFileSync(req.file.path, { encoding: "base64" });

    const prompt = `
Return only JSON:
{
  "object_type": "item name",
  "color": "main color"
}
`;

    const result = await model.generateContent([
      { inlineData: { data: imageBase64, mimeType: req.file.mimetype } },
      { text: prompt }
    ]);

    let text=result.response.text();
    text=text.replace(/```json/g, "").replace(/```/g, "").trim();
    const tags = JSON.parse(text);

    const { data, error } = await supabase
      .from("items")
      .insert([{ object_type: tags.object_type, color: tags.color }])
      .select();

    if (error) throw error;

    res.json({ success: true, item: data[0] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(3001, () => console.log("Backend running on port 3001"));