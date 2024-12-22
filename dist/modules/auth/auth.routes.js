"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
const express_1 = __importDefault(require("express"));
const auth_controlder_1 = require("./auth.controlder");
const auth_validation_1 = require("./auth.validation");
const refeshToken_1 = require("./refeshToken");
const Router = express_1.default.Router();
Router.get('/auth', auth_validation_1.middelwareAuth.authenticateUser(), auth_controlder_1.authticationControler.userAuthentication);
Router.post("/logOut", auth_controlder_1.authticationControler.userLogOutController);
Router.get("/refresh-token", refeshToken_1.refreshAccessToken);
exports.authRouter = Router;
//# sourceMappingURL=auth.routes.js.map