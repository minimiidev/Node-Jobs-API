"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userModel = exports.UserSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
exports.UserSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: [true, "Please provide a name"],
        minlength: 3,
        maxlength: 50,
    },
    password: {
        type: String,
        required: [true, "Please provide a password"],
        minlength: 6,
    },
    email: {
        type: String,
        required: [true, "Please provide a email"],
        match: [/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            "Please provide a valid email"],
        unique: true
    }
});
exports.UserSchema.pre("save", async function () {
    const salt = await bcryptjs_1.default.genSalt(10);
    this.password = await bcryptjs_1.default.hash(this.password, salt);
});
exports.UserSchema.methods.getName = function () {
    return this.name;
};
// UserSchema.methods.createJWT = function () {
//     return jwt.sign({ userId: this._id, name: this.name }, Environment.JWT_SECRET, {
//         expiresIn: Environment.JWT_LIFETIME
//     })
// }
exports.userModel = mongoose_1.default.model("User", exports.UserSchema);
//# sourceMappingURL=User.js.map