import {ADD_ITEM, DELETE_ITEM, ADD_QUANTITY, CART_DETAIL, CLEAR_CART_DATA} from './cartTypes'

const initialState = {
    cartData : [] ,
    total : 0 ,
    checkOutCart : [] ,
    timeStamp : ''
}

export const cartReducer = (state=initialState , action) =>{
    switch(action.type){
        case ADD_ITEM :
            console.log('actin',action)
        let existedItem = state.cartData.find(item =>item.id === action.payload.id)
        if(existedItem){
            action.payload.quantity +=1 
            return {
                ...state ,
                total :  state.total + action.payload.price
            }
        }
        else{
            action.payload.quantity = 1
            let newTotal = state.total + action.payload.price
            return{
                ...state,
                cartData : state.cartData.concat(action.payload),
                total : newTotal
            }
        }
                
            
        case DELETE_ITEM : 
            let deleteItem = state.cartData.find(cartData=>cartData.id === action.payload.id)
            let filterItem = state.cartData.filter(cartData=>cartData.id !== action.payload.id)
            if(deleteItem.quantity === 1)
            {
                action.payload.quantity = 1
                return {
                    ...state ,
                    cartData : filterItem ,
                    checkOutCart : filterItem,
                    total : 0
                }

            }
            else {
        return{         
            ...state ,
            cartData : state.cartData.map(cartData => cartData.id === action.payload.id ? {...cartData ,
                 quantity: action.payload.quantity ? action.payload.quantity -1 : 0}
                : cartData) ,
                total : state.total - action.payload.price
        }
    }  

        case ADD_QUANTITY :
            let newTotal = state.total + action.payload.price
            return{
                
                ...state ,
                cartData : state.cartData.map(cartData => cartData.id === action.payload.id ? {...cartData ,
                     quantity: action.payload.quantity ? action.payload.quantity +1 : 1}
                    : cartData) ,
                total : newTotal
            }
        case CART_DETAIL :
            return {
                ...state ,
                checkOutCart : action.payload ,
                
            }
        case CLEAR_CART_DATA :
            return {
                ...state ,
                cartData : [] ,
                checkOutCart : [] ,
                total : 0
            }
            
        default : return state
    }
}