"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUser = void 0;
const user_service_1 = require("./user.service");
const createUser = async (req, res) => {
    try {
        const result = await (0, user_service_1.createUserService)(req.body);
        res.status(201).json({
            success: true,
            message: "User created successfully",
            token: result.token,
            user: result.user,
        });
    }
    catch (error) {
        res.status(error.message?.includes("exists") ? 409 : 400).json({
            success: false,
            message: error.message || "Something went wrong",
        });
    }
};
exports.createUser = createUser;
