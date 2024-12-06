"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.messageRouter = void 0;
// src/routes/messageRoutes.ts
const express_1 = __importDefault(require("express"));
const message_controler_1 = require("./message.controler");
const router = express_1.default.Router();
router.get('/:chatId', message_controler_1.messageController.getMessages);
exports.messageRouter = router;
//# sourceMappingURL=message.routes.js.map