import axiosIntance from "../helpers/axios";
import { productConstant } from "./constants";

export const getProductsBySlug = (slug) => {
  return async (dispatch) => {
    dispatch({
      type: productConstant.GET_PRODUCT_BY_SLUG_REQUEST,
    });

    const res = await axiosIntance.get(`products/${slug}`);

    if (res.status === 200) {
      dispatch({
        type: productConstant.GET_PRODUCT_BY_SLUG_SUCCESS,
        payload: res.data,
      });
    } else {
      dispatch({
        type: productConstant.GET_PRODUCT_BY_SLUG_FAILURE,
        payload: {
          error: res.data.error,
        },
      });
    }
  };
};
export const getProductPage = (payload) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: productConstant.GET_PRODUCT_PAGE_REQUEST,
      });
      const { cid, type } = payload.params;
      const res = await axiosIntance.get(`/page/${cid}/${type}`);

      if (res.status === 200) {
        const { page } = res.data;
        dispatch({
          type: productConstant.GET_PRODUCT_PAGE_SUCCESS,
          payload: { page },
        });
      } else {
        const { error } = res.data;
        dispatch({
          type: productConstant.GET_PRODUCT_PAGE_FAILURE,
          payload: { error },
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
};
export const getProductDetailsById = (payload) => {
  return async (dispatch) => {
    dispatch({
      type: productConstant.GET_PRODUCT_DETAILS_BY_ID_REQUEST,
    });
    let res;
    try {
      const { productId } = payload.params;
      res = await axiosIntance.get(`/product/${productId}`);
      dispatch({
        type: productConstant.GET_PRODUCT_DETAILS_BY_ID_SUCCESS,
        payload: {
          productDetails: res.data.product,
        },
      });
    } catch (error) {
      console.log(error);
      dispatch({
        type: productConstant.GET_PRODUCT_DETAILS_BY_ID_FAILURE,
        payload: {
          error: res.data.error,
        },
      });
    }
  };
};
export const addComment = (payload) => {
  return async (dispatch) => {
    dispatch({ type: productConstant.CREATE_COMMENT_PRODUCT_REQUEST });
    let res;
    try {
      res = await axiosIntance.post(`/product/comments/post`, payload);
      dispatch({ type: productConstant.CREATE_COMMENT_PRODUCT_SUCCESS });
      const payloadGetComment = {
        params: { productId: payload.productId },
      };
      dispatch(getComment(payloadGetComment));
    } catch (error) {
      console.log(error);
      dispatch({
        type: productConstant.CREATE_COMMENT_PRODUCT_ERROR,
        payload: {
          error: res.data.error,
        },
      });
    }
  };
};
export const getComment = (payload) => {
  return async (dispatch) => {
    dispatch({ type: productConstant.GET_COMMENT_PRODUCT_REQUEST });
    let res;
    try {
      const { productId } = payload.params;
      console.log(productId);
      res = await axiosIntance.get(`/product/comments/${productId}`);
      dispatch({
        type: productConstant.GET_COMMENT_PRODUCT_SUCCESS,
        payload: { comments: res.data.comments },
      });
    } catch (error) {
      dispatch({
        type: productConstant.GET_COMMENT_PRODUCT_FAILURE,
        payload: {
          error: res.data.error,
        },
      });
    }
  };
};
