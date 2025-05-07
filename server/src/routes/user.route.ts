import { Router } from "express";
import { UserController } from "../controller/userController";
import { authMiddleware } from "../middleware/userMiddleware";

const router = Router();
const userController = new UserController();

router.post("/", userController.create.bind(userController));
router.post("/login", userController.login.bind(userController));
router.put("/modify", authMiddleware, userController.modify.bind(userController));
router.get("/", userController.list.bind(userController));
router.get("/detail", authMiddleware, userController.detail.bind(userController));
router.delete("/:id", userController.remove.bind(userController));

export default router;