import express from "express";
import userControllers from "../controller/userController.js"
import autheAutho from "../middlewares/auth.js";

const router = express.Router();

router.post("/patient/register", userControllers.patientRegister);
router.post("/login", userControllers.login);
router.post("/admin/addnew", autheAutho.isAdminAuthenticated, userControllers.addNewAdmin);
router.get("/doctors", userControllers.getAllDoctors);
router.get("/admin/me", autheAutho.isAdminAuthenticated, userControllers.getUserDetails);
router.get("/patient/me", autheAutho.isPatientAuthenticated, userControllers.getUserDetails);
router.get("/admin/logout", autheAutho.isAdminAuthenticated, userControllers.logoutAdmin);
router.get("/patient/logout", autheAutho.isPatientAuthenticated, userControllers.logoutPatient);
router.post("/doctor/addNew", autheAutho.isAdminAuthenticated, userControllers.addNewDoctor);

export default router;