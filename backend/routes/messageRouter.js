import express from "express";
import messageControllers from "../controller/messageController.js";
import autheAutho from "../middlewares/auth.js";

const router = express.Router();

router.post("/send", messageControllers.sendMessage)
router.get("/getall", autheAutho.isAdminAuthenticated, messageControllers.getAllMessage)

export default router