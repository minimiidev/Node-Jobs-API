
import mongoose from "mongoose";
import bcrypt from "bcryptjs"
import { Environment } from "../config/Environment";
import jwt from "jsonwebtoken"

export const UserSchema = new mongoose.Schema({
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
        match: [/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            , "Please provide a valid email"],
        unique: true
    }
})

UserSchema.pre("save", async function () {
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})

UserSchema.methods.getName = function () {
    return this.name;
}

// UserSchema.methods.createJWT = function () {
//     return jwt.sign({ userId: this._id, name: this.name }, Environment.JWT_SECRET, {
//         expiresIn: Environment.JWT_LIFETIME
//     })
// }

export const userModel = mongoose.model("User", UserSchema);