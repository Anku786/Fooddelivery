import {combineReducers} from 'redux';

import loginReducer from './login/loginReducer';
import shopReducer from './shop/shopReducer';
import {cartReducer} from './cart/cartReducer';
import addressReducer from './address/addressReducer';
import {couponReducer} from './coupon/couponReducer';
import paymentReducer from './payment/paymentReducer';

const rootReducer = combineReducers({
    login : loginReducer ,
    shop : shopReducer ,
    cart : cartReducer  ,
    address : addressReducer ,
    coupon : couponReducer ,
    payment : paymentReducer
    
})

export default rootReducer;