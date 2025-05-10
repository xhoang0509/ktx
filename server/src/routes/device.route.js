const { Router } = require("express");
const { DeviceController } = require("../controller/device.controller");

const router = Router();
const deviceController = new DeviceController();

router.post("/", deviceController.create.bind(deviceController));
router.put("/:deviceId", deviceController.modify.bind(deviceController));
router.get("/", deviceController.list.bind(deviceController));
router.get("/:deviceId", deviceController.detail.bind(deviceController));
router.delete("/:deviceId", deviceController.remove.bind(deviceController));

module.exports = router; 