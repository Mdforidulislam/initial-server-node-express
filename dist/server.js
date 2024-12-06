"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.serverSocket = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const app_1 = __importDefault(require("./app"));
const mailjs_1 = __importDefault(require("@cemalgnlts/mailjs"));
const http_1 = __importDefault(require("http"));
const socket_io_1 = require("socket.io");
const messageSoket_1 = __importDefault(require("./message/messageSoket"));
const config_1 = __importDefault(require("./config"));
exports.serverSocket = http_1.default.createServer(app_1.default);
// Initialize Socket.IO with CORS configuration
const io = new socket_io_1.Server(exports.serverSocket, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
    },
});
(0, messageSoket_1.default)(io);
// Initialize Mailjs
const mailjs = new mailjs_1.default();
// Function to create an account and log in
const createAndLogin = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const account = yield mailjs.createOneAccount();
        console.log('Account created:', account.data.username);
        // Immediately log in with the created account
        const loginResponse = yield mailjs.login(account.data.username, account.data.password);
        console.log('User logged in successfully:', loginResponse);
        // Use the token from login response for Bearer authorization
        const token = loginResponse.data.token;
        // Set the token in headers for further requests
        mailjs.loginWithToken(token);
        // Optional: Fetch user details
        const meResponse = yield mailjs.me();
        console.log('User details:', meResponse);
        // Function to check for new messages at regular intervals
        const checkForNewMessages = () => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const messagesResponse = yield mailjs.getMessages();
                console.log('Messages:', messagesResponse);
            }
            catch (error) {
                console.error('Error fetching messages:', error);
            }
        });
        // Set an interval to check for new messages every 5 seconds
        setInterval(() => {
            checkForNewMessages();
        }, 15000);
        // At this point, you can send a test email to account.data.username
        console.log('You can now send a test email to:', account.data.username);
    }
    catch (error) {
        console.error('Error during account creation or login:', error);
    }
});
// Start the process
createAndLogin();
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield mongoose_1.default.connect(config_1.default.database_url);
            // Use server.listen instead of app.listen
            exports.serverSocket.listen(config_1.default.port, () => {
                console.log(`Server is listening on port ${config_1.default.port}`);
            });
        }
        catch (error) {
            console.log(error);
        }
    });
}
main();
