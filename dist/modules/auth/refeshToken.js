"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.refreshAccessToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../../config"));
const express_async_handler_1 = __importDefault(require("express-async-handler"));
exports.refreshAccessToken = (0, express_async_handler_1.default)(async (req, res) => {
    const refreshToken = req.cookies?.refreshToken;
    console.log(refreshToken, 'check is refresh token');
    if (!refreshToken) {
        res.status(403).json({ message: "Refresh token not provided" });
        return;
    }
    try {
        // Verify the refresh token
        const decoded = jsonwebtoken_1.default.verify(refreshToken, config_1.default.SECRECT_KEY);
        console.log(decoded, 'check decoded refresh token');
        // Generate a new access token
        const newAccessToken = jsonwebtoken_1.default.sign({ user_Name: decoded.user_Name, user_Role: decoded.user_Role, user_Email: decoded.user_Email }, config_1.default.SECRECT_KEY, { expiresIn: "15m" } // Short-lived access token (e.g., 15 minutes)
        );
        // Respond with the new access token
        res.json({ accessToken: newAccessToken });
    }
    catch (error) {
        console.error("Refresh token error:", error);
        res.status(403).json({ message: "Invalid refresh token" });
    }
});
//# sourceMappingURL=refeshToken.js.map