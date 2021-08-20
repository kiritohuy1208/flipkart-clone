import { userConstant } from "../actions/constants";

const initialState = {
  loading: false,
  orderFetching: false,
  error: null,
  address: [],
  orders: [],
  orderDetails: {},
  placedOrderId: null,
};
const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case userConstant.GET_USER_ADDRESS_REQUEST: {
      state = {
        ...state,
        loading: true,
      };

      break;
    }
    case userConstant.GET_USER_ADDRESS_SUCCESS: {
      state = {
        ...state,
        loading: false,
        address: action.payload.address,
      };

      break;
    }
    case userConstant.GET_USER_ADDRESS_FAILURE: {
      state = {
        ...state,
        loading: false,
        error: action.payload.error,
      };

      break;
    }
    //---------------add user address--------
    case userConstant.ADD_USER_ADDRESS_REQUEST: {
      state = {
        ...state,
        loading: true,
      };
      break;
    }
    case userConstant.ADD_USER_ADDRESS_SUCCESS: {
      state = {
        ...state,
        loading: false,
        address: action.payload.address,
      };
      break;
    }
    case userConstant.ADD_USER_ADDRESS_FAILURE: {
      state = {
        ...state,
        loading: false,
        error: action.payload.error,
      };
      break;
    }
    // -----------add user order---------------
    case userConstant.ADD_USER_ORDER_REQUEST: {
      state = {
        ...state,
        orderFetching: true,
      };
      break;
    }
    case userConstant.ADD_USER_ORDER_SUCCESS: {
      state = {
        ...state,
        orderFetching: false,
        placedOrderId: action.payload.order._id,
      };
      break;
    }
    case userConstant.ADD_USER_ORDER_FAILURE: {
      state = {
        ...state,
        orderFetching: false,
        error: action.payload.error,
      };
      break;
    }
    // ------------get user orders---------------
    case userConstant.GET_USER_ORDER_REQUEST: {
      state = {
        ...state,
        orderFetching: true,
      };
      break;
    }
    case userConstant.GET_USER_ORDER_SUCCESS: {
      state = {
        ...state,
        orderFetching: false,
        orders: action.payload.orders,
      };
      break;
    }
    case userConstant.GET_USER_ORDER_FAILURE: {
      state = {
        ...state,
        orderFetching: false,
        error: action.payload.error,
      };
      break;
    }
    //-----------Get user order Details-------
    case userConstant.GET_USER_ORDER_DETAILS_REQUEST: {
      state = {
        ...state,
        orderFetching: true,
      };
      break;
    }
    case userConstant.GET_USER_ORDER_DETAILS_SUCCESS: {
      state = {
        ...state,
        orderFetching: false,
        orderDetails: action.payload.order,
      };
      break;
    }
    case userConstant.GET_USER_ORDER_DETAILS_FAILURE: {
      state = {
        ...state,
        orderFetching: false,
        error: action.payload.error,
      };
      break;
    }
    default:
      return state;
  }
  return state;
};
export default userReducer;
