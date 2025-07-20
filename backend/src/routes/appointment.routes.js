import { Router } from "express";
import { verifyJWT, verifyRole } from "../middlewares/auth.middleware.js";
import { createAppointment, getDoctorAppointments, updateAppointmentStatus, getAllAppointments, deleteAppointment, getPatientAppointments } from "../controllers/appointment.controller.js";

const router = Router();

router.post("/create", verifyJWT, verifyRole("Patient"), createAppointment);
router.get("/doctor-appointment", verifyJWT, verifyRole("Doctor"), getDoctorAppointments);
router.get("/patient-appointment", verifyJWT, verifyRole("Patient"), getPatientAppointments);
router.get("/all-appointment", verifyJWT, verifyRole("Admin"), getAllAppointments);
router.delete("/delete/:appointmentId", verifyJWT, verifyRole("Admin"), deleteAppointment);
router.patch("/update-status/:appointmentId", verifyJWT, verifyRole("Doctor", "Admin"), updateAppointmentStatus);

export default router;