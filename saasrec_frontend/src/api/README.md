# src/api

This folder contains the frontend API layer for communicating with the backend REST API at `<VITE_API_URL>/api/v1`.

Summary
- `axios.ts` — preconfigured Axios instance (`withCredentials: true`, `baseURL = VITE_API_URL + '/api/v1'`) and a 401 -> redirect interceptor.
- `types.ts` — TypeScript interfaces that mirror the backend request/response shapes used by the frontend.
- `auth.ts` — auth helpers: `signup`, `login`, `logout` (backend sets HTTP-only cookies).
- `public.ts` — public endpoints: health, categories, cost-types, roles, clubs, club, profile.
- `protected.ts` — cookie-auth protected operations (create/update/delete clubs, update profile, user-roles, join-club compatibility helper).
- `hooks.ts` — React Query hooks for common queries and mutations.

Environment
- Add an env var in your frontend repo (e.g. `.env.local`):

```
VITE_API_URL="http://localhost:8000"
```

Notes on cookies and development
- The backend issues HTTP-only cookies (`access_token`, `refresh_token`) and a readable `user_id` cookie. The Axios client sends cookies because `withCredentials` is enabled.
- Browsers only send cookies marked `secure` over HTTPS. If your backend is configured with `secure: true` for cookies (recommended for production), you will need to run your frontend over HTTPS in development or have the backend allow non-secure cookies for local development.
- Confirm the backend CORS configuration includes your frontend origin (e.g. `http://localhost:5173`) and `allow_credentials = true`.

Usage
- Prefer the helpers in `public.ts` and `protected.ts` or the React Query hooks in `hooks.ts` for components.
- Examples are included in the project root README and in the `src/api` docs.
