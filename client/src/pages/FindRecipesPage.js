import { useState, useEffect } from "react";
import RecipeBox from "../components/RecipeBox";
import "./FindRecipesPage.css";
const KEY = process.env.REACT_APP_API_KEY;

export default function FindRecipesPage() {
	const [ingredients, setIngredients] = useState([]);
	const [recipes, setRecipes] = useState([]);
	const [ingredientInput, setIngredientInput] = useState("");

	useEffect(() => {
		fetch("/api/ingredientlist")
			.then((response) => {
				response.json().then((list) => {
					setIngredients(list.ingredients);
				});
			})
			.catch((err) => {
				console.log(err.message);
			});
	}, []);

	const updateList = (newIngredients) => {
		fetch("/api/ingredientlist", {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				ingredients: newIngredients,
			}),
		});
	};

	const handleInputChange = (event) => {
		setIngredientInput(event.target.value);
	};

	const handleEnterKey = (event) => {
		if (event.key === "Enter") {
			addIngredient(ingredientInput);
			setIngredientInput("");
		}
	};

	const addIngredient = (ingredient) => {
		if (ingredient.trim() === "") {
			return;
		}

		if (ingredients.indexOf(ingredient.trim().toLowerCase()) !== -1) {
			return;
		}

		setIngredients((oldIngredients) => {
			const oldIngredientsCopy = [...oldIngredients];
			oldIngredientsCopy.push(ingredient.toLowerCase());
			updateList(oldIngredientsCopy);
			return oldIngredientsCopy;
		});
	};

	const deleteIngredient = (index) => {
		setIngredients((oldIngredients) => {
			const oldIngredientsCopy = [...oldIngredients];
			oldIngredientsCopy.splice(index, 1);
			updateList(oldIngredientsCopy);
			return oldIngredientsCopy;
		});
	};

	const getRecipes = () => {
		const ingredientsList = ingredients.join(",");
		const apiURL =
			`https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredientsList}&ranking=2&apiKey=${KEY}`.replaceAll(
				" ",
				"_"
			);

		fetch(apiURL, {
			method: "GET",
		}).then((response) => {
			response.json().then((results) => {
				setRecipes(results);
				console.log(results);
			});
		});
	};

	return (
		<div className="find-recipes-page">
			<div className="find-recipes-content">
				<div className="find-recipes-results">
					<h1>Find Recipes</h1>
					<div className="recipes-container">
						{recipes.map((recipe, index) => {
							return (
								<RecipeBox key={recipe.index} recipe={recipe} />
							);
						})}
					</div>
				</div>
				<div className="ingredients-container">
					<div className="ingredients-content">
						<h1>My Ingredients</h1>
						<label htmlFor="add-ingredient-field">
							Add Ingredient
						</label>
						<div className="add-ingredient-section">
							<input
								id="add-ingredient-field"
								type="text"
								value={ingredientInput}
								onChange={handleInputChange}
								onKeyDown={handleEnterKey}
							></input>
							<button
								className="add-ingredient-button"
								onClick={() => {
									addIngredient(ingredientInput);
									setIngredientInput("");
								}}
							>
								+
							</button>
						</div>

						<ul className="ingredients-list">
							{ingredients.map((ingredient, index) => {
								return (
									<li key={index} className="ingredient">
										<p
											onClick={() => {
												deleteIngredient(index);
											}}
										>
											- {ingredient}
										</p>
									</li>
								);
							})}
						</ul>

						<button
							className="find-recipes-button"
							type="button"
							onClick={getRecipes}
						>
							FIND RECIPES
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
