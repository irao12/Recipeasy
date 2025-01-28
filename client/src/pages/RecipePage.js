import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import HeartUnfilled from "../assets/icons/heart_unfilled.svg";
import HeartFilled from "../assets/icons/heart_filled.svg";
import ExperienceModal from "../components/ExperienceModal";
import "./RecipePage.css";
import { AuthContext } from "../context/AuthContext";

export default function RecipePage() {
	const auth = useContext(AuthContext);
	const { recipeID } = useParams();
	const [isLoading, setIsLoading] = useState(true);
	const [isFavorited, setIsFavorited] = useState(false);
	const [recipe, setRecipe] = useState({});
	const [isCompleted, setIsCompleted] = useState(false);
	const [showModal, setShowModal] = useState(false);
	const [expGained, setExpGained] = useState(0);

	const checkFavorite = () => {
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
	};

	const getRecipeInformation = () => {
		const url = `/api/recipe/id/${recipeID}`;
		fetch(url, {
			method: "GET",
		}).then((response) => {
			response.json().then((results) => {
				setRecipe({
					title: results.title,
					imageURL: results.image,
					totalTime: results.readyInMinutes,
					sourceURL: results.sourceUrl,
					ingredients: results.extendedIngredients.map(
						(ingredient) => ingredient.name
					),
					instructions: results.analyzedInstructions[0].steps,
				});
				setIsLoading(false);
			});
		});
	};

	const toggleFavorite = async () => {
		try {
			if (isFavorited) {
				const response = await fetch(`/api/favorite/`, {
					method: "DELETE",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						userID: auth.user.id,
						recipeID: recipeID,
					}),
				});
				if (!response.ok) {
					throw new Error("failed to remove favorite");
				}
				setIsFavorited(false);
			} else {
				const postResponse = await fetch("/api/favorite", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						userID: auth.user.id,
						recipeID: recipeID,
						imageURL: recipe.imageURL,
						title: recipe.title,
						ingredients: recipe.ingredients,
					}),
				});
				console.log("Recipe Box: ", recipe.ingredients);
				if (!postResponse.ok) {
					throw new Error("failed to favorite");
				}
				setIsFavorited(true);
			}
		} catch (err) {
			console.log("Could not set a favorite", err);
		}
	};

	const markCompleted = () => {
		fetch("/api/history", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				userID: auth.user.id,
				recipeID: recipeID,
				imageURL: recipe.imageURL,
				title: recipe.title,
				ingredients: recipe.ingredients,
			}),
		}).then((response) => {
			if (!response.ok) {
				throw new Error("failed to complete");
			}
			response.json().then((results) => setExpGained(results.expGained));
			auth.refresh();
			setIsCompleted(true);
			setShowModal(true);
		});
	};

	useEffect(() => {
		getRecipeInformation();
	}, [recipeID]);

	useEffect(() => {
		checkFavorite();
	}, [recipe]);

	return (
		<div className="recipe-page">
			{showModal && (
				<ExperienceModal
					expGained={expGained}
					setShowModal={setShowModal}
				/>
			)}
			<div className="recipe-wrapper">
				{!isLoading && (
					<div className="recipe-content">
						<div className="recipe-info">
							<img
								src={isFavorited ? HeartFilled : HeartUnfilled}
								alt={
									isFavorited ? "favorited" : "not favorited"
								}
								className="recipe-favorite-icon"
								onClick={toggleFavorite}
							/>
							<h1 className="recipe-title">{recipe.title}</h1>
							<img
								src={recipe.imageURL}
								className="recipe-image"
								alt="recipe"
							></img>
							<p className="recipe-time">
								Total time:{" "}
								{recipe.totalTime > 0
									? recipe.totalTime
									: "unknown"}
							</p>
							<a
								target="_blank"
								href={recipe.sourceURL}
								rel="noreferrer"
								className="recipe-link"
							>
								Recipe URL
							</a>
						</div>

						<div className="recipe-details">
							<div className="recipe-ingredients">
								<h3 className="recipe-ingredients-heading">
									Ingredients
								</h3>
								<ul className="ingredients">
									{recipe.ingredients.map(
										(ingredient, index) => {
											return (
												<li key={`ingredient-${index}`}>
													&#8226; {ingredient}
												</li>
											);
										}
									)}
								</ul>
							</div>
							<div className="recipe-steps">
								<h3 className="recipe-steps-heading">Steps</h3>
								<ul className="recipe-steps-list">
									{recipe.instructions.map((step, index) => {
										return (
											<li key={`step-${index}`}>
												{step.number}. {step.step}
											</li>
										);
									})}
								</ul>
							</div>
							<button
								type="button"
								className={
									isCompleted
										? "complete-recipe-button inactive"
										: "complete-recipe-button"
								}
								onClick={isCompleted ? () => {} : markCompleted}
							>
								{isCompleted ? "COMPLETED" : "COMPLETE"}
							</button>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}
