import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";
import errorMiddlewares from "../middlewares/errorMiddleware.js";
import Message from "../models/messageSchema.js";

const sendMessage = catchAsyncErrors(async (req, res, next) => {
    const { firstName, lastName, email, phone, message } = req.body;
    if (!firstName || !lastName || !email || !phone || !message) {
        return next(new errorMiddlewares.ErrorHandler("Please Fill Full form!", 400));
    };
    await Message.create({ firstName, lastName, email, phone, message });
    res.status(200).json({
        success: true,
        message: "message send successfully!",
    });
});

const getAllMessage = catchAsyncErrors(async (req, res, next) => {
    const message = await Message.find();
    res.status(200).json({
        success: true,
        message,
    });
});

const deleteMessage = catchAsyncErrors(async (req, res, next) => {
    const { id } = req.params;
    let deleteMessage = await Message.findById(id);
    if (!deleteMessage) {
        return next(new errorMiddlewares.ErrorHandler("Message Not Found", 404));
    };
    await deleteMessage.deleteOne();
    res.status(200).json({
        success: true,
        message: "Message Deleted",
        deleteMessage,
    });
});

const messageControllers = {
    sendMessage, getAllMessage, deleteMessage 
};

export default messageControllers;