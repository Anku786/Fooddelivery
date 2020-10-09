import {PAYMENT_DATA, BANK_DETAILS, ORDER_DATA} from './paymentTypes'
const initialState = {
    paymentData : {} ,
    bankData : {} ,
    orderData : {}
}

const paymentReducer = (state=initialState , action) =>{
    switch(action.type){
        case PAYMENT_DATA : 
            return{
                ...state,
                paymentData : action.payload
            }
        case BANK_DETAILS : 
            return{
                ...state,
                bankData : action.payload
            }
        case ORDER_DATA : 
            return{
                ...state,
                orderData : action.payload
            }
        default :
        return state
        
    }
}

export default paymentReducer