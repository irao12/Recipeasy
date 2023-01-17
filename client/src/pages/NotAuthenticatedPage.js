import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./NotAuthenticatedPage.css";

export default function NotAuthenticatedPage() {
	const navigate = useNavigate();
	return (
		<div className="not-authenticated-page">
			<div className="authentication-msg">
				<h1>You need an account in order to acces this page!</h1>
				<button
					type="button"
					className="log-in-button"
					onClick={() => {
						navigate("/login");
					}}
				>
					LOG IN
				</button>
			</div>
		</div>
	);
}
