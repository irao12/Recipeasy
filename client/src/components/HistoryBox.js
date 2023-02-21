import React from "react";
import "./HistoryBox.css";

function HistoryBox({ item }) {

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const month = date.toLocaleString("default", { month: "short" });
    const day = date.getDate();
    const year = date.getFullYear();
    return `${month} ${day}, ${year}`;
  };

  const shortenString = (str, maxLength, suffix) => {
    if (str.length <= maxLength) return str;
  
    let truncatedStr = str.substr(0, maxLength);
    if (truncatedStr.charAt(maxLength - 1) !== " ") {
      truncatedStr = truncatedStr.substr(0, Math.min(truncatedStr.length, truncatedStr.lastIndexOf(" "))) + suffix;
    }
    else {
      truncatedStr += suffix;
    }
    return truncatedStr;
  };

  const shortenList = (ingredients, maxLength) => {
    let result = "";
    let i = 0;
    while (i < ingredients.length) {
      const capitalizedIngredient = ingredients[i].charAt(0).toUpperCase() + ingredients[i].slice(1);
      if (result.length + capitalizedIngredient.length > maxLength) {
        break;
      } else {
        result += capitalizedIngredient + ", ";
        i++;
      }
    }
    if (i < ingredients.length) {
      result = result.substring(0, result.lastIndexOf(" "));
      result += " & More.";
    }
    return result;
  };

  return (
    <div key={item.id} className="recipe-container">
      <input type="checkbox" value={item.title} />
      {shortenString(item.title, 17, "...")}
      <img className="recipe-image" src={item.imageURL} alt={item.title} />
      {formatDate(item.updatedAt)}
      {shortenList(item.ingredients, 26)}
      <button>x</button>
    </div>
  );  
}

export default HistoryBox;
