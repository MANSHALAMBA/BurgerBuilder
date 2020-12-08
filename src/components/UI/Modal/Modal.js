import React, { Component } from "react";
import classes from "./modal.css";
import Backdrop from "../Backdrop/Backdrop";
import Aux from "../../../hoc/Aux/Aux";

// React.memo() didnt work so it had to be converted to class based component
class Modal extends Component {
  shouldComponentUpdate(newProps) {
    return (
      newProps.show !== this.props.show ||
      newProps.children !== this.props.children
    );
  }

  render() {
  
    return (
      <Aux>
        <Backdrop showed={this.props.show} clicked={this.props.modalClosed} />
        <div
          className={classes.Modal}
          style={{
            transform: this.props.show ? "translateY(0)" : "translateY(-100vh)",
            opacity: this.props.show ? "1" : "0"
          }}
        >
          {" "}
          {this.props.children}
        </div>
      </Aux>
    );
  }
}

export default Modal;
