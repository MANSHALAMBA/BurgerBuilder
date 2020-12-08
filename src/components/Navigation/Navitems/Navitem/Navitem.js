import React from "react";
import { NavLink } from "react-router-dom";
import classes from "./Navitem.css";

const Navitem = props => {
  return (
    <li className={classes.NavigationItem}>
      <NavLink
        to={props.link}
        activeClassName={classes.active}
        className={props.active ? classes.active : null}
      >
        {props.children}
      </NavLink>
    </li>
  );
};

export default Navitem;
