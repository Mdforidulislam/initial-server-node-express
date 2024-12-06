"use strict";
// app.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.shortenerRouter = void 0;
const express_1 = __importDefault(require("express"));
const shortener_controler_1 = require("./shortener.controler");
const Router = express_1.default.Router();
// Other middleware, routes, etc.
Router.use(express_1.default.json());
// // Define your routes
Router.get('/check-status', shortener_controler_1.shortenerController.shortenerStatusCheck);
Router.post("/payment-shortener", shortener_controler_1.shortenerController.paymentShortener);
Router.post("/generate_shortener", shortener_controler_1.shortenerController.generateShortenerDomain);
// Router.get("/redirectShortener",)
Router.get("/payment-verigy-check", shortener_controler_1.shortenerController.verifyPaymentShortener);
Router.get("/payment-verify-update", shortener_controler_1.shortenerController.shortenerPaymentStatusUpdate);
exports.shortenerRouter = Router;
//# sourceMappingURL=shortener.routes.js.map