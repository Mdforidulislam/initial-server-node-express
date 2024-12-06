"use strict";
// shortener payment modal 
Object.defineProperty(exports, "__esModule", { value: true });
exports.GenerateShortenerDomain = exports.PaymentShortener = void 0;
const mongoose_1 = require("mongoose");
// Define the payment shortener schema
const PaymentShortenerSchema = new mongoose_1.Schema({
    user_id: { type: String, required: true, trim: true },
    user_name: { type: String, required: true, trim: true },
    user_email: { type: String, required: true, trim: true },
    isPayment: { type: Boolean, required: true, default: false },
    typeOFSuscription: { type: String, enum: ["all_calling", "all_notice"], required: true },
    paymentAmount: { type: Number, required: true },
    paymentType: { type: String, required: true },
}, {
    timestamps: true
});
const PaymentShortener = (0, mongoose_1.model)("PaymentShortener", PaymentShortenerSchema);
exports.PaymentShortener = PaymentShortener;
// Define the generate shortener domain schema
const GenerateShortenerSchema = new mongoose_1.Schema({
    user_id: { type: String, required: true, trim: true },
    user_name: { type: String, required: true, trim: true },
    mainDomain: { type: String, required: true, trim: true },
    userDomain: { type: String, required: true, trim: true },
    generatedDomain: { type: String, required: true, unique: true, trim: true }
}, {
    timestamps: true
});
const GenerateShortenerDomain = (0, mongoose_1.model)("GenerateShortenerDomain", GenerateShortenerSchema);
exports.GenerateShortenerDomain = GenerateShortenerDomain;
//# sourceMappingURL=shortener.model.js.map