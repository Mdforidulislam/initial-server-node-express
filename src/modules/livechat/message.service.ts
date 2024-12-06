// src/services/messageService.ts

import MessageModel from "./meessage.model";
import { IMessage } from "./message.inteface";


const sendMessage = async (messageData: IMessage) => {
  const message = new MessageModel(messageData);
  return await message.save();
};

const getMessagesByChatId = async (chatId: string) => {
  return await MessageModel.find({ chatId }).sort({ timestamp: 1 });
};

export const messageService = {
  sendMessage,
  getMessagesByChatId,
};
