import {SHOP_DATA , SHOP} from './shopTypes'
import axios from 'axios'


export const getRestaurants = (longitude,latitude) =>{
        const data = axios({
            method:'get',
            url:`https://devapi.gatoes.com/user/getRestaurants?userLongitude=${longitude}&userLatitude=${latitude}&needCard=true&serviceType=1`,
            headers : {'contentlanguage' : 'en',
            'authorization': 'Bearer '+localStorage.getItem('jwt'),
            'utcoffset' : -420}
        });
        return {
            type : SHOP,
            payload : data
        }
    }

export function shopData(data){
    console.log('data',data)
    return{
        type : SHOP_DATA,
        payload : data
    }
}

