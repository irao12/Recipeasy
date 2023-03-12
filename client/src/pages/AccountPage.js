import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "./AccountPage.css";

export default function AccountPage() {
	const auth = useContext(AuthContext);
	const navigate = useNavigate();
	const level = auth.getLevel();
	const experience = auth.experience;
	const expForCurrLevel = auth.getExperience(level);
	const expForNextLevel = auth.getExperience(level + 1);
	const expNeeded = expForNextLevel - expForCurrLevel;
	const progress = experience - expForCurrLevel;
	console.log(experience, expForCurrLevel, expForNextLevel, expNeeded);

	return (
		<div className="account-page">
			<div className="account-content">
				<h1 className="welcome">Hi {auth.user.firstName}!</h1>
				<div className="account-level-section">
					<div className="account-level">
						<p>Level: {level}</p>
						<p>
							{progress}/{expNeeded}
						</p>
					</div>
					<div className="level-progress-bar">
						<div
							style={{
								width: `${(progress / expNeeded) * 100}%`,
							}}
							className="progress-indicator"
						></div>
					</div>
				</div>

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
