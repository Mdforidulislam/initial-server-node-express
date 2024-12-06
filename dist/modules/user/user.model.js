"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userModel = void 0;
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    user_name: { type: String, required: true, trim: true, minlength: 2 },
    user_Id: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    user_role: { type: String, enum: ["user", "admin"], default: "user" },
    user_email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function (value) {
                return /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(value);
            },
            message: "Invalid email format"
        }
    },
    user_PhoneNumber: {
        type: String,
        required: true
    },
    user_Skype_Profile_url: {
        type: String,
        required: true
    },
    user_Facebook_Profile_url: {
        type: String,
        required: true
    },
    user_Balance: {
        type: Number,
        default: 0
    },
    user_Subscription: {
        type: Boolean,
        default: false
    },
    user_Image: {
        type: String,
        default: null
    },
    user_password: {
        type: String,
        required: true
    },
}, { timestamps: true });
// Create the User model
const User = (0, mongoose_1.model)("User", userSchema);
// Export the User model
exports.userModel = {
    User
};
//# sourceMappingURL=user.model.js.map