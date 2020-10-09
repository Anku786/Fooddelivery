import {PAYMENT_DATA , PAYMENT, BANK_DETAILS, BANK, ORDER, ORDER_DATA} from './paymentTypes'
import axios from 'axios'


export const getPaymentDetails = (data) =>{
        const paymentdata = axios({
            method:'post',
            url:'https://devapi.gatoes.com/payment/initiatePayment',
            headers : {
                'contentlanguage': 'en',
                'Accept' : 'application/json',
                'authorization': 'Bearer '+localStorage.getItem('jwt'),
                'utcoffset' : -420,
                'devicetype':'WEB'
            },
            data : data
        });
        return {
            type : PAYMENT,
            payload : paymentdata
        }
    }

export function paymentData(data){
    console.log('data',data)
    return{
        type : PAYMENT_DATA,
        payload : data
    }
}

export function getOrder(orderId){
    const Orderdata = axios({
        method:'get',
        url:`https://devapi.gatoes.com/user/getOrderDetail?orderId=${orderId}`,
        headers : {
            'contentlanguage': 'en',
            'Accept' : 'application/json',
            'authorization': 'Bearer '+localStorage.getItem('jwt'),
            'utcoffset' : -420,
            'devicetype':'WEB'
        }
    });
    return {
        type : ORDER,
        payload : Orderdata
    }
}

export function getOrderDetail(orderData){
    return {
        type : ORDER_DATA ,
        payload : orderData
    }
}

export const bankDetails = () =>{
    return(dispatch)=>{
    let bankDetails = new window.Razorpay({
        key: 'rzp_test_jsNRU2yOa8SB2R',
          // logo, displayed in the popup
        image: 'https://i.imgur.com/n5tjHFD.png',
      });
      bankDetails.once('ready', function(response) {
        console.log('bank',response.methods);
        dispatch(bankData(response.methods))
      })
    return {
        type : BANK
    }
}
}


export function bankData(data){
    console.log('data',data)
    return{
        type : BANK_DETAILS,
        payload : data
    }
}

