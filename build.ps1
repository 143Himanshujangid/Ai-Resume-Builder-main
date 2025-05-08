# Build script for AI Resume Builder

Write-Host "Building the Frontend application for GitHub Pages..." -ForegroundColor Green

# Navigate to Frontend directory
Set-Location -Path .\Frontend

# Clean previous build
if (Test-Path -Path "dist") {
    Write-Host "Cleaning previous build..." -ForegroundColor Yellow
    Remove-Item -Path "dist" -Recurse -Force
}

# Install dependencies
Write-Host "Installing dependencies..." -ForegroundColor Yellow
npm install

# Build the application
Write-Host "Building the application..." -ForegroundColor Yellow
npm run build:prod

# Check if build was successful
if (Test-Path -Path "dist") {
    Write-Host "Build completed successfully!" -ForegroundColor Green
    Write-Host "The build output is in the Frontend/dist directory." -ForegroundColor Green
    Write-Host "You can now deploy to GitHub Pages using 'npm run deploy' from the Frontend directory." -ForegroundColor Green
} else {
    Write-Host "Build failed. Please check the error messages above." -ForegroundColor Red
}

# Return to root directory
Set-Location -Path ..

# Pause to see the output
Write-Host "Press any key to continue..."
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
