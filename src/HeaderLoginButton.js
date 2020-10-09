import React , {Component} from 'react';
import Login from './component/Login/Login';
import SignUp from './component/SignUp/SignUp'
import Otp from './Otp'
import ForgotModal from './ForgotModal'
import VerifyDetailModal from './VerifyDetailModal';
import {connect} from 'react-redux';
class HeaderLoginButton extends Component {
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
        // this.setState({loginModal : false})
    }
    handlelogin = () => {
        this.setState({loginModal : true , show : false})
        // this.setState({show : false})
        console.log(this.state.show)
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

  render(){
    const place = JSON.parse( localStorage.getItem('place'))
    return (
        <>
                <div className="header-login-ui">
                    <button className="outline-btn login-btn blur-ui" onClick={this.handleClick}><span className="fa fa-user-o"></span>Signup Or Login</button>
                </div>
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
        </>
    );
  }
}


const mapStateToProps = (state) => {
    console.log('login',state.login)
    return {
      user : state.login ,
      addedCart: state.cart
    }
  }

  export default connect(mapStateToProps,null)(HeaderLoginButton)