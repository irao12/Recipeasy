const express = require("express");
const router = express.Router();

// Load each controller
const authController = require("./auth.js");
const favoriteController = require("./favorite.js");
const historyController = require("./history.js");
const ingredientListController = require("./ingredientList.js");
const recipeController = require("./recipe.js");

// Mount each controller under a specific route
router.use("/auth", authController);
router.use("/favorite", favoriteController);
router.use("/history", historyController);
router.use("/ingredientlist", ingredientListController);
router.use("/recipe", recipeController);

module.exports = router;
