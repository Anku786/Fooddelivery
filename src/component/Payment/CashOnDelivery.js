import React, { Component } from 'react';
import {checkOutCartData, clearCartData} from "../../redux";
import {connect} from 'react-redux';
import {withRouter } from 'react-router-dom';
import { getPaymentDetails, paymentData , getOrder, getOrderDetail } from '../../redux/payment/paymentActions';

 class CashOnDelivery extends Component {
    constructor(props){
        super(props)
        this.state = {
            shopId : localStorage.getItem('id') ,
            addressId : JSON.parse(localStorage.getItem('addedAddress')) ,
            modal : false ,
            couponApplied : JSON.parse(localStorage.getItem('coupon')) ,
            longitude : localStorage.getItem('longitude'),
            latitude : localStorage.getItem('latitude') ,
            selectedOption: ""
        }
    }
    payment=()=>{
        var userData = {shopId : this.state.shopId, userLongitude: this.state.longitude, userLatitude: this.state.latitude ,addressId : this.props.deliverAddress.id , paymentType:'0' ,items : this.props.cartData.cartData}
        this.props.getPaymentDetails(userData).then(res=>{
            localStorage.setItem('orderId',res.value.data.data.orderId)
            const orderId = localStorage.getItem('orderId')
            return this.props.getOrder(orderId).then(res=>{
                this.props.getOrderDetail(res.value.data.data)
                this.props.clearCartData()
                this.props.history.push('/track-order')
           })   
        })
        .catch((err)=>{
            console.log('sas',err.response)
        })
    }
    render() {
        return (
                <div className="tab-content">
                    <div class="tab-pane active show">
                        <div class="panel panel-default">
                            <div class="panel-heading">
                                <h4 class="panel-title">
                                    <a data-toggle="collapse" data-parent=".tab-pane" href="#collapsesix">
                                        <span class="icon-ic_delivery"></span>
                                        Pay on Delivery
                                    </a>
                                </h4>
                            </div>
                            <div id="collapsesix" class="panel-collapse collapse">
                                <div class="panel-body tab-content-ui">
                                    <div class="cod-ui">
                                        <figure>
                                            <img src="https://dev.gatoes.com/assets/images/ic_cash.png" alt="" />
                                        </figure>
                                        <div class="heading">
                                            Cash on delivery
                                        </div>
                                        <p>Pay once you got order at you home</p>
                                        {this.state.couponApplied ? 
                                            <button class="btn btn2" onClick={()=>this.payment()}>Place Order ₹ {this.state.couponApplied.totalPrice}</button>
                                        :
                                            <button class="btn btn2" onClick={()=>this.payment()}>Place Order ₹ {this.props.cartData.checkOutCart.totalPrice}</button>
                                        }
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
        paymentData : (data)=>dispatch(paymentData(data)) ,
        getOrder : (data)=>dispatch(getOrder(data)) ,
        getOrderDetail : (data)=>dispatch(getOrderDetail(data))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(withRouter(CashOnDelivery))