@echo off
echo ========================================
echo Building and Preparing Files for Sharing
echo ========================================
echo.

REM Navigate to project directory
cd /d "%~dp0"

echo Building project...
call npm run build

if %ERRORLEVEL% NEQ 0 (
    echo Build failed!
    pause
    exit /b 1
)

echo.
echo Build complete! Files are in the 'dist' folder.
echo.
echo To share with teammates:
echo 1. Right-click the 'dist' folder
echo 2. Send to -^> Compressed (zipped) folder
echo 3. Share the zip file
echo.
echo They just unzip and open index.html in a browser!
echo.
pause

