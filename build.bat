@echo off
echo Building the Frontend application for GitHub Pages...

:: Clean root dist folder if it exists
if exist "dist" (
    echo Cleaning root dist folder...
    rmdir /s /q "dist"
)

cd Frontend

echo Cleaning previous build...
if exist "dist" (
    rmdir /s /q "dist"
)

echo Installing dependencies...
call npm install

echo Building the application...
call npm run build:prod

echo Build completed successfully!
echo The build output is in the Frontend/dist directory.

cd ..

:: Create root dist folder and copy files
echo Creating root-level dist folder...
mkdir dist

echo Copying files from Frontend/dist to root dist...
xcopy "Frontend\dist\*" "dist\" /E /H /C /I /Y

echo Root-level dist folder created successfully!
echo You can now deploy the contents of the dist folder to GitHub Pages.
pause
