import { cartConstants, userConstant } from "./constants";
import axios from "../helpers/axios";

export const getAddress = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: userConstant.GET_USER_ADDRESS_REQUEST });
      const res = await axios.post("/user/getaddress");
      if (res.status === 200) {
        const {
          userAddress: { address },
        } = res.data;
        dispatch({
          type: userConstant.GET_USER_ADDRESS_SUCCESS,
          payload: {
            address,
          },
        });
      } else {
        dispatch({
          type: userConstant.GET_USER_ADDRESS_FAILURE,
          payload: {
            error: res.data.error,
          },
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const addAddress = (payload) => {
  return async (dispatch) => {
    try {
      dispatch({ type: userConstant.ADD_USER_ADDRESS_REQUEST });
      const res = await axios.post("/user/address/create", { payload });
      if (res.status === 201) {
        const {
          address: { address },
        } = res.data;
        dispatch({
          type: userConstant.ADD_USER_ADDRESS_SUCCESS,
          payload: {
            address,
          },
        });
      } else {
        dispatch({
          type: userConstant.ADD_USER_ADDRESS_FAILURE,
          payload: {
            error: res.data.error,
          },
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
};
export const addOrder = (payload) => {
  return async (dispatch) => {
    try {
      dispatch({ type: userConstant.ADD_USER_ORDER_REQUEST });
      const res = await axios.post("/addOrder", payload);
      if (res.status === 201) {
        const { order } = res.data;
        dispatch({
          type: cartConstants.RESET_CART,
        });
        dispatch({
          type: userConstant.ADD_USER_ORDER_SUCCESS,
          payload: { order },
        });
      } else {
        dispatch({
          type: userConstant.ADD_USER_ORDER_FAILURE,
          payload: {
            error: res.data.error,
          },
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const getOrders = () => {
  return async (dispatch) => {
    try {
      const res = await axios.get("/getOrders");
      dispatch({ type: userConstant.GET_USER_ORDER_REQUEST });
      if (res.status === 200) {
        const { orders } = res.data;
        dispatch({
          type: userConstant.GET_USER_ORDER_SUCCESS,
          payload: { orders },
        });
      } else {
        dispatch({
          type: userConstant.GET_USER_ORDER_FAILURE,
          payload: {
            error: res.data.error,
          },
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
};
export const getOrder = (payload) => {
  return async (dispatch) => {
    dispatch({ type: userConstant.GET_USER_ORDER_DETAILS_REQUEST });
    try {
      const res = await axios.post("/getOrder", payload);
      if (res.status === 200) {
        dispatch({
          type: userConstant.GET_USER_ORDER_DETAILS_SUCCESS,
          payload: { order: res.data.order },
        });
      } else {
        dispatch({
          type: userConstant.GET_USER_ORDER_DETAILS_FAILURE,
          payload: { error: res.data.error },
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
};
