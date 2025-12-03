@echo off
echo Installing React Flow Examples...
echo.

echo Installing dependencies...
npm install

if %errorlevel% neq 0 (
    echo Error installing dependencies. Please check your Node.js installation.
    pause
    exit /b 1
)

echo.
echo Starting development server...
echo Open your browser to http://localhost:5173
echo.

npm run dev
