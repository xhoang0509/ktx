import { Router } from "express";
import { AdminCtroller } from "../controller/adminController"

const router = Router();
const adminController = new AdminCtroller();

router.post("/", adminController.create.bind(adminController));
router.post("/login", adminController.login.bind(adminController));

export default router;