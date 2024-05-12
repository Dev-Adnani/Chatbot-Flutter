# Flutter WebSocket Server Demo
This is a demo Flutter application that connects to a WebSocket server and allows sending and receiving messages. The application consists of a client-side Flutter app and a Node.js WebSocket server.

## Server (Node.js)
The server is implemented using Node.js and the **'ws'** library. It listens for WebSocket connections on port 8080 and handles incoming messages from clients.

### Installation and Usage
1. Install Node.js on your machine if you haven't already.
2. Navigate to the server directory: **'cd server'**
3. Install the dependencies: **'npm install'**
4. Start the server: **'node server.js'**
5. The server will start listening for WebSocket connections on **'ws://localhost:8080'**.

## Client (Flutter)
The client-side Flutter application allows connecting to the WebSocket server and sending/receiving messages. It utilizes the **'web_socket_channel'** package for WebSocket communication 

### Installation and Usage
1. Ensure you have Flutter installed on your machine.
2. Navigate to the Flutter app directory: **'cd app'**
3. Install the dependencies: **'flutter pub get'**
4. Connect your device or start an emulator.
5. Run the Flutter app: **'flutter run'**
6. On the app's connect screen, enter the WebSocket server URL (e.g., **'ws://localhost:8080'**) and click "Connect".
7. Once connected, you can send messages to the server using the input field and receive responses in real-time.

### Functionality
- The app sends the message to the server when the "Send" button is pressed.
- The server sends a "Hello, client!" message upon establishing a connection.
- The app receives messages from the server and displays them on the screen.
- When a message is received, the app shows a push notification with the message content.
- The app disconnects from the server when the back button is pressed.
