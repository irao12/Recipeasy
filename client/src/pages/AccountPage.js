import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "./AccountPage.css";

export default function AccountPage() {
	const auth = useContext(AuthContext);
	const navigate = useNavigate();
	return (
		<div className="account-page">
			<div className="account-content">
				<h1 className="welcome">Hi {auth.user.firstName}!</h1>
				<button
					className="account-page-button"
					onClick={() => {
						navigate("/history");
					}}
					type="button"
				>
					History
				</button>
			</div>
		</div>
	);
}
