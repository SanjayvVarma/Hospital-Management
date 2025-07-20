import User from "../models/user.model.js";
import ApiError from "../utils/apiError.js";
import catchAsync from "../utils/catchAsync.js";
import ApiResponse from "../utils/ApiResponse.js";
import { JWT_COOKIE_OPTIONS } from "../constants.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { generateToken } from "../middlewares/auth.middleware.js";

const registerPatient = catchAsync(async (req, res) => {
    const { firstName, lastName, email, phone, password, gender, dob, uid, address, medicalHistory } = req.body;

    if (!firstName || !lastName || !email || !phone || !password || !gender || !dob || !uid || !address) {
        throw new ApiError(400, "Please fill out the entire form!");
    };

    const existingUser = await User.findOne({
        $or: [{ email }, { phone }, { uid }]
    });

    if (existingUser) {
        throw new ApiError(400, "User Already Registered");
    };

    const user = await User.create({
        firstName,
        lastName,
        email,
        phone,
        password,
        gender,
        dob,
        uid,
        address,
        medicalHistory,
        role: "Patient"
    });

    const createdUser = await User.findById(user._id).select("-password")

    if (!createdUser) {
        throw new ApiError(500, "Something went wrong while creating user")
    }

    return res.status(201).json(
        new ApiResponse(201, createdUser, true, `Patient registered successfully`)
    )

});

const userLogin = catchAsync(async (req, res) => {
    const { email, phone, password, role } = req.body;

    if ((!email && !phone) || !role) {
        throw new ApiError(400, "Email or phone and role are required")
    }

    const user = await User.findOne({
        $or: [{ email }, { phone }]
    }).select("+password");

    if (!user) {
        throw new ApiError(400, "You're not registered with us");
    };

    const isPasswordValid = await user.comparePassword(password);

    if (!isPasswordValid) {
        throw new ApiError(401, 'invalid user credentials')
    };

    if (role !== user.role) {
        throw new ApiError(404, "User with this role not found");
    };

    const accessToken = await generateToken(user._id)

    const loggedInUser = await User.findById(user._id).select("-password")

    const options = JWT_COOKIE_OPTIONS;

    return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .json(
            new ApiResponse(200, loggedInUser, true, "User LoggedIn Successfully")
        )
});

const logoutUser = catchAsync(async (req, res) => {

    return res
        .status(200)
        .clearCookie("accessToken", JWT_COOKIE_OPTIONS)
        .json(
            new ApiResponse(200, null, true, "Logged out successfully. Stay healthy!")
        )
});

const addNewAdmin = catchAsync(async (req, res) => {
    const { firstName, lastName, email, phone, password, gender, dob, uid } = req.body;

    if (!firstName || !lastName || !email || !phone || !password || !gender || !dob || !uid) {
        throw new ApiError(400, "Please Fill Full form!",);
    };

    const isRegistered = await User.findOne({
        $or: [{ email }, { phone }, { uid }]
    });

    if (isRegistered) {
        throw new ApiError(400, `${isRegistered.role} with this email already exists`);
    };

    const admin = await User.create({
        firstName,
        lastName,
        email,
        phone,
        password,
        gender,
        dob,
        uid,
        role: "Admin",
    });

    return res.status(2001).json(
        new ApiResponse(201, admin, true, "New Admin Registered Successfully!")
    )
});

const addNewDoctor = catchAsync(async (req, res) => {

    const { firstName, lastName, email, phone, password, gender, dob, uid, doctorDepartment, } = req.body;

    if (!firstName || !lastName || !email || !phone || !password || !gender || !dob || !uid || !doctorDepartment) {
        throw new ApiError(400, "Please Provide Full Details!");
    };

    const isRegistered = await User.findOne({
        $or: [{ email }, { phone }, { uid }]
    });

    if (isRegistered) {
        throw new ApiError(400, `${isRegistered.role} already registered with this email/phone/uid!`);
    };

    if (!req.files || Object.keys(req.files).length === 0) {
        throw new ApiError(400, "Doctor Avatar Required!");
    };

    const { docAvatar } = req.files;
    const allowedFormats = ["image/png", "image/jpeg", "image/webp", "image/jpg"];

    if (!allowedFormats.includes(docAvatar.mimetype)) {
        throw new ApiError(400, "File Format Not Supported!");
    };

    const avatar = await uploadOnCloudinary(docAvatar.tempFilePath)

    if (!avatar) {
        throw new ApiError(400, "Doctor Avatar Upload Faild")
    };

    const doctor = await User.create({
        firstName,
        lastName,
        email,
        phone,
        password,
        gender,
        dob,
        uid,
        doctorDepartment,
        role: "Doctor",
        docAvatar: avatar.url,
    });

    res.status(200).json(
        new ApiResponse(201, doctor, true, "Doctor registered")
    );
});

const getAllDoctors = catchAsync(async (req, res) => {
    const doctors = await User.find({ role: "Doctor" });

    if (!doctors || doctors.length === 0) {
        throw new ApiError(404, "No doctors registered yet");
    }

    return res.status(200).json(
        new ApiResponse(200, doctors, true, "All doctors fetched")
    );
});

const getCurrentUser = catchAsync(async (req, res) => {
    const userId = req.user._id;

    const user = await User.findById(userId).select("-password");

    if (!user) {
        throw new ApiError(404, "User not found");
    }

    return res.status(200).json(
        new ApiResponse(200, user, true, "User details fetched successfully")
    );
});

const getAllPatient = catchAsync(async (req, res) => {
    const allPatient = await User.find({ role: "Patient" }).select("-password");

    if (!allPatient || allPatient.length === 0) {
        throw new ApiError(404, "No patients found");
    }

    return res.status(200).json(
        new ApiResponse(200, allPatient, true, "All patients fetched successfully")
    );
});

const getDepartmentPatients = catchAsync(async (req, res) => {
    const doctorDept = req.user.doctorDepartment;

    if (!doctorDept) {
        throw new ApiError(400, "Doctor department not found in user data");
    }

    const patients = await User.find({
        role: "Patient",
        doctorDepartment: doctorDept
    }).select("-password");

    if (!patients.length) {
        throw new ApiError(404, `No patients found in ${doctorDept} department`);
    }

    return res.status(200).json(
        new ApiResponse(200, patients, true, `Patients from ${doctorDept} department fetched`)
    );
});


export { registerPatient, userLogin, addNewAdmin, getAllPatient, logoutUser, addNewDoctor, getAllDoctors, getCurrentUser, getDepartmentPatients };