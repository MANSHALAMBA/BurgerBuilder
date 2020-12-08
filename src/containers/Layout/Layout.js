import React, { Component } from "react";

import Aux from "../../hoc/Aux/Aux";
import classes from "./Layout.css";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";

class Layout extends Component {
  state = {
    showSideDrawer: false
  };

  closeSideDrawer = () => {
    this.setState({
      showSideDrawer: false
    });
  };

  toogleSideDrawer = () => {
    this.setState(prevState => {
      return {
        showSideDrawer: !prevState.showSideDrawer
      };
    });
  };

  render() {
    return (
      <Aux>
        <Toolbar toogleSideDrawer={this.toogleSideDrawer} />
        {this.state.showSideDrawer ? (
          <SideDrawer closeSideDrawer={this.closeSideDrawer} />
        ) : null}
        <p className={classes.Content}>{this.props.children}</p>
      </Aux>
    );
  }
}

export default Layout;
