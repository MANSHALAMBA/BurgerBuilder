import React from "react";
import Aux from "../../hoc/Aux/Aux";
import Button from "../UI/Button/Button";

const OrderSummary = props => {
  const list = Object.keys(props.ingredients).map(igKey => {
    return (
      <li>
        <span style={{ textTransform: "capitalize" }}>{igKey}</span> :{" "}
        {props.ingredients[igKey]}
      </li>
    );
  });

  return (
    <Aux>
      <h3>Your Order is :</h3>
      <ul>{list}</ul>
      <p>
        <strong>Price : {props.price.toFixed(2)}</strong>
      </p>
      <p>Continue with the order ?</p>
      <Button type="Danger" clicked={props.cancelHandler}>
        Cancel
      </Button>
      <Button type="Success" clicked={props.continueHandler}>
        Continue
      </Button>
    </Aux>
  );
};

export default OrderSummary;
