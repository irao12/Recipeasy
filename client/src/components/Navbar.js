import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import Spoon from "../assets/icons/silverware-spoon.svg";
import LogOutIcon from "../assets/icons/logout.svg";
import { Link } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
	const auth = useContext(AuthContext);

	return (
		<nav className="navbar">
			<div className="logo">
				<img src={Spoon} alt="spoon" className="logo-spoon" />
				<h1 className="logo-text">Recipeasy</h1>
			</div>
			<ul className="nav-links">
				<li className="nav-link">
					{auth.isAuthenticated ? (
						<Link to="/">Account</Link>
					) : (
						<Link to="/login">Log In</Link>
					)}
				</li>
				<div className="nav-border"></div>
				<li className="nav-link">
					<a href="/">Find Recipes</a>
				</li>
				<div className="nav-border"></div>
				<li className="nav-link">
					<a href="/">Favorites</a>
				</li>

				{auth.isAuthenticated && (
					<>
						<div className="nav-border"></div>

						<li
							title="Log Out"
							onClick={() => {
								auth.signout();
							}}
						>
							<img
								src={LogOutIcon}
								className="log-out"
								alt="logout"
							/>
						</li>
					</>
				)}
			</ul>
		</nav>
	);
}
