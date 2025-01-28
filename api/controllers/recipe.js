const router = require("express").Router();
const KEY = process.env.SPOONACULAR_API_KEY;

router.get("/", (req, res) => {
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
