import React , {Component} from 'react';
import {Modal , Button} from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

class editPhoneNumber extends Component {
  constructor(props){
        super(props);
        this.state={
            phoneNumber : ''
        }
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
        <Modal show={this.props.editPhoneNumberModal} onHide={this.props.onHide}>
            <Modal.Header closeButton>
                <div className="modal-body">
                    <div class="popup-content-block">
                        <div class="modal-heading-block">
                            <h5>Edit</h5>
                            <h4>Phone Number</h4>
                            <div className="form-fields">
                                <form onSubmit={this.proceed}> 
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
                                        <button class="btn cta-btn" /* style={{borderRadius:'20px'}} */ onClick={this.proceed}>Proceed</button>
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

export default editPhoneNumber;
