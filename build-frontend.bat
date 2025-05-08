@echo off
echo Building the Frontend application for GitHub Pages...

cd Frontend

echo Cleaning previous build...
if exist "dist" (
    rmdir /s /q "dist"
)

echo Installing dependencies...
call npm install

echo Building the application...
call npm run build

echo Build completed successfully!
echo The build output is in the Frontend/dist directory.

cd ..
echo You can now deploy to GitHub Pages using 'npm run deploy' from the Frontend directory.
pause
