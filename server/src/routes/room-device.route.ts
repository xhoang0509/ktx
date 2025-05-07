import { Router } from "express";
import { RoomDeviceController } from "../controller/room-deviceController";

const router = Router();
const rdController = new RoomDeviceController();

router.post("/", rdController.create.bind(rdController));
router.put("/:id", rdController.modify.bind(rdController));
router.get("/", rdController.list.bind(rdController));
router.get("/:id", rdController.detail.bind(rdController));
router.delete("/:id", rdController.remove.bind(rdController))

export default router;