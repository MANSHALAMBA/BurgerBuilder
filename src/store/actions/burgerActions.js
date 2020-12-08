import * as actionTypes from "./actionTypes";
import axios from "../../axios-orders";

export const addIngredient = ig => {
  return {
    type: actionTypes.AddIngredient,
    igName: ig
  };
};

export const removeIngredient = ig => {
  return {
    type: actionTypes.RemoveIngredient,
    igName: ig
  };
};

export const initIngredient = () => {
  return dispatch => {
    axios
      .get("/ingredients.json")
      .then(response => {
        dispatch({
          type: actionTypes.InitIngredient,
          ingredients: response.data
        });
      })
      .catch(error => {
      
        dispatch({
          type: actionTypes.InitIngredientFailed
        });
      });
  };
};
