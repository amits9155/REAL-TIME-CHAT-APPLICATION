# REAL-TIME-CHAT-APPLICATION
*COMPANY*: CODTECH IT SOLUTIONS

*NAME*: AMIT KUMAR

*INTERN ID*: CT04WWL

*DOMAIN*: FRONTEND WEB DEVELOPMENT

*DURATION*: 4 WEEKS 

*MENTOR*: NEELA SANTOSH

***********************************************************************************************************************************************


# Real-time Chat Application

A WebSocket-based chat application with React front-end and Node.js backend.

## screenshort
![chat app](https://github.com/amits9155/REAL-TIME-CHAT-APPLICATION/blob/60244eb7843fff1c5693de05209c00f30c9f2da2/screenshot/30.03.2025_22.26.16_REC.png)
## Features

- Real-time messaging using WebSockets (Socket.io)
- User authentication (username-based)
- Typing indicators
- Message history
- Responsive design for mobile and desktop
- Timestamps for messages

## Project Structure

```
chat-app/
  ├── client/            # React frontend
  │   ├── public/        # Static files
  │   └── src/           # React source code
  │       ├── components/  # React components
  │       └── App.js     # Main application component
  └── server/            # Node.js backend
      └── server.js      # WebSocket server implementation
```

## Installation

### Prerequisites

- Node.js and npm

### Server Setup

1. Navigate to the server directory:
   ```
   cd server
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the server:
   ```
   npm start
   ```

The server will run on http://localhost:5000.

### Client Setup

1. Navigate to the client directory:
   ```
   cd client
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the development server:
   ```
   npm start
   ```

The React app will run on http://localhost:3000.

## Usage

1. Open http://localhost:3000 in your browser
2. Enter a username to join the chat
3. Start chatting in real-time with other connected users

## License

MIT 
