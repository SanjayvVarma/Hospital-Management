import { Router } from "express";
import { verifyJWT, verifyRole } from "../middlewares/auth.middleware.js";
import { addNewAdmin, getAllPatient, addNewDoctor, getAllDoctors, getCurrentUser, logoutUser, registerPatient, userLogin, getDepartmentPatients } from "../controllers/user.controller.js";

const router = Router();

router.post("/login", userLogin);
router.get("/all-doctors", getAllDoctors);
router.post("/logout", verifyJWT, logoutUser);
router.post("/register-patient", registerPatient);
router.get("/current-user", verifyJWT, getCurrentUser);
router.post("/addnew-admin", verifyJWT, verifyRole("Admin"), addNewAdmin);
router.get("/all-patient", verifyJWT, verifyRole("Admin"), getAllPatient);
router.post("/addNew-doctor", verifyJWT, verifyRole("Admin"), addNewDoctor);
router.get("/department-patients", verifyJWT, verifyRole("Doctor"), getDepartmentPatients);

export default router;