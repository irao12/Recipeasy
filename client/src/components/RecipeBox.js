import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import "./RecipeBox.css";
import HeartUnfilled from "../assets/icons/heart_unfilled.svg";
import HeartFilled from "../assets/icons/heart_filled.svg";

import StatusOkay from "../assets/icons/status_okay.svg";
import StatusWarning from "../assets/icons/status_warning.svg";
import StatusDanger from "../assets/icons/status_danger.svg";
import { useNavigate } from "react-router-dom";

const KEY = process.env.REACT_APP_API_KEY;

export default function RecipeBox({ recipe }) {
	const {
		title,
		image: imageURL,
		// readyInMinutes: time,
		missedIngredientCount,
		sourceUrl: recipeURL,
		id: recipeID,
	} = recipe;

	const [isFavorited, setIsFavorited] = useState(recipe.isFavorited);
	const auth = useContext(AuthContext);
	const navigate = useNavigate();

	useEffect(() => {
		fetch(`/api/favorite/?recipeID=${recipeID}`, {
			method: "GET",
		})
			.then((response) => {
				response.json().then((results) => {
					if (results.isFavorite) {
						setIsFavorited(true);
					} else {
						setIsFavorited(false);
					}
				});
			})
			.catch((err) => {
				console.log(err);
			});
	}, [recipeID]);

	let statusIcon;

	const toggleFavorite = async () => {
		try {
			if (isFavorited) {
				const response = await fetch(`/api/favorite/`, {
					method: "DELETE",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						recipeID: recipeID,
					}),
				});
				if (!response.ok) {
					throw new Error("failed to remove favorite");
				}
				setIsFavorited(false);
			} else {
				const apiURL = `https://api.spoonacular.com/recipes/${recipeID}/ingredientWidget.json?apiKey=${KEY}`;
				const response = await fetch(apiURL);
				const results = await response.json();
				const ingredients = results.ingredients.map(
					(ingredient) => ingredient.name
				);

				const postResponse = await fetch("/api/favorite", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						userID: auth.user.id,
						recipeID: recipeID,
						imageURL: imageURL,
						title: title,
						ingredients: ingredients,
					}),
				});
				console.log("Recipe Box: ", ingredients);
				if (!postResponse.ok) {
					throw new Error("failed to favorite");
				}
				setIsFavorited(true);
			}
		} catch (err) {
			console.log("Could not set a favorite", err);
		}
	};

	if (missedIngredientCount >= 5) {
		statusIcon = StatusDanger;
	} else if (missedIngredientCount >= 1) {
		statusIcon = StatusWarning;
	} else {
		statusIcon = StatusOkay;
	}

	return (
		<div
			className="recipe-box"
			onClick={(e) => {
				navigate(`/recipes/${recipeID}`);
			}}
		>
			<div className="recipe-content">
				<img
					src={isFavorited ? HeartFilled : HeartUnfilled}
					alt={isFavorited ? "favorited" : "not favorited"}
					className="recipe-favorite-icon"
					onClick={(e) => {
						e.stopPropagation();
						toggleFavorite();
					}}
				/>
				<p className="recipe-title">{title}</p>
				<img className="recipe-image" src={imageURL} alt={title} />
				<div className="time-and-status">
					<img
						className="recipe-status"
						src={statusIcon}
						alt="status"
					/>
					<p className="missing-ingredients-count">{`${missedIngredientCount} Missing Ingredient${
						missedIngredientCount === 1 ? "" : "s"
					}`}</p>
				</div>
			</div>
		</div>
	);
}
