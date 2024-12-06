"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authtication = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_model_1 = require("../user/user.model");
const config_1 = __importDefault(require("../../config"));
const generateAccessToken = (user) => {
    return jsonwebtoken_1.default.sign({ user_Name: user.user_name, user_role: user.user_role, user_email: user.user_email }, config_1.default.SECRECT_KEY, { expiresIn: "3d" });
};
const generateRefreshToken = (user) => {
    return jsonwebtoken_1.default.sign({ user_name: user.user_name, user_eole: user.user_role, user_email: user.user_email }, config_1.default.SECRECT_KEY, { expiresIn: "7d" });
};
// login User Service 
const authticationService = async (usernameOrEmail, password) => {
    try {
        usernameOrEmail = usernameOrEmail.trim();
        password = password.trim();
        console.log(usernameOrEmail, password);
        const isExiteuser = await user_model_1.userModel.User.findOne({
            $or: [{ user_name: usernameOrEmail }, { user_email: usernameOrEmail }]
        });
        console.log(isExiteuser, 'check is user is Exite');
        // If the user does not exist or the password is incorrect
        if (!isExiteuser) {
            console.warn("User not found");
            return null;
        }
        // Generate tokens
        const accessToken = generateAccessToken(isExiteuser);
        const refreshToken = generateRefreshToken(isExiteuser);
        console.log(accessToken, refreshToken);
        return { accessToken, refreshToken };
    }
    catch (error) {
        console.error("Authentication error:", error);
        return null;
    }
};
exports.authtication = {
    authticationService
};
//# sourceMappingURL=auth.service.js.map