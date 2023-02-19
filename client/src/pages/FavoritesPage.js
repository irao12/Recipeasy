import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import RecipeBox from "../components/RecipeBox";
import "./FavoritesPage.css";

export default function FavoritesPage() {
  const auth = useContext(AuthContext);
  const [favorites, setFavorites] = useState([]);
  const [sortBy, setSortBy] = useState("Newest");

  const getFavorites = async () => {
    try {
      const response = await fetch(`/api/favorite/all`);
      const favorites = await response.json();
      console.log("Init Fav: ", favorites);
      setFavorites(favorites);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getFavorites();
  }, [auth.user.id]);

  const mapFavoritesToRecipe = (favorite) => {
    return {
      title: favorite.title,
      image: favorite.imageURL,
      missedIngredientCount: 0,
      sourceUrl: favorite.recipeURL,
      id: favorite.recipeID,
      isFavorited: favorite.isFavorited,
      ingredients: favorite.ingredients ? favorite.ingredients : [],
    };
  };

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

  const sortedFavorites = (() => {
    switch (sortBy) {
      case "Newest":
        return sortFavoritesByDate(favorites);
      case "Oldest":
        return sortFavoritesByDate(favorites).reverse();
      default:
        return favorites;
    }
  })();

  const handleSortChange = (event) => {
    setSortBy(event.target.value);
  };

  return (
    <div className="favorites-page">
      <div className="favorites-content">
        <div className="favorites-results">
          <h1>Favorites</h1>
          <div className="sort-by-container">
            <label htmlFor="sort-by-select">Sort By:</label>
            <select id="sort-by-select" value={sortBy} onChange={handleSortChange}>
              <option value="Newest">Newest</option>
              <option value="Oldest">Oldest</option>
              <option value="Ingredients">Number of Ingredients (WIP)</option>
              <option value="Search">Search Ingredients (WIP)</option>
            </select>
          </div>
          <div className="recipes-container">
            {sortedFavorites.map((favorite) => (
              <RecipeBox key={favorite.id} recipe={mapFavoritesToRecipe(favorite)} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
