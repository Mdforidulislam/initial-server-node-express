"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.shortenerService = void 0;
// check user statusCheck on service 
const product_service_model_1 = require("../service/product.service.model");
const shortener_model_1 = require("./shortener.model");
// Fetch user domain access based on payment subscriptions
const getUserDomainAccessDB = async (username) => {
    try {
        const userPaymentRecords = await shortener_model_1.PaymentShortener.find({ user_name: username });
        const subscriptionTypes = userPaymentRecords.map(record => record.typeOFSuscription);
        if (userPaymentRecords.length === 0) {
            console.log("User not found.");
            return null;
        }
        if (subscriptionTypes.length < 1) {
            console.log("User has not completed a payment.");
            return null;
        }
        // Retrieve available domain lists for all services
        const serviceDomains = await product_service_model_1.AllProductService.findOne({}).lean();
        if (!serviceDomains) {
            console.log("Domain services not found.");
            return null;
        }
        const { all_calling, all_notice } = serviceDomains.shortener_service;
        const result = {};
        if (subscriptionTypes.includes("all_calling")) {
            result.callingDomains = all_calling;
        }
        if (subscriptionTypes.includes("all_notice")) {
            result.noticeDomains = all_notice;
        }
        return result;
    }
    catch (error) {
        console.error("Error fetching user domain access:", error instanceof Error ? error.message : error);
        return null;
    }
};
// Function to save payment information in the database
const paymentShortenerDB = async (paymentInfo) => {
    try {
        if (!paymentInfo || typeof paymentInfo !== 'object') {
            throw new Error("Invalid payment information provided");
        }
        // Create a new payment record
        const newPayment = new shortener_model_1.PaymentShortener(paymentInfo);
        const result = await newPayment.save();
        return result;
    }
    catch (error) {
        if (error instanceof Error) {
            console.error("Error saving payment information:", error.message);
            throw new Error(`Database operation failed: ${error.message}`);
        }
        else {
            console.error("An unknown error occurred while saving payment information.");
            throw new Error("Database operation failed: Unknown error");
        }
    }
};
// generate shortCode store on db  on db 
const saveGeneratedShortCodeToDB = async (data) => {
    try {
        return await shortener_model_1.GenerateShortenerDomain.create(data);
    }
    catch (error) {
        console.error('Error saving short code to DB:', error);
        throw new Error('Failed to save short code to the database');
    }
};
// Verifies the user's payment information for shortener
const paymentVerifyShortner = async (userName) => {
    try {
        const verifyInfo = await shortener_model_1.PaymentShortener.findOne({ user_name: userName }).lean();
        if (!verifyInfo) {
            console.log("User not found.");
            return null;
        }
        return verifyInfo;
    }
    catch (error) {
        console.error("Error during payment verification:", error instanceof Error ? error.message : error);
        throw new Error("An error occurred while verifying the user's payment.");
    }
};
const updatePaymentStatus = async (username, status) => {
    try {
        if (!["paid", "unpaid"].includes(status)) {
            throw new Error("Invalid payment status provided.");
        }
        const updatedUser = await shortener_model_1.PaymentShortener.findOneAndUpdate({ user_name: username }, { isPayment: status === "paid" }, { new: true }).lean();
        if (!updatedUser) {
            return null;
        }
        return updatedUser;
    }
    catch (error) {
        console.error("Error updating payment status:", error);
        throw new Error("Failed to update payment status.");
    }
};
// Export the service
exports.shortenerService = {
    getUserDomainAccessDB,
    paymentShortenerDB,
    saveGeneratedShortCodeToDB,
    paymentVerifyShortner,
    updatePaymentStatus
};
//# sourceMappingURL=shortener.service.js.map