const router = require("express").Router();
const e = require("express");
const { favorite: Favorite } = require("../models");

router.get("/", (req, res) => {
	const { recipeID } = req.query;
	Favorite.findOne({ where: { userID: req.user.id, recipeID: recipeID } })
		.then((favorite) => {
			if (favorite) {
				res.status(200).json({ isFavorite: true });
			} else {
				res.status(200).json({ isFavorite: false });
			}
		})
		.catch((err) => {
			console.log(err);
			res.status(400).json(err);
		});
});

router.get("/all", (req, res) => {
	Favorite.findAll({
		where: { userID: req.user.id },
		order: [["updatedAt", "DESC"]],
	})
		.then((allFavorites) => {
			res.json(allFavorites);
		})
		.catch((err) => {
			res.status(400).json({
				message: "Could not find the favorites of the user",
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
	console.log(userID, recipeID);

	Favorite.findOne({ where: { userID: userID, recipeID: recipeID } })
		.then((favorite) => {
			if (favorite) {
				res.status(404).json({ error: "Failed to favorite" });
			} else {
				Favorite.create(data)
					.then((newFavorite) => {
						res.status(201).json(newFavorite);
					})
					.catch((err) => {
						res.status(400).json(err);
						console.log(err);
					});
			}
		})
		.catch((err) => {
			console.log(err);
		});
});

router.delete("/", (req, res) => {
	const { recipeID, userID } = req.body;
	Favorite.findOne({ where: { recipeID: recipeID, userID: userID } }).then(
		(favorite) => {
			if (!favorite) {
				return res.status(404);
			}
			favorite.destroy();
			res.sendStatus(204);
		}
	);
});

module.exports = router;
