"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const Environment_1 = require("../config/Environment");
const http_status_codes_1 = require("http-status-codes");
const User_1 = require("../models/User");
const bad_request_1 = require("../errors/bad-request");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const errors_1 = require("../errors");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
class AuthController {
    static register = async (req, res) => {
        const { name, password, email } = req.body;
        if (!name || !password || !email) {
            throw new bad_request_1.BadRequestError("Fields name, password or email missing");
        }
        const user = await User_1.userModel.create({ name, email, password });
        const token = jsonwebtoken_1.default.sign({ userId: user._id, name: user.name }, Environment_1.Environment.JWT_SECRET, {
            expiresIn: Environment_1.Environment.JWT_LIFETIME
        });
        res.status(http_status_codes_1.StatusCodes.CREATED).json({ user: { name: user.name }, token });
    };
    static login = async (req, res) => {
        const { email, password } = req.body;
        if (!email || !password) {
            throw new bad_request_1.BadRequestError("Fields email or password missing");
        }
        const user = await User_1.userModel.findOne({ email });
        if (!user) {
            throw new errors_1.UnauthenticatedError("Invalid Credentials");
        }
        const token = jsonwebtoken_1.default.sign({ userId: user._id, name: user.name }, Environment_1.Environment.JWT_SECRET, {
            expiresIn: Environment_1.Environment.JWT_LIFETIME
        });
        const comparePassword = await bcryptjs_1.default.compare(password, user.password);
        if (!comparePassword) {
            throw new errors_1.UnauthenticatedError("Invalid Credentials");
        }
        res.status(http_status_codes_1.StatusCodes.CREATED).json({ user: { name: user.name }, token });
    };
}
exports.AuthController = AuthController;
//# sourceMappingURL=auth.js.map