"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const errors_1 = require("../errors");
const Environment_1 = require("../config/Environment");
const AuthMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader?.startsWith("Bearer")) {
        throw new errors_1.BadRequestError("No token provided");
    }
    const token = authHeader.split(" ").at(-1);
    if (!token) {
        throw new errors_1.BadRequestError("No token provided");
    }
    try {
        const payload = jsonwebtoken_1.default.verify(token, Environment_1.Environment.JWT_SECRET);
        // const user = userModel.findById(payload.userId).select("-password") as any;
        // req.user = user
        req.user = {
            userId: payload?.userId,
            name: payload?.name,
        };
        next();
    }
    catch (error) {
        throw new errors_1.UnauthenticatedError("Not authorized");
    }
};
exports.AuthMiddleware = AuthMiddleware;
//# sourceMappingURL=authentication.js.map