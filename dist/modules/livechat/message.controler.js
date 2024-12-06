"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.messageController = void 0;
const message_service_1 = require("./message.service");
const getMessages = async (req, res) => {
    try {
        const { chatId } = req.params;
        const messages = await message_service_1.messageService.getMessagesByChatId(chatId);
        res.status(200).json(messages);
    }
    catch (error) {
        console.error('Error retrieving messages:', error);
        res.status(500).json({ error: 'Failed to retrieve messages' });
    }
};
exports.messageController = {
    getMessages,
};
//# sourceMappingURL=message.controler.js.map