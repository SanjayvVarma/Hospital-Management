import ApiError from "../utils/ApiError.js";
import catchAsync from "../utils/catchAsync.js";
import Message from "../models/message.model.js";
import ApiResponse from "../utils/ApiResponse.js";

const sendMessage = catchAsync(async (req, res) => {
    const { firstName, lastName, email, phone, message } = req.body;

    if (!firstName || !lastName || !email || !phone || !message) {
        throw new ApiError(400, "Please fill out the entire form");
    }

    const createdMessage = await Message.create({
        firstName,
        lastName,
        email,
        phone,
        message,
    });

    if (!createdMessage) {
        throw new ApiError(500, "Failed to send message");
    }

    return res.status(200).json(
        new ApiResponse(200, createdMessage, true, "Message sent successfully. We will connect with you soon.")
    );
});

const getAllMessage = catchAsync(async (req, res) => {
    const messages = await Message.find();

    if (messages.length === 0) {
        throw new ApiError(404, "No messages found");
    }

    return res.status(200).json(
        new ApiResponse(200, messages, true, "All messages fetched successfully")
    );
});

const deleteMessage = catchAsync(async (req, res) => {
    const { id } = req.params;

    const deletedMessage = await Message.findByIdAndDelete(id);

    if (!deletedMessage) {
        throw new ApiError(404, "Message not found or already deleted");
    }

    return res.status(200).json(
        new ApiResponse(200, null, true, "Message deleted successfully")
    );
});

export { sendMessage, getAllMessage, deleteMessage };