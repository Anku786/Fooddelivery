import React , {Component} from 'react';
import AllHeader from '../../AllHeader'
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import Footer from '../../Footer';
import Profile from './Profile';
import Order from './Order';
import ManageAddress from './ManageAddress';

class ManageAccount extends Component {
constructor(){
    super()
    this.state = {
        method : 'profile'
    }
}

selectMethod(method){
    if(method === 'order'){
        this.setState({method : 'order'})
    }
    else if(method === 'manageAddress'){
        this.setState({method : 'manageAddress'})
    }
    else{
        this.setState({method : 'profile'})
    }
}


  render(){
  return (
    <>
    <div>
    <AllHeader /></div>
        <div className="content-wrapper grey-ui">
            <div className="user-profile-ui">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="profile-ui-block">
                                <figure>
                                    <span className="icon-ic_avatar">
                                    </span>
                                </figure>
                                <figcaption>
                                    <div className="info-ui">
                                        <h4>{this.props.user.data.fullName}</h4>
                                        <p>{this.props.user.data.email}
                                            .
                                            {this.props.user.data.countryCode}
                                            {this.props.user.data.phoneNumber}
                                        </p>
                                    </div>
                                </figcaption>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <div className="profile-tabs">
                                <ul className="nav nav-tabs">
                                    <ul className="nav nav-tabs">
                                        <li className="active">
                                            <a class={this.state.method === 'order' ? "active show" : " "} value="order" onClick={()=>this.selectMethod('order')}>
                                                <span className="icon-ic_past_orders"></span>
                                                Orders
                                            </a>
                                        </li>
                                        <li>
                                            <a className="/savedRestaurants">
                                                <span className="icon-ic_saved_places"></span>
                                                Saved Places
                                            </a>
                                        </li>
                                        <li>
                                            <a className="/savedRestaurants">
                                                <span className="icon-ic_heart_line"></span>
                                                Favourites
                                            </a>
                                        </li>
                                        <li>
                                            <a class={this.state.method === 'manageAddress' ? "active show" : " "} value="manageAddress" onClick={()=>this.selectMethod('manageAddress')}>
                                                <span className="icon-ic_location_b"></span>
                                                Manage Addresses
                                            </a>
                                        </li>
                                        <li>
                                            <a className="/savedRestaurants">
                                                <span className="icon-ic_saved_places"></span>
                                                Saved Places
                                            </a>
                                        </li>
                                        <li>
                                            <a className="/savedRestaurants">
                                                <span className="icon-wallet_icon"></span>
                                                Wallet
                                            </a>
                                        </li>
                                        <li>
                                            <a class={this.state.method === 'profile' ? "active show" : " "} value="profile" onClick={()=>this.selectMethod('profile')}> 
                                                <span className="icon-ic_manageprofile"></span>
                                                Manage Profile
                                            </a>
                                        </li>
                                    </ul>
                                </ul>
                                {this.state.method === 'profile' &&
                                    <Profile />
                                }
                                {this.state.method === 'order' &&
                                    <Order />
                                }
                                {this.state.method === 'manageAddress' &&
                                    <ManageAddress />
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
        </div>

        
        
        <Footer />
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

  export default connect(mapStateToProps,null)(withRouter(ManageAccount));
