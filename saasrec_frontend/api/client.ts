import axios from "axios";

const baseURL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000/api/v1";
// Prefer Vite's `import.meta.env` in client bundles; avoid direct `process` usage.
const baseURL = (typeof import.meta !== "undefined" && (import.meta as any).env?.VITE_API_URL)
  ? `${(import.meta as any).env.VITE_API_URL.replace(/\/$/, '')}/api/v1`
  : "http://127.0.0.1:8000/api/v1";

export const apiClient = axios.create({
  baseURL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Basic response interceptor to handle common status codes.
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error?.response?.status;
    if (status === 401) {
      // redirect to sign-in page (frontend handles clearing UI state)
      try {
        const currentPath = window?.location?.pathname || "/";
        if (
          !currentPath.startsWith("/users/signin") &&
          !currentPath.startsWith("/clubs/signin")
        ) {
          window.location.href = "/users/signin";
        }
      } catch (e) {
        // Ignore in non-browser environments (e.g., SSR, tests)
        if (typeof import.meta !== "undefined" && import.meta.env?.DEV) {
          console.warn("Failed to redirect on 401:", e);
        }
      }
    }
    return Promise.reject(error);
  }
);

export default apiClient;
