import {LOGIN, LOG} from './loginTypes'
import axios from 'axios'



export const login = (formValue) =>{
        console.log('form',formValue)
    const data = axios({
            method:'post',
            url:'https://devapi.gatoes.com/user/login',
            headers : {'contentlanguage' : 'en',
            'Accept' : 'application/json',
        'devicetype' :'WEB'},
            data : formValue
        });
        return {
            type : LOG,
            payload : data
        }
    }
   

export function userData(data){
    return{
        type : LOGIN,
        payload : data
    }
}
