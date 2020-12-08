import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import Button from "../../components/UI/Button/Button";
import Input from "../../components/UI/Input/Input";
import classes from "./Auth.css";
import * as actionCreators from "../../store/actions/index";
import Spinner from "../../components/UI/Spinner/spinner";
import { checkValidity } from "../../shared/utility";

class Auth extends Component {
  state = {
    controls: {
      email: {
        elType: "text",
        elConfig: {
          placeholder: "Enter your email",
          type: "text",
          name: "email",
          value: ""
        },
        valid: false,
        validationRules: {
          isRequired: true,
          email: true
        },
        touched: false,
        errorMessage: ""
      },

      password: {
        elType: "text",
        elConfig: {
          placeholder: "Enter your password",
          type: "password",
          name: "password",
          value: ""
        },
        valid: false,
        validationRules: {
          isRequired: true,
          minLength: 6
        },
        touched: false,
        errorMessage: ""
      }
    },
    isSignUp: true
  };

  inputChangeHandler = (event, inputId) => {
    let value = event.target.value;

    this.setState(prevState => {
      let [valid, errormessage] = checkValidity(
        value,
        prevState.controls[inputId].validationRules
      );
      return {
        ...prevState,
        controls: {
          ...prevState.controls,
          [inputId]: {
            ...prevState.controls[inputId],
            elConfig: {
              ...prevState.controls[inputId].elConfig,
              value: value
            },
            valid: valid,
            errorMessage: errormessage,
            touched: true
          }
        }
      };
    });
  };

  switchHandler = () => {
    this.setState(prevState => {
      return { isSignUp: !prevState.isSignUp };
    });
  };

  render() {
    let content;
    if (this.props.isAuth) {
      if (!this.props.burgerBuilding) {
        content = <Redirect to="/" />;
      } else {
        content = <Redirect to="/checkout" />;
      }
    } else {
      let formEls = [];
      for (let x in this.state.controls) {
        //this.state.orderForm[x];
        formEls.push(
          <Input
            key={x}
            inputtype={this.state.controls[x].elType}
            config={this.state.controls[x].elConfig}
            changed={event => {
              this.inputChangeHandler(event, x);
            }}
            valid={this.state.controls[x].valid}
            touched={this.state.controls[x].touched}
            errorMessage={this.state.controls[x].errorMessage}
          />
        );
      }
      content = this.props.loading ? (
        <Spinner />
      ) : (
        <div className={classes.AuthData}>
          {this.props.error ? <p>{this.props.error.message}</p> : null}
          <form
            onSubmit={event => {
              event.preventDefault();
              this.props.onSubmit(
                this.state.controls.email.elConfig.value,
                this.state.controls.password.elConfig.value,
                this.state.isSignUp
              );
            }}
          >
            {formEls}
            <Button type="Success">Submit</Button>
          </form>
          <Button type="Danger" clicked={this.switchHandler}>
            Switch to {this.state.isSignUp ? "SignIn" : "SignUp"}{" "}
          </Button>
        </div>
      );
    }

    return content;
  }
}
const mapStatetoProps = state => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    isAuth: !(state.auth.token == null),
    burgerBuilding: state.brg.building
  };
};
const mapDispatchtoProps = dispatch => {
  return {
    onSubmit: (email, password, isSignUp) =>
      dispatch(actionCreators.authenticate(email, password, isSignUp))
  };
};

export default connect(mapStatetoProps, mapDispatchtoProps)(Auth);
