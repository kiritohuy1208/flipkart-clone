import { productConstant } from "../actions/constants";

const initialState = {
  products: [],
  priceRanger: {},
  // productsByPrice: {
  //     under5k : [],
  //     under10k: [],
  //     under15k: [],
  //     under20k: [],
  //     under30k: []
  // },
  productsByPrice: {},
  pageRequest: false,
  loading: false,
  page: {},
  error: null,
  productDetails: {},
  comments: [],
};
const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case productConstant.GET_PRODUCT_BY_SLUG_SUCCESS: {
      state = {
        ...state,
        products: action.payload.products,
        productsByPrice: {
          // Tách các underprice trong productsByprice thành cách mảng riêng biệt
          ...action.payload.productsByPrice,
        },
        priceRanger: action.payload.priceRanger,
      };
      break;
    }
    //-------------Get page product--------------------------
    case productConstant.GET_PRODUCT_PAGE_REQUEST: {
      state = {
        ...state,
        pageRequest: true,
      };

      break;
    }
    case productConstant.GET_PRODUCT_PAGE_SUCCESS: {
      state = {
        ...state,
        pageRequest: false,
        page: action.payload.page,
      };

      break;
    }
    case productConstant.GET_PRODUCT_PAGE_FAILURE: {
      state = {
        ...state,
        pageRequest: false,
        error: action.payload.error,
      };

      break;
    }
    //-----------Get product details page ---------------
    case productConstant.GET_PRODUCT_DETAILS_BY_ID_REQUEST: {
      state = {
        ...state,
        loading: true,
      };

      break;
    }
    case productConstant.GET_PRODUCT_DETAILS_BY_ID_SUCCESS: {
      state = {
        ...state,
        loading: false,
        productDetails: action.payload.productDetails,
      };

      break;
    }
    case productConstant.GET_PRODUCT_DETAILS_BY_ID_FAILURE: {
      state = {
        ...state,
        loading: false,
        error: action.payload.error,
      };

      break;
    }
    //-----------Create Comment------------
    case productConstant.CREATE_COMMENT_PRODUCT_REQUEST: {
      state = {
        ...state,
        loading: true,
      };

      break;
    }
    case productConstant.CREATE_COMMENT_PRODUCT_SUCCESS: {
      state = {
        ...state,
        loading: false,
      };

      break;
    }
    case productConstant.CREATE_COMMENT_PRODUCT_ERROR: {
      state = {
        ...state,
        loading: false,
        error: action.payload.error,
      };
      break;
    }
    //-----------Get Comment ---------------
    case productConstant.GET_COMMENT_PRODUCT_REQUEST: {
      state = {
        ...state,
        loading: true,
      };
      break;
    }
    case productConstant.GET_COMMENT_PRODUCT_SUCCESS: {
      state = {
        ...state,
        loading: false,
        comments: action.payload.comments,
      };

      break;
    }
    case productConstant.GET_COMMENT_PRODUCT_FAILURE: {
      state = {
        ...state,
        loading: false,
        error: action.payload.error,
      };

      break;
    }
    default:
      return state;
  }
  return state;
};
export default productReducer;
