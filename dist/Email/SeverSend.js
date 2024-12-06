"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.emailRouter = void 0;
const express_1 = __importDefault(require("express"));
const axios_1 = __importDefault(require("axios"));
const MAIL_TM_BASE_URL = 'https://api.mail.tm';
const router = express_1.default.Router();
// Function to create a temporary email
async function createTempEmail() {
    const response = await axios_1.default.post(`${MAIL_TM_BASE_URL}/accounts`, {
        address: `random${Date.now()}@mail.tm`,
        password: 'securePassword123',
    });
    console.log(response, 'check the response , createa main server');
    return response.data;
}
// Function to get token
async function getToken(email, password) {
    const response = await axios_1.default.post(`${MAIL_TM_BASE_URL}/token`, {
        address: email,
        password,
    });
    console.log('check the respnse token ', response);
    return response.data.token;
}
// Function to retrieve messages
async function getMessages(token) {
    const response = await axios_1.default.get(`${MAIL_TM_BASE_URL}/messages`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return response.data['hydra:member'];
}
// Route to create a temporary email and retrieve messages
router.get('/create-email', async (req, res) => {
    try {
        console.log('request form the client ');
        const { address, password } = await createTempEmail();
        console.log(address, password, 'check the address and password');
        const token = await getToken(address, password);
        console.log(token, 'check server token ');
        const messages = await getMessages(token);
        console.log(messages, 'response form the email server ');
        res.json({ address, messages });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.emailRouter = router;
//# sourceMappingURL=SeverSend.js.map