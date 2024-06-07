import express from "express";
import appointmentControllers from "../controller/appointmentController.js";
import autheAutho from "../middlewares/auth.js";

const router = express.Router();

router.post("/post", autheAutho.isPatientAuthenticated, appointmentControllers.postAppointment);
router.get("/getall", autheAutho.isAdminAuthenticated, appointmentControllers.getAllAppointment);
router.put("/update/:id", autheAutho.isAdminAuthenticated, appointmentControllers.updateAppointmentStatus);
router.delete("/delete/:id", autheAutho.isAdminAuthenticated, appointmentControllers.deleteAppointment);

export default router;