import React , {Component} from 'react';
import Header from './component/Header'
import {Link} from 'react-router-dom';
import {Modal , Button} from 'react-bootstrap';
import axios from 'axios';
import {toast } from 'react-toastify';
import {connect} from 'react-redux';
import {login,userData} from './redux';

class UpdatePhoneNumberModal extends Component {
    constructor(){
        super()
        this.state = {
            otp : '' ,
            oldpassword : '',
            newpassword: '',
            otpModal : false
        }
    }

    openOtpModal = () =>{
        this.setState({otpModal : true})
    }
    closeOtpModal = () =>{
        this.setState({otpModal :  false})
    }

    editPhone = (event) =>{
        event.preventDefault()
        axios({
            method:'post',
            url:'https://devapi.gatoes.com/user/sendEditPhoneVerificationCode',
            headers : {'contentlanguage' : 'en',
            'Accept' : 'application/json',
            'authorization': 'Bearer '+localStorage.getItem('jwt')},
            data : {phoneNumber : this.state.phoneNumber , countryCode : 91 }
        }).then(res=>{
            console.log('pass',res)
            toast('Login Success')
            this.openOtpModal()
            this.props.onHide()
    
        }).catch((err)=>{
            // toast(err.response.data.message)
            console.log(err)
        })
    }

    verifyOtp = (event) =>{
        event.preventDefault()
       const formValue = {
            email : this.props.user.data.email ,
            fullName : this.props.user.data.fullName ,
            phoneNumber : this.state.phoneNumber ,
            password : this.props.user.data.password
          }
        axios({
            method:'post',
            url:'https://devapi.gatoes.com/user/editPhoneNumber',
            headers : {'contentlanguage' : 'en',
            'Accept' : 'application/json',
            'authorization': 'Bearer '+localStorage.getItem('jwt')},
            data : {phoneNumber : this.state.phoneNumber , countryCode : 91 , verificationCode : this.state.otp}
        }).then(res=>{
            console.log('passsOTP',res)
            this.props.userData(formValue)
            toast('Password Changed')
            this.closeOtpModal()
        }).catch((err)=>{
            toast(err.response.data.message)
            console.log(err)
        })
    }

  render(){
  return (
    <>
        <div>
        <Modal show={this.props.editPhoneNumberModal} onHide={this.props.onHide}>
            <Modal.Header closeButton>
                
                    <div className="modal-body">
                        <div class="popup-content-block">
                            <div class="modal-heading-block">
                    <h5>Edit</h5>
                    <h4>Phone Number</h4>
                        <div className="form-fields">
                        <form onSubmit={this.editPhone}> 
                            <div className="phone-field-ui">
                                <div className="form-group country-code-ui">
                                    <input type="number" placeholder="+91" value="91" disabled="" />
                                </div>
                                <div className="floating-effect  form-group">
                                    <input type="text" onChange={(event)=>this.setState({phoneNumber: event.target.value})} value={this.state.phoneNumber} placeholder="Phone Number"  />
                                    <label>Phone Number</label>
                                </div>
                            </div>
                            <div class="submit-btn">
                            <button class="btn cta-btn" onClick={this.editPhone}>Proceed</button>
                            </div>
                            
                        </form>
                        </div>
                
                    </div>
                    </div>
                    </div>
          
        </Modal.Header>
        </Modal>

        <Modal show={this.state.otpModal} onHide={this.closeOtpModal} className="modalStyle">
        <Modal.Header closeButton>
          <Modal.Body>
            <div class="modal-body">
              <div class="popup-content-block">
                <div class="login-block">
                  <div class="modal-heading-block">
                    <h4>Verify Details</h4>
                    <p>Verification Code has been sent to your phone number {this.state.phoneNumber}</p>
                  </div>
              <form onSubmit={this.verifyOtp}>
              <div className="form-fields">
              <div className="form-group">
              <input type="text" onChange={(event)=>this.setState({otp: event.target.value})} value={this.state.otp} placeholder="OTP"  />
              </div></div>
              <div class="submit-btn">
                <button class="btn cta-btn"  onClick={this.verifyOtp}>Proceed</button>
              </div>
              <div style={{textAlign:'center'}}>
                <p className="link-text">not received yet ?<a href="javascript:;"  style={{color:'red'}}>Resend Code</a></p>
                </div>
              
              
              </form>
              </div>
              </div>
              </div>
          </Modal.Body>
        </Modal.Header>
        <Modal.Body>
        </Modal.Body>
        </Modal>
        </div>
    </>
  );
  }
}

const mapStateToProps = (state) => {
    console.log('login',state.login)
    return {
      user : state.login
    }
  }
  
  const mapDispatchToProps = (dispatch) => {
    return {
        userData : (formValue) =>dispatch(userData(formValue)) 
    }
  }
  
  export default connect(mapStateToProps,mapDispatchToProps)(UpdatePhoneNumberModal)

// export default UpdatePhoneNumberModal;
