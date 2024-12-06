// src/utils/generateShortUrlPath.ts

const generateShortUrlPath = (): string => {
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let path = '';
    for (let i = 0; i < 6; i++) {
        path += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return path;
};

export default generateShortUrlPath;
