import cors from "cors";
import express from "express";
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import errorMiddleware from "./middlewares/error.middleware.js";

const app = express();

config({ path: "./.env" });

app.use(cors({
    origin: [process.env.FRONTEND_CORS_ORIGIN, process.env.DASHBOARD_CORS_ORIGIN],
    credentials: true,
}));

app.use(cookieParser());
app.use(express.static('public'));
app.use(express.json({ limit: '20kb' }));
app.use(express.urlencoded({ extended: true, limit: '20kb' }));

app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: "./public/tempFile",
    limits: { fileSize: 5 * 1024 * 1024 },
}));

app.get("/", (req, res) => {
    return res.status(200).json({
        success: true,
        message: 'HELLO WORLD'
    });
});

// routes

import userRouter from "./routes/user.routes.js";
import messageRouter from './routes/message.routes.js';
import appointmentRouter from "./routes//appointment.routes.js";

app.use("/api/v1/users", userRouter);
app.use("/api/v1/message", messageRouter);
app.use("/api/v1/appointment", appointmentRouter);

app.use((req, res) => {
    return res.status(404).json({
        success: false,
        message: "Route not found"
    });
});

app.use(errorMiddleware)

export default app;