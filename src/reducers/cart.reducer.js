import { cartConstants } from "../actions/constants"

const initialState  = {
    // use object to easy get key of product (key is  _id of product, and value is infor of product)
    cartItems: {},
    updatingCart: false,
    error: null
}
var cartReducer = (state = initialState , action) => {

    switch(action.type){
        case cartConstants.ADD_TO_CART_REQUEST:{
            state={
                ...state,
                updatingCart: true,
             
            }
            break
        }
        case cartConstants.ADD_TO_CART_SUCCESS:{
            state={
                ...state,
                updatingCart: false,
                cartItems: 
                    action.payload.cartItems  
            }
            break
        }
        case cartConstants.ADD_TO_CART_FAILURE:{
            state={
                ...state,
                updatingCart: false,
                error: action.payload.error
            }
            break
        }   
        case cartConstants.RESET_CART:{
            state={
                ...initialState
            }
            break
        }     
        default:
             return state;
    } 
    return state
}
export default cartReducer