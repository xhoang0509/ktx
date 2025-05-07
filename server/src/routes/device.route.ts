import { Router } from "express";
import { DeviceController } from "../controller/deviceController";

const router = Router();
const deviceController = new DeviceController();

router.post("/", deviceController.create.bind(deviceController));
router.put("/:deviceId", deviceController.modify.bind(deviceController));
router.get("/", deviceController.list.bind(deviceController));
router.get("/:deviceId", deviceController.detail.bind(deviceController));
router.delete("/:deviceId", deviceController.remove.bind(deviceController));

export default router;