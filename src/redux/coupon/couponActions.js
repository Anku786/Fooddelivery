import axios from 'axios'
import { toast } from 'react-toastify'

export const addC = (data) => {
    console.log('okok',data.state.coupon)
    return (dispatch) => {
   return axios({
        method:'get',
        url:`https://devapi.gatoes.com/user/getCart?shopId=${data.state.shopId}&userLongitude=${data.state.longitude}&userLatitude=${data.state.latitude}&items=${data.items}&couponCode=${data.state.coupon}`,
        headers : {
            'contentlanguage': 'en',
            'Accept' : 'application/json',
            authorization: "Bearer " + localStorage.getItem("jwt"),
            'utcoffset':-420
        }
    })
    .then(res=>{
        console.log('aws',res.data.data)
        dispatch(addCoupon(res.data.data))
        toast('Coupon added')
    }).catch((err)=>{
        toast(err.response.data.message)
    })
}
}

export const addSelectedCoupon = (data) =>{
    return (dispatch) => {
        return axios({
             method:'get',
             url:`https://devapi.gatoes.com/user/getCart?shopId=${data.state.shopId}&userLongitude=${data.state.longitude}&userLatitude=${data.state.latitude}&items=${data.items}&couponCode=${data.couponId}`,
             headers : {
                 'contentlanguage': 'en',
                 'Accept' : 'application/json',
                 authorization: "Bearer " + localStorage.getItem("jwt"),
                 'utcoffset':-420
             }
         })
         .then(res=>{
             console.log('aws',res.data.data)
             dispatch(addCoupon(res.data.data))
             toast('Coupon added')
         }).catch((err)=>{
             console.log(err)
         })
     }
}

export function addCoupon (data){
    return {
        type : 'ADD_COUPON',
        payload : data
    }
}

export function deleteCoupon (){
    return {
        type : 'DELETE_COUPON'
    }
}