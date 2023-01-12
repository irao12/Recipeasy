const express = require("express");
const router = express.Router();

// Load each controller
const authController = require("./auth.js");

// Mount each controller under a specific route
router.use("/auth", authController);

module.exports = router;
