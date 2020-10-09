import {SHOP_DATA} from './shopTypes'
const initialState = {
    shops : {}
}

const reducer = (state=initialState , action) =>{
    switch(action.type){
        case SHOP_DATA : 
            return{
                ...state,
                shops : action.payload
            }
        default :
        return state
        
    }
}

export default reducer