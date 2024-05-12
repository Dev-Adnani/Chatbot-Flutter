const express = require("express");
const socketIo = require("socket.io");

const app = express();
const server = app.listen(5999, () => {
  console.log("Server listening on port 5999");
});

const io = socketIo(server);
const clients = new Set();

io.on("connection", (socket) => {
  console.log("Client connected!");
  clients.add(socket);

  socket.emit("message", "Hello! How can I assist you today?");
  socket.emit("message", "Type /help for a list of available commands.");

  socket.on("message", (message) => {
    console.log(`Received message: ${message}`);

    handleMessage(socket, message);
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected.");
    clients.delete(socket);
  });
});

const getRandomJoke = () => {
  const jokes = [
    "Why don't scientists trust atoms? Because they make up everything!",
    "What do you call fake spaghetti? An impasta!",
    "Why did the scarecrow win an award? Because he was outstanding in his field!",
    "How do you organize a space party? You planet!",
    "Why did the bicycle fall over? Because it was two-tired!",
  ];

  return jokes[Math.floor(Math.random() * jokes.length)];
};

const rollDice = () => {
  return Math.floor(Math.random() * 6) + 1;
};

const flipCoin = () => {
  return Math.random() < 0.5 ? "heads" : "tails";
};

const handleMessage = (socket, message) => {
  const messageStr = message.toString().trim().toLowerCase();
  switch (true) {
    case messageStr.startsWith("/time"):
      socket.emit("message", new Date().toLocaleTimeString());
      break;
    case messageStr.startsWith("/date"):
      socket.emit("message", new Date().toDateString().substring(4));
      break;
    case messageStr.startsWith("/day"):
      const days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ];
      const day = days[new Date().getDay()];
      socket.emit("message", day);
      break;
    case messageStr.startsWith("/help"):
      socket.emit(
        "message",
        "Available commands: /stats /time, /date, /day, /weather, /joke, /help /roll, /flip, /about"
      );
      break;
    case messageStr.startsWith("/stats"):
      const activeUsers = clients.size;
      const uptime = process.uptime();
      socket.emit("message", `Active users: ${activeUsers}, Uptime: ${uptime} seconds.`);
      break;
    case messageStr.startsWith("/about"):
      socket.emit(
        "message",
        "This is a simple chatbot server created using Node.js, Express, and Socket.IO."
      );
      break;
    case messageStr.startsWith("/weather"):
      socket.emit("message", "The weather is sunny and 75°F.");
      break;
    case messageStr.startsWith("/joke"):
      socket.emit("message", getRandomJoke());
      break;
    case messageStr.startsWith("/roll"):
      socket.emit("message", rollDice());
      break;
    case messageStr.startsWith("/flip"):
      socket.emit("message", flipCoin());
      break;
    default:
      socket.emit(
        "message",
        "I do not understand that command. Type /help for a list of available commands."
      );
      break;
  }
};
