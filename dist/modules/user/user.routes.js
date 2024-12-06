"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
const express_1 = __importDefault(require("express"));
const user_controler_1 = require("./user.controler");
const router = express_1.default.Router();
router.post('/create-user', user_controler_1.userControllers.createUser);
router.get('/user-get', user_controler_1.userControllers.userGet);
router.get('/get-alluser', user_controler_1.userControllers.getingAllUser);
exports.userRoutes = router;
//# sourceMappingURL=user.routes.js.map