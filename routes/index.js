const Routes = require("express");
const router = new Routes();
const eventController = require("../controllers/eventController");

router.post("/data", eventController.createFn);
router.get("/data", eventController.getFn);
router.delete("/data", eventController.deleteFn);

module.exports = router;
