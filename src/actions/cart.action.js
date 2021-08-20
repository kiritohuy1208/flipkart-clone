import { cartConstants } from "./constants";
import axios from "../helpers/axios";
import store from "../store";

// it's really to update cartItems in store
const getCartItems = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: cartConstants.ADD_TO_CART_REQUEST });
      const res = await axios.post("/user/getCartItems");
      if (res.status === 200) {
        const { cartItems } = res.data;
        if (cartItems) {
          dispatch({
            type: cartConstants.ADD_TO_CART_SUCCESS,
            payload: { cartItems },
          });
        }
      }
    } catch (error) {
      dispatch({ type: cartConstants.ADD_TO_CART_FAILURE, payload: { error } });

      console.log(error);
    }
  };
};
// using store to get cart from store
export const addToCart = (product, newQty = 1) => {
  return async (dispatch) => {
    const {
      cart: { cartItems },
      auth,
    } = store.getState();
    // set qty of cart items
    const qty = cartItems[product._id] // if cart exited product in the cart
      ? parseInt(cartItems[product._id].qty + newQty)
      : 1;
    // create cartItems[product._id] ex:cartItems['6102b98c79e5290b389d4993']
    cartItems[product._id] = {
      ...product,
      qty,
    };
    // if user đã đăng nhập
    if (auth.authenticate) {
      dispatch({ type: cartConstants.ADD_TO_CART_REQUEST });
      const payload = {
        cartItems: [
          {
            product: product._id,
            // price: product.price,
            quantity: qty,
          },
        ],
      };

      const res = await axios.post("/user/cart/addtocart", payload);
      if (res.status === 201) {
        dispatch(getCartItems());
      }
    } else {
      localStorage.setItem("cart", JSON.stringify(cartItems));
    }
    dispatch({
      type: cartConstants.ADD_TO_CART_SUCCESS,
      payload: { cartItems },
    });
  };
};
export const updateCart = () => {
  return async (dispatch) => {
    const { auth } = store.getState();
    let cartItems = localStorage.getItem("cart")
      ? JSON.parse(localStorage.getItem("cart"))
      : null;
    // if user has been logged in
    if (auth.authenticate) {
      localStorage.removeItem("cart");
      if (cartItems) {
        const payload = {
          cartItems: Object.keys(cartItems).map((key, index) => {
            return {
              quantity: cartItems[key].qty,
              product: cartItems[key]._id,
              // price: cartItems[key].price,
            };
          }),
        };
        if (Object.keys(cartItems).length > 0) {
          const res = await axios.post("/user/cart/addtocart", payload);
          if (res.status === 201) {
            dispatch(getCartItems());
          }
        }
      } else {
        dispatch(getCartItems());
      }
    } else {
      if (cartItems) {
        dispatch({
          type: cartConstants.ADD_TO_CART_SUCCESS,
          payload: { cartItems },
        });
      }
    }
  };
};
export const removeCartItem = (payload) => {
  return async (dispatch) => {
    try {
      const { auth } = store.getState();
      let cartItems = localStorage.getItem("cart")
        ? JSON.parse(localStorage.getItem("cart"))
        : null;
      if (auth.authenticate) {
        dispatch({ type: cartConstants.REMOVE_CART_ITEM_REQUEST });
        const res = await axios.post("/user/cart/removeItem", { payload });
        if (res.status === 202) {
          dispatch({ type: cartConstants.REMOVE_CART_ITEM_SUCCESS });
          dispatch(getCartItems());
        } else {
          const { error } = res.data;
          dispatch({
            type: cartConstants.REMOVE_CART_ITEM_FAILURE,
            payload: { error },
          });
        }
      } else {
        if (cartItems) {
          const temp = {};
          Object.keys(cartItems).map((key) => {
            if (key !== payload.productId) {
              temp[key] = { ...cartItems[key] };
            }
          });
          localStorage.setItem("cart", JSON.stringify(temp));
          dispatch(updateCart());
        } else {
          localStorage.removeItem("cart");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
};
export { getCartItems };
