import mongoose from "mongoose";
import validator from "validator";

const messageSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            require: true,
            minLength: [3, "First Name Must Contain At Least 3 Characters !"]
        },

        lastName: {
            type: String,
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
            minLength: [10, "Phone Number Must Contain Exact 11 Digits"],
            maxLength: [11, "Phone Number Must Contain Exact 11 Digits"]
        },

        message: {
            type: String,
            require: true,
            minLength: [10, "Message Must Contain At least 10 characters"],

        },

    },
    {
        timestamps: true
    }
);

const Message = mongoose.model("Message", messageSchema);

export default Message;