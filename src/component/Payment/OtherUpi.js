import React, { Component } from 'react';
import {toast} from 'react-toastify';
import {checkOutCartData, clearCartData} from "../../redux";
import {connect} from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getPaymentDetails, getOrder, getOrderDetail} from '../../redux/payment/paymentActions';

class OtherUpi extends Component {
    constructor(props){
        super(props)
        this.state = {
            shopId : localStorage.getItem('id') ,
            addressId : JSON.parse(localStorage.getItem('addedAddress')) ,
            couponApplied : JSON.parse(localStorage.getItem('coupon')) ,
            longitude : localStorage.getItem('longitude'),
            latitude : localStorage.getItem('latitude') ,
            vpa : ''
        }
    }
    
    handleChange = (e) =>{
        this.setState({[e.target.name] : e.target.value})
    }

    payment=()=>{
        var userData = {shopId : this.state.shopId, userLongitude: this.state.longitude, userLatitude: this.state.latitude ,addressId : this.props.deliverAddress.id , paymentType:'1' ,items : this.props.cartData.cartData}
        this.props.getPaymentDetails(userData).then(res=>{
            let response = res.value.data.data
            let data = {
                amount : response.razor_pay_order.amount ,
                currency: "INR" ,
                email: this.props.user.data.email ,
                contact: this.props.user.data.phoneNumber ,
                order_id: response.razor_pay_order.id ,
                method: 'upi' ,
                vpa : this.state.vpa
            }
            let orderId = response.razor_pay_order.orderId
            let razorpay = new window.Razorpay(data)
            razorpay.createPayment(data)
            razorpay.on('payment.success', ()=> {
                toast('Payment Success')
                return this.props.getOrder(orderId).then(res=>{
                
                    this.props.getOrderDetail(res.value.data.data)
                    this.props.clearCartData()
                    this.props.history.push('/track-order')
                }).catch((err)=>{
                    toast(err.response.data.message)
                })   
            });
            razorpay.on('payment.error', function(resp){toast(resp.error.description)})
                }).catch((err)=>{
                    toast(err.response.data.message)
                })
        }
    render() {
        return (
            <div class="tab-content">
                <div class="tab-pane active show">
                    <div class="list-payment-methods">
                        <div class="check-action-block-payment">
                            <div class="head-other-mathod">
                                <div class="block-bank-account-detail">
                                    <div class="block-content-smple">
                                        <label class="title">
                                            <img width="25" src="https://dev.gatoes.com/assets/images/upi.png" alt="Google Pay" /> 
                                            More UPI
                                        </label>
                                        <div class="option-netbanking upi-block">
                                            <div class="dropdown">
                                                <input placeholder="Enter UPI Address" name="vpa" onChange={this.handleChange} type="text" />
                                            </div>
                                            <div class="m-t20">
                                                <a href="javascript:void(0)" onClick={()=>this.payment()} class="w-100 btn btn2 loading ">Pay Now</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
      cartData : state.cart ,
      deliverAddress : state.address.deliverAddress ,
      user : state.login
    }
  }

const mapDispatchToProps = (dispatch)=>{
    return {
        checkOutCartData : (data)=>dispatch(checkOutCartData(data)) ,
        clearCartData : ()=>dispatch(clearCartData()) ,
        getPaymentDetails : (data)=>dispatch(getPaymentDetails(data)) ,
        getOrder : (data)=>dispatch(getOrder(data)) ,
        getOrderDetail : (data)=>dispatch(getOrderDetail(data))
    }
}


export default connect(mapStateToProps,mapDispatchToProps)(withRouter(OtherUpi))
