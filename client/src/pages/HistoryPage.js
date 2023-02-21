import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import HeartUnfilled from "../assets/icons/heart_unfilled.svg";
import HeartFilled from "../assets/icons/heart_filled.svg";
import "./HistoryPage.css";
import HistoryBox from "../components/HistoryBox";


export default function HistoryPage() {
  const auth = useContext(AuthContext);
  const [history, setHistory] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [filteredHistory, setFilteredHistory] = useState([]);

  
  const getHistory = () => {
    fetch(`/api/history/`).then((response) => {
      if (!response.ok) {
        throw new Error("failed to get history");
      }
      response.json().then((history) => {
        setHistory(history);
        setFilteredHistory(history);
      });
    });
  };

  const searchHistory = (searchString) => {
    if (!searchString) {
      return history;
    }
    return history.filter((hist) =>
      hist.title.toLowerCase().includes(searchString.toLowerCase())
    );
  };

  const onSearch = (event) => {
    if (event.key === "Enter") {
      setFilteredHistory(searchHistory(searchInput));
    }
  };

  useEffect(() => {
    console.log(history);
    getHistory();
  }, []);

  return (
    <div className="history-page">
      <div className="history-content">
        <h1>History</h1>

        <div className="history-box">
          <div className="search-box">
            <input
              type="text"
              placeholder="Search Recipes"
              value={searchInput}
              onChange={(event) => setSearchInput(event.target.value)}
              onKeyPress={onSearch}
            />
          </div>

          {filteredHistory.map((item) => (
            <HistoryBox key={item.id} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
}