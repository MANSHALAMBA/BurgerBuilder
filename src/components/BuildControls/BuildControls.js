import React from "react";
import classes from "./BuildControls.css";
import BuildControl from "./BuildControl/BuildControl";

const maxLimit = {
  meat: 10,
  salad: 20,
  bacon: 15,
  cheese: 30
};

const BuildControls = props => {
  const ingredients = [
    { label: "Meat", type: "meat" },
    { label: "Salad", type: "salad" },
    { label: "Bacon", type: "bacon" },
    { label: "Cheese", type: "cheese" }
  ];

  return (
    <div className={classes.BuildControls}>
      <p>Current Price : {props.price.toFixed(2)}</p>
      {ingredients.map((ctrl, index) => {
        return (
          <BuildControl
            label={ctrl.label}
            key={ctrl.label}
            add={() => {
              props.addIngredient(ctrl.type);
              // props.updatePurchaseable();
            }}
            remove={() => {
              props.removeIngredient(ctrl.type);
              // props.updatePurchaseable();
            }}
            disabled={props.ingredients[ctrl.type] === 0}
            disableMore={props.ingredients[ctrl.type] >= maxLimit[ctrl.type]}
          ></BuildControl>
        );
      })}

      <button
        disabled={!props.purchaseable}
        className={classes.OrderButton}
        onClick={props.purchaseHandler}
      >
        {/* {props.isAuth ? "ORDER NOW !!!" : "Authenticate to Order"} */}
        ORDER NOW
      </button>
    </div>
  );
};

export default BuildControls;
