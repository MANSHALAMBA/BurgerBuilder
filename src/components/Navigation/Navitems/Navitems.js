import React, { useState } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import classes from "./Navitems.css";
import Navitem from "./Navitem/Navitem";
import Button from "../../UI/Button/Button";
import * as actionCreators from "../../../store/actions/index";

export const Navitems = props => {
  let [state, setState] = useState({ redirection: false });

  const logoutHandler = () => {
    props.Onlogout();
    setState({ redirection: true });
  };

  return (
    <ul className={classes.NavigationItems}>
      <Navitem link="/burger-builder">Burger Builder</Navitem>
      <Navitem link="/orders">Orders</Navitem>
      {!props.isAuth ? (
        <Navitem link="/auth">Authentication</Navitem>
      ) : (
        <Button type="Success" clicked={logoutHandler}>
          Logout
        </Button>
      )}
      {state.redirection ? <Redirect to="/" /> : null}
    </ul>
  );
};

const mapStatetoProps = state => {
  return {
    isAuth: !(state.auth.token == null)
  };
};

const mapDispatchtoProps = dispatch => {
  return {
    Onlogout: () => dispatch(actionCreators.authLogout())
  };
};

export default connect(mapStatetoProps, mapDispatchtoProps)(Navitems);
