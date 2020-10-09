import React , {Component} from 'react';
import {Dropdown} from 'react-bootstrap';
import axios from 'axios';
import Login from './Login/Login';
import SignUp from './SignUp/SignUp'
import Otp from '../Otp'
import ForgotModal from '../ForgotModal'
import VerifyDetailModal from '../VerifyDetailModal';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {connect} from 'react-redux';
import {userData} from '../redux';

class Header extends Component {
    constructor(props){
        super(props);
        this.state={
            show : false , 
            loginModal : false ,
            otpModal : false ,
            forgotModal : false ,
            verifyDetailsModal : false ,
            editPhoneNumberModal : false ,
            email : '' ,
            fullName : '' ,
            password : '' ,
            phoneNumber : '',
            otp : '' ,
            userData : [],
            userDetail : []
        }
    }
    otpOpenModal = () =>{
        this.setState({otpModal : true, show : false , loginModal : false})
    }

    verifyOpenModal = () =>{
        this.setState({verifyDetailsModal : true , forgotModal : false})
    }
    
    OpenforgotModal = () =>{
        this.setState({show : false , forgotModal : true})
    }

    updateUserData = (user) =>{
        this.setState({userData : user})
    }
   
    handleClick = () => {
        this.setState({show : true , loginModal : false})
    }
    handlelogin = () => {
        this.setState({loginModal : true , show : false})
    }
    handleClose = () => {
        this.setState({show : false})
    }
    handleCloseOtp = () => {
        this.setState({otpModal : false})
    }
    handleCloseLogin = () => {
        this.setState({loginModal : false})
    }
    handleCloseforgotPassword=()=>{
        this.setState({forgotModal : false})
    }
    handleCloseverifyDetailsModal=()=>{
        this.setState({verifyDetailsModal : false})
    }
    editPhoneNum = () =>{
        this.setState({editPhoneNumberModal : true})
    }
    handleCloseEditPhoneNumberModal = () =>{
        this.setState({editPhoneNumberModal : false})
    }
    logout = (e) =>{
        e.preventDefault()
        axios({
            method:'post',
            url:'https://devapi.gatoes.com/user/logout',
            headers : {
                'contentlanguage': 'en',
                authorization: "Bearer " + localStorage.getItem("jwt")
            }
        })
        .then(res=>{
            this.props.userData(res.data.data)
        }).catch((err)=>{
            console.log('sas')
        })
    }

    render(){
    return (
        <div className="main-wrapper">
            <header className="header-main">
            <div className="container">
                
                <div className="ld-header-ui">
                    <div className="logo">
                        <a href="/" className="logo-text">On Demand</a>
                    </div>
                    <nav>
                        <div className="nav-link-ui align-self-center">
                            <ul>
                                <li><a href="partner-signup.html">Become a partner</a></li>
                                <li><a href="rider.html">Ride with us</a></li>
                            </ul>
                        </div>
                        <nav>
                        <div className="header-right-block align-self-center">
                            {this.props.user.data ?
                                this.props.user.data.fullName ? 
                                <div className="header-login-ui">
                                    <Dropdown className="outline-btn ">
                                        <Dropdown.Toggle style={{backgroundColor:'white',border:'none',color:'black',fontWeight:'bold'}} id="dropdown-basic">
                                         {this.props.user.data.fullName}
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu>
                                            <a className="dropdown-item" href ='/profile'>My Account</a>
                                          <Dropdown.Item href="/" onClick={(e)=>this.logout(e)}>Logout</Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                    
                                </div> 
                                :
                                <div className="header-login-ui">
                                    <button className="outline-btn login-btn blur-ui" onClick={this.handleClick}><span className="fa fa-user-o"></span>Signup Or Login</button>
                                </div>
                                :<div className="header-login-ui">
                                <button className="outline-btn login-btn blur-ui" onClick={this.handleClick}><span className="fa fa-user-o"></span>Signup Or Login</button>
                            </div>
                            }
                            
                        </div>
                        </nav>
                    </nav>
                </div>
            
            </div>
        </header>
        {/* Login Modal */}
        <Login show={this.state.show} onHide={this.handleClose} handlelog={()=>this.handleClick()}
        signUp={()=>this.handlelogin()}  forgot={()=>this.OpenforgotModal()} />
        
        {/* SignUp Modal */}
        <SignUp loginModal={this.state.loginModal} onHide={this.handleCloseLogin} 
        otp={()=>this.otpOpenModal()} updateUserData={this.updateUserData} login={()=>this.handleClick()}/>
        {/* OTP Modal */}
        <Otp otpModal={this.state.otpModal} onHide={this.handleCloseOtp} handleOtp={()=>this.proceed()}
        updateUserData={this.state.userData}/>
        {/* forgotModal */}
        <ForgotModal forgotModal={this.state.forgotModal} onHide={this.handleCloseforgotPassword} sendForgotPassword={this.sendForgotPassword}
        verifyOpenModal={()=>this.verifyOpenModal()} updateUserData={this.updateUserData}/>

        {/* verifyDetailsModal */}
        <VerifyDetailModal verifyDetailsModal={this.state.verifyDetailsModal} onHide={this.handleCloseverifyDetailsModal} 
        updateUserData={this.state.userData}/>

        
        <ToastContainer />
      </div>
      
    );
  }
}

const mapStateToProps = (state) => {
    return {
      user : state.login ,
      shop : state.shop
    }
  }
  const mapDispatchToProps = (dispatch) => {
    return {
        userData : (formValue) =>dispatch(userData(formValue)) 
    }
  }

  export default connect(mapStateToProps,mapDispatchToProps)(Header)
