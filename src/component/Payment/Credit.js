import React, { Component } from 'react';
import {toast} from 'react-toastify';
import {checkOutCartData, clearCartData} from "../../redux";
import {connect} from 'react-redux';
import {withRouter } from 'react-router-dom';
import {getPaymentDetails, getOrder, getOrderDetail} from '../../redux/payment/paymentActions';

class Credit extends Component {
    constructor(props){
        super(props)
        this.state = {
            shopId : localStorage.getItem('id') ,
            addressId : JSON.parse(localStorage.getItem('addedAddress')) ,
            couponApplied : JSON.parse(localStorage.getItem('coupon')) ,
            longitude : localStorage.getItem('longitude'),
            latitude : localStorage.getItem('latitude') ,
            selectedOption: "" ,
            name : '',
            number : '',
            cvv : '',
            expiry : ''
        }
    }

    onChange = (e) =>{
        this.setState({[e.target.name] : e.target.value})    
    }
    netBanking = () =>{
        var userData = {shopId : this.state.shopId, userLongitude: this.state.longitude, userLatitude: this.state.latitude ,addressId : this.props.deliverAddress.id , paymentType:'1' ,items : this.props.cartData.cartData}
        this.props.getPaymentDetails(userData).then(res=>{
            let response = res.value.data.data
            var start = this.state.expiry.lastIndexOf('/')
            var end = this.state.expiry.length 
            var expiryMonth = this.state.expiry.substring(0, start);
            var expiryYear = this.state.expiry.substring(start+1);
            let data = {
               amount : response.razor_pay_order.amount ,
               currency: "INR" ,
               email: this.props.user.data.email ,
               contact: this.props.user.data.phoneNumber ,
               order_id: response.razor_pay_order.id ,
               method: 'card' ,
               "card[name]": this.state.name ,
               "card[number]": this.state.number ,
               "card[cvv]": this.state.cvv ,
               "card[expiry_month]": expiryMonth ,
               "card[expiry_year]": expiryYear
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
            <div class="tab-content">
                <div class="tab-pane active show">
                    <div class="list-payment-methods">
                        <div class="check-action-block-payment tab-content-ui">
                            <div class="head-other-mathod">
                                <div class="block-content-smple add-new-card">
                                    <label class="heading">Credit / Debit cards</label>
                                    <div class="add-card-v2">
                                        <div class="new-card-block-fields-v2">
                                            <div class="fields-new card-no-new">
                                                <label>Name on Card</label>
                                                <input type="text" class="form-control" name="name" onChange={this.onChange} value ={this.state.name} />
                                            </div>
                                            <div class="cc-number fields-new card-name-new ">
                                                <label>Card Number</label>
                                                <input type="tel" class="form-control" name="number" onChange={this.onChange} value ={this.state.number} autocomplete="cc-number" placeholder="•••• •••• •••• ••••" required="" />
                                            </div>
                                            <div class="fields-new card-expiry-new">
                                                <label>Expiry</label>
                                                <input autocomplete="cc-exp" type="tel" name="expiry" onChange={this.onChange} value ={this.state.expiry} placeholder="•• / ••" class="form-control" />
                                            </div>
                                            <div class="fields-new card-cvv-new">
                                                <label>CVV</label>
                                                <input autocomplete="off" name="cvv" onChange={this.onChange} value ={this.state.cvv} type="password" class="form-control" placeholder="•••" />
                                            </div>
                                            <div class="submit-card-action">
                                                <div class="btn-block ">
                                                    <a href="javascript:void(0)" onClick={()=>this.netBanking()} class="w-100 btn btn2 loading ">Pay Now</a>
                                                </div>
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

  export default connect(mapStateToProps,mapDispatchToProps)(withRouter(Credit))
