import ApiError from "../utils/ApiError.js";
import catchAsync from "../utils/catchAsync.js";
import ApiResponse from "../utils/ApiResponse.js";
import Appointment from "../models/appointment.model.js";

const createAppointment = catchAsync(async (req, res) => {

    const { firstName, lastName, email, phone, uid, dob, gender, appointmentDate, department, doctor, address } = req.body;

    if (!firstName || !email || !phone || !uid || !dob || !gender || !appointmentDate || !department || !doctor || !address) {
        throw new ApiError(400, "Please fill all fields");
    }

    const newAppointment = await Appointment.create({
        firstName,
        lastName,
        email,
        phone,
        uid,
        dob,
        gender,
        appointmentDate,
        department,
        doctor,
        address,
        patient: req.user._id,
    });

    res.status(201).json(
        new ApiResponse(201, newAppointment, true, "Appointment created successfully")
    );
});

const getDoctorAppointments = catchAsync(async (req, res) => {
    const userId = req.user._id;

    const appointments = await Appointment.find({
        doctor: userId
    }).populate("patient", "firstName email phone")

    if (appointments.length === 0) {
        throw new ApiError(404, "No Appointment found");
    }

    return res.status(200).json(
        new ApiResponse(200, appointments, true, "Appointments fetched successfully")
    )
});

const getPatientAppointments = catchAsync(async (req, res) => {
    const patientId = req.user._id;

    const appointments = await Appointment.find({ patient: patientId })
        .populate("doctor", "firstName doctorDepartment")
        .sort({ appointmentDate: -1 });

    if (!appointments.length) {
        throw new ApiError(404, "No appointments found");
    }

    res.status(200).json(
        new ApiResponse(200, appointments, true, "Your appointments fetched")
    );
});

const getAllAppointments = catchAsync(async (req, res) => {
    const appointments = await Appointment.find();

    if (!appointments || appointments.length === 0) {
        throw new ApiError(404, "No appointments found");
    }

    return res.status(200).json(
        new ApiResponse(200, appointments, true, "All appointments fetched successfully")
    );
});

const updateAppointmentStatus = catchAsync(async (req, res) => {
    const { appointmentId } = req.params;
    const { status, rejectionReason } = req.body;
    const user = req.user;

    if (!["Accepted", "Rejected", "Completed"].includes(status)) {
        throw new ApiError(400, "Invalid status value");
    }

    if (status === "Rejected" && !rejectionReason) {
        throw new ApiError(400, "Rejection reason is required");
    }

    const updateFields = { status }

    if (status === "Rejected") {
        updateFields.rejectionReason = rejectionReason;
    }

    let appointment;

    if (user.role === "Doctor") {

        appointment = await Appointment.findOneAndUpdate(
            { _id: appointmentId, doctor: user._id },
            updateFields,
            { new: true }
        );

    } else if (user.role === "Admin") {

        appointment = await Appointment.findByIdAndUpdate(
            appointmentId,
            updateFields,
            { new: true }
        );

    } else {
        throw new ApiError(403, "You are not authorized to update appointments");
    }

    if (!appointment) {
        throw new ApiError(404, "Appointment not found or unauthorized");
    }

    res.status(200).json(
        new ApiResponse(200, appointment, true, `Appointment status updated to ${status}`)
    );
});

const deleteAppointment = catchAsync(async (req, res) => {
    const { appointmentId } = req.params;

    const appointment = await Appointment.findByIdAndDelete(appointmentId);

    if (!appointment) {
        throw new ApiError(404, "Appointment not found or already deleted");
    }

    return res.status(200).json(
        new ApiResponse(200, null, true, "Appointment deleted successfully")
    );
});

export { createAppointment, getDoctorAppointments, getPatientAppointments, updateAppointmentStatus, getAllAppointments, deleteAppointment };