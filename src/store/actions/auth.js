import * as actionTypes from "./actionTypes";
import axios from "axios";
const authStart = () => {
  return {
    type: actionTypes.AuthStart
  };
};

const authSuccess = (token, id) => {
  return {
    type: actionTypes.AuthSuccess,
    id: id,
    token: token
  };
};

const authFail = error => {
  return {
    type: actionTypes.AuthFailure,
    error: error
  };
};

export const authLogout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("userId");
  localStorage.removeItem("expiryDate");
  return {
    type: actionTypes.AuthLogout
  };
};

const authTimeout = expiryTime => {
  return dispatch => {
    setTimeout(() => {
      dispatch(authLogout());
    }, expiryTime * 1000);
  };
};

export const authenticate = (email, password, isSignUp) => {
  return dispatch => {
    dispatch(authStart());

    let data = {
      email: email,
      password: password,
      returnSecureToken: true
    };
    let url = isSignUp
      ? "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBiWsSzeKZ8WsdzYDgrohR4nfndWrGWimc "
      : "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBiWsSzeKZ8WsdzYDgrohR4nfndWrGWimc ";
    axios
      .post(url, data)
      .then(response => {
       
        localStorage.setItem("token", response.data.idToken);
        localStorage.setItem("userId", response.data.localId);
        localStorage.setItem(
          "expiryDate",
          new Date(new Date().getTime() + response.data.expiresIn * 1000)
        );
        dispatch(authSuccess(response.data.idToken, response.data.localId));
        dispatch(authTimeout(response.data.expiresIn));
      })
      .catch(error => {
       
        dispatch(authFail(error.response.data.error));
      });
  };
};

export const autoAuthenticate = () => {
  return dispatch => {
   
    if (localStorage.getItem("token") !== null) {
      if (new Date(localStorage.getItem("expiryDate")) > new Date()) {
        dispatch(
          authSuccess(
            localStorage.getItem("token"),
            localStorage.getItem("userId")
          )
        );
        dispatch(
          authTimeout(
            (new Date(localStorage.getItem("expiryDate")).getTime() -
              new Date().getTime()) /
              1000
          )
        );
      }
    }
  };
};
