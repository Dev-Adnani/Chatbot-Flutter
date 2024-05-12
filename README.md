# Flutter Socket.io Server Demo
This demo showcases a Flutter application that connects to a Socket.io server, facilitating bidirectional message communication. The setup comprises a client-side Flutter app and a Node.js-based Socket.io server.

## Server (Node.js)
Implemented in Node.js with the **'express,socket.io'** library, the server listens for Socket.io connections on port 5999 and efficiently manages incoming client messages.

### Installation and Usage
1. Ensure Node.js is installed on your machine.
2. Navigate to the server directory: **'cd server'**
3. Install dependencies: **'npm install'**
4. Start the server: **'node index.js'**
5. The server initiates on **'http://localhost:5999'** to accept Socket.io connections.

## Client (Flutter)
The Flutter client app connects seamlessly to the Socket.io server, enabling real-time message exchange. It leverages the **'socket_io_client'** package for WebSocket communication.

### Installation and Usage
1. Confirm Flutter is installed on your machine.
2. Navigate to the Flutter app directory: **'cd app'**
3. Install dependencies: **'flutter pub get'**
4. Connect your device or launch an emulator.
5. Run the Flutter app: **'flutter run'**
6. Input the Socket.io server URL (e.g., **'http://localhost:5999'**) 
7. Once connected, utilize the input field to dispatch messages to the server and receive real-time responses.

### Functionality
- Message transmission to the server triggers upon pressing the "Send" button.
- Upon successful connection establishment, the server dispatches a welcoming "Hello, client!" message.
- Incoming messages from the server are promptly displayed within the app.
- The app incorporates predefined commands for seamless interaction with the server.
- Pressing the back button seamlessly disconnects the app from the server.
