import React from "react";
import "./LevelBar.css";

export default function LevelBar({ level, progress, expNeeded }) {
	return (
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
	);
}
