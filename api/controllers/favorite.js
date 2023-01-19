const router = require("express").Router();
const { favorite: Favorite } = require("../models");

router.get("/:userID", (req, res) => {
	const { userID } = req.params;
	Favorite.findAll({
		where: { userID: userID },
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
	let { userID, recipeID, imageURL, title } = req.body;
	let data = {
		userID: userID,
		recipeID: recipeID,
		imageURL: imageURL,
		title: title,
	};
	Favorite.create(data)
		.then((newFavorite) => {
			res.status(201).json(newFavorite);
		})
		.catch((err) => {
			res.status(400).json(err);
			console.log(err);
		});
});

router.delete("/:recipeID", (req, res) => {
	const { recipeID } = req.params;
	Favorite.findByPk(recipeID).then((favorite) => {
		if (!favorite) {
			return res.status(404);
		}
		favorite.destroy();
		res.sendStatus(204);
	});
});

module.exports = router;
