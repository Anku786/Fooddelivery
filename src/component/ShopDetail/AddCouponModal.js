import React, { Component } from 'react'
import {  Modal} from 'react-bootstrap';
import axios from 'axios'
import {connect} from 'react-redux';
import { addC, addSelectedCoupon} from "../../redux";

class AddCouponModal extends Component {
    constructor(){
        super()
        this.state = {
            coupon : '',
            latitude : localStorage.getItem('latitude'),
            longitude : localStorage.getItem('longitude'),
            shopId : localStorage.getItem('id') ,
            couponDetail : ''
        }
    }

    onChange = (e) =>{
        this.setState({[e.target.name] : e.target.value})
    }

    componentDidMount(){
        axios({
            method:'get',
            url:`https://devapi.gatoes.com/user/getCouponList?shopId=${this.state.shopId}&serviceType=1`,
            headers : {
                'contentlanguage': 'en',
                authorization: "Bearer " + localStorage.getItem("jwt")
            }
        })
        .then(res=>{
            this.setState({couponDetail : res.data.data})
        }).catch((err)=>{
            console.log(err)
        })
    }

    applyCoupon = (e) =>{
        e.preventDefault()
        const data = {
            items : JSON.stringify(this.props.cartData) ,
            state : this.state
        }
        this.props.onHide()
        this.props.addC(data)
    }

    selectCoupon = (name) =>{
        const data = {
            items : JSON.stringify(this.props.cartData) ,
            state : this.state ,
            couponId : name
        }
        this.props.onHide()
        this.props.addSelectedCoupon(data)
    }
    
    render() {
        const {couponDetail} = this.state
        return (
                <Modal show={this.props.couponModal} onHide={this.props.onHide}>
                    <Modal.Header closeButton>
                        <h3 class="modal-title">Apply Coupon</h3>
                    </Modal.Header>
                    <Modal.Body>
                        <div>
                            <div class="modal-body">
                                <div class="modal-inner-block">
                                    <div class="popup-content-block">
                                        <div class="inner-content-modal apply-coupon-ui">
                                            <div class="">
                                                <form onSubmit={this.applyCoupon}>
                                                    <div class="apply-coupon">
                                                        <input type="text" name="coupon" onChange={this.onChange} value={this.state.coupon} class="text-field" placeholder="Enter coupon code" />
                                                        <input type="submit" class="btn-black" value="APPLY"  />
                                                        
                                                    </div>
                                                </form>
                                                {couponDetail ?

                                                couponDetail.coupons.length !=0 ?
                                                    <div class="available-coupons">
                                                        <h3>Available Coupons</h3>
                                                        <ul>
                                                            {couponDetail.coupons.map(coupon=>{
                                                                return(
                                                                    <li>
                                                                        <div class="offer-coupon-ui">
                                                                            <label class="offer-code-ui">{coupon.coupon}</label>
                                                                            <button class="copy-btn" onClick={()=>this.selectCoupon(coupon.coupon)}>Apply</button>
                                                                            <h6>{coupon.coupon}</h6>
                                                                            <p>{coupon.description}</p>
                                                                        </div>
                                                                    </li>
                                                                    )
                                                                })}
                                                        </ul>
                                                    </div>
                                                :
                                                <div class="cs-message-wrapper">
                                                    <div class="message-image-ui">
                                                        <img src="https://dev.gatoes.com/assets/images/ic_discounts_empty.png" alt="No Coupon" />
                                                    </div>
                                                    <div class="message-content-ui">
                                                        <h4 class="title">Empty Discount coupon</h4>
                                                        <p>You don’t have any Discount Coupon.</p>
                                                    </div>
                                                </div>
                                                :<h2></h2>}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Modal.Body>
                </Modal>
            )
        }
    }

const mapStateToProps = (state) => {
    return {
      cartData : state.cart.cartData
    }
  }
  const mapDispatchToProps = (dispatch) => {
    return {
      addC : (data) =>dispatch(addC(data)) ,
      addSelectedCoupon : (data) =>dispatch(addSelectedCoupon(data)) 
    };
  };


  export default connect(mapStateToProps,mapDispatchToProps)(AddCouponModal)