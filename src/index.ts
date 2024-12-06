import mongoose from "mongoose";
import app from "./app";
// import http from 'http';
// import { Server } from 'socket.io';
import config from "./config";
import { createAndLogin } from "./modules/tempMail/tampMail.routes";
// import setupSocket from "./message/messageSoket";


// export const serverSocket = http.createServer(app);

// // Initialize Socket.IO with CORS configuration
// const io = new Server(serverSocket, {
//     cors: {
//         origin: "*",  
//         methods: ["GET", "POST"],
//     },
//   });
  
//   setupSocket(io);
  createAndLogin(); 
  

async function main(){
    try {
        await mongoose.connect(config.database_url as string);
        
        // Use server.listen instead of app.listen
        app.listen(config.port, () => {
            console.log(`Server is listening on port ${config.port}`);
        });
    } catch (error) {
        console.log(error);
    }
}

main();





// file folder strucher 

/**
 * /project-root
│
├── /nginx
│   ├── /conf.d        # Directory for Nginx configuration files for individual domains
│   │   ├── your-domain.com.conf  # Nginx config for your domain (optional)
│   ├── /ssl           # SSL certificates for HTTPS
│   ├── Dockerfile      # Dockerfile for Nginx
│   └── nginx.conf     # Main Nginx configuration file
│
├── /logs
│   ├── /nginx         # Logs for Nginx access and error logs
│   │   ├── access.log  # Nginx access logs
│   │   ├── error.log   # Nginx error logs
│   └── /app           # Logs for your Express app
│       ├── app.log     # Application-specific logs
│
└── /backend
    ├── /config        # App configuration files
    ├── /controllers   # Express controllers
    ├── /routes        # Express routes
    ├── Dockerfile     # Dockerfile for Express backend
    └── server.js      # Main Express app
 */