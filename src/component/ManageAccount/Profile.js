import React, { Component } from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import UpdatePhoneNumberModal from '../../UpdatePhoneNumberModal';
import UpdatePinModal from '../../UpdatePinModal';

class Profile extends Component {
    constructor(props){
        super(props)
        this.state = {
            editPhoneNumberModal : false , 
            otpModal : false,
            changePinModal : false ,
            otp : '' ,
            oldpassword : '',
            newpassword: '',
        }
    }

    editPhoneNum = () =>{
        this.setState({editPhoneNumberModal : true})
    }
    onHide = () =>{
        this.setState({editPhoneNumberModal : false})
    }
    
    editPinModal = () =>{
        this.setState({changePinModal : true})
    }
    closeEditPinModal = () =>{
        this.setState({changePinModal : false})
    }
    render() {
        return (
            <div className="tab-content">
                <div className="tab-pane active">
                    <div className="panel panel-default">
                        <div className="panel-heading">
                            <h4>Manage</h4>
                        </div>
                        <div className="panel-collapse collapse">
                            <div className="panel-body tab-content-ui manage-address-ui">
                                <div className="heading">Manage Profile</div>
                                    <div className="form-fields edit-profile-ui">
                                        <div className="form-group">
                                            <label>Full Name</label>
                                            <div className="text-block">
                                                <p>{this.props.user.data.fullName}</p>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label>Phone number</label>
                                            <div className="text-block">
                                                <p>{this.props.user.data.countryCode}
                                                    {this.props.user.data.phoneNumber}
                                                </p>
                                                <a href="javascript:;" onClick={this.editPhoneNum} className="tchange-btn">Change</a>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label>Email</label>
                                            <div className="text-block">
                                                <p>{this.props.user.data.email}</p>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label>Pin</label>
                                            <div className="text-block">
                                                <p>****</p>
                                                <a href="javascript:;" onClick={this.editPinModal} className="tchange-btn">Change</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <UpdatePhoneNumberModal editPhoneNumberModal={this.state.editPhoneNumberModal} onHide={this.onHide}/>
                    <UpdatePinModal changePinModal={this.state.changePinModal}  onHide={this.closeEditPinModal}/>
                </div>
            )
        }
    }

const mapStateToProps = (state) => {
    console.log('login',state.login)
    return {
      user : state.login
    }
  }

  export default connect(mapStateToProps,null)(withRouter(Profile));
