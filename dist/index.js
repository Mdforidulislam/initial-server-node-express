"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const app_1 = __importDefault(require("./app"));
// import http from 'http';
// import { Server } from 'socket.io';
const config_1 = __importDefault(require("./config"));
const tampMail_routes_1 = require("./modules/tempMail/tampMail.routes");
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
(0, tampMail_routes_1.createAndLogin)();
async function main() {
    try {
        await mongoose_1.default.connect(config_1.default.database_url);
        // Use server.listen instead of app.listen
        app_1.default.listen(config_1.default.port, () => {
            console.log(`Server is listening on port ${config_1.default.port}`);
        });
    }
    catch (error) {
        console.log(error);
    }
}
main();
//# sourceMappingURL=index.js.map