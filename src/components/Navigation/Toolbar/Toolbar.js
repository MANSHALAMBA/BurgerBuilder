import React from "react";
import classes from "./Toolbar.css";
import Logo from "../../Logo/Logo";
import Navitems from "../Navitems/Navitems";

const Toolbar = props => {
  return (
    <header className={classes.Toolbar}>
      <div className={classes.DrawerToggle} onClick={props.toogleSideDrawer}>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <div className={classes.Logo}>
        <Logo />
      </div>
      <nav className={classes.DesktopOnly}>
        <Navitems />
      </nav>
    </header>
  );
};

export default Toolbar;
