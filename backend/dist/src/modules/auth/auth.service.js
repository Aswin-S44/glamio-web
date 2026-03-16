"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.googleSignInService = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const firebase_1 = __importDefault(require("../../config/firebase"));
const googleSignInService = async (idToken) => {
    if (!idToken) {
        throw new Error("ID token is required");
    }
    const decodedToken = await firebase_1.default.auth().verifyIdToken(idToken);
    const { uid, email, name, picture } = decodedToken;
    if (!email) {
        throw new Error("Email not found in Google token");
    }
    const token = jsonwebtoken_1.default.sign({ uid, email }, process.env.JWT_SECRET || "add", {
        expiresIn: "30d",
    });
    return {
        token,
        user: {
            uid,
            email,
            name,
            picture,
        },
    };
};
exports.googleSignInService = googleSignInService;
