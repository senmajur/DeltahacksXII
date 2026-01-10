@echo off
REM Quick start script for SaaSRec Frontend (Windows)

echo Starting SaaSRec Frontend...

REM Install dependencies if node_modules doesn't exist
if not exist "node_modules\" (
    echo Installing dependencies...
    call npm install
)

REM Create .env if it doesn't exist
if not exist ".env" (
    echo Creating .env file...
    copy .env.example .env
)

REM Start the dev server
echo Starting Vite dev server on http://localhost:5173
call npm run dev


