"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const user_routes_1 = require("./modules/user/user.routes");
const auth_routes_1 = require("./modules/auth/auth.routes");
const SeverSend_1 = require("./Email/SeverSend");
const shortener_routes_1 = require("./modules/shortener/shortener.routes");
const app = (0, express_1.default)();
const server = http_1.default.createServer(app); // Create HTTP server
// Middleware and Routes
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)());
// Middleware and route handlers
app.get('/', (req, res) => {
    res.send('making somting Ready for You!');
});
// Define routes
app.use("/api/v1", user_routes_1.userRoutes);
app.use("/api/v1", auth_routes_1.authRouter);
app.use("/api/v1", shortener_routes_1.shortenerRouter);
// app.use("/api/v1", messageRouter);
// email router 
app.use('/api/v1', SeverSend_1.emailRouter);
app.all("*", (req, res, next) => {
    res.status(404).json({
        success: false,
        message: "Resource not found",
        error: {
            method: req.method,
            url: req.originalUrl,
        },
    });
});
exports.default = app;
//# sourceMappingURL=app.js.map