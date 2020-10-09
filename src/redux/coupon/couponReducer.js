import {ADD_COUPON, DELETE_COUPON} from './couponTypes';

const initialState = {
    coupon : []
}

export const couponReducer = (state=initialState , action) =>{
    switch(action.type){
        case ADD_COUPON :
            return {
                ...state ,
                coupon : action.payload
            }
        case DELETE_COUPON :
            return {
                ...state ,
                coupon : ''
            }
            
        default : return state
    }
}