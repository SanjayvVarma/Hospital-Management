import mongoose from "mongoose";
import validator from "validator";
import { DOCTOR_DEPARTMENT } from "../constants.js";

const appointmentSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true,
            minlength: [3, "First Name must contain at least 3 characters"],
        },

        lastName: {
            type: String,
            minlength: [3, "Last Name must contain at least 3 characters"],
        },

        email: {
            type: String,
            required: true,
            validate: [validator.isEmail, "Provide a valid email"],
        },

        phone: {
            type: String,
            required: true,
            validate: {
                validator: (v) => /^\d{10,11}$/.test(v),
                message: "Phone Number must contain 10 or 11 digits",
            },
        },

        uid: {
            type: String,
            required: true,
            validate: {
                validator: (v) => /^\d{12}$/.test(v),
                message: "UID must contain exactly 12 digits",
            },
        },

        dob: {
            type: String,
            required: [true, "DOB is required"],
        },

        gender: {
            type: String,
            required: true,
            enum: ["Male", "Female", "Transgender"],
        },

        appointmentDate: {
            type: String,
            required: true,
        },

        department: {
            type: String,
            enum: DOCTOR_DEPARTMENT,
            required: true,
        },

        doctor: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        patient: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        hasVisited: {
            type: Boolean,
            default: false,
        },

        address: {
            type: String,
            required: true,
            minlength: [10, "Address must contain at least 10 characters"],
        },

        status: {
            type: String,
            enum: ["Pending", "Accepted", "Rejected"],
            default: "Pending",
        },

        rejectionReason: {
            type: String,
            minlength: [10, "Rejection reason must be at least 10 characters"],
            maxlength: [300, "Rejection reason should not exceed 300 characters"]
        }

    },
    {
        timestamps: true,
    }
);

const Appointment = mongoose.model("Appointment", appointmentSchema);

export default Appointment;
