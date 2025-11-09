@echo off
echo ========================================
echo LeLamp Control Interface - Deploy to Vercel
echo ========================================
echo.

REM Navigate to project directory
cd /d "%~dp0"

REM Check if vercel is installed
where vercel >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo Vercel CLI not found. Installing...
    call npm install -g vercel
    if %ERRORLEVEL% NEQ 0 (
        echo Failed to install Vercel. Please install manually:
        echo npm install -g vercel
        pause
        exit /b 1
    )
)

echo Building project...
call npm run build

if %ERRORLEVEL% NEQ 0 (
    echo Build failed!
    pause
    exit /b 1
)

echo.
echo Deploying to Vercel...
echo.
call vercel --prod

echo.
echo ========================================
echo Deployment complete!
echo Share your public URL with anyone!
echo ========================================
pause

