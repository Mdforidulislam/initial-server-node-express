"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userService = void 0;
const user_model_1 = require("./user.model");
// create user db
const userCreateDB = async (user) => {
    try {
        console.log(user);
        const result = await user_model_1.userModel.User.create(user);
        return result;
    }
    catch (error) {
        if (error.code === 11000) {
            return { message: 'Duplicate user information', error: error.message };
        }
        return {
            message: "An error occurred while creating the user",
            error: error.message,
        };
    }
};
// get user from db
const userGetDB = async (userId) => {
    try {
        console.log("Searching for user with identifier:", userId);
        // Fetch the user document from MongoDB
        const user = await user_model_1.userModel.User.findOne({ user_name: userId }).exec();
        // Convert document to plain object and cast to `User`
        return user ? user.toObject() : null;
    }
    catch (error) {
        console.error('Error fetching user from DB:', error);
        throw new Error('Database error');
    }
};
const getingAllUser = async (userId, requestingUserRole) => {
    try {
        console.log("Searching for user with identifier:", userId);
        if (requestingUserRole === 'admin') {
            // Admins can view all users
            const allUsers = await user_model_1.userModel.User.find().exec();
            console.log("Admin request - returning all user data.");
            // Convert each user document to a plain object and cast to User[]
            return allUsers.map(user => user.toObject());
        }
        else {
            // Non-admins can only view their own data
            const user = await user_model_1.userModel.User.findById(userId).exec();
            if (!user) {
                console.warn(`No user found with ID: ${userId}`);
                return null;
            }
            console.log("Non-admin request - returning user data.");
            return user.toObject(); // Convert to plain object
        }
    }
    catch (error) {
        console.error('Error fetching user from DB:', error);
        throw new Error('Database error');
    }
};
exports.userService = {
    userCreateDB,
    userGetDB,
    getingAllUser
};
//# sourceMappingURL=user.service.js.map