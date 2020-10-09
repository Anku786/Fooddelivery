import React , {Component} from 'react';
import {Modal } from 'react-bootstrap';
import {connect} from 'react-redux';
import {login, getaddress, userData} from '../../redux';
import {withRouter} from 'react-router-dom';
import {toast } from 'react-toastify';


class Login extends Component {
    constructor(props){
        super(props);
        this.state={
            password : '' ,
            phoneNumber : '',
            countryCode : 91
        }
    }

    onChange = (e) =>{
        this.setState({[e.target.name] : e.target.value})
    }

    loginData = (e)=>{
        e.preventDefault();
        this.props.login(this.state).then(res=>{
            this.props.userData(res.value.data.data)
            localStorage.setItem('jwt',res.value.data.data.token)
            this.props.getaddress()
            toast('Login Success')
        }).catch((err)=>{
            toast(err.response.data.message)

        })
        this.props.onHide()
    }
    render(){
        return (
            <div>
                <Modal show={this.props.show} onHide={this.props.onHide}>
                    <Modal.Header closeButton>
                        <div class="modal-body">
                            <div class="popup-content-block">
                                <div class="login-block">
                                    <div class="modal-heading-block">
                                        <h5>Welcome Back</h5>
                                        <h4>Log in to your <br /><span class="pink-text">On Demand</span> account</h4>
                                    </div>
                                    <div className="form-fields">
                                        <form onSubmit={this.loginData}>
                                            <div className="phone-field-ui">
                                                <div className="form-group country-code-ui">
                                                    <input type="number" placeholder="+91" value="+91" disabled="" />
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
                                            <div class="submit-btn">
                                                <button class="btn cta-btn"  onClick={this.loginData}>Proceed</button>
                                            </div>
                                            <div style={{textAlign:'center'}}>
                                                <p className="link-text">Don't have an account?<a href="javascript:;" onClick={this.props.signUp} style={{color:'red'}}>Sign up</a></p>
                                                <p className="link-text"><a  href="javascript:;" onClick={this.props.forgot} style={{color:'red'}}>Forgot Password</a></p>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Modal.Header>
                </Modal>
             </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        user : state.login
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        login : (formValue) =>dispatch(login(formValue)) ,
        getaddress : () => dispatch(getaddress()) ,
        userData : (data) => dispatch(userData(data))
    }
}
  
export default connect(mapStateToProps,mapDispatchToProps)(withRouter(Login))
