import React, { Component } from 'react'
import Footer from '../../Footer'
import AllHeader from '../../AllHeader'
import LoginButton from '../../LoginButton'
import AddressModal from './AddressModal'
import CheckOutCart from './CheckOutCart'
import {connect} from 'react-redux';
import {Link,withRouter} from 'react-router-dom'
import Payment from '../Payment/Payment';
import { getaddress, delivery, clear, finalCartDetail } from "../../redux";
import { ToastContainer} from 'react-toastify';


class CheckOut extends Component {
    constructor(props){
        super(props)
        this.state = {
            addAddressModal : false ,
            deliverAddress : '' ,
            latitude : localStorage.getItem('latitude'),
            longitude : localStorage.getItem('longitude'),
            shopId : JSON.parse(localStorage.getItem('id')) ,
            items : JSON.stringify(this.props.cartData) ,
            place : localStorage.getItem('place')

        }
    }



    handleAddress = () =>{
        this.setState({addAddressModal : true})
    }

    closeAddAddressModal = () =>{
        this.setState({addAddressModal : false})
    }

    clear = () =>{
        this.props.clear()
    }

    selectDeliveryAddress = (adrs) =>{
        this.props.delivery(adrs)
        this.setState({deliverAddress : adrs.id})
        const  data = {
            shopId : this.state.shopId,
            longitude:this.state.longitude,
            latitude:this.state.latitude,
            items:this.state.items ,
            addressId : adrs.id
        }
        this.props.finalCartDetail(data)
    }

    render() {
        const {deliverAddress} = this.state
        return (
            <>
                <AllHeader />
                {this.props.cartData.length !=0 ?
                <div className="content-wrapper">
                    <div className="checkout-ui-block">
                        <div className="container">
                            <div className="row">
                                <div className="col-md-12 col-lg-8 l-custom-width">
                                    <div class="checkout-left-ui">
                                        <div class="heading-ui-block">
                                            Checkout
                                        </div>
                                        <div class="checkout-content-ui">
                                        {this.props.user.data ? 
                                            <div class="steps-ui step-one active">
                                                <div class="icon-ui">
                                                    <span class="icon-ui login-icon">
                                                        <img src="https://dev.gatoes.com/assets/images/ic_user_w.svg" />
                                                    </span>
                                                </div>
                                                
                                                <div class="step-detail-ui">
                                                    <h4>Logged in <img src="https://dev.gatoes.com/assets/images/ic_done.png" /></h4>
                                                    <div class="number-ui">
                                                        <p>{this.props.user.data.fullName}</p>
                                                        <span>{this.props.user.data.countryCode}-{this.props.user.data.phoneNumber}</span>
                                                        
                                                    </div>
                                                </div>
                                            </div>
                                            :
                                            <div class="steps-ui step-one in-progress">
                                                <div class="icon-ui">
                                                    <span class="icon-ui login-icon">
                                                        <img src="https://dev.gatoes.com/assets/images/ic_user_w.svg" />
                                                    </span>
                                                </div>
                                                <div class="step-detail-ui">
                                                    <h4>Account</h4>
                                                    <p>To place your order now, log in to your existing account or sign up.</p>
                                                    <div class="buttons-block">
                                                        <LoginButton />
                                                        {/* <a href="javascript: void(0);" onClick={this.handleClick} class="btn btn1">Login</a> */}
                                                    </div>
                                                </div>
                                            </div> 
                                            }

                                        {this.props.user.data ?
                                            <div class="steps-ui step-two in-progress">
                                                <div class="icon-ui">
                                                    <span class="icon-ui delivery-icon">
                                                        <img src="https://dev.gatoes.com/assets/images/ic_location_w.svg" />
                                                    </span>
                                                </div>
                                                <div class="step-detail-ui">
                                                {this.props.deliverAddress.length !=0  ? 
                                                <>
                                                    <h4>Choose a Delivery Address <img src="https://dev.gatoes.com/assets/images/ic_done.png" /></h4>
                                                    
                                                    
                                                        <a href="javascript:void(0)" onClick={()=>this.clear()} class="btn btn1 change-btn">Change</a>
                                                        
                                                            <div class="address-ui">
                                                                <h5>{this.props.deliverAddress.type}</h5>
                                                                <p>{this.props.deliverAddress.address}</p>
                                                                <div class="btns-block">
                                                                    {/* <span>15 Mins</span> */}
                                                                </div>
                                                            </div>
                                                        
                                                    </>
                                                    :
                                                    <>
                                                    
                                                    <h4>Choose a Delivery Address</h4>
                                                    <div class="address-field-block">
                                                      {this.props.address.length !==0 ?  
                                                      this.props.address.address.map(add=>{
                                                            return(
                                                        <div className="address-ui">
                                                            <span class="icon-ic_home_address"></span>
                                                            <h5>{add.type}</h5>
                                                            <p>{add.address}</p>
                                                            <div class="btns-block">
                                                                <a href="javascript:void(0)" class="btn btn2" onClick={()=>{this.selectDeliveryAddress(add)}}>Deliver here</a>
                                                            </div>
                                                        </div>
                                                         )
                                                    }):<h2></h2>}  
                                                    
                                                        <div class="add-address-btn-ui">
                                                            <a href="javascript:void(0);" onClick={this.handleAddress} class="btn btn1">ADD NEW ADDRESS</a>
                                                        </div>
                                                    </div>
                                                   
                                                    </>
                                                    }
                                                </div>
                                            </div>
                                           :
                                           <div class="steps-ui step-two">
                                               <div class="icon-ui">
                                                   <span class="icon-ui delivery-icon">
                                                       <img src="https://dev.gatoes.com/assets/images/ic_location_w.svg" />
                                                   </span>
                                                </div>
                                                <div class="step-detail-ui">
                                                    <h4>Delivery address</h4>
                                                </div>
                                            </div>} 
                                            {this.props.deliverAddress.length !=0 && this.props.user.data ? 

                                                <Payment />
                                            :
                                                <div class="steps-ui step-three">
                                                    <div class="icon-ui">
                                                        <span class="icon-ui payment-icon">
                                                            <img src="https://dev.gatoes.com/assets/images/ic_payment_w.svg" />
                                                        </span>
                                                    </div>
                                                    <div class="step-detail-ui">
                                                        <h4>Payment</h4>
                                                    </div>
                                                </div>
                                            }
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-12 col-lg-4 r-custom-width">
                                    <CheckOutCart addressId={deliverAddress}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                :
                    <div class="content-wrapper">
                        <div class="container">
                            <div class="cs-message-wrapper">
                                <div class="message-image-ui">
                                    <img src="https://dev.gatoes.com/assets/images/ic_cart_empty.png" alt="" />
                                </div>
                                <div class="message-content-ui">
                                    <h4 class="title">Something is missing here!</h4>
                                    <p>Wait! Noting in your cart yet? We know you can do this. It`s easy.</p>
                                    <Link class="btn cta-btn" to={this.state.place ? '/shops' : '/'}>Browse restaurants</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                }
                <Footer />
                <AddressModal addAddressModal={this.state.addAddressModal} onHide={this.closeAddAddressModal} />
                <ToastContainer />
        
            </>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user : state.login ,
        cartData : state.cart.cartData ,
        deliverAddress : state.address.deliverAddress ,
        address : state.address.address
    }
  }

const mapDispatchToProps = (disptach) =>{
    return {
        getaddress : ()=>{disptach(getaddress())} ,
        delivery : (data) =>{disptach(delivery(data))} ,
        clear : () =>{disptach(clear())} ,
        finalCartDetail : (data)=>{disptach(finalCartDetail(data))}

    }
}
  
  export default connect(mapStateToProps, mapDispatchToProps)(withRouter(CheckOut))
