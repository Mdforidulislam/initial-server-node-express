"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uservalidationAsync = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../../config"));
// Utility function to handle async errors
const asyncHandler = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};
const authenticateUser = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Unauthorized: No token provided" });
    }
    const token = authHeader.split(" ")[1];
    console.log(token);
    if (!token) {
        return res.status(401).json({ message: "Unauthorized: No token provided" });
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, config_1.default.SECRECT_KEY);
        req.user = decoded;
        next();
    }
    catch (error) {
        console.error("Authentication error:", error);
        return res.status(401).json({ message: "Unauthorized: Invalid token" });
    }
};
exports.uservalidationAsync = asyncHandler(authenticateUser);
//# sourceMappingURL=authentication.js.map