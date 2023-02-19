import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import "./HistoryPage.css";


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

  // search filter.
  
  // div updater (update history)

  // display info functions





  useEffect(() => {
    console.log(history); 
  }, [history]);

  return (
    <div className="history-page">
		<div className = "history-content">
			<h1>History</h1>
			<div className="history-box">
				<button onClick={getHistory}>GET HISTORY</button>
				{history.map((his) => (
				<div key={his.id}>{his.title}</div>
				))}
			</div>
		</div>
    </div>
  );
}
