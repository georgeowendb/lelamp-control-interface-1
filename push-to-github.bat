@echo off
echo ========================================
echo LeLamp Control Interface - Push to GitHub
echo ========================================
echo.

REM Navigate to project directory
cd /d "%~dp0"

echo Step 1: Checking Git status...
git status >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo Initializing Git repository...
    git init
    if %ERRORLEVEL% NEQ 0 (
        echo Failed to initialize Git. Make sure Git is installed.
        pause
        exit /b 1
    )
)

echo.
echo Step 2: Adding all files...
git add .
if %ERRORLEVEL% NEQ 0 (
    echo Failed to add files.
    pause
    exit /b 1
)

echo.
echo Step 3: Creating commit...
git commit -m "Initial commit: LeLamp Control Interface - BoxBots Hackathon 2025"
if %ERRORLEVEL% NEQ 0 (
    echo Note: No changes to commit, or commit already exists.
)

echo.
echo ========================================
echo IMPORTANT: Next Steps
echo ========================================
echo.
echo 1. Create a repository on GitHub:
echo    https://github.com/new
echo.
echo 2. Repository name: lelamp-control-interface-boxbots-hackathon-2025
echo.
echo 3. Then run these commands (replace YOUR_USERNAME):
echo.
echo    git remote add origin https://github.com/YOUR_USERNAME/lelamp-control-interface-boxbots-hackathon-2025.git
echo    git branch -M main
echo    git push -u origin main
echo.
echo Or see GITHUB_SETUP.md for detailed instructions.
echo.
pause

