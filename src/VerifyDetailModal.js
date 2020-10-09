import React , {Component} from 'react';
import {Modal , Button} from 'react-bootstrap';
import axios from 'axios';
import { toast } from 'react-toastify';

class VerifyDetailModal extends Component {
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
            otp : ''
        }
      }



      forgotPassword = (event) =>{
          event.preventDefault()
        axios({
            method : 'post',
            url : 'https://devapi.gatoes.com/user/forgotPassword' ,
            headers : {
                'contentlanguage' : 'en',
                'Accept' : 'application/json'
            },
            data : {phoneNumber : this.props.updateUserData.phoneNumber , password : this.state.password , verificationCode : this.state.otp , countryCode : '91' }
        }).then(res=>{
            toast('password Changed')
            console.log(res.data)
            this.props.onHide()
        }).catch((err)=>{
            console.log(err)
        })
    }
  render(){
  return (
    <div>
        <Modal show={this.props.verifyDetailsModal} onHide={this.props.onHide} className="modalStyle">
        <Modal.Header closeButton>
          <Modal.Body>
                <div class="modal-body">
                    <div class="popup-content-block">
                        <div class="login-block">
                            <div class="modal-heading-block">
                                <h5>Set New Pin</h5>
                                <h4>Verify Details</h4>
                                <p>Verification Code has been sent to your phone number {this.state.phoneNumber}</p>
                            </div>
                            <div className="form-fields">
                            <form onSubmit={this.forgotPassword}>
                                    <div className="floating-effect  form-group">
                                    <input type="text" name="otp" onChange={(e)=>this.setState({otp:e.target.value})} value={this.state.otp} placeholder="OTP"  />
                                    <label>OTP</label>
                                    </div>
                                    <div className="floating-effect  form-group">
                                    <input type="text" name="password" onChange={(e)=>this.setState({password:e.target.value})} value={this.state.password} placeholder="New Pin"  />
                                        <label>New Pin</label>
                                    </div>
                                
                                <div class="submit-btn">
                                <button class="btn cta-btn"  onClick={this.forgotPassword}>Proceed</button>
                                </div>
                                <div style={{textAlign:'center'}}>
                                    <p className="link-text">not received yet ?<a href="javascript:;" onClick={this.props.signUp} style={{color:'red'}}>Resend Code</a></p>
                                </div>
                            </form>
                            </div>
                        </div>
                    </div>
                </div>
          </Modal.Body>
        </Modal.Header>
        </Modal>

        
    </div>
  );
  }
}


  
  export default VerifyDetailModal;
