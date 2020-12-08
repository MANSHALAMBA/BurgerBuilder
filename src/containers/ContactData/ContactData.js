import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import Button from "../../components/UI/Button/Button";
import Spinner from "../../components/UI/Spinner/spinner";
import axios from "../../axios-orders";
import classes from "./ContactData.css";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import Input from "../../components/UI/Input/Input";
import * as actionCreators from "../../store/actions/index";
import { checkValidity } from "../../shared/utility";

class ContactData extends Component {
  state = {
    orderForm: {
      name: {
        elType: "text",
        elConfig: {
          placeholder: "Enter your name",
          type: "text",
          name: "name",
          value: ""
        },
        valid: false,
        validationRules: {
          isRequired: true
        },
        touched: false,
        errorMessage: ""
      },
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

      street: {
        elType: "text",
        elConfig: {
          placeholder: "Enter your street",
          type: "text",
          name: "street",
          value: ""
        },
        valid: false,
        validationRules: {
          isRequired: true
        },
        touched: false,
        errorMessage: ""
      },
      postalCode: {
        elType: "text",
        elConfig: {
          placeholder: "Enter your postal code",
          type: "text",
          name: "zip",
          value: ""
        },
        valid: false,
        validationRules: {
          isRequired: true,
          minLength: 4
        },
        touched: false,
        errorMessage: ""
      },

      country: {
        elType: "text",
        elConfig: {
          placeholder: "Enter your country name",
          type: "text",
          name: "country",
          value: ""
        },
        valid: false,
        validationRules: {
          isRequired: true
        },
        touched: false,
        errorMessage: ""
      },
      state: {
        elType: "text",
        elConfig: {
          placeholder: "Enter your state",
          type: "text",
          name: "state",
          value: ""
        },
        valid: false,
        validationRules: {
          isRequired: true
        },
        touched: false,
        errorMessage: ""
      },
      district: {
        elType: "text",
        elConfig: {
          placeholder: "Enter your district",
          type: "text",
          name: "district",
          value: ""
        },
        valid: false,
        validationRules: {
          isRequired: true
        },
        touched: false,
        errorMessage: ""
      },

      contactNumber: {
        elType: "text",
        elConfig: {
          placeholder: "Enter your contact number",
          type: "text",
          name: "contactNUmber",
          value: ""
        },
        valid: false,
        validationRules: {
          isRequired: true,
          phoneNumber: true
        },
        touched: false,
        errorMessage: ""
      },
      delieveryMethod: {
        elType: "select",
        elConfig: {
          options: [
            { value: "fastest", displayValue: "Fastest" },
            { value: "slowest", displayValue: "Slowest" },
            { value: "medium", displayValue: "Medium" }
          ],
          value: "fastest"
        },
        valid: true,
        validationRules: {},
        touched: false,
        errorMessage: ""
      }
    },
    formIsValid: false
  };

  inputChangeHandler = (event, InputIdentifier) => {
    //this.state.orderForm[InputIdentifier].elConfig.value=event;
    let updatedOrderform = { ...this.state.orderForm };
    let updatedFormel = { ...updatedOrderform[InputIdentifier] };
    updatedFormel.touched = true;
    [updatedFormel.valid, updatedFormel.errorMessage] = checkValidity(
      event.target.value,
      updatedFormel.validationRules
    );
    let updatedConfig = { ...updatedFormel["elConfig"] };
    updatedConfig["value"] = event.target.value;
    updatedFormel["elConfig"] = updatedConfig;
    updatedOrderform[InputIdentifier] = updatedFormel;

    let formValid = true;
    for (let x in updatedOrderform) {
      formValid = updatedOrderform[x].valid && formValid;
    }

    this.setState({
      orderForm: updatedOrderform,
      formIsValid: formValid
    });
  };

  placeOrderHandler = event => {
    event.preventDefault();
    this.props.purchaseStart();

    let cInfo = {};
    for (let x in this.state.orderForm) {
      let formEl = this.state.orderForm[x];
      cInfo[x] = formEl.elConfig.value;
    }
    // console.log(cInfo);
    let order = {
      ingredients: this.props.igs,
      price: this.props.price,
      customerInfo: cInfo,
      userId: this.props.userID
    };
    this.props.purchaseBurger(order, this.props.history, this.props.token);
    // axios
    //   .post("/orders.json", order)
    //   .then(response => {
    //     //console.log(response);
    //     // alert("order placed successfully");
    //     this.setState({
    //       loading: false
    //     });
    //     this.props.history.push("/");
    //   })
    //   .catch(error => {
    //     console.log(error);
    //     this.setState({
    //       loading: false
    //     });
    //   });
  };

  render() {
    let formEls = [];
    for (let x in this.state.orderForm) {
      //this.state.orderForm[x];
      formEls.push(
        <Input
          key={x}
          inputtype={this.state.orderForm[x].elType}
          config={this.state.orderForm[x].elConfig}
          changed={event => this.inputChangeHandler(event, x)}
          valid={this.state.orderForm[x].valid}
          touched={this.state.orderForm[x].touched}
          errorMessage={this.state.orderForm[x].errorMessage}
        />
      );
    }

    return (
      <div className={classes.ContactData}>
        {!this.props.loading ? (
          <form onSubmit={this.placeOrderHandler}>
            {formEls}
            <Button disabled={!this.state.formIsValid} type="Success">
              Order
            </Button>
          </form>
        ) : (
          <Spinner />
        )}
      </div>
    );
  }
}

const mapStatetoProps = state => {
  return {
    igs: state.brg.ingredients,
    price: state.brg.tPrice,
    loading: state.brg.loading,
    token: state.auth.token,
    userID: state.auth.userId
  };
};

const mapDispatchtoProps = dispatch => {
  return {
    purchaseBurger: (order, history, token) => {
      dispatch(actionCreators.purchaseBurger(order, history, token));
    },
    purchaseStart: () => {
      dispatch(actionCreators.purchaseStart());
    }
  };
};

export default connect(
  mapStatetoProps,
  mapDispatchtoProps
)(withRouter(withErrorHandler(ContactData, axios)));
