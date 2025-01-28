const router = require("express").Router();
const KEY = process.env.SPOONACULAR_API_KEY;

router.get("/id/:recipeId", (req, res) => {
	const recipeId = req.params.recipeId;
	if (!req.user) {
		res.status(401).json({});
	}

	const url = `https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=${KEY}`;
	fetch(url, {
		method: "GET",
	}).then((response) => {
		response.json().then((recipe) => {
			res.json(recipe);
		});
	});
});

router.get("/findByIngredients", (req, res) => {
	if (!req.user) {
		res.status(401).json([]);
		return;
	}

	if (!req.query.ingredients || !req.query.count) {
		res.status(400).json([]);
		return;
	}

	const ingredientsString = req.query.ingredients;
	const count = req.query.count;
	console.log(ingredientsString);
	const apiURL =
		`https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredientsString}&number=${count}&ranking=2&apiKey=${KEY}`.replaceAll(
			" ",
			"_"
		);

	fetch(apiURL, {
		method: "GET",
	}).then((response) => {
		response.json().then((recipes) => {
			res.json(recipes);
		});
	});
});

module.exports = router;
