import { IGenerateDomain, IPaymentShortener } from "./shortener.interface";
interface DomainListResult {
    callingDomains?: string[];
    noticeDomains?: string[];
}
interface DomainListResult {
    callingDomains?: string[];
    noticeDomains?: string[];
}
export declare const shortenerService: {
    getUserDomainAccessDB: (username: string) => Promise<DomainListResult | null>;
    paymentShortenerDB: (paymentInfo: IPaymentShortener) => Promise<IPaymentShortener>;
    saveGeneratedShortCodeToDB: (data: IGenerateDomain) => Promise<import("mongoose").Document<unknown, {}, IGenerateDomain> & IGenerateDomain & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    paymentVerifyShortner: (userName: string) => Promise<IPaymentShortener | null>;
    updatePaymentStatus: (username: string, status: string) => Promise<IPaymentShortener | null>;
};
export {};
//# sourceMappingURL=shortener.service.d.ts.map