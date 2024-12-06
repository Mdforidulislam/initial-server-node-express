"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = __importDefault(require("../config"));
const connectToDatabase = async () => {
    try {
        // Set connection options, including server selection timeout
        const options = {
            serverSelectionTimeoutMS: 5000, // 5 seconds timeout
        };
        await mongoose_1.default.connect(config_1.default.database_url, options);
        console.log("Database connected successfully");
    }
    catch (error) {
        console.error("Database connection error:", error);
        throw new Error("Database connection failed");
    }
};
exports.default = connectToDatabase;
//# sourceMappingURL=connection.js.map