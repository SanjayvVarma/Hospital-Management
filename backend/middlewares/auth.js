import jwt from "jsonwebtoken";
import catchAsyncErrors from "./catchAsyncErrors.js";
import errorMiddlewares from "./errorMiddleware.js";
import User from "../models/userSchema.js";

const isAdminAuthenticated = catchAsyncErrors(async (req, res, next) => {
    const token = req.cookies.adminToken;

    if (!token) {
        return next(new errorMiddlewares.ErrorHandler("Admin not Authenticated!", 400));
    };

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    req.user = await User.findById(decoded.id);
    if (req.user.role !== "Admin") {
        return next(new errorMiddlewares.ErrorHandler(`${req.user.role} not Authorized for thid resources!`, 403));
    }
    next();
});

const isPatientAuthenticated = catchAsyncErrors(async (req, res, next) => {
    const token = req.cookies.patientToken;

    if (!token) {
        return next(new errorMiddlewares.ErrorHandler("Patient not Authenticated!", 400));
    };

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    req.user = await User.findById(decoded.id);
    if (req.user.role !== "Patient") {
        return next(new errorMiddlewares.ErrorHandler(`${req.user.role} not Authorized for thid resources!`, 403));
    };
    next();
});

const autheAutho = {
    isAdminAuthenticated,
    isPatientAuthenticated,
};

export default autheAutho;