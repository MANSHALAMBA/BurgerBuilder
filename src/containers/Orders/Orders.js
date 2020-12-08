import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "../../axios-orders";
import Order from "../../components/Order/Order";
import Spinner from "../../components/UI/Spinner/spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import * as actionCreators from "../../store/actions/index";

class Orders extends Component {
  componentDidMount() {
    if (this.props.token !== null) {
      this.props.fetchOrders(this.props.token, this.props.userId);
    }
  }

  render() {
    let content = <p>Please authenticate to view your orders</p>;
    if (this.props.token !== null) {
      content = this.props.loading ? (
        <Spinner />
      ) : (
        this.props.orders.map(order => {
          return (
            <Order
              ingredients={order.ingredients}
              key={order.id}
              price={order.price}
              dmethod={order.customerInfo.delieveryMethod}
            />
          );
        })
      );
    }

    return content;
  }
}

const mapStatetoProps = state => {
  return {
    orders: state.ord.orders,
    loading: state.ord.loading,
    token: state.auth.token,
    userId: state.auth.userId
  };
};
const mapDispatchtoProps = dispatch => {
  return {
    fetchOrders: (token, id) => dispatch(actionCreators.fetchOrders(token, id))
  };
};

export default connect(
  mapStatetoProps,
  mapDispatchtoProps
)(withErrorHandler(Orders, axios));
