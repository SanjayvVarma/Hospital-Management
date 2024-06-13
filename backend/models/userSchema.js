import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        require: true,
        minLength: [3, "First Name Must Contain At Least 3 Characters !"]
    },
    lastName: {
        type: String,
        require: true,
        minLength: [3, "Last Name Must Contain At Least 3 Characters !"]
    },
    email: {
        type: String,
        require: true,
        validate: [validator.isEmail, "Provide A Valid Email!"],
    },
    phone: {
        type: String,
        require: true,
        minLength: [10, "Phone Number Must Contain Exact 10 Digits"],
        maxLength: [11, "Phone Number Must Contain Exact 11 Digits"]
    },
    nic: {
        type: String,
        require: true,
        minLength: [13, "NIC Must Contain Exact 13 Digits"],
        maxLength: [13, "NIC Must Contain Exact 13 Digits"]
    },
    dob: {
        type: Date,
        require: [true, "DOB is required"],
    },
    gender: {
        type: String,
        required: true,
        enum: ["Male", "Female"],
    },

    password: {
        type: String,
        required: true,
        minLength: [8, "Password Must Contain At least 8 Characters"],
        select: false,
    },
    role: {
        type: String,
        required: true,
        enum: ["Admin", "Patient", "Doctor"],
    },
    doctorDepartment: {
        type: String,
    },
    docAvatar: {
        public_id: String,
        url: String,
    }
});

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next()
    }
    this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.methods.generateJsonWebToken = function () {
    return jwt.sign({ id: this._id },
        process.env.JWT_SECRET_KEY,
        { expiresIn: process.env.JWT_EXPIRES })
};

const User = mongoose.model("User", userSchema);

export default User;