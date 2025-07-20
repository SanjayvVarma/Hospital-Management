import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import ApiError from "../utils/ApiError.js";
import catchAsync from "../utils/catchAsync.js";

const verifyJWT = catchAsync(async (req, res, next) => {
    try {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "")

        if (!token) {
            throw new ApiError(401, "Unauthorized request")
        }

        const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY)
        const user = await User.findById(decodedToken?._id).select("-password")

        if (!user) {
            throw new ApiError(401, "Invalid access token")
        }

        req.user = user
        next()

    } catch (error) {
        throw new ApiError(401, error?.message || 'invalid access token')
    }
});

const verifyRole = (...allowedRoles) => {

    return (req, res, next) => {
        if (!req.user || !allowedRoles.includes(req.user.role)) {
            throw new ApiError(403, `User with role ${req.user.role} not allowed to access this page`)
        }
        next()
    }
};

const generateToken = async (userId) => {

    try {
        const user = await User.findById(userId)
        const accessToken = user.generateJsonWebToken()

        return accessToken;
    } catch (error) {
        throw new ApiError(500, "Something went wrong while generate tokens")
    }
};


export { verifyRole, generateToken, verifyJWT };