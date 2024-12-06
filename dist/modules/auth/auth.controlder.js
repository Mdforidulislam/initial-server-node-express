"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authticationControler = void 0;
const auth_service_1 = require("./auth.service");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../../config"));
const express_async_handler_1 = __importDefault(require("express-async-handler"));
// login Controler 
const userAuthentication = (0, express_async_handler_1.default)(async (req, res) => {
    try {
        const { usernameOrEmail, password } = req.body;
        const tokens = await auth_service_1.authtication.authticationService(usernameOrEmail, password);
        if (!tokens) {
            res.status(401).json({ message: "Authentication failed" });
            return;
        }
        const { accessToken, refreshToken } = tokens;
        // Set the refresh token in an HTTP-only cookie
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 7 * 24 * 60 * 60 * 1000
        });
        res.json({
            message: "Successfully Login ",
            data: {
                accessToken
            }
        });
    }
    catch (error) {
        console.log(error);
    }
});
//  logOut Controler 
const userLogOutController = (0, express_async_handler_1.default)(async (req, res) => {
    try {
        // Extract the token from the request (if using a Bearer token)
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) {
            return res.status(401).json({ message: "No token provided" });
        }
        const decodedToken = jsonwebtoken_1.default.verify(token, config_1.default.SECRECT_KEY);
        // Respond with success
        res.status(200).json({ message: "Logout successful" });
    }
    catch (error) {
        console.error("Logout error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.authticationControler = {
    userAuthentication,
    userLogOutController
};
//# sourceMappingURL=auth.controlder.js.map