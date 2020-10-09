import {ADDRESS,DELIVERY_ADDRESS, CLEAR} from './addressTypes'
const initialState = {
    deliverAddress : [] ,
    address : []
}

const addressReducer = (state=initialState , action) =>{
    switch(action.type){
        case ADDRESS : 
            return{
                ...state,
                address : action.payload
            }
        case DELIVERY_ADDRESS :
            return {
                ...state ,
                deliverAddress : action.payload
            }
        case CLEAR :
            return {
                ...state ,
                deliverAddress : ''
            }
        default :
        return state
        
    }
}

export default addressReducer