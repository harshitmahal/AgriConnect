const express = require("express");
const router = express.Router();
const controller = require("../controllers/seasonalController");

// ROUTES using controller functions
router.get("/", controller.getAllSeasonal);
router.get("/month/:month", controller.getByMonth);
router.get("/season/:name", controller.getBySeason);
router.post("/", controller.createSeasonal);

module.exports = router;
