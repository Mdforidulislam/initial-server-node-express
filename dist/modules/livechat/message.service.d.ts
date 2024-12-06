import { IMessage } from "./message.inteface";
export declare const messageService: {
    sendMessage: (messageData: IMessage) => Promise<import("mongoose").Document<unknown, {}, IMessage> & IMessage & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    getMessagesByChatId: (chatId: string) => Promise<(import("mongoose").Document<unknown, {}, IMessage> & IMessage & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    })[]>;
};
//# sourceMappingURL=message.service.d.ts.map