import { useState } from "react";

const API = import.meta.env.VITE_API_URL || ''; // e.g. http://localhost:8000

export default function OrgDemo() {
    const [name, setName] = useState("");
    const [result, setResult] = useState<{ id: number; name: string } | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    async function createOrg() {
        setLoading(true);
        setError(null);
        setResult(null);
        try {
            const res = await fetch(`${API}/orgs`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name }),
            });
            if (!res.ok) {
                const text = await res.text();
                throw new Error(`${res.status} ${text}`);
            }
            const data = await res.json();
            setResult(data);
            setName("");
        } catch (e: any) {
            setError(e.message ?? "Request failed");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div style={{ marginTop: 24 }}>
            <h3>Create an Org (demo)</h3>
            <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Org name"
                style={{ padding: 8, marginRight: 8 }}
            />
            <button onClick={createOrg} disabled={!name || loading}>
                {loading ? "Creating..." : "Create"}
            </button>

            {result && (
                <p style={{ marginTop: 8 }}>
                    ✅ Created org: <b>{result.name}</b> (id: {result.id})
                </p>
            )}
            {error && (
                <p style={{ marginTop: 8, color: "crimson" }}>Error: {error}</p>
            )}
        </div>
    );
}