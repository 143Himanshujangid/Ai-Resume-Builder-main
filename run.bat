@echo off
echo Starting the AI Resume Builder application...

:: Start the Backend server
echo Starting the Backend server...
start cmd /k "cd Backend && npm run dev"

:: Wait for the Backend server to start
timeout /t 5

:: Start the Frontend server
echo Starting the Frontend server...
start cmd /k "cd Frontend && npm run dev"

echo Both servers are now running!
echo Backend server: http://localhost:5001
echo Frontend server: Check the console output for the URL (usually http://localhost:5173 or http://localhost:5174)
echo.
echo Press any key to stop both servers...
pause

:: Kill the servers
taskkill /f /im node.exe
