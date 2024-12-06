import mongoose from "mongoose";
import { IMessage } from "./message.inteface";
declare const MessageModel: mongoose.Model<IMessage, {}, {}, {}, mongoose.Document<unknown, {}, IMessage> & IMessage & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, any>;
export default MessageModel;
//# sourceMappingURL=meessage.model.d.ts.map