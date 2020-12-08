import React, { Component } from "react";
import { connect } from "react-redux";
import Aux from "../../hoc/Aux/Aux";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/OrderSummary/OrderSummary";
import axios from "../../axios-orders";
import Spinner from "../../components/UI/Spinner/spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";

import * as actionCreators from "../../store/actions/index";

export class BurgerBuilder extends Component {
  state = {
    purchasing: false
    //loading: false,
    // error: false
  };

  componentDidMount() {
    //   console.log(this.props);
    this.props.onInitingredient();
  }

  sumIngredients = ingredients => {
    let sum = 0;
    let igValues = Object.keys(ingredients).map(igKey => {
      return ingredients[igKey];
    });

    sum = igValues.reduce(
      (accumulator, currentValue) => accumulator + currentValue
    );

    return sum;
  };

  // updatePurchaseable = () => {
  //   console.log("update Purchaseable invoked");
  //   console.log(this.props.igs);
  //   console.log(this.sumIngredients(this.props.igs));
  //   this.setState({
  //     purchaseable: this.sumIngredients(this.props.igs) > 0
  //   });
  // };

  purchaseHandler = () => {
    this.setState((prevState, props) => {
      return {
        purchasing: !prevState.purchasing
      };
    });
  };

  purchaseCancelHandler = () => {
    this.setState({
      purchasing: false
    });
  };

  purchaseContinueHandler = () => {
    // alert("Yayyy Your burger will be ready");
    // this.setState({
    //   loading: true
    // });
    // let order = {
    //   ingredients: this.state.ingredients,
    //   price: this.state.tPrice,
    //   customer: {
    //     name: "mansha lamba",
    //     address: {
    //       country: "india",
    //       state: "New Delhi",
    //       district: "Punjabi bagh",
    //       houseNo: "16",
    //       roadNo: "45"
    //     }
    //   },
    //   delieveryMethod: "fastest"
    // };

    // axios
    //   .post("/orders.json", order)
    //   .then(response => {
    //     //console.log(response);
    //     this.setState({
    //       loading: false,
    //       purchasing: false
    //     });
    //   })
    //   .catch(error => {
    //     console.log(error);
    //     this.setState({
    //       loading: false,
    //       purchasing: false
    //     });
    //   });
    // let igParam = "";
    // for (let i in this.props.igs) {
    //   igParam +=
    //     encodeURIComponent(i) +
    //     "=" +
    //     encodeURIComponent(this.props.igs[i]) +
    //     "&";
    // }
    // igParam += "price=" + this.props.tprice;
    if (this.props.isAuth) {
      this.props.history.push("/checkout");
    } else {
      this.props.history.push("/auth");
    }
  };

  render() {
    return this.props.error ? (
      <p>Sorry, Try after sometime</p>
    ) : (
      <Aux>
        <Modal
          show={this.state.purchasing}
          modalClosed={this.purchaseCancelHandler}
        >
          {!this.props.igs ? (
            <Spinner />
          ) : this.props.igs ? (
            <OrderSummary
              ingredients={this.props.igs}
              cancelHandler={this.purchaseCancelHandler}
              continueHandler={this.purchaseContinueHandler}
              price={this.props.tprice}
            />
          ) : (
            <Spinner />
          )}
        </Modal>
        {this.props.igs ? (
          <Aux>
            <Burger ingredients={this.props.igs}></Burger>

            <BuildControls
              addIngredient={this.props.onAddingredient}
              removeIngredient={this.props.onRemoveingredient}
              ingredients={this.props.igs}
              price={this.props.tprice}
              purchaseable={this.sumIngredients(this.props.igs)}
              purchaseHandler={this.purchaseHandler}
              isAuth={this.props.isAuth}
            />
          </Aux>
        ) : (
          <Spinner />
        )}
      </Aux>
    );
  }
}

const mapStatetoProps = state => {
  return {
    tprice: state.brg.tPrice,
    igs: state.brg.ingredients,
    error: state.brg.error,
    isAuth: !(state.auth.token == null)
  };
};

const mapDispatchtoProps = dispatch => {
  return {
    onAddingredient: igName => dispatch(actionCreators.addIngredient(igName)),
    onRemoveingredient: igName =>
      dispatch(actionCreators.removeIngredient(igName)),
    onInitingredient: () => dispatch(actionCreators.initIngredient())
  };
};

export default connect(
  mapStatetoProps,
  mapDispatchtoProps
)(withErrorHandler(BurgerBuilder, axios));
