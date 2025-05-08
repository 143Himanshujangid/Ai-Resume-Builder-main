@echo off
echo Creating root-level dist folder...

:: Remove existing dist folder if it exists
if exist "dist" (
    echo Removing existing dist folder...
    rmdir /s /q "dist"
)

:: Create new dist folder
echo Creating new dist folder...
mkdir dist

:: Copy all files from Frontend/dist to root dist
echo Copying files from Frontend/dist to root dist...
xcopy "Frontend\dist\*" "dist\" /E /H /C /I /Y

echo Root-level dist folder created successfully!
dir dist
pause
