import {ADD_ITEM ,DELETE_ITEM ,ADD_QUANTITY, CART_DETAIL, CLEAR_CART_DATA } from './cartTypes'
import axios from 'axios'

export const cart = (cartData) =>{
    console.log('dada',cartData)
    return {
        type : ADD_ITEM ,
        payload : cartData 
    }
}

export const addQuantity = (id) =>{
    console.log('id',id)
    return {
        type : ADD_QUANTITY ,
        payload : id
    }

}

export const deleteCart = (cartData) =>{
    console.log('del',cartData)
    return {
        type : DELETE_ITEM ,
        payload : cartData
    }
}

export const cartDetail = (cartData) =>{
    console.log('carr',cartData)
    return (dispatch) => {
    //     if(cartData.addressId ){
    //         return axios({
    //         method:'get',
    //         url:`https://devapi.gatoes.com/user/getCart?shopId=${cartData.shopId}&userLongitude=${cartData.longitude}&userLatitude=${cartData.latitude}&items=${cartData.items}&addressId=${cartData.addressId}`,
    //         headers : {
    //             'contentlanguage': 'en',
    //             'Accept' : 'application/json',
    //             authorization : "Bearer " + localStorage.getItem("jwt"),
    //             'utcoffset':-420
    //         },
            
    //     })
    //     .then(res=>{
    //         console.log('rat',res.data.data)
    //         dispatch(checkOutCartData(res.data.data))
    //     }).catch(err=>{
    //         console.log(err)
    //     })
    // }
    //         else{
    return axios({
        method:'get',
        url:`https://devapi.gatoes.com/user/getCart?shopId=${cartData.shopId}&userLongitude=${cartData.longitude}&userLatitude=${cartData.latitude}&items=${cartData.items}`,
        headers : {
            'contentlanguage': 'en',
            'Accept' : 'application/json',
            authorization : "Bearer " + localStorage.getItem("jwt"),
            'utcoffset':-420
        },
        
    })
    .then(res=>{
        console.log('rat',res.data.data)
        dispatch(checkOutCartData(res.data.data))
    }).catch(err=>{
        console.log(err)
    })
    }
}
    // }

    export const finalCartDetail = (cartData) =>{
        console.log('carr',cartData)
        return (dispatch) => {
        return axios({
            method:'get',
            url:`https://devapi.gatoes.com/user/getCart?shopId=${cartData.shopId}&userLongitude=${cartData.longitude}&userLatitude=${cartData.latitude}&items=${cartData.items}&addressId=${cartData.addressId}`,
            headers : {
                'contentlanguage': 'en',
                'Accept' : 'application/json',
                authorization : "Bearer " + localStorage.getItem("jwt"),
                'utcoffset':-420
            },
            
        })
        .then(res=>{
            console.log('rat',res.data.data)
            dispatch(checkOutCartData(res.data.data))
        }).catch(err=>{
            console.log(err)
        })
        }
        }


export function checkOutCartData(data){
    console.log('data',data)
    return{
        type : CART_DETAIL,
        payload : data
    }
}

export function clearCartData(){
    return {
        type : CLEAR_CART_DATA 
    }
}
