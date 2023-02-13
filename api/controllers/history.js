const router = require("express").Router();
const e = require("express");
const { history: History } = require("../models");

router.get("/:userID", (req, res) => {
	const { userID } = req.params;
	History.findAll({
		where: { userID: userID },
		order: [["updatedAt", "DESC"]],
	})
		.then((allHistory) => {
			res.json(allHistory);
		})
		.catch((err) => {
			res.status(400).json({
				message: "Could not find the history of the user",
			});
		});
});

router.post("/", (req, res) => {
	let { userID, recipeID, imageURL, title, ingredients } = req.body;
	let data = {
		userID: userID,
		recipeID: recipeID,
		imageURL: imageURL,
		title: title,
		ingredients: ingredients,
	};

	History.create(data)
		.then((newHistory) => {
			res.status(201).json(newHistory);
		})
		.catch((err) => {
			res.status(400).json(err);
			console.log(err);
		});
});

router.delete("/", (req, res) => {
	const { historyID } = req.body;
	History.findOne({ where: { id: historyID } }).then((history) => {
		if (!history) {
			return res.status(404);
		}
		history.destroy();
		res.sendStatus(204);
	});
});

module.exports = router;
