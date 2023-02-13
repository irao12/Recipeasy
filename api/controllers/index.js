const express = require("express");
const router = express.Router();

// Load each controller
const authController = require("./auth.js");
const favoriteController = require("./favorite.js");
const historyController = require("./history.js");

// Mount each controller under a specific route
router.use("/auth", authController);
router.use("/favorite", favoriteController);
router.use("/history", historyController);

module.exports = router;
