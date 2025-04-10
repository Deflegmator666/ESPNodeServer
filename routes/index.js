const Routes = require("express");
const router = new Routes();
const eventController = require("../controllers/eventController");
const userController = require("../controllers/userController");
const checkRole = require("../middleware/checkRoleMiddleware");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/data", authMiddleware, eventController.createFn);
router.get("/data", authMiddleware, eventController.getFn);
router.delete("/data", authMiddleware, eventController.deleteFn);
router.post("/users", userController.login);

module.exports = router;
