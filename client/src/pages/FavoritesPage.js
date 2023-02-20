import React, { useContext, useEffect, useMemo, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import RecipeBox from "../components/RecipeBox";
import "./FavoritesPage.css";

export default function FavoritesPage() {
  const auth = useContext(AuthContext);
  const [favorites, setFavorites] = useState([]);
  const [sortBy, setSortBy] = useState("Newest");
  const [ingredients, setIngredients] = useState([]);
  const [ingredientInput, setIngredientInput] = useState("");

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
    if (!ingredient) {
      return;
    }
    if (ingredients.includes(ingredient)) {
      console.log(`${ingredient} is already in the list`);
      return;
    }
    const newIngredients = [...ingredients, ingredient];
    setIngredients(newIngredients);
  };

  const deleteIngredient = (index) => {
    if (index === -1) {
      setIngredients([]);
    } else {
      const newIngredients = [...ingredients];
      newIngredients.splice(index, 1);
      setIngredients(newIngredients);
    }
  };

  const mapFavoriteToRecipe = (favorite) => ({
    title: favorite.title,
    image: favorite.imageURL,
    missedIngredientCount: 0,
    sourceUrl: favorite.recipeURL,
    id: favorite.recipeID,
    isFavorited: favorite.isFavorited,
    ingredients: favorite.ingredients || [],
  });

  const sortFavoritesByDate = (favorites) => {
    if (!Array.isArray(favorites)) {
      console.log("favorites is not an array");
      return;
    }
    favorites.sort((a, b) => {
      if (a.createdAt < b.createdAt) {
        return 1;
      } else if (a.createdAt > b.createdAt) {
        return -1;
      } else {
        return 0;
      }
    });
    return favorites;
  };

  const filteredFavorites = favorites.filter((favorite) =>
    ingredients.every((ingredient) =>
      favorite.ingredients.some((favIngredient) =>
        favIngredient.toLowerCase().includes(ingredient.toLowerCase())
      )
    )
  );

  const sortedFavorites = useMemo(() => {
    switch (sortBy) {
      case "Newest":
        return sortFavoritesByDate(filteredFavorites);
      case "Oldest":
        return sortFavoritesByDate(filteredFavorites).reverse();
      default:
        return filteredFavorites;
    }
  }, [filteredFavorites, sortBy]);

  const handleSortChange = (event) => {
    setSortBy(event.target.value);
  };

  const getFavorites = async () => {
    try {
      const response = await fetch(`/api/favorite/all`);
      const favorites = await response.json();
      console.log("Init Fav: ", favorites);
      setFavorites(favorites);
    } catch (error) {
      console.log(error);
    }
  };


  useEffect(() => {
    getFavorites();
  }, [auth.user.id]);

  return (
    <div className="favorites-page">
      <div className="favorites-content">
        <div className="favorites-results">
          <h1>Favorites</h1>
          <div className="recipes-container">
            {sortedFavorites.map((favorite) => (
              <RecipeBox
                key={favorite.id}
                recipe={mapFavoriteToRecipe(favorite)}
              />
            ))}
          </div>
        </div>

        <div className="ingredients-container">
          <div className="ingredients-content">
            <h1>Favorites Filter</h1>
            <div className="add-ingredient-section">
              <div className="sort-by-container">
                <label htmlFor="sort-by-select">Sort:</label>
                <select
                  id="sort-by-select"
                  value={sortBy}
                  onChange={handleSortChange}
                >
                  <option value="Newest">Newest</option>
                  <option value="Oldest">Oldest</option>
                </select>
              </div>
            </div>

            <label htmlFor="add-ingredient-field">Search Ingredient</label>
            <div className="add-ingredient-section">
              <input
                id="add-ingredient-field"
                type="text"
                value={ingredientInput}
                onChange={handleInputChange}
                onKeyDown={handleEnterKey}
              />
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
              onClick={() => deleteIngredient(-1)}
            >
              Remove All
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
