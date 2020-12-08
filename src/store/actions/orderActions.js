import * as actionTypes from "./actionTypes";
import axios from "../../axios-orders";

export const purchaseStart = () => {
  return {
    type: actionTypes.PurchaseStart
  };
};

export const purchaseSuccess = order => {
  return {
    type: actionTypes.PurchaseSuccess,
    order: order
  };
};

export const purchaseFailure = () => {
  return {
    type: actionTypes.PurchaseFailure
  };
};

export const purchaseBurger = (order, history, token) => {
  return dispatch => {
    //dispatch(purchaseStart());
  
    axios
      .post("/orders.json?auth=" + token, order)
      .then(response => {
      
        let orderData = {
          id: response.data.name,
          ...order
        };
        
        // for (let x in response.data) {
        //   order = {
        //     ...response.data[x],
        //     id: x
        //   };
        // }
        dispatch(purchaseSuccess(orderData));
        history.replace("/");
      })
      .catch(error => {
        
        dispatch(purchaseFailure());
        history.replace("/");
      });
  };
};

export const fetchOrdersInit = () => {
  return {
    type: actionTypes.FetchOrdersStart
  };
};

export const fetchOrdersSuccess = orders => {
  return {
    type: actionTypes.FetchOrdersSuccess,
    orders: orders
  };
};

export const fetchOrdersFailure = () => {
  return {
    type: actionTypes.FetchOrdersFailure
  };
};

export const fetchOrders = (token, id) => {

  return dispatch => {
    dispatch(fetchOrdersInit());

    let queryParam =
      "?auth=" + token + '&orderBy="userId"&equalTo="' + id + '"';
    axios
      .get("orders.json" + queryParam)
      .then(response => {
       
        let Orders = [];

        for (let x in response.data) {
          Orders.push({
            ...response.data[x],
            id: x
          });
        }
        dispatch(fetchOrdersSuccess(Orders));
      })
      .catch(error => {
        dispatch(fetchOrdersFailure());
      });
  };
};
