import axios from "axios";

// Prefer Vite's `import.meta.env`. Avoid referencing `process` directly in the browser
// because `process` is a Node global and is not defined in browsers (ReferenceError).
const rawBase = (import.meta as any)?.env?.VITE_API_URL || "http://localhost:8000";
const baseURL = rawBase.replace(/\/$/, "") + "/api/v1";

const apiClient = axios.create({
  baseURL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Redirect on 401 to the login page (browser-only)
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error?.response?.status;
    if (status === 401) {
      try {
        const currentPath = typeof window !== "undefined" ? window.location.pathname : "/";
        if (!currentPath.startsWith("/login")) {
          window.location.href = "/login";
        }
      } catch (e) {
        // ignore in SSR / non-browser
      }
    }
    return Promise.reject(error);
  }
);

export default apiClient;
