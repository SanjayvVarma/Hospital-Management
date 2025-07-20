import { Router } from "express";
import { verifyJWT, verifyRole } from "../middlewares/auth.middleware.js";
import { sendMessage, getAllMessage, deleteMessage } from "../controllers/message.controller.js";

const router = Router();

router.post("/send", sendMessage);
router.get("/getall", verifyJWT, verifyRole("Admin"), getAllMessage);
router.delete("/delete/:id", verifyJWT, verifyRole("Admin"), deleteMessage);

export default router;