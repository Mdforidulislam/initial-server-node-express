"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_routes_1 = require("./modules/user/user.routes");
const auth_routes_1 = require("./modules/auth/auth.routes");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use("/api/v1", user_routes_1.userRoutes);
// authentication route 
app.use("/api/v1", auth_routes_1.authRouter);
// Catch-all for undefined routes
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