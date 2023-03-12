import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import "./ExperienceModal.css";
import LevelBar from "./LevelBar";

export default function ExperienceModal({ expGained, setShowModal }) {
	const auth = useContext(AuthContext);
	const [initiateClose, setInitiateClose] = useState(false);

	const level = auth.getLevel();
	const experience = auth.experience;
	const expForCurrLevel = auth.getExperience(level);
	const expForNextLevel = auth.getExperience(level + 1);
	const expNeeded = expForNextLevel - expForCurrLevel;
	const progress = experience - expForCurrLevel;

	const closeModal = () => {
		setInitiateClose(true);
		setTimeout(() => {
			setShowModal(false);
		}, 500);
	};

	return (
		<div className={"exp-modal " + (initiateClose ? "closed" : "")}>
			<div className="modal-box">
				<button
					type="button"
					className="close-button"
					onClick={closeModal}
				>
					X
				</button>
				<div className="modal-content">
					<p>
						{expGained === 10
							? "Recipe Complete!"
							: "New Recipe Complete!"}
					</p>
					<p>+{expGained} XP</p>
					<LevelBar
						level={auth.getLevel()}
						progress={progress}
						expNeeded={expNeeded}
					/>
				</div>
			</div>
		</div>
	);
}
