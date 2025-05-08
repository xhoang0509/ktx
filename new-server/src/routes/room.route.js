const { Router } = require("express");
const { RoomController } = require("../controller/roomController");
const { authMiddleware } = require("../middleware/userMiddleware");

const router = Router();
const roomController = new RoomController();

router.post("/", roomController.create.bind(roomController));
router.put("/:roomId", roomController.modify.bind(roomController));
router.get("/", roomController.list.bind(roomController));
router.get("/:roomId", roomController.detail.bind(roomController));
router.get("/roommates", authMiddleware, roomController.getRoommates.bind(roomController));
router.get("/room-history", authMiddleware, roomController.getRoomChangeHistory.bind(roomController));

module.exports = router; 