import React, { Component } from 'react';
import {toast} from 'react-toastify';
import {checkOutCartData, clearCartData} from "../../redux";
import {connect} from 'react-redux';
import {withRouter } from 'react-router-dom';
import { bankDetails, getPaymentDetails, getOrder, getOrderDetail} from '../../redux/payment/paymentActions';

class GooglePay extends Component {
    constructor(props){
    super(props)
    this.state = {
        shopId : localStorage.getItem('id') ,
        addressId : JSON.parse(localStorage.getItem('addedAddress')) ,
        couponApplied : JSON.parse(localStorage.getItem('coupon')) ,
        longitude : localStorage.getItem('longitude'),
        latitude : localStorage.getItem('latitude') ,
        vpa : '',
        selectedOption : ''
    }
}

    componentDidMount(){
        this.props.bankDetails()
    }

    handleChange=(e)=>{
        this.setState({selectedOption : e.target.value})
    }

    onChange = (e) =>{
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
               vpa : `${this.state.vpa}@${this.state.selectedOption}`
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
            console.log('sas')
        })
    }
    render() {
        return (
            <div className="tab-content">
                <div className="tab-pane active show">
                    <div className="list-payment-methods">
                        <div className="check-action-block-payment tab-content-ui card-active">
                            <div className="head-other-mathod">
                                <div className="block-bank-account-detail">
                                    <div className="block-content-smple">
                                        <label className="heading">Google Pay</label>
                                        <div className="option-netbanking gpay-block">
                                            <div className="dropdown">
                                                <input placeholder="Enter UPI ID" name="vpa" type="text"  onChange={this.onChange} />
                                                </div>
                                                <div className="dropdown">
                                                    <select class="btn dropdown-toggle btn-default btn-light" onChange={this.handleChange}>
                                                        
                                                        <option value="okhdfcbank">okhdfcbank</option>
                                                        <option value="okicici">okicici</option>
                                                        <option value="oksbi">oksbi</option>
                                                        <option value="okaxis">okaxis</option>
                                                </select>
                                            </div>
                                            </div>
                                            <div className="m-t20">
                                                <a href="javascript:void(0)" onClick={()=>this.payment()} class="w-100 btn btn2 loading ">Pay Now</a>
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
        bankDetails : () => dispatch(bankDetails()) ,
        getOrder : (data)=>dispatch(getOrder(data)) ,
        getOrderDetail : (data)=>dispatch(getOrderDetail(data))
    }
}


export default connect(mapStateToProps,mapDispatchToProps)(withRouter(GooglePay))
