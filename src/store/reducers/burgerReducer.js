import * as actionTypes from "../actions/actionTypes";
import updateObject from "../utility/updateObject";

const Prices = {
  meat: 1.3,
  salad: 0.5,
  bacon: 0.7,
  cheese: 1.0
};

const initialState = {
  ingredients: null,
  tPrice: 4,
  error: false,
  building: false
};

const AddIngredient = (state, action) => {
  return updateObject(state, {
    tPrice: state.tPrice + Prices[action.igName],
    ingredients: updateObject(state.ingredients, {
      [action.igName]: state.ingredients[action.igName] + 1
    }),
    building: true
  });
};

const RemoveIngredient = (state, action) => {
  return updateObject(state, {
    tPrice: state.tPrice - Prices[action.igName],
    ingredients: updateObject(state.ingredients, {
      [action.igName]: state.ingredients[action.igName] - 1
    }),
    building: true
  });
};

const InitIngredient = (state, action) => {
  return updateObject(state, {
    tPrice: 4,
    ingredients: action.ingredients,
    building: false
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AddIngredient:
      return AddIngredient(state, action);

    case actionTypes.RemoveIngredient:
      return RemoveIngredient(state, action);

    case actionTypes.InitIngredient:
      return InitIngredient(state, action);

    case actionTypes.InitIngredientFailed:
      return updateObject(state, { error: true });

    default:
      return state;
  }
};
export default reducer;
