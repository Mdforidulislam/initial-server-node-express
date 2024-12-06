

// shortener payment modal 

import { model, Schema } from "mongoose";
import { IGenerateDomain, IPaymentShortener } from "./shortener.interface";

// Define the payment shortener schema
const PaymentShortenerSchema = new Schema<IPaymentShortener>(
    {
        user_Name: { type: String, required: true, trim: true },
        isPayment: { type: Boolean, required: false, default: true },
        typeOFSuscription: { 
            type: [String], 
            enum: ["all_calling", "all_notice"], 
            required: true 
          },
        paymentAmount: { type: Number, required: true },
    },
    {
        timestamps: true 
    }
);

const PaymentShortener = model<IPaymentShortener>("PaymentShortener", PaymentShortenerSchema);

// Define the generate shortener domain schema
const GenerateShortenerSchema = new Schema<IGenerateDomain>(
    {
        user_Name: { type: String, required: true, trim: true },
        mainDomain: { type: String, required: true, trim: true },
        userDomain: { type: String, required: true, trim: true },
        uniqueid: {type: String, required: true, trim: true},
        generatedDomain: { type: String, required: true, unique: true, trim: true } 
    },
    {
        timestamps: true 
    }
);

const GenerateShortenerDomain = model<IGenerateDomain>("GenerateShortenerDomain", GenerateShortenerSchema);

export { PaymentShortener, GenerateShortenerDomain };