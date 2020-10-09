import React , {Component} from 'react';
import {Modal , Button} from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

class Otp extends Component {
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


      proceed=(event)=>{
        event.preventDefault()
        axios({
            method:'post',
            url:'https://devapi.gatoes.com/user/signUp',
            headers : {
                'contentlanguage': 'en',
                'Accept' : 'application/json'
            },
            data : {fullName:this.props.updateUserData.fullName , email:this.props.updateUserData.email , password : this.props.updateUserData.password , phoneNumber:this.props.updateUserData.phoneNumber , countryCode : 91 , verificationCode:this.state.otp}
        }).then(res=>{
          toast('Account Created')
            console.log(res.data)
            
            this.props.onHide()
        }).catch((err)=>{
            console.log(err)
            toast(err.response.data.message)
        })
    }


  render(){
  return (
    <div>
        <Modal show={this.props.otpModal} onHide={this.props.onHide} className="modalStyle">
        <Modal.Header closeButton>
          <Modal.Body>
            <div class="modal-body">
              <div class="popup-content-block">
                <div class="login-block">
                  <div class="modal-heading-block">
                    <h5>Account</h5>
                    <h4>Verify Details</h4>
                    <p>Verification Code has been sent to your phone number {this.state.phoneNumber}</p>
                  </div>
              <form>
              <div className="form-fields">
              <div className="form-group">
              <input type="text" onChange={(event)=>this.setState({otp: event.target.value})} value={this.state.otp} placeholder="OTP"  />
              </div></div>
              <div class="submit-btn">
                <button class="btn cta-btn"  onClick={this.proceed}>Proceed</button>
              </div>
              <div style={{textAlign:'center'}}>
                <p className="link-text">not received yet ?<a href="javascript:;"  style={{color:'red'}}>Resend Code</a></p>
                </div>
              
              {/* <Button variant="danger" style={{padding:'10px 170px 10px 170px' , borderRadius:'20px'}} onClick={this.proceed}>Verify</Button> */}
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
  );
  }
}

export default Otp;
