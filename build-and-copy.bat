@echo off
echo Building the Frontend application and creating root-level dist folder...

:: Clean root dist folder if it exists
if exist "dist" (
    echo Cleaning root dist folder...
    rmdir /s /q "dist"
)

:: Build the Frontend application
echo Building the Frontend application...
cd Frontend

:: Clean Frontend dist folder if it exists
if exist "dist" (
    echo Cleaning Frontend dist folder...
    rmdir /s /q "dist"
)

:: Install dependencies
echo Installing dependencies...
call npm install

:: Build the application
echo Building the application...
call npm run build:prod

echo Frontend build completed successfully!

:: Return to root directory
cd ..

:: Create root dist folder
echo Creating root-level dist folder...
mkdir dist

:: Copy all files from Frontend/dist to root dist
echo Copying files from Frontend/dist to root dist...
xcopy "Frontend\dist\*" "dist\" /E /H /C /I /Y

echo Root-level dist folder created successfully!
echo You can now deploy the contents of the dist folder to GitHub Pages.

:: Show the contents of the dist folder
dir dist

pause
