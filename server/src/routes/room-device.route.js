const { Router } = require("express");
const RoomDeviceController = require("../controller/room-device.controller");

const router = Router();

router.post("/", RoomDeviceController.create);
router.put("/:id", RoomDeviceController.modify);
router.get("/", RoomDeviceController.list);
router.get("/:id", RoomDeviceController.detail);
router.delete("/:id", RoomDeviceController.remove);

module.exports = router; 