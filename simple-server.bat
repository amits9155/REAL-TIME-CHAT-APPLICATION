@echo off
echo Starting a simple HTTP server on port 8000...
cd static-chat
powershell -ExecutionPolicy Bypass -Command "npx http-server -p 8000"
echo.
echo If the server started successfully, open http://localhost:8000 in your browser.
echo Press Ctrl+C to stop the server.
echo. 