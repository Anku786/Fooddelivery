import React, { Component } from 'react';
import HeaderLoginButton from './HeaderLoginButton';
import {connect} from 'react-redux';
import {Dropdown} from 'react-bootstrap';
import axios from 'axios';
import {userData} from './redux';
import { withRouter } from 'react-router-dom';
import { toast } from 'react-toastify';

class AllHeader extends Component {
    constructor(){
        super()
        this.state = {
            place : JSON.parse(localStorage.getItem('place'))
        }
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
            this.props.history.push('/')
            toast('logout success')
        }).catch((err)=>{
            console.log('sas')
        })
    }

    render() {
        const {place} = this.state
        return (
            <div>
                <header class="header-main inner-header">
                    <div class="container">
                        <div class="header-inner-ui">
                            <div class="logo">
                                <a href="/" className="logo-text">On Demand</a>
                            </div>
                            <div class="header-middle-block text-center align-self-center">
                                <div class="asap-block">
                                    <div class="header-location-ui align-self-center">
                                        {this.state.place ?  <p>{place.formatted_address}</p> : <h2></h2> }
                                    </div>
                                </div>
                            </div>
                            <div class="header-right-block">
                                <div class="header-search-block">
                                    <a class="header-search-box" href="/search">
                                        <span class="icon-ic-search"></span>
                                    </a>
                                </div>
                                <div class="cart-ui">
                                    <a class="cart-btn" href="/checkout">
                                        <span class="image-block">
                                            <img src="https://dev.gatoes.com/assets/images/ic_shopping_bag.svg" alt="" />
                                        </span>
                                        {/* <span class="cart-counter">{this.props.cart.cartData.length}</span> */}
                                    </a>
                                </div>
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
                                <div class="header-login-ui">
                                    <a href="javascript: void(0);" >
                                        <p><HeaderLoginButton /></p>
                                    </a>
                                </div>
                                :
                                <div class="header-login-ui">
                                    <a href="javascript: void(0);" >
                                        <p><HeaderLoginButton /></p>
                                    </a>
                                </div>
                                }
                            </div>
                        </div>
                    </div>
                </header>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
      user : state.login ,
      cart : state.cart
    }
  }

  const mapDispatchToProps = (dispatch) => {
    return {
        userData : (formValue) =>dispatch(userData(formValue)) 
    }
  }

  export default connect(mapStateToProps,mapDispatchToProps)(withRouter(AllHeader))