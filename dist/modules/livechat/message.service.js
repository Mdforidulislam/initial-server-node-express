"use strict";
// src/services/messageService.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.messageService = void 0;
const meessage_model_1 = __importDefault(require("./meessage.model"));
const sendMessage = async (messageData) => {
    const message = new meessage_model_1.default(messageData);
    return await message.save();
};
const getMessagesByChatId = async (chatId) => {
    return await meessage_model_1.default.find({ chatId }).sort({ timestamp: 1 });
};
exports.messageService = {
    sendMessage,
    getMessagesByChatId,
};
//# sourceMappingURL=message.service.js.map