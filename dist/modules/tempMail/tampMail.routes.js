"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAndLogin = void 0;
const mailjs_1 = __importDefault(require("@cemalgnlts/mailjs"));
// Initialize Mailjs
const mailjs = new mailjs_1.default();
// Function to create an account and log in
const createAndLogin = async () => {
    try {
        // const account = await mailjs.createOneAccount();
        // console.log('Account created:', account.data.username);
        // // Immediately log in with the created account
        // const loginResponse = await mailjs.login(account.data.username, account.data.password);
        // console.log('User logged in successfully:', loginResponse);
        // // Use the token from login response for Bearer authorization
        // const token = loginResponse.data.token;
        // // Set the token in headers for further requests
        // mailjs.loginWithToken(token)
        // // Optional: Fetch user details
        // const meResponse = await mailjs.me();
        // console.log('User details:', meResponse);
        //    // Function to check for new messages at regular intervals
        //         const checkForNewMessages = async () => {
        //             try {
        //                 const messagesResponse = await mailjs.getMessages();
        //                 console.log('Messages:', messagesResponse);
        //             } catch (error) {
        //                 console.error('Error fetching messages:', error);
        //             }
        //         };
        //         // checkForNewMessages()
        //     // Set an interval to check for new messages every 5 seconds
        //     // setInterval(() => {
        //     //     checkForNewMessages();
        //     // }, 15000);
        //     // At this point, you can send a test email to account.data.username
        //     console.log('You can now send a test email to:', account.data.username);
    }
    catch (error) {
        console.error('Error during account creation or login:', error);
    }
};
exports.createAndLogin = createAndLogin;
//# sourceMappingURL=tampMail.routes.js.map