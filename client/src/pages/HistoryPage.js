import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import trashcan from "../assets/icons/trashcan.svg";
import trashcan_empty from "../assets/icons/trashcan_empty.svg";
import cooking_pot from "../assets/icons/cooking_pot.svg";

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

  const onCheckboxChange = (event) => {
    const id = event.target.value;
    if (event.target.checked) {
      setCheckedItems((prevCheckedItems) => [...prevCheckedItems, id]);
    } else {
      setCheckedItems((prevCheckedItems) =>
        prevCheckedItems.filter((itemId) => itemId !== id)
      );
    }
  };

  const onDeleteChecked = async () => {
    // Remove checked items from filteredHistory
    setFilteredHistory((prevFilteredHistory) =>
      prevFilteredHistory.filter((item) => !checkedItems.includes(item.id))
    );
    // Remove checked items from database
    await Promise.all(checkedItems.map((id) => onDelete(id)));
    // Update history state to reflect the changes in the database
    setHistory((prevHistory) =>
      prevHistory.filter((item) => !checkedItems.includes(item.id))
    );
    // Clear checked items
    setCheckedItems([]);
  };
  
  

  const onDelete = async (id) => {
    try {
      const response = await fetch(`/api/history/`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          historyID: id,
        }),
      });
      if (response.ok) {
        const newHistory = filteredHistory.filter((item) => item.id !== id);
        setFilteredHistory(newHistory);
        return true;
      } else {
        console.log("Failed to delete item from database.");
        return false;
      }
    } catch (error) {
      console.log("Failed to delete item from database.", error);
      return false;
    }
  };
  

  useEffect(() => {
    getHistory();
  }, [auth.user.id]);

  useEffect(() => {
    setFilteredHistory(searchHistory(searchInput));
  }, [history, searchInput]);
  useEffect(() => {
    getHistory();
  }, [auth.user.id, checkedItems]);
  

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
              <button className="multi-delete" onClick={onDeleteChecked}>
                <span className="trash-filled">
                  <img src={trashcan} alt="filled trashcan icon" />
                </span>
                <span className="trash-empty">
                  <img src={trashcan_empty} alt="empty trashcan icon" />
                </span>
                <span>Delete</span>
              </button>
            )}
          </div>
          {filteredHistory.length > 0 ? (
            <div className="history-items">
              {filteredHistory.map((item) => (
                <HistoryBox
                  key={item.id}
                  item={item}
                  onDelete={() => onDelete(item.id)}
                  onCheckboxChange={onCheckboxChange}
                  checked={checkedItems.includes(item.id)}
                />
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <p className="empty_Pg_Msg">Nothing's on the table, maybe head to the kitchen...</p>
              <img src={cooking_pot} alt="Cooking pot icon" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
  

}
