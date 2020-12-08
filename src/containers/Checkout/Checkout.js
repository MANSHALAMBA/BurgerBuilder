import React, { Component, Fragment } from "react";
import { Route } from "react-router-dom";
import { connect } from "react-redux";
import CheckoutSummary from "../../components/CheckoutSummary/checkoutSummary";
import ContactData from "../ContactData/ContactData";

class Checkout extends Component {
  // state = {
  //   ingredients: {},
  //   price: 0
  // };

  // componentDidMount() {
  //   let Ingredients = {};
  //   let tprice = 0;
  //   let query = this.props.location.search; // ?bacon=3&cheese=0&meat=0&salad=0&price=1
  //   query
  //     .split("?")[1]
  //     .split("&")
  //     .forEach(element => {
  //       // console.log(element); // "bacon=3"
  //       let [key, value] = element.split("=");
  //       if (key == "price") {
  //         tprice = value;
  //       } else {
  //         Ingredients[key] = Number(value);
  //       }
  //     });
  //   // console.log(Ingredients);
  //   this.setState({ ingredients: Ingredients, price: tprice });
  // }

  cancelOrderHandler = () => {
    this.props.history.goBack();
  };

  continueHandler = () => {
    this.props.history.push("/checkout/contact-data");
  };

  render() {
    return (
      <Fragment>
        <CheckoutSummary
          burger={this.props.igs}
          cancelOrderHandler={this.cancelOrderHandler}
          continueHandler={this.continueHandler}
        />
        <Route
          path={this.props.match.url + "/contact-data"}
          component={ContactData}
        />
      </Fragment>
    );
  }
}

const mapStatetoProps = state => {
  return {
    igs: state.brg.ingredients
  };
};

// const mapDispatchtoProps = dispatch => {
//   return {};
// };

export default connect(mapStatetoProps)(Checkout);
