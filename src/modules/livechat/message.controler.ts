// src/controllers/messageController.ts
import { Request, Response } from 'express';
import { messageService } from './message.service';


const getMessages = async (req: Request, res: Response) => {
  try {
    const { chatId } = req.params;
    const messages = await messageService.getMessagesByChatId(chatId);
    res.status(200).json(messages);
  } catch (error) {
    console.error('Error retrieving messages:', error);
    res.status(500).json({ error: 'Failed to retrieve messages' });
  }
};

export const messageController = {
  getMessages,
};
