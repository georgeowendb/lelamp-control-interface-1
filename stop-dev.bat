@echo off
echo Stopping development server...
echo.
echo Looking for Node.js/Vite processes on port 5173...

REM Find and kill processes using port 5173
for /f "tokens=5" %%a in ('netstat -ano ^| findstr :5173 ^| findstr LISTENING') do (
    echo Killing process %%a...
    taskkill /F /PID %%a >nul 2>&1
)

REM Also try to find node processes
taskkill /F /IM node.exe >nul 2>&1

echo.
echo Server stopped (if it was running).
echo.
pause

