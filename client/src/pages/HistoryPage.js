import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
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

  const onDelete = (id) => {
    setHistory((prevHistory) => prevHistory.filter((item) => item.id !== id));
  };
  
  /*
  const onDelete = (id) => {
    fetch(`/api/history/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${auth.token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("failed to delete item");
        }
        setHistory((prevHistory) =>
          prevHistory.filter((item) => item.id !== id)
        );
        setFilteredHistory((prevFilteredHistory) =>
          prevFilteredHistory.filter((item) => item.id !== id)
        );
      })
      .catch((error) => {
        console.log(error);
      });
  };
  */

  useEffect(() => {
    console.log(history);
    getHistory();
  }, []);

  useEffect(() => {
    setFilteredHistory(searchHistory(searchInput));
  }, [history, searchInput]);

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
            <HistoryBox
              key={item.id}
              item={item}
              onDelete={() => onDelete(item.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
