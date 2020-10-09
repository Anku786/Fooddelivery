import {LOGIN , UPDATE_PIN , LOGOUT} from './loginTypes'
const initialState = {
    user : {} 
}

const reducer = (state=initialState , action) =>{
    switch(action.type){
        case LOGIN : 
            return{
                ...state,
                data : action.payload
            }
        default :
        return state
        
    }
}

export default reducer