const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

// Store chat history
const chatHistory = [];

io.on('connection', (socket) => {
  console.log('New client connected');
  
  // Send chat history to new connections
  socket.emit('chat history', chatHistory);
  
  // Handle new messages
  socket.on('chat message', (msg) => {
    const messageWithTime = {
      ...msg,
      time: new Date().toISOString()
    };
    
    // Add to history
    chatHistory.push(messageWithTime);
    
    // Broadcast to all clients
    io.emit('chat message', messageWithTime);
  });
  
  // Handle user typing status
  socket.on('typing', (username) => {
    socket.broadcast.emit('user typing', username);
  });
  
  // Handle user stop typing
  socket.on('stop typing', () => {
    socket.broadcast.emit('user stop typing');
  });
  
  // Handle disconnection
  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 