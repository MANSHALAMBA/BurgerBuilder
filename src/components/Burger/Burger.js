import React from "react";
import BurgerIngredient from "./BurgerIngredeints/BurgerIngredient";

import classes from "./Burger.css";

const Burger = props => {
  let flag = false;

  for (let [, value] of Object.entries(props.ingredients)) {
    if (value !== 0) {
      flag = true;
      break;
    }
  }
  let transformedIngredients;
  if (flag === true) {
    transformedIngredients = Object.keys(props.ingredients).map(ig => {
      // console.log("buger ingredient " + props.ingredients[ig]);
      return [...Array(props.ingredients[ig])].map((__, index) => {
        // console.log("buger ingredient II" + ig);
        return <BurgerIngredient type={ig} key={ig + index} />;
      });
    });
    transformedIngredients = transformedIngredients.reduce(
      (accumulator, currValue) => {
        return [...accumulator, ...currValue];
      }
    );
  } else {
    transformedIngredients = <p>Hey , Start adding some ingredients</p>;
  }

  // console.log(transformedIngredients);

  return (
    <div className={classes.Burger}>
      <BurgerIngredient type="breadTop" />

      {transformedIngredients}

      <BurgerIngredient type="breadBottom" />
    </div>
  );
};

export default Burger;
