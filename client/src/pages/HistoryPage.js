import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
export default function HistoryPage() {
	const auth = useContext(AuthContext);
	const [history, setHistory] = useState([]);

	const getHistory = () => {
		fetch(`/api/history/`).then((response) => {
			if (!response.ok) {
				throw new Error("failed to get history");
			}
			response.json().then((history) => setHistory(history));
		});
	};

	return (
		<div className="history-page">
			<div className="history-content">History</div>
			<div className="">
				<button onClick={getHistory}>GET HISTORY</button>
				{history.map((his) => (
					<div>{his.title}</div>
				))}
			</div>
		</div>
	);
}
