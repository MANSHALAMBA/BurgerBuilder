import React from "react";
import { withRouter } from "react-router-dom";
import classes from "./checkoutSummary.css";
import Burger from "../Burger/Burger";
import Button from "../UI/Button/Button";

const checkoutSummary = props => {
  //console.log("check sum");
  //console.log(props.burger);
  return (
    <div className={classes.checkoutSummary}>
      <h4>Hope it tastes good</h4>
      <div style={{ width: "100%", margin: "auto" }}>
        <Burger ingredients={props.burger} />
      </div>
      <Button type="Success" clicked={props.continueHandler}>
        Continue
      </Button>
      <Button type="Danger" clicked={props.cancelOrderHandler}>
        Cancel
      </Button>
    </div>
  );
};

export default withRouter(checkoutSummary);
