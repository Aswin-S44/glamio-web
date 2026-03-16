"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.googleSignIn = void 0;
const auth_service_1 = require("./auth.service");
const googleSignIn = async (req, res) => {
    try {
        const { idToken, userType } = req.body;
        const result = await (0, auth_service_1.googleSignInService)(idToken);
        // if (result && result.user) {
        //   let userData = {
        //     email: result.user.email ?? "",
        //     username: result.user.name ?? "",
        //     profileImage: result.user.picture ?? DEFAULT_IMAGE_URL,
        //     userType,
        //   };
        //   await createUserService(userData);
        // }
        res.status(200).json({
            success: true,
            data: result,
        });
    }
    catch (error) {
        res.status(401).json({
            success: false,
            message: error.message || "Invalid Google token",
        });
    }
};
exports.googleSignIn = googleSignIn;
