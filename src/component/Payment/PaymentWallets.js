import React, { Component } from 'react';
import {toast} from 'react-toastify';
import {checkOutCartData, clearCartData} from "../../redux";
import {connect} from 'react-redux';
import {withRouter } from 'react-router-dom';
import {bankDetails, getPaymentDetails, getOrder, getOrderDetail} from '../../redux/payment/paymentActions';

class PaymentWallets extends Component {
    constructor(props){
        super(props)
        this.state = {
            shopId : localStorage.getItem('id') ,
            addressId : JSON.parse(localStorage.getItem('addedAddress')) ,
            couponApplied : JSON.parse(localStorage.getItem('coupon')) ,
            longitude : localStorage.getItem('longitude'),
            latitude : localStorage.getItem('latitude') ,
            wallet : '' 
        }
    }

    handleOptionChange = (event) => {
        this.setState({
          wallet: event.target.value,
        });
      };

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
               method: 'wallet' ,
               wallet : this.state.wallet
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
                        <div class="check-action-block-payment banking-ui">
                            <div class="head-other-mathod">
                                <div class="block-bank-account-detail">
                                    <div class="block-content-smple">
                                        <div class="option-netbanking">
                                            <div class="net-banking-list">
                                                <ul>
                                                    {this.props.bankData.mobikwik === true ?
                                                    <li>
                                                        <div class="custom-radio-ui">
                                                            <label>
                                                                <input class="option-input" type="radio" name="wallet-list" value="mobikwik" 
                                                                checked={this.state.wallet === "mobikwik"}
                                                                onChange={this.handleOptionChange} />
                                                                <span class="filter-input">
                                                                    <img width="25" src="https://cdn.razorpay.com/wallet-sq/mobikwik.png" alt="" />
                                                                    <span>mobikwik</span>
                                                                </span>
                                                            </label>
                                                        </div>
                                                    </li>
                                                    :<h2></h2>}
                                                    {this.props.bankData.payzapp === true ?
                                                    <li>
                                                        <div class="custom-radio-ui">
                                                            <label>
                                                                <input class="option-input" type="radio" name="wallet-list" value="payzapp"  
                                                                checked={this.state.wallet === "payzapp"}
                                                                onChange={this.handleOptionChange} />
                                                                <span class="filter-input">
                                                                    <img width="25" src="https://cdn.razorpay.com/wallet-sq/payzapp.png" alt="" />
                                                                    <span>payzapp</span>
                                                                </span>
                                                            </label>
                                                        </div>
                                                    </li>
                                                    :<h2></h2>}
                                                    {this.props.bankData.olamoney === true ?
                                                    <li>
                                                        <div class="custom-radio-ui">
                                                            <label>
                                                                <input class="option-input" type="radio" name="wallet-list" value="olamoney"  
                                                                checked={this.state.wallet === "olamoney"}
                                                                onChange={this.handleOptionChange} />
                                                                <span class="filter-input">
                                                                    <img width="25" src="https://cdn.razorpay.com/wallet-sq/olamoney.png" alt="" />
                                                                    <span>olamoney</span>
                                                                </span>
                                                            </label>
                                                        </div>
                                                    </li>
                                                    :<h2></h2>}
                                                    {this.props.bankData.airtelmoney === true ?
                                                    <li>
                                                        <div class="custom-radio-ui">
                                                            <label>
                                                                <input class="option-input" type="radio" name="wallet-list" value="airtelmoney"  
                                                                checked={this.state.wallet === "airtelmoney"}
                                                                onChange={this.handleOptionChange}/>
                                                                <span class="filter-input">
                                                                    <img width="25" src="https://cdn.razorpay.com/wallet-sq/airtelmoney.png" alt="" />
                                                                    <span>airtelmoney</span>
                                                                </span>
                                                            </label>
                                                        </div>
                                                    </li>
                                                    :<h2></h2>}
                                                    {this.props.bankData.freecharge === true ?
                                                    <li>
                                                        <div class="custom-radio-ui">
                                                            <label>
                                                                <input class="option-input" type="radio" name="wallet-list" value="freecharge"  
                                                                checked={this.state.wallet === "freecharge"}
                                                                onChange={this.handleOptionChange}/>
                                                                <span class="filter-input">
                                                                    <img width="25" src="https://cdn.razorpay.com/wallet-sq/freecharge.png" alt="" />
                                                                    <span>freecharge</span>
                                                                </span>
                                                            </label>
                                                        </div>
                                                    </li>
                                                    :<h2></h2>}
                                                    {this.props.bankData.jiomoney === true ?
                                                    <li>
                                                        <div class="custom-radio-ui">
                                                            <label>
                                                                <input class="option-input" type="radio" name="wallet-list" value="jiomoney"  
                                                                checked={this.state.wallet === "jiomoney"}
                                                                onChange={this.handleOptionChange}/>
                                                                <span class="filter-input">
                                                                    <img width="25" src="https://cdn.razorpay.com/wallet-sq/jiomoney.png" alt="" />
                                                                    <span>jiomoney</span>
                                                                </span>
                                                            </label>
                                                        </div>
                                                    </li>
                                                    :<h2></h2>}
                                                    {this.props.bankData.phonepe === true ?
                                                    <li>
                                                        <div class="custom-radio-ui">
                                                            <label>
                                                                <input class="option-input" type="radio" name="wallet-list" value="phonepe"  
                                                                checked={this.state.wallet === "phonepe"}
                                                                onChange={this.handleOptionChange}/>
                                                                <span class="filter-input">
                                                                    <img width="25" src="https://cdn.razorpay.com/wallet-sq/phonepe.png" alt="" />
                                                                    <span>phonepe</span>
                                                                </span>
                                                            </label>
                                                        </div>
                                                    </li>
                                                    :<h2></h2>}
                                                </ul>
                                            </div>
                                        </div>
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
        )
    }
}

const mapStateToProps = (state) => {
    return {
      cartData : state.cart ,
      deliverAddress : state.address.deliverAddress ,
      user : state.login ,
      bankData : state.payment.bankData.wallet
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


export default connect(mapStateToProps,mapDispatchToProps)(withRouter(PaymentWallets))
