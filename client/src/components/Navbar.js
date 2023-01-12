import React from "react";
import Spoon from "../assets/icons/silverware-spoon.svg";
import "./Navbar.css";

export default function navbar() {
	return (
		<nav className="navbar">
			<div className="logo">
				<img src={Spoon} alt="spoon" className="logo-spoon" />
				<h1 className="logo-text">Recipeasy</h1>
			</div>
			<ul className="nav-links">
				<li className="nav-link">
					<a href="/">Log In</a>
				</li>
				<div className="nav-border"></div>
				<li className="nav-link">
					<a href="/">Find Recipes</a>
				</li>
				<div className="nav-border"></div>
				<li className="nav-link">
					<a href="/">Favorites</a>
				</li>
			</ul>
		</nav>
	);
}
