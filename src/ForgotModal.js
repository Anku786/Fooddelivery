import React , {Component} from 'react';
import {Modal , Button} from 'react-bootstrap';
import axios from 'axios';
import { toast } from 'react-toastify';

class ForgotModal extends Component {
  constructor(props){
        super(props);
        this.state={
            show : false , 
            loginModal : false ,
            otpModal : false ,
            forgotModal : false ,
            verifyDetailsModal : false ,
            email : '' ,
            fullName : '' ,
            password : '' ,
            phoneNumber : '',
            otp : '',
            countryCode : '91'
        }
    }
    onChange = (e) =>{
        this.setState({[e.target.name] : e.target.value})
    }

    sendForgotPassword = (event) =>{
        event.preventDefault()
        const userData = {phoneNumber : this.state.phoneNumber , countryCode : '91' , sendVerificationMessage:true}
        axios({
            method : 'post',
            url : 'https://devapi.gatoes.com/user/sendForgotPasswordVerificationCode',
            headers : {
                'contentlanguage' : 'en',
                'Accept' : 'application/json'
            },
            data : userData
        }).then(res=>{
            this.props.updateUserData(userData)
            console.log(res.data)
            this.props.verifyOpenModal()
        }).catch((err)=>{
            console.log(err)
            toast(err.response.data.message)
        })
    }

  render(){
  return (
        <Modal show={this.props.forgotModal} onHide={this.props.onHide} className="modalStyle">
            <Modal.Header closeButton>
                <div class="modal-body">
                    <div class="popup-content-block">
                        <div class="login-block">
                            <div class="modal-heading-block">
                                <h5>Forgot Password</h5>
                                <h4>Enter your mobile number to search for your account</h4><br />
                            </div>
                        <div className="form-fields">
                            <form onSubmit={this.sendForgotPassword}>
                                <div className="phone-field-ui">
                                    <div className="form-group country-code-ui">
                                        <input type="number" placeholder="+91" value="+91" disabled="" />
                                    </div>
                                    <div className="floating-effect  form-group">
                                        <input type="text" name="phoneNumber" onChange={this.onChange} value={this.state.phoneNumber} placeholder="Phone Number"  />
                                        <label>Phone Number</label>
                                    </div>
                                </div>
                                <div>
                                    <button class="btn cta-btn" onClick={this.sendForgotPassword}>Proceed</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </Modal.Header>
        
    </Modal>

  );
  }
}


  
  export default ForgotModal
