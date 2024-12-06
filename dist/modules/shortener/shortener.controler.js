"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.shortenerController = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const shortener_service_1 = require("./shortener.service");
const shortener_model_1 = require("./shortener.model");
const crypto_1 = __importDefault(require("crypto"));
// Check user payment status
const shortenerStatusCheck = (0, express_async_handler_1.default)(async (req, res) => {
    try {
        const { user_name } = req.query;
        if (typeof user_name !== 'string') {
            res.status(400).json({
                message: "Invalid user name provided",
                data: []
            });
            return;
        }
        const resultStatus = await shortener_service_1.shortenerService.getUserDomainAccessDB(user_name);
        res.status(200).json({
            message: "Successfully checked user status",
            data: resultStatus || [],
        });
    }
    catch (error) {
        console.error("Error checking user payment status:", error);
        res.status(500).json({
            message: "An error occurred while checking user status",
            error: error instanceof Error ? error.message : "Unknown error",
        });
    }
});
// Payment Controller
const paymentShortener = (0, express_async_handler_1.default)(async (req, res) => {
    try {
        const shortenerPayment = req.body;
        const result = await shortener_service_1.shortenerService.paymentShortenerDB(shortenerPayment);
        res.status(201).json({
            message: "Successfully payment done",
            data: result,
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            message: "An error occurred while processing the payment",
            error: error instanceof Error ? error.message : "Unknown error",
        });
    }
});
// Utility function to generate a random, unique short code
// Utility function to generate a random, unique short code
const generateShortCode = () => crypto_1.default.randomBytes(3).toString('hex');
const generateShortenerDomain = (0, express_async_handler_1.default)(async (req, res) => {
    try {
        const shortenerInfo = req.body;
        if (!shortenerInfo.user_name || !shortenerInfo.mainDomain) {
            res.status(400).json({
                message: "Username and main domain are required.",
                data: null
            });
            return;
        }
        const existingDomains = await shortener_model_1.GenerateShortenerDomain.find({
            user_name: shortenerInfo.user_name,
            mainDomain: shortenerInfo.mainDomain
        });
        if (existingDomains.length >= 5) {
            res.status(429).json({
                message: "Domain generation limit reached.",
                data: false
            });
            return;
        }
        // Generate unique short code and check for uniqueness across all users
        let shortCode = "";
        let isUnique = false;
        while (!isUnique) {
            shortCode = generateShortCode();
            const existingDomain = await shortener_model_1.GenerateShortenerDomain.findOne({ shortCode });
            // Check if the short code is unique
            if (!existingDomain) {
                isUnique = true;
            }
        }
        shortenerInfo.generatedDomain = `${shortenerInfo.mainDomain}/${shortCode}`;
        const retulst = await shortener_service_1.shortenerService.saveGeneratedShortCodeToDB(shortenerInfo);
        res.status(201).json({
            message: 'Domain successfully shortened.',
            data: { retulst },
        });
    }
    catch (error) {
        console.error('Error generating shortener domain:', error);
        res.status(500).json({ message: 'Internal server error.', data: null });
    }
});
const verifyPaymentShortener = (0, express_async_handler_1.default)(async (req, res) => {
    try {
        const userName = req.query.user_name; // Typecast the query parameter
        if (!userName) {
            res.status(400).json({
                message: "Bad Request: 'user_name' query parameter is required",
            });
            return;
        }
        const result = await shortener_service_1.shortenerService.paymentVerifyShortner(userName);
        if (!result) {
            res.status(404).json({
                message: "User verification failed. No matching records found.",
            });
            return;
        }
        res.status(200).json({
            message: "Successfully verified user payment.",
            data: result,
        });
    }
    catch (error) {
        console.error("Error occurred during user payment verification:", error);
        // Send a structured error response
        res.status(500).json({
            message: "An error occurred while verifying the user's payment. Please try again later.",
            error: error instanceof Error ? error.message : "Unknown error",
        });
    }
});
// payment Stus Verifying check 
const shortenerPaymentStatusUpdate = (0, express_async_handler_1.default)(async (req, res) => {
    try {
        const { username, status } = req.query;
        if (!username || !status) {
            res.status(400).json({ message: "Username and status are required." });
            return;
        }
        const updatedPaymentStatus = await shortener_service_1.shortenerService.updatePaymentStatus(username, status);
        if (updatedPaymentStatus) {
            res.status(200).json({
                message: "Successfully updated payment status",
                data: updatedPaymentStatus,
            });
        }
        else {
            res.status(404).json({
                message: "User not found or update failed",
            });
        }
    }
    catch (error) {
        console.error("Error during payment status update:", error);
        res.status(500).json({
            message: "An error occurred while updating the payment status",
            error: error instanceof Error ? error.message : "Unknown error",
        });
    }
});
// Export the controller
exports.shortenerController = {
    shortenerStatusCheck,
    paymentShortener,
    generateShortenerDomain,
    verifyPaymentShortener,
    shortenerPaymentStatusUpdate
};
// hanlde rediret user domain from comming on hosing 
// and define url on server then redirect 
// 
//# sourceMappingURL=shortener.controler.js.map