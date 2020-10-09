import React , {Component} from 'react';
import {Modal} from 'react-bootstrap';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

class SignUp extends Component {
  constructor(props){
        super(props);
        this.state={
            email : '' ,
            fullName : '' ,
            password : '' ,
            phoneNumber : '',
            countryCode : '91'
        }
    }

    onChange = (e) =>{
        this.setState({[e.target.name] : e.target.value})
    }

    formData = (e)=>{
        e.preventDefault();
        this.props.signup(this.state)
        this.props.otp()
    }

    proceed=(event)=>{
        event.preventDefault();
        var userData = {password : this.state.password , email : this.state.email , fullName : this.state.fullName , phoneNumber:this.state.phoneNumber , countryCode : 91 , verificationCode:this.state.otp}
        axios({
            method:'post',
            url:'https://devapi.gatoes.com/user/signUp',
            headers : {
                'contentlanguage': 'en',
                'Accept' : 'application/json'
            },
            data : userData
        })
        .then(res=>{
            this.props.updateUserData(userData)
            this.props.otp()
        }).catch((err)=>{
            toast(err.response.data.message)
        })
    }

  render(){
  return (
        <Modal show={this.props.loginModal} onHide={this.props.onHide}>
            <Modal.Header closeButton>
                <div className="modal-body">
                    <div class="popup-content-block">
                        <div class="modal-heading-block">
                            <h5>Welcome</h5>
                            <h4>Get started with</h4>
                            <h4>your <span style={{color:'red'}}>On Demand </span><span style={{color:'black'}}>account</span></h4><br />
                                <div className="form-fields">
                                    <form onSubmit={this.proceed}>  
                                        <div className="floating-effect  form-group">
                                            <input type="text" name="fullName" onChange={this.onChange} value ={this.state.fullName} placeholder="Full Name"  />
                                            <label>Full Name</label>
                                        </div>
                                        <div className="floating-effect  form-group">
                                            <input type="text" name="email" onChange={this.onChange} value={this.state.email} placeholder="Email address"  />
                                            <label>Email Address</label>
                                        </div>
                                        <div className="phone-field-ui">
                                            <div className="form-group country-code-ui">
                                                <input type="number" placeholder="+91" value="91" disabled="" />
                                            </div>
                                            <div className="floating-effect  form-group">
                                                <input type="text" name="phoneNumber" onChange={this.onChange} value={this.state.phoneNumber} placeholder="Phone Number"  />
                                                <label>Phone Number</label>
                                            </div>
                                        </div>
                                        <div className="floating-effect  form-group">
                                            <input type="text" name="password" onChange={this.onChange} value={this.state.password} placeholder="Password"  />
                                            <label>Password</label>
                                        </div>
                                        <p className="helping-text">By proceeding, you agree with the On Demand <a href="javascript:;"> Terms & Conditions, Cookie Policy</a>.</p>
                                            <div class="submit-btn">
                                                <button class="btn cta-btn" /* style={{borderRadius:'20px'}} */ onClick={this.proceed}>Proceed</button>
                                            </div>
                                            <div style={{textAlign:'center'}}>
                                                <p className="link-text">Already have an account?<a href="javascript:;" onClick={this.props.login} style={{color:'red'}}>Login</a></p>
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


  export default SignUp
