import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import validator from "validator";
import { DOCTOR_DEPARTMENT } from "../constants.js";

const userSchema = new mongoose.Schema({

    firstName: {
        type: String,
        required: true,
        minlength: [3, "First Name must contain at least 3 characters"]
    },

    lastName: {
        type: String,
        required: true,
        minlength: [3, "Last Name must contain at least 3 characters"]
    },

    email: {
        type: String,
        required: true,
        validate: [validator.isEmail, "Provide a valid email"]
    },

    phone: {
        type: String,
        required: true,
        validate: {
            validator: (v) => /^\d{10,11}$/.test(v),
            message: "Phone Number must be 10 or 11 digits"
        }
    },

    uid: {
        type: String,
        required: true,
        validate: {
            validator: (v) => /^\d{12}$/.test(v),
            message: "UID must contain exactly 12 digits"
        }
    },

    address: {
        type: String,
        minlength: [10, "Address must be at least 10 characters"]
    },

    dob: {
        type: String,
        required: [true, "DOB is required"],
    },

    gender: {
        type: String,
        required: true,
        enum: ["Male", "Female", "Transgender"]
    },

    password: {
        type: String,
        required: true,
        minlength: [6, "Password must be at least 6 characters long"],
        select: false,
        trim: true,
        match: [/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/, "Must include A-Z, a-z, 0-9 & special char"]
    },

    role: {
        type: String,
        required: true,
        enum: ["Admin", "Patient", "Doctor"],
    },

    doctorDepartment: {
        type: String,
        enum: DOCTOR_DEPARTMENT,
    },

    docAvatar: {
        type: String,
    },
});

userSchema.pre("save", async function (next) {
    if (!this.isModified('password')) return next()
    this.password = await bcrypt.hash(this.password, 10);
    next()
});

userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.methods.generateJsonWebToken = function () {
    return jwt.sign(
        {
            _id: this._id,
            email: this.email
        },
        process.env.JWT_SECRET_KEY,
        {
            expiresIn: process.env.JWT_EXPIRES
        }
    )
};

const User = mongoose.model("User", userSchema);

export default User;