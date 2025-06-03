const { Router } = require("express");
const RoomController = require("../controller/room.controller");
const { authMiddleware } = require("../middleware/userMiddleware");

const router = Router();

router.post("/", RoomController.create);
router.put("/:roomId", RoomController.modify);
router.get('/list-room-in-contract', RoomController.listRoomInContract);
router.get("/", RoomController.list);
router.delete("/:roomId", RoomController.delete);
router.get("/:roomId", RoomController.detail);

module.exports = router; 