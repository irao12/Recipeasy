const router = require("express").Router();
const e = require("express");
const { history: History, user: User } = require("../models");

router.get("/", (req, res) => {
	History.findAll({
		where: { userID: req.user.id },
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
	let { recipeID, imageURL, title, ingredients } = req.body;
	let data = {
		userID: req.user.id,
		recipeID: recipeID,
		imageURL: imageURL,
		title: title,
		ingredients: ingredients,
	};

	let expGained;

	History.findOne({
		where: { userID: req.user.id, recipeID: recipeID },
	}).then((pastCompletion) => {
		if (pastCompletion == null) {
			expGained = 20;
		} else {
			expGained = 10;
		}
	});

	History.create(data)
		.then((newHistory) => {
			User.findOne({ where: { id: req.user.id } }).then((user) => {
				user.experience += expGained;
				user.save();
			});
			res.json({ expGained: expGained }).status(201);
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
