import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import trashcan from "../assets/icons/trashcan.svg";
import trashcan_empty from "../assets/icons/trashcan_empty.svg";

import "./HistoryPage.css";
import HistoryBox from "../components/HistoryBox";

export default function HistoryPage() {
  const auth = useContext(AuthContext);
  const [history, setHistory] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [filteredHistory, setFilteredHistory] = useState([]);
  const [checkedItems, setCheckedItems] = useState([]);

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
    fetch(`/api/history/`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        historyID: id,
      }),
    }).then((response) => {
      if (response.ok) {
        setHistory((prevHistory) =>
          prevHistory.filter((item) => item.id !== id)
        );
      } else {
        console.log("Failed to delete item from database.");
      }
    });
  };
  

  const onCheckboxChange = (event) => {
    const checkboxes = document.querySelectorAll(
      'input[type="checkbox"]:checked'
    );
    const checkedIds = Array.from(checkboxes).map((checkbox) => checkbox.id);
    console.log(checkedIds);
    setCheckedItems(checkedIds);
  };

  const onDeleteChecked = () => {
    const newFilteredHistory = filteredHistory.filter(
      (item) => !checkedItems.includes(item.title)
    );
    setFilteredHistory(newFilteredHistory);
    setCheckedItems([]);
  };

  useEffect(() => {
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
            {checkedItems.length > 0 && (
                <button class="multi-delete" onClick={onDeleteChecked}>
                  <span class="trash-filled">
                    <img src={trashcan}></img>
                  </span>
                  <span class="trash-empty">
                    <img src={trashcan_empty}></img>
                  </span>
                  <span>Delete</span>
                </button>
            )}
          </div>
          <div className="history-items">
            {filteredHistory.map((item) => (
              <HistoryBox
                key={item.id}
                item={item}
                onDelete={() => onDelete(item.id)}
                onCheckboxChange={onCheckboxChange}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
//