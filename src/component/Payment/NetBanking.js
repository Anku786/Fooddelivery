import React, { Component } from 'react';
import {toast} from 'react-toastify';
import {checkOutCartData, clearCartData, getOrder} from "../../redux";
import {connect} from 'react-redux';
import {withRouter } from 'react-router-dom';
import {getPaymentDetails, getOrderDetail} from '../../redux/payment/paymentActions';

class NetBanking extends Component {
    constructor(props){
        super(props)
        this.state = {
            shopId : localStorage.getItem('id') ,
            addressId : JSON.parse(localStorage.getItem('addedAddress')) ,
            couponApplied : JSON.parse(localStorage.getItem('coupon')) ,
            longitude : localStorage.getItem('longitude'),
            latitude : localStorage.getItem('latitude') ,
            selectedOption: "" ,
            bankData : Object.entries(this.props.bankData) ,
            razorpay_payment_id : ''
        }
    }

    handleOptionChange = (event) => {
        this.setState({
          selectedOption: event.target.value
        });
    };
    handleSelectChange = () =>{
        this.setState({
            selectedOption: this.menu.value
        });
    }

    netBanking = () =>{
        var userData = {shopId : this.state.shopId, userLongitude: this.state.longitude, userLatitude: this.state.latitude ,addressId : this.props.deliverAddress.id , paymentType:'1' ,items : this.props.cartData.cartData}
        this.props.getPaymentDetails(userData).then(res=>{
            let response = res.value.data.data
           let data = {
               amount : response.razor_pay_order.amount ,
               currency: "INR" ,
               email: this.props.user.data.email ,
               contact: this.props.user.data.phoneNumber ,
               order_id: response.razor_pay_order.id ,
               method: 'netbanking' ,
               bank: this.state.selectedOption
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
        const {bankData} = this.state
        return (
            <div className="tab-content">
                <div className="tab-pane active show">
                    <div className="list-payment-methods">
                        <div className="check-action-block-payment banking-ui">
                            <div className="head-other-mathod">
                                <div className="block-bank-account-detail">
                                    <div className="block-content-smple">
                                        <div className="option-netbanking">
                                            <div class="net-banking-list">
                                                <ul>
                                                    <li>
                                                        <div class="custom-radio-ui">
                                                            <label>
                                                                <input class="option-input" type="radio" name="bank-list" value="SBIN" 
                                                                checked={this.state.selectedOption === "SBI"}
                                                                onChange={this.handleOptionChange} />
                                                                <span class="filter-input"><img width="25" src="https://cdn.razorpay.com/bank/SBIN.gif" alt="" />
                                                                    <span>SBI</span>
                                                                </span>
                                                            </label>
                                                        </div>
                                                    </li>
                                                    <li>
                                                        <div class="custom-radio-ui">
                                                            <label>
                                                                <input class="option-input" type="radio" name="bank-list" value="HDFC" 
                                                                checked={this.state.selectedOption === "HDFC"} onChange={this.handleOptionChange} />
                                                                <span class="filter-input"><img width="25" src="https://cdn.razorpay.com/bank/HDFC.gif" alt="" />
                                                                    <span>HDFC</span>
                                                                </span>
                                                            </label>
                                                        </div>
                                                    </li>
                                                    <li>
                                                        <div class="custom-radio-ui">
                                                            <label>
                                                                <input class="option-input" type="radio" name="bank-list" value="ICIC" 
                                                                checked={this.state.selectedOption === "ICIC"} onChange={this.handleOptionChange} />
                                                                <span class="filter-input"><img width="25" src="https://cdn.razorpay.com/bank/ICIC.gif" alt="" />
                                                                    <span>ICICI</span>
                                                                </span>
                                                            </label>
                                                        </div>
                                                    </li>
                                                    <li>
                                                        <div class="custom-radio-ui">
                                                            <label>
                                                                <input class="option-input" type="radio" name="bank-list" value="UTIB" 
                                                                checked={this.state.selectedOption === "UTIB"} onChange={this.handleOptionChange}/>
                                                                <span class="filter-input"><img width="25" src="https://cdn.razorpay.com/bank/UTIB.gif" alt="" />
                                                                    <span>AXIS</span>
                                                                </span>
                                                            </label>
                                                        </div>
                                                    </li>
                                                    <li>
                                                        <div class="custom-radio-ui">
                                                            <label>
                                                                <input class="option-input" type="radio" name="bank-list" value="KKBK" 
                                                                checked={this.state.selectedOption === "KKBK"} onChange={this.handleOptionChange}/>
                                                                <span class="filter-input"><img width="25" src="https://cdn.razorpay.com/bank/KKBK.gif" alt="" />
                                                                    <span>KOTAK</span>
                                                                </span>
                                                            </label>
                                                        </div>
                                                    </li>
                                                    <li>
                                                        <div class="custom-radio-ui">
                                                            <label>
                                                                <input class="option-input" type="radio" name="bank-list" value="YESB" 
                                                                checked={this.state.selectedOption === "YESB"} onChange={this.handleOptionChange}/>
                                                                <span class="filter-input"><img width="25" src="https://cdn.razorpay.com/bank/YESB.gif" alt="" />
                                                                    <span>YES</span>
                                                                </span>
                                                            </label>
                                                        </div>
                                                    </li>
                                                    <li>
                                                        <div class="custom-radio-ui">
                                                            <label>
                                                                <input class="option-input" type="radio" name="bank-list" value="PUNB_R" 
                                                                checked={this.state.selectedOption === "PUNB_R"} onChange={this.handleOptionChange}/>
                                                                <span class="filter-input"><img width="25" src="https://cdn.razorpay.com/bank/PUNB_R.gif" alt="" />
                                                                    <span>PNB</span>
                                                                </span>
                                                            </label>
                                                        </div>
                                                    </li>
                                                    <li>
                                                        <div class="custom-radio-ui">
                                                            <label>
                                                                <input class="option-input" type="radio" name="bank-list" value="CNRB" 
                                                                checked={this.state.selectedOption === "CNRB"} onChange={this.handleOptionChange}/>
                                                                <span class="filter-input"><img width="25" src="https://cdn.razorpay.com/bank/CNRB.gif" alt="" />
                                                                    <span>CANARA</span>
                                                                </span>
                                                            </label>
                                                        </div>
                                                    </li>
                                                </ul>
                                            </div>
                                            <div className="dropdown">
                                                <select id = "dropdown" className="btn dropdown-toggle btn-default btn-light" name="Select" ref = {(input)=> this.menu = input} onChange={this.handleSelectChange}>
                                                        {bankData.map((bank)=>{
                                                            return(
                                                                <option class="selectpicker style-select-block" value={bank[0]}>{bank[1]}</option>
                                                            )
                                                        })}
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="m-t20">
                                        <a href="javascript:void(0)" class="w-100 btn btn2 loading" onClick={()=>this.netBanking()}>Pay Now</a>
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
      bankData : state.payment.bankData.netbanking
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

  export default connect(mapStateToProps,mapDispatchToProps)(withRouter(NetBanking))
