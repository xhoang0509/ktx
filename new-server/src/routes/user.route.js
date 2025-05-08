const { Router } = require("express");
const { UserController } = require("../controller/userController");
const { authMiddleware } = require("../middleware/userMiddleware");

const router = Router();
const userController = new UserController();

router.post("/", userController.create.bind(userController));
router.post("/login", userController.login.bind(userController));
router.put("/modify", authMiddleware, userController.modify.bind(userController));
router.get("/", userController.list.bind(userController));
router.get("/detail", authMiddleware, userController.detail.bind(userController));
router.get("/:id", (req, res) => userController.findById(req, res));
router.delete("/:id", userController.remove.bind(userController));

module.exports = router; 