const { Router } = require("express");
const DeviceController = require("../controller/device.controller");

const router = Router();

// path: /device
router.post("/", DeviceController.create);
router.put("/:deviceId", DeviceController.modify);
router.get("/", DeviceController.list);
router.get("/:deviceId", DeviceController.detail);
router.delete("/:deviceId", DeviceController.remove);

module.exports = router; 