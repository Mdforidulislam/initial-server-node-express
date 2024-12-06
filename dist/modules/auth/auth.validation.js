"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.middelwareAuth = void 0;
// userAuthentication
const authenticateUser = () => async (req, res, next) => {
    try {
        const loginCreadiencial = req.body;
        if (!loginCreadiencial.usernameOrEmail && !loginCreadiencial.password) {
            res.status(401).json({
                message: "user data missing ",
                data: loginCreadiencial
            });
        }
        next();
    }
    catch (error) {
        console.error("Authentication error:", error);
        res.status(401).json({ message: error });
    }
};
exports.middelwareAuth = {
    authenticateUser
};
//# sourceMappingURL=auth.validation.js.map