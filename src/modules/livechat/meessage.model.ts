import mongoose, { Schema } from "mongoose";
import { IMessage } from "./message.inteface";

const MessageSchema: Schema = new Schema({
    chatId: { type: String, required: true },
    sender: { type: String, required: true },
    content: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
  });
  
  const MessageModel = mongoose.model<IMessage>('Message', MessageSchema);
  export default MessageModel;
  