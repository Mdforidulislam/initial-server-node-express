"use strict";
// src/utils/generateShortUrlPath.ts
Object.defineProperty(exports, "__esModule", { value: true });
const generateShortUrlPath = () => {
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let path = '';
    for (let i = 0; i < 6; i++) {
        path += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return path;
};
exports.default = generateShortUrlPath;
//# sourceMappingURL=generateShortUrlPath.js.map