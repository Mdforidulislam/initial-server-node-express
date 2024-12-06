// src/routes/messageRoutes.ts
import express from 'express';
import { messageController } from './message.controler';


const router = express.Router();

router.get('/:chatId', messageController.getMessages);

export  const  messageRouter = router;
