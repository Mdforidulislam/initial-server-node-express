import { IUser, User } from "./user.interface";
export declare const userService: {
    userCreateDB: (user: IUser) => Promise<(import("mongoose").Document<unknown, {}, IUser> & IUser & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }) | {
        message: string;
        error: any;
    }>;
    userGetDB: (userId: string) => Promise<User | null>;
    getingAllUser: (userId: string, requestingUserRole: string) => Promise<User | User[] | null>;
};
//# sourceMappingURL=user.service.d.ts.map