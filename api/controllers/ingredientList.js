const router = require("express").Router();
const e = require("express");
const { ingredientList: IngredientList } = require("../models");

router.get("/", (req, res) => {
	IngredientList.findOne({
		where: { userId: req.user.id },
	})
		.then((list) => {
			res.json(list);
		})
		.catch((err) => {
			res.status(400).json({
				message: "Could not find the ingredients of the user",
			});
		});
});

router.put("/", (req, res) => {
	let { ingredients } = req.body;
	IngredientList.findOne({ where: { userId: req.user.id } }).then((list) => {
		list.ingredients = ingredients;
		list.save();
	});
});

module.exports = router;
