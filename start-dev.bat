@echo off
REM Refresh PATH to include Node.js
set "PATH=%PATH%;C:\Program Files\nodejs"
set "PATH=%PATH%;%LOCALAPPDATA%\Microsoft\WinGet\Links"

REM Navigate to project directory
cd /d "%~dp0"

REM Check if npm is available
where npm >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo npm not found. Please restart your terminal or Cursor IDE.
    echo Node.js may need a system restart to update PATH.
    pause
    exit /b 1
)

REM Install dependencies if node_modules doesn't exist
if not exist "node_modules" (
    echo Installing dependencies...
    call npm install
)

REM Start the development server
echo Starting development server...
call npm run dev


