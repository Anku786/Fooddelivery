import React, { Component } from 'react';
import Map from './Map';
import AllHeader from '../../AllHeader';
import {connect} from 'react-redux';
import axios from 'axios';
import {cartDetail} from "../../redux";
import { withRouter , Link} from 'react-router-dom';

class TrackOrder extends Component {
    constructor(){
        super()
        this.state = {
            latitude : localStorage.getItem('latitude'),
            longitude : localStorage.getItem('longitude') ,
            finalCartData : JSON.parse(localStorage.getItem('finalCartData')) ,
            method : localStorage.getItem('method')
        }
    }

    cancelOrder = () =>{
        axios({
            method:'post',
            url:'https://devapi.gatoes.com/user/cancelorder',
            headers : {
                'contentlanguage': 'en',
                'Accept' : 'application/json',
                authorization: "Bearer " + localStorage.getItem("jwt")
            },
            data : {orderId : this.props.orderData.order.orderId}
        })
        .then(res=>{
            this.props.history.push('/profile')
        }).catch((err)=>{
            console.log(err)
        })
    }

    render() {
        const finalCartData = this.props.orderData
        return (
            <div className="content-wrapper">
                <AllHeader />
                <div class="breadcrum-ui">
                    <div class="container">
                        <div class="row">
                            <div class="col-sm-12">
                                <div class="breadcrum-content-ui">
                                    <ul>
                                        <li>
                                            <Link to="/profile">
                                                <span class="icon-ic-arrow-left"></span>
                                                Back to all order
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {finalCartData ? 
                <div className="track-order-ui">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-8 col-md-12">
                                <div className="row tracking-step-ui">
                                    <div className="col-md-12">
                                        <div class="top-heading">
                                            <div class="left-sec">
                                                <label>ORDER #{finalCartData.order.orderId} </label>
                                                <p>{finalCartData.restaurant.shopName}</p>
                                            </div>
                                            <div class="right-sec"></div>
                                        </div>
                                    </div>
                                    <div className="col-md-12 col-lg-5">
                                        <div class="step-ui-block">
                                            <div class="step-ui in-progress">
                                                <figure>
                                                    <img src="https://dev.gatoes.com/assets/images/order-icon.svg" alt="" />
                                                </figure>
                                                <figcaption class="">
                                                    <h4>Waiting for confirmation</h4>
                                                    <div class="track-address respo-none">
                                                        <h5>Delivery Address</h5>
                                                        <p>{finalCartData.deliveryAddress.address}</p>
                                                    </div>
                                                </figcaption>
                                            </div>
                                            <div class="step-ui in-progress">
                                                <figure>
                                                    <img src="https://dev.gatoes.com/assets/images/food-prepration.svg" alt="" />
                                                    <span class="check-icon"></span>
                                                </figure>
                                            </div>
                                            <div class="step-ui in-progress">
                                                <figure>
                                                    <img src="https://dev.gatoes.com/assets/images/bike.svg" alt="" />
                                                </figure>
                                                <figcaption class="enroute-content-ui">
                                                    <div class="track-address">
                                                        <h5>Delivery Address</h5>
                                                        <p></p>
                                                    </div>
                                                </figcaption>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-7 col-lg-7 respo-none">
                                        <div className="map-ui">
                                            <div style={{height: '400px', width: '400px'}}>
                                                <div style={{height: '100%', width: '100%', position: 'absolute', top: '0px', left: '0px', backgroundColor: 'rgb(229, 227, 223)'}}>
                                                    <div class="gm-style" style={{position: 'absolute', left: '0px', top: '0px', height: '100%', width: '100%', padding: '0px', borderWidth: '0px', margin: '0px'}}>
                                                        <Map latitude={finalCartData.deliveryAddress.latitude} longitude={finalCartData.deliveryAddress.longitude}/>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-12 col-lg-4">
                                <div class="order-summry-ui">
                                    <div class="summary-heading">Order Summary</div>
                                    {finalCartData.items ? 
                                    <div class="summary-content-ui">
                                        <div class="summary-listing-ui">
                                        {finalCartData.items.map(item=>{
                                            return (
                                                <div class="order-list-ui">
                                                    <div class="left-ui">
                                                        <div class="v-icon"></div>
                                                            <h5>{item.itemName}</h5>
                                                            <p>{item.currencySymbol}{item.price} x {item.quantity}</p>
                                                        </div>
                                                    <div class="right-ui">
                                                        <p class="price">{item.currencySymbol}{item.cartPrice}</p>
                                                </div>
                                            </div>
                                            )
                                        })}
                                        </div>
                                        <div class="total-item-ui">
                                            <div class="total-ui">
                                                <div class="left-ui">Item Total</div>
                                                <div class="right-ui">₹{finalCartData.order.itemTotal}</div>
                                            </div>
                                            <div class="total-ui">
                                                <div class="left-ui">Delivery Charge</div>
                                                <div class="right-ui">{finalCartData.order.currencySymbol}{finalCartData.order.deliveryCharge}</div>
                                            </div>
                                            <div class="total-ui">
                                                <div class="left-ui">Total Tax</div>
                                                <div class="right-ui">{finalCartData.order.currencySymbol}{finalCartData.order.totalTax}</div>
                                            </div>
                                        </div>
                                        <div class="total-amount-ui">
                                            <div class="amount-ui">
                                                <div class="left-ui">Total Amount</div>
                                                <div class="right-ui">{finalCartData.order.currencySymbol}{finalCartData.order.totalPrice}</div>
                                            </div>
                                            <p class="paymet-type-ui">Paid via 
                                                <a href="javascript:void(0);">{this.state.method}</a>
                                            </p>
                                            <a href="javascript:void(0);" onClick={()=>this.cancelOrder()} class="cancel-btn">Cancel</a>
                                        </div>
                                    </div>
                                    :<h2></h2>}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            :<h2></h2>}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
      cartData : state.cart ,
      orderData : state.payment.orderData
    }
  }
const mapDispatchToProps = (dispatch) => {
    return {
        cartDetail: (cartData) => dispatch(cartDetail(cartData))
    }
}


export default  connect(mapStateToProps, mapDispatchToProps) (withRouter(TrackOrder))
