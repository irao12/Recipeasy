import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import "./HistoryPage.css";

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

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const month = date.toLocaleString("default", { month: "short" });
    const day = date.getDate();
    const year = date.getFullYear();
    return `${month} ${day}, ${year}`;
  };

  const combineIngredients = (ingredients) => {
    const MAX_LENGTH = 26; // counted from figma (change if needed)
    let result = "";
    for (let i = 0; i < ingredients.length; i++) {
      const capitalizedIngredient =
        ingredients[i].charAt(0).toUpperCase() + ingredients[i].slice(1);
      if (result.length + capitalizedIngredient.length > MAX_LENGTH) {
        result += "& More.";
        break;
      } else {
        result += capitalizedIngredient + ", ";
      }
    }
    return result;
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

          {filteredHistory.map((items, index) => (
            <div key={items.id}>
              <input type="checkbox" value={items.title} />
              {items.title}
              <img className="recipe-image" src={items.imageURL} />
              {formatDate(items.updatedAt)}
              {combineIngredients(items.ingredients)}
              <button
                onClick={() => {
                  const newHistory = [...history];
                  newHistory.splice(index, 1);
                  setHistory(newHistory);
                  setFilteredHistory(searchHistory(searchInput));
                }}
              >
                x
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}