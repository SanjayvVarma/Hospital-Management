import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";
import errorMiddlewares from "../middlewares/errorMiddleware.js";
import User from "../models/userSchema.js";
import Appointment from "../models/appointmentSchema.js";


const postAppointment = catchAsyncErrors(async (req, res, next) => {
    const { firstName, lastName, email, phone, nic, dob, gender, appointment_date, department, doctor_firstName, doctor_lastName, hasVisited, address, } = req.body;

    if (!firstName || !lastName || !email || !phone || !nic || !dob || !gender || !appointment_date || !department || !doctor_firstName || !doctor_lastName || !address) {
        return next(new errorMiddlewares.ErrorHandler("Please Fill Full Form!", 400));
    }

    const isConflict = await User.find({
        firstName: doctor_firstName,
        lastName: doctor_lastName,
        role: "Doctor",
        doctorDepartment: department,
    });

    if (isConflict.length === 0) {
        return next(new errorMiddlewares.ErrorHandler("Doctor Not Found!", 404));
    }

    if (isConflict.length > 1) {
        return next(new errorMiddlewares.ErrorHandler("Doctors Conflict! Please Contact Through Email or Phone", 400));
    }
    const doctorId = isConflict[0]._id;
    const patientId = req.user._id;

    const appointment = await Appointment.create({
        firstName, lastName, email, phone, nic, dob, gender, appointment_date, department,
        doctor: {
            firstName: doctor_firstName,
            lastName: doctor_lastName
        },
        hasVisited, address, doctorId, patientId,
    });

    res.status(200).json({
        success: true,
        message: "Appointment Sent Successfully",
        appointment
    })

});

const getAllAppointment = catchAsyncErrors(async (req, res, next) => {
    const appointments = await Appointment.find();
    res.status(200).json({
        success: true,
        appointments
    })
})

const updateAppointmentStatus = catchAsyncErrors(async (req, res, next) => {
    const { id } = req.params;
    let appointment = await Appointment.findById(id);
    if (!appointment) {
        return next(new errorMiddlewares.ErrorHandler("Appointment Not Found", 404));
    }
    appointment = await Appointment.findByIdAndUpdate(id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })

    res.status(200).json({
        success: true,
        message: "Appointment Status Updated",
        appointment,
    })

})

const deleteAppointment = catchAsyncErrors(async (req, res, next) => {
    const { id } = req.params;
    let appointment = await Appointment.findById(id);
    if (!appointment) {
        return next(new errorMiddlewares.ErrorHandler("Appointment Not Found", 404));
    }

    await appointment.deleteOne();
    res.status(200).json({
        success: true,
        message: " Appointment Deleted",
        appointment
    })
})

const appointmentControllers = {
    postAppointment, getAllAppointment, updateAppointmentStatus, deleteAppointment
}

export default appointmentControllers;