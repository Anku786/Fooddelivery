import {ADDRESS,DELIVERY_ADDRESS, CLEAR} from './addressTypes'
import axios from 'axios'

export const getaddress = () =>{
    console.log('done')
    return (dispatch) => {
        return axios({
        method:'get',
        url:'https://devapi.gatoes.com/user/getAllAddress',
        headers : {
            'contentlanguage': 'en',
            'Accept' : 'application/json',
            authorization: "Bearer " + localStorage.getItem("jwt")
        }
    })
        .then(res=>{
            console.log(res.data)
            dispatch(getAddressData(res.data.data))
        }).catch((err)=>{
            console.log(err)
        
    });
   
}}

export function getAddressData(data){
    return{
        type : ADDRESS,
        payload : data
    }
}

export function delivery(data){
    return {
        type : DELIVERY_ADDRESS ,
        payload : data
    }
}

export function clear(){
    return {
        type : CLEAR 
    }
}

