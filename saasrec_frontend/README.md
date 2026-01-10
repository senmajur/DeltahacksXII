# SaaSRec Frontend

React + TypeScript frontend for the SaaSRec club management platform.

## Quick Start

### Option 1: Use Start Script
```bash
# Linux/Mac
./start.sh

# Windows
start.bat
```

### Option 2: Manual Setup

**1. Install Dependencies**
```bash
npm install
```

**2. Configure Environment**
```bash
cp .env.example .env
```
Edit `.env` if you need to change the API URL (default: `http://localhost:8000`)

**3. Run Development Server**
```bash
npm run dev
```

The app will be available at `http://localhost:5173`

## Building for Production

```bash
npm run build
```

## Backend Connection

The frontend connects to the backend API via the `VITE_API_URL` environment variable. Ensure the backend is running at the specified URL (default: `http://localhost:8000`).

## Tech Stack

- React 19
- TypeScript
- Vite
- Tailwind CSS
- Radix UI
- React Router
