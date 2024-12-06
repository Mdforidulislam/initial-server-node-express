import { IGenerateDomain, IPaymentShortener } from "./shortener.interface";
declare const PaymentShortener: import("mongoose").Model<IPaymentShortener, {}, {}, {}, import("mongoose").Document<unknown, {}, IPaymentShortener> & IPaymentShortener & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>;
declare const GenerateShortenerDomain: import("mongoose").Model<IGenerateDomain, {}, {}, {}, import("mongoose").Document<unknown, {}, IGenerateDomain> & IGenerateDomain & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>;
export { PaymentShortener, GenerateShortenerDomain };
//# sourceMappingURL=shortener.model.d.ts.map