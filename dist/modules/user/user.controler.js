"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userControllers = exports.userGet = void 0;
const user_service_1 = require("./user.service");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../../config"));
const express_async_handler_1 = __importDefault(require("express-async-handler"));
// create user 
const createUser = (0, express_async_handler_1.default)(async (req, res) => {
    try {
        const { user } = req.body;
        const result = await user_service_1.userService.userCreateDB(user);
        res.status(200).json({
            message: "Successfully Get Data",
            status: 200,
            data: result
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
// user get
exports.userGet = (0, express_async_handler_1.default)(async (req, res) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        console.log("Token:", token);
        if (!token) {
            res.status(401).json({ error: "Unauthorized: No token provided" });
            return;
        }
        const decoded = jsonwebtoken_1.default.verify(token, config_1.default.SECRECT_KEY);
        console.log("Decoded token:", decoded);
        // Check if the decoded token has a user_name property and that it is a string
        const userId = decoded.user_Name;
        if (typeof userId !== "string") {
            res.status(400).json({ error: "User ID is required" });
            return;
        }
        const user = await user_service_1.userService.userGetDB(userId);
        if (!user) {
            res.status(404).json({ error: "User not found" });
            return;
        }
        res.status(200).json(user);
    }
    catch (error) {
        console.error("Error fetching user:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});
// geting all user 
const getingAllUser = (0, express_async_handler_1.default)(async (req, res) => {
    try {
        const token = req.headers.authorization;
        console.log("Token:", token);
        if (!token) {
            res.status(401).json({ error: "Unauthorized: No token provided" });
            return;
        }
        const decoded = jsonwebtoken_1.default.verify(token, config_1.default.SECRECT_KEY);
        console.log("Decoded token:", decoded);
        // Check if the decoded token has a user_name property and that it is a string
        const userId = decoded.user_Name;
        const user_role = decoded.user_role;
        if (typeof userId !== "string") {
            res.status(400).json({ error: "User ID is required" });
            return;
        }
        const user = await user_service_1.userService.getingAllUser(userId, user_role);
        if (!user) {
            res.status(404).json({ error: "User not found" });
            return;
        }
        res.status(200).json(user);
    }
    catch (error) {
        console.error("Error fetching user:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});
exports.userControllers = {
    createUser,
    userGet: exports.userGet,
    getingAllUser
};
//# sourceMappingURL=user.controler.js.map