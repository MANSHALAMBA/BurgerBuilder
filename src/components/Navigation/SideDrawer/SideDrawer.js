import React from "react";
import Logo from "../../Logo/Logo";
import NavItems from "../Navitems/Navitems";
import classes from "./SideDrawer.css";
import BackDrop from "../../UI/Backdrop/Backdrop";
import Aux from "../../../hoc/Aux/Aux";

const SideDrawer = props => {
  return (
    <Aux>
      <BackDrop showed clicked={props.closeSideDrawer} />
      <div className={classes.SideDrawer}>
        <div className={classes.Logo}>
          <Logo />
        </div>
        <nav>
          <NavItems />
        </nav>
      </div>
    </Aux>
  );
};

export default SideDrawer;
