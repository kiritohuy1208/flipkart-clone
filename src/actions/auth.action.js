import { authConstants, cartConstants } from "./constants";
import axios from "../helpers/axios";

export const login = (user) => {
  return async (dispatch) => {
    try {
      dispatch({ type: authConstants.LOGIN_REQUEST });
      const res = await axios.post("/signin", { ...user });
      console.log("res" + res);
      if (res.status === 200) {
        const { token, user } = res.data;
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));

        dispatch({
          type: authConstants.LOGIN_SUCCESS,
          payload: {
            token,
            user,
          },
        });
      } else {
        if (res.status === 400) {
          const { error } = res.data;
          dispatch({
            type: authConstants.LOGIN_FAILURE,
            payload: { error },
          });
        }
      }
    } catch (error) {
      // some reason error message
      const { data } = error.response;
      dispatch({
        type: authConstants.LOGIN_FAILURE,
        payload: { error: data.error },
      });
    }
  };
};

export const signUp = (user) => {
  return async (dispatch) => {
    try {
      dispatch({ type: authConstants.SIGNUP_REQUEST });
      const res = await axios.post("/signup", { ...user });
      if (res.status === 200) {
        const { token, user } = res.data;
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));

        dispatch({
          type: authConstants.SIGNUP_SUCCESS,
          payload: {
            token,
            user,
          },
        });
      } else {
        dispatch({
          type: authConstants.SIGNUP_FAILURE,
          payload: { error: res.data.error },
        });
      }
    } catch (error) {
      const { data } = error.response;
      dispatch({
        type: authConstants.SIGNUP_FAILURE,
        payload: { error: data.error },
      });
    }
  };
};

export const isUserLoggedIn = () => {
  return async (dispatch) => {
    const token = localStorage.getItem("token");
    if (token) {
      const user = JSON.parse(localStorage.getItem("user"));
      dispatch({
        type: authConstants.LOGIN_SUCCESS,
        payload: {
          token,
          user,
        },
      });
    }
    // else {
    //   dispatch({
    //     type: authConstants.LOGIN_FAILURE,
    //     payload: { error: "Failed to login" },
    //   });
    // }
  };
};
export const signOut = () => {
  return async (dispatch) => {
    dispatch({
      type: authConstants.LOGOUT_REQUEST,
    });
    const res = await axios.post("/signout");

    if (res.status === 200) {
      // localStorage.removeItem('user')
      // localStorage.removeItem('token')
      // localStorage.removeItem('cart')
      localStorage.clear();
      dispatch({
        type: authConstants.LOGOUT_SUCCESS,
      });
      dispatch({
        type: cartConstants.RESET_CART,
      });
    } else {
      dispatch({
        type: authConstants.LOGOUT_FAILURE,
        payload: {
          error: res.data.error,
        },
      });
    }
  };
};
