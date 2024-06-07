import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";
import errorMiddlewares from "../middlewares/errorMiddleware.js";
import User from "../models/userSchema.js";
import generateToken from "../utils/jwtToken.js";
import cloudinary from "cloudinary";

const patientRegister = catchAsyncErrors(async (req, res, next) => {
    const { firstName, lastName, email, phone, password, gender, dob, nic, role, } = req.body;
    if (!firstName || !lastName || !email || !phone || !password || !gender || !dob || !nic || !role) {
        return next(new errorMiddlewares.ErrorHandler("Please Fill Full form!", 400));
    }

    let user = await User.findOne({ email })

    if (user) {
        return next(new errorMiddlewares.ErrorHandler("user Already Registered", 400));
    }

    user = await User.create({
        firstName, lastName, email, phone, password, gender, dob, nic, role,
    });
    generateToken(user, "User Registerd", 200, res)

})

const login = catchAsyncErrors(async (req, res, next) => {
    const { email, password, confirmPassword, role } = req.body;

    if (!email || !password || !confirmPassword || !role) {
        return next(new errorMiddlewares.ErrorHandler("Please Provide All Details!", 400));
    };

    if (password !== confirmPassword) {
        return next(new errorMiddlewares.ErrorHandler("Password and confirmPassword do not match!", 400));
    };

    const user = await User.findOne({ email }).select("+password")

    if (!user) {
        return next(new errorMiddlewares.ErrorHandler("User not Found", 400));
    }

    const isPasswordMatchesd = await user.comparePassword(password)

    if (!isPasswordMatchesd) {
        return next(new errorMiddlewares.ErrorHandler("Invalid Password Or Email", 400));
    }

    if (role !== user.role) {
        return next(new errorMiddlewares.ErrorHandler("User with this role not Found", 400))
    }
    generateToken(user, "User Loggend in successfully", 200, res)
});


const addNewAdmin = catchAsyncErrors(async (req, res, next) => {
    const { firstName, lastName, email, phone, password, gender, dob, nic, } = req.body;

    if (!firstName || !lastName || !email || !phone || !password || !gender || !dob || !nic) {
        return next(new errorMiddlewares.ErrorHandler("Please Fill Full form!", 400));
    }

    const isRegistered = await User.findOne({ email });

    if (isRegistered) {
        return next(new errorMiddlewares.ErrorHandler(`${isRegistered.role} with this email already exists`, 400));
    }

    const admin = await User.create({ firstName, lastName, email, phone, password, gender, dob, nic, role: "Admin", });

    res.status(200).json({
        success: true,
        message: "New Admin Registered"
    })
});

const getAllDoctors = catchAsyncErrors(async (req, res, next) => {
    const doctors = await User.find({ role: "Doctor" });
    res.status(200).json({
        success: true,
        doctors,
    })
})

const getUserDetails = catchAsyncErrors(async (req, res, next) => {
    const user = req.user;

    res.status(200).json({
        success: true,
        user,
    })
})

const logoutAdmin = catchAsyncErrors(async (req, res, next) => {
    res.status(200).cookie("adminToken", "", {
        httpOnly: true,
        expires: new Date(Date.now())
    }).json({
        success: true,
        message: "Admin log Out Successfully"
    })
})

const logoutPatient = catchAsyncErrors(async (req, res, next) => {
    res.status(200).cookie("patientToken", "", {
        httpOnly: true,
        expires: new Date(Date.now())
    }).json({
        success: true,
        message: "Patient log out Successfully"
    })
})

const addNewDoctor = catchAsyncErrors(async (req, res, next) => {
    if (!req.files || Object.keys(req.files).length === 0) {
        return next(new errorMiddlewares.ErrorHandler("Doctor Avatar Required!", 400));
    }

    const { docAvatar } = req.files;

    const allowedFormats = ["image/png", "image/jpeg", "image/webp"]

    if (!allowedFormats.includes(docAvatar.mimetype)) {
        return next(new errorMiddlewares.ErrorHandler("File Format Not Supported!", 400));
    }

    const { firstName, lastName, email, phone, password, gender, dob, nic, doctorDepartment, } = req.body;

    if (!firstName || !lastName || !email || !phone || !password || !gender || !dob || !nic || !doctorDepartment) {
        return next(new errorMiddlewares.ErrorHandler("Please Provide Full Details!", 400));
    }

    const isRegistered = await User.findOne({ email })

    if (isRegistered) {
        return next(new errorMiddlewares.ErrorHandler(`${isRegistered.role} already registered with this email!`, 400));
    }

    const cloudinaryResponse = await cloudinary.uploader.upload(docAvatar.tempFilePath);

    if (!cloudinaryResponse || cloudinaryResponse.error) {
        console.error("Cloudinary Error:", cloudinaryResponse.error || "Unknown Cloudinary Error")
    }

    const doctor = await User.create({
        firstName,
        lastName,
        email,
        phone,
        password,
        gender,
        dob,
        nic,
        doctorDepartment,
        role: "Doctor",
        docAvatar: {
            public_id: cloudinaryResponse.public_id,
            url: cloudinaryResponse.secure_url
        }
    })

    res.status(200).json({
        success: true,
        message: "New Doctor Registered!",
        doctor,
    })
})

const userControllers = {
    patientRegister, login, addNewAdmin, getAllDoctors, getUserDetails, logoutAdmin, logoutPatient, addNewDoctor
}

export default userControllers