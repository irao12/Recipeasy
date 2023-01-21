import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import "./RecipeBox.css";
import HeartUnfilled from "../assets/icons/heart_unfilled.svg";
import HeartFilled from "../assets/icons/heart_filled.svg";

import StatusOkay from "../assets/icons/status_okay.svg";
import StatusWarning from "../assets/icons/status_warning.svg";
import StatusDanger from "../assets/icons/status_danger.svg";

export default function RecipeBox({ recipe }) {
	const {
		title,
		image: imageURL,
		readyInMinutes: time,
		missingIngredients,
		sourceUrl: recipeURL,
		id: recipeID,
	} = recipe;

	const [isFavorited, setIsFavorited] = useState(recipe.isFavorited);
	const auth = useContext(AuthContext);

	useEffect(() => {
		fetch(`/api/favorite/?userID=${auth.user.id}&recipeID=${recipeID}`, {
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
	}, []);

	let statusIcon;

	const toggleFavorite = () => {
		if (isFavorited) {
			fetch(`/api/favorite/`, {
				method: "DELETE",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					userID: auth.user.id,
					recipeID: recipeID,
				}),
			})
				.then((response) => {
					console.log(response);
					if (!response.ok) {
						console.log(response);
						throw new Error("failed to remove favorite");
					}
					setIsFavorited(false);
				})
				.catch((err) => {
					console.log("Could not set a favorite");
				});

			return;
		} else {
			fetch("/api/favorite", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					userID: auth.user.id,
					recipeID: recipeID,
					imageURL: imageURL,
					title: title,
				}),
			})
				.then((response) => {
					if (!response.ok) {
						console.log(response);
						throw new Error("failed to favorite");
					}
					setIsFavorited(true);
				})
				.catch((err) => {
					console.log("Could not set a favorite");
				});
		}
	};

	if (missingIngredients >= 5) {
		statusIcon = StatusDanger;
	} else if (missingIngredients >= 3) {
		statusIcon = StatusWarning;
	} else {
		statusIcon = StatusOkay;
	}

	return (
		<div className="recipe-box">
			<div className="recipe-content">
				<img
					src={isFavorited ? HeartFilled : HeartUnfilled}
					alt={isFavorited ? "favorited" : "not favorited"}
					className="recipe-favorite-icon"
					onClick={toggleFavorite}
				/>
				<p className="recipe-title">{title}</p>
				<img className="recipe-image" src={imageURL} alt={title} />
				<div className="time-and-status">
					<p className="recipe-time">{time} min</p>
					<img
						className="recipe-status"
						src={statusIcon}
						alt="status"
					/>
				</div>
			</div>
		</div>
	);
}
