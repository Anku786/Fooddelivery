import React, { Component } from 'react'

import {connect} from 'react-redux';
import {withRouter } from 'react-router-dom';
import { Modal} from 'react-bootstrap';
import {checkOutCartData, clearCartData, bankDetails} from "../../redux";
import GooglePay from './GooglePay';
import CashOnDelivery from './CashOnDelivery';
import NetBanking from './NetBanking';
import BhimUpi from './BhimUpi';
import OtherUpi from './OtherUpi';
import Credit from './Credit';
import PaymentWallets from './PaymentWallets';

class Payment extends Component {
    constructor(props){
        super(props)
        this.state = {
            shopId : localStorage.getItem('id') ,
            addressId : JSON.parse(localStorage.getItem('addedAddress')) ,
            modal : false ,
            couponApplied : JSON.parse(localStorage.getItem('coupon')) ,
            longitude : localStorage.getItem('longitude'),
            latitude : localStorage.getItem('latitude') ,
            selectedOption: "" ,
            method : 'payOnDelivery'
        }
    }

    closeModal = () =>{
        this.setState({modal : false})
    }

    componentDidMount(){
        this.props.bankDetails()
    }

    selectMethod = (method) =>{
        if(method === 'payOnDelivery'){
            this.setState({method : 'payOnDelivery'})
            localStorage.setItem('method',method)
        }
        else if(method === 'Bhim'){
            this.setState({
                method : 'Bhim'
            })
            localStorage.setItem('method',method)
        }
        else if(method === 'netBanking'){
            this.setState({
                method : 'netBanking'
            })
            localStorage.setItem('method',method)
        }
        else if(method === 'gpay'){
            this.setState({
                method : 'gpay'
            })
            localStorage.setItem('method',method)
        }
        else if(method === 'otherUPI'){
            this.setState({
               method : 'otherUPI'
            })
            localStorage.setItem('method',method)
        }
        else if(method === 'wallet'){
            this.setState({
                method : 'wallet'
            })
            localStorage.setItem('method',method)
        }
        else{
            this.setState({
                method : 'credit'
            })
            localStorage.setItem('method',method)
        }
    }

    render() {
        return (
            <div className="steps-ui step-three in-progress">
                <div class="icon-ui">
                    <span class="icon-ui payment-icon">
                        <img src="https://dev.gatoes.com/assets/images/ic_payment_w.svg" />
                    </span>
                </div>
                <div className="step-detail-ui">
                    <h4>Payment</h4>
                    <div className="payment-tabs-ui">
                        <ul className="nav nav-tabs">
                            {this.props.validMethod.credit_card && this.props.validMethod.debit_card &&
                            <li>
                                <a href="javascript:void(0)" class={this.state.method === 'credit' ? "active show" : " "} value="credit" onClick={()=>this.selectMethod('credit')}>
                                    <span><img src="https://dev.gatoes.com/assets/images/ic_card.svg" alt="" /></span>
                                    Credit/Debit Cards
                                </a>
                            </li>
                            }
                            {this.props.validMethod.netbanking && 
                            <li>
                                <a href="javascript:void(0)" class={this.state.method === 'netBanking' ? "active show" : " "} value="netBanking" onClick={()=>this.selectMethod('netBanking')}>
                                    <span><img src="https://dev.gatoes.com/assets/images/ic_banking.svg" alt="" /></span>
                                    Net Banking
                                </a>
                            </li>
                            }
                            {this.props.validMethod.wallet && 
                            <li>
                                <a href="javascript:void(0)" class={this.state.method === 'wallet' ? "active show" : " "} value="wallet" onClick={()=>this.selectMethod('wallet')}>
                                    <span><img src="https://dev.gatoes.com/assets/images/ic_wallet.svg" alt="" /></span>
                                    Payment Wallets
                                </a>
                            </li>
                            }
                            {this.props.validMethod.google_pay_cards && 
                            <li>
                                <a href="javascript:void(0)" class={this.state.method === 'gpay' ? "active show" : " "} value="gpay" onClick={()=>this.selectMethod('gpay')}>
                                    <span><img src="https://dev.gatoes.com/assets/images/ic_card.svg" alt="" /></span>
                                    Google Pay
                                </a>
                            </li>
                            }
                            {this.props.validMethod.bhim && 
                            <li>
                                <a href="javascript:void(0)" class={this.state.method === 'Bhim' ? "active show" : " "} value="Bhim" onClick={()=>this.selectMethod('Bhim')}>
                                    <span><img src="https://dev.gatoes.com/assets/images/ic_upi.svg" alt="" /></span>
                                    BHIM UPI
                                </a>
                            </li>
                            }
                            {this.props.validMethod.other && 
                            <li>
                                <a href="javascript:void(0)" class={this.state.method === 'otherUPI' ? "active show" : " "} value="otherUPI" onClick={()=>this.selectMethod('otherUPI')}>
                                    <span><img src="https://dev.gatoes.com/assets/images/ic_upi.svg" alt="" /></span>
                                    Other UPI
                                </a>
                            </li>
                            }
                            <li>
                                <a href="javascript:void(0)" class={this.state.method === 'payOnDelivery' ? "active show" : " "} value="payOnDelivery" onClick={()=>this.selectMethod('payOnDelivery')}>
                                    <span><img src="https://dev.gatoes.com/assets/images/ic_delivery.svg" alt="" /></span>
                                    Pay on Delivery
                                </a>
                            </li>
                        </ul>
                        {this.state.method === 'credit' &&
                            <Credit /> 
                        }
                        {this.state.method === 'netBanking' && <NetBanking /> }
                        {this.state.method === 'gpay' && <GooglePay /> }
                        {this.state.method === 'Bhim' && <BhimUpi /> }
                        {this.state.method === 'otherUPI' && <OtherUpi /> }
                        {this.state.method === 'payOnDelivery' && <CashOnDelivery /> }
                        {this.state.method === 'wallet' && <PaymentWallets /> }
                    </div>
                </div>
                <Modal show={this.state.modal} onHide={this.closeModal}>
                    <Modal.Header closeButton>
                        <div class="react-confirm-alert-overlay"><div class="react-confirm-alert"><div class="react-confirm-alert-body">Do you want to proceed with the order?<div class="react-confirm-alert-button-group"><button>Yes</button><button>No</button></div></div></div></div>
                    </Modal.Header>
                </Modal>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
      cartData : state.cart ,
      deliverAddress : state.address.deliverAddress ,
      user : state.login ,
      validMethod : state.payment.bankData
    }
  }

const mapDispatchToProps = (dispatch)=>{
    return {
        checkOutCartData : (data)=>dispatch(checkOutCartData(data)) ,
        clearCartData : ()=>dispatch(clearCartData()) ,
        bankDetails : () => dispatch(bankDetails())
    }
}

  export default connect(mapStateToProps,mapDispatchToProps)(withRouter(Payment))
