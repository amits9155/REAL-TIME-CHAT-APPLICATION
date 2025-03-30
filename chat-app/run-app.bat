@echo off
echo Installing server dependencies...
cd "D:\CODTECH INTERN\REAL TIME CHART APP\chat-app\server"
call npm install express socket.io cors
echo Starting server...
start cmd /k node server.js
cd ..

echo Installing client dependencies...
cd client
call npm install react react-dom socket.io-client styled-components
echo Starting client... 
start cmd /k npm start
echo.
echo Application is running!
echo Open your browser at http://localhost:3000
echo. 