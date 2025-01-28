import { useState, useEffect, useContext } from "react";
import RecipeBox from "../components/RecipeBox";
import { AuthContext } from "../context/AuthContext";
import { RecipesContext } from "../context/RecipesContext";
import "./FindRecipesPage.css";
const KEY = process.env.REACT_APP_API_KEY;

export default function FindRecipesPage() {
	const auth = useContext(AuthContext);

	const [ingredients, setIngredients] = useState([]);
	const [ingredientInput, setIngredientInput] = useState("");
	const [ingredientsChanged, setIngredientsChanged] = useState(false);

	const recipeContext = useContext(RecipesContext);

	useEffect(() => {
		setIngredients(auth.ingredientList);
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
		auth.getIngredientList();
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

		setIngredientsChanged(true);
	};

	const deleteIngredient = (index) => {
		setIngredients((oldIngredients) => {
			const oldIngredientsCopy = [...oldIngredients];
			oldIngredientsCopy.splice(index, 1);
			updateList(oldIngredientsCopy);
			return oldIngredientsCopy;
		});
		setIngredientsChanged(true);
	};

	const getRecipes = (count) => {
		const ingredientsList = ingredients.join(",");
		fetch(
			`/api/recipe/findByIngredients?ingredients=${ingredientsList}&count=${count}`,
			{
				method: "GET",
			}
		).then((response) => {
			response.json().then((results) => {
				recipeContext.setRecipeResults(results);
			});
		});
		setIngredientsChanged(false);
	};

	return (
		<div className="find-recipes-page">
			<div className="find-recipes-content">
				<div className="find-recipes-results">
					<h1>Find Recipes</h1>
					<div className="recipes-container">
						{recipeContext.getRecipes().map((recipe, index) => {
							return (
								<RecipeBox
									key={`recipe=${index}`}
									recipe={recipe}
								/>
							);
						})}
						{recipeContext.recipeCount > 0 &&
							recipeContext.recipeCount < 100 &&
							!ingredientsChanged && (
								<div className="find-more-box">
									<button
										onClick={() => {
											const count = Math.min(
												100,
												recipeContext.recipeCount + 10
											);
											getRecipes(count);
										}}
										className="find-more-button"
									>
										Find More
									</button>
								</div>
							)}
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
							onClick={() => {
								getRecipes(10);
							}}
						>
							FIND RECIPES
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
