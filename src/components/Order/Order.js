import React from "react";
import classes from "./Order.css";

const Order = props => {
  let ingredientCards = [];
  for (let i in props.ingredients) {
    ingredientCards.push(
      <div
        style={{
          textTransform: "capitalize",
          display: "inline-block",
          margin: "0 8px",
          border: "1px solid #ccc",
          padding: "5px"
        }}
      >
        {i} ({props.ingredients[i]})
      </div>
    );
  }

  return (
    <div className={classes.Order}>
      <p>{ingredientCards}</p>
      <p>
        Price: <strong>{Number.parseFloat(props.price).toFixed(2)}</strong>
      </p>
      <p>Deleivery method : {props.dmethod}</p>
    </div>
  );
};

export default Order;
