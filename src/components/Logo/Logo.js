import React from "react";
import burgerLogo from "../../assets/images/original.png";
import classes from "./Logo.css";

const Logo = props => {
  return (
    <div className={classes.Logo}>
      <img src={burgerLogo} alt="Burger Builder App" />
    </div>
  );
};

export default Logo;
