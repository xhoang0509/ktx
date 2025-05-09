const { Router } = require("express");
const { RoomController } = require("../controller/room.controller");
const { authMiddleware } = require("../middleware/userMiddleware");

const router = Router();
const roomController = new RoomController();

router.post("/", roomController.create.bind(roomController));
router.put("/:roomId", roomController.modify.bind(roomController));
router.get("/", roomController.list.bind(roomController));
router.delete("/:roomId", roomController.delete.bind(roomController));
router.get("/:roomId", roomController.detail.bind(roomController));
router.get("/roommates", authMiddleware, roomController.getRoommates.bind(roomController));
router.get("/room-history", authMiddleware, roomController.getRoomChangeHistory.bind(roomController));

module.exports = router; 