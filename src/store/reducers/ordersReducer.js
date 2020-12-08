import * as actionTypes from "../actions/actionTypes";
import updateObject from "../utility/updateObject";

const initialState = {
  orders: [],
  loading: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.PurchaseStart:
      return updateObject(state, { loading: true });
    case actionTypes.PurchaseSuccess:
      return updateObject(state, {
        loading: false,
        orders: state.orders.concat(action.order)
      });
    case actionTypes.PurchaseFailure:
      return updateObject(state, { loading: false });

    case actionTypes.FetchOrdersStart:
      return updateObject(state, { loading: true });

    case actionTypes.FetchOrdersSuccess:
      return updateObject(state, { loading: false, orders: action.orders });
    case actionTypes.FetchOrdersFailure:
      return updateObject(state, { loading: false });
    default:
      return state;
  }
};

export default reducer;
