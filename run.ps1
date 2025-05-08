# Run script for AI Resume Builder

Write-Host "Starting the AI Resume Builder application..." -ForegroundColor Green

# Start the Backend server
Write-Host "Starting the Backend server..." -ForegroundColor Yellow
Start-Process -FilePath "cmd.exe" -ArgumentList "/c cd Backend && npm run dev" -NoNewWindow

# Wait for the Backend server to start
Write-Host "Waiting for the Backend server to start..." -ForegroundColor Yellow
Start-Sleep -Seconds 5

# Start the Frontend server
Write-Host "Starting the Frontend server..." -ForegroundColor Yellow
Start-Process -FilePath "cmd.exe" -ArgumentList "/c cd Frontend && npm run dev" -NoNewWindow

Write-Host "Both servers are now running!" -ForegroundColor Green
Write-Host "Backend server: http://localhost:5001" -ForegroundColor Cyan
Write-Host "Frontend server: Check the console output for the URL (usually http://localhost:5173 or http://localhost:5174)" -ForegroundColor Cyan

Write-Host "Press any key to stop both servers..." -ForegroundColor Red
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")

# Kill the servers
Write-Host "Stopping all Node.js processes..." -ForegroundColor Yellow
Stop-Process -Name "node" -Force -ErrorAction SilentlyContinue
