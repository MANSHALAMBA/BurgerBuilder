import * as actionTypes from "../actions/actionTypes";
import updateObject from "../utility/updateObject";

const InitialState = {
  loading: false,
  userId: null,
  token: null,
  error: null
};

const reducer = (state = InitialState, action) => {
  switch (action.type) {
    case actionTypes.AuthStart:
      return updateObject(state, { loading: true, error: null });
    case actionTypes.AuthSuccess:
      return updateObject(state, {
        loading: false,
        userId: action.id,
        token: action.token
      });
    case actionTypes.AuthFailure:
      return updateObject(state, { error: action.error, loading: false });
    case actionTypes.AuthLogout:
      return updateObject(state, { token: null, userId: null });
    default:
      return state;
  }
};

export default reducer;
