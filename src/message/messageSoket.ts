// messageSocket.ts
import { Server } from 'socket.io';

const setupSocket = (io: Server) => {
  io.on("connection", (socket) => {
    console.log("New Client Connected:", socket.id);

    // Listening for user registration
    socket.on("registerUser", (username) => {
      socket.data.username = username; // Store username in socket data
      console.log(`${username} registered`);
      // You may want to emit an event back to the client confirming registration
      io.emit("userRegistered", username); // Optional: Notify other clients if needed
    });

    // Listening for incoming messages
    socket.on("sendMessage", async (data) => {
      const { sender, recipient, content } = data;
      console.log(sender,recipient,content)
        // Admin can send messages to any user
        io.emit("messageReceived", { sender, recipient, content });
    });

    // Handling client disconnection
    socket.on("disconnect", () => {
      console.log("Client Disconnected:", socket.id);
    });
  });
};

export default setupSocket;
