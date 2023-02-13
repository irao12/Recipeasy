import React from "react";
import { useNavigate } from "react-router-dom";
import "./AccountPage.css";

export default function AccountPage() {
	const navigate = useNavigate();
	return (
		<div className="account-page">
			<div className="account-content">
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
