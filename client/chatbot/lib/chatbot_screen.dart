import 'package:socket_io_client/socket_io_client.dart' as IO;
import 'package:flutter/material.dart';

class ChatbotScreen extends StatefulWidget {
  const ChatbotScreen({super.key});

  @override
  State<ChatbotScreen> createState() => _ChatbotScreenState();
}

class _ChatbotScreenState extends State<ChatbotScreen> {
  late IO.Socket socket;
  final TextEditingController _controller = TextEditingController();
  List<String> chatHistory = [];

  @override
  void initState() {
    _connectToServer();
    super.initState();
  }

  @override
  void dispose() {
    _controller.dispose();
    socket.disconnect();
    super.dispose();
  }

  void _connectToServer() {
    socket = IO.io('http://localhost:5999', <String, dynamic>{
      'transports': ['websocket'],
      'autoConnect': false,
    });

    _setupCommunicationSystem();
  }

  void _setupCommunicationSystem() {
    socket.on('message', (data) {
      setState(() {
        chatHistory.add('Server: ${data.toString()}');
      });
    });

    // Connect to the server
    socket.connect();
  }

  void _sendMessage() {
    if (_controller.text.isNotEmpty) {
      socket.emit('message', _controller.text);
      chatHistory.add('You: ${_controller.text}');
      _controller.text = '';
      setState(() {}); // Update the UI
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Chat Bot'),
      ),
      body: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          children: [
            Expanded(
              child: ListView.builder(
                itemCount: chatHistory.length,
                itemBuilder: (context, index) {
                  final message = chatHistory[index];
                  final isServerMessage = message.startsWith('Server:');
                  return Align(
                    alignment: isServerMessage
                        ? Alignment.centerLeft
                        : Alignment.centerRight,
                    child: Container(
                      margin: const EdgeInsets.symmetric(vertical: 4),
                      padding: const EdgeInsets.all(8),
                      decoration: BoxDecoration(
                        color: isServerMessage
                            ? Colors.blue[100]
                            : Colors.green[100],
                        borderRadius: BorderRadius.circular(8),
                      ),
                      child: Text(message),
                    ),
                  );
                },
              ),
            ),
            const SizedBox(height: 16),
            Row(
              children: [
                Expanded(
                  child: TextFormField(
                    controller: _controller,
                    decoration: const InputDecoration(
                      labelText: 'Send a message, server will send it back',
                    ),
                  ),
                ),
                IconButton(
                  icon: const Icon(Icons.send),
                  onPressed: _sendMessage,
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }
}
