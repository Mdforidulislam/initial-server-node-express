"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const authorizationUser = (requiredRoles) => {
    return (req, res, next) => {
        const userRole = req.user?.role;
        if (!userRole || !requiredRoles.includes(userRole)) {
            res.status(403).json({ message: "Forbidden: Insufficient permissions" });
            return;
        }
        next();
    };
};
exports.default = authorizationUser;
//# sourceMappingURL=authorization.js.map