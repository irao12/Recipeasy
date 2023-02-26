import React, { useState, useEffect, createContext } from "react";

const RecipesContext = createContext();
const { Provider } = RecipesContext;

const RecipesProvider = ({ children }) => {
	const [recipes, setRecipes] = useState([]);

	const getRecipes = () => {
		return recipes;
	};

	const setRecipeResults = (recipes) => {
		setRecipes(recipes);
	};

	return (
		<Provider
			value={{
				getRecipes,
				setRecipeResults,
				recipeCount: recipes.length,
			}}
		>
			{children}
		</Provider>
	);
};

export { RecipesContext, RecipesProvider };
