import { useState } from "react";
import RecipeBox from "../components/RecipeBox";
import "./FindRecipesPage.css"
import recipes from "./RecipeMockData";
const results = recipes.results;

export default function FindRecipesPage() {

	const [ingredients, setIngredients] = useState([]);
	const [ingredientInput, setIngredientInput] = useState("");

	const handleInputChange = (event) => {
		setIngredientInput(event.target.value)
	}

	const handleEnterKey = (event)=>{
									if (event.key === 'Enter') {
										addIngredient(ingredientInput)
										setIngredientInput("")
									}
								}
 
	const addIngredient = (ingredient) => {
		if (ingredient.trim() === "") {
			return;
		}

		setIngredients((oldIngredients) => {
			const oldIngredientsCopy = [...oldIngredients];
			oldIngredientsCopy.push(ingredient);
			return oldIngredientsCopy;
		})
	}

	const deleteIngredient = (index) => {
		setIngredients((oldIngredients)=>{
			const oldIngredientsCopy = [...oldIngredients];
			oldIngredientsCopy.splice(index, 1);
			return oldIngredientsCopy;
		})
	}

	console.log(results)
	return (
		<div className="find-recipes-page">
			<div className="find-recipes-content">
				<div className="find-recipes-results">
					<h1>Find Recipes</h1>
					<div className="recipes-container">
						{results.map((recipe)=>{
							return <RecipeBox 
								recipe={recipe}/>
						})
						}
					</div>
        		</div>
				<div className="ingredients-container">
					<div className="ingredients-content">
						<h1>My Ingredients</h1>
						<label htmlFor="add-ingredient-field">Add Ingredient</label>
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
								onClick={()=>{
									addIngredient(ingredientInput)
									setIngredientInput("")
								}}
							>+</button>
						</div>

						<ul className="ingredients-list">
							{ingredients.map((ingredient, index)=>{
								return <li className="ingredient">
											<p onClick={()=>{deleteIngredient(index)}}>- {ingredient}</p>
										</li>
							})}
						</ul>

						<button className="find-recipes-button" type="button">FIND RECIPES</button>
					</div>
				</div>
			</div>
		</div>
	);
}
