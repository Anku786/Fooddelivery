import React , {Component} from 'react';
import Header from './Header';
import axios from 'axios';
import {Link , withRouter} from 'react-router-dom';
import Footer from '../Footer'
import {connect} from 'react-redux';
import {getRestaurants, shopData} from '../redux';
import {toast } from 'react-toastify';
const google = window.google

class HomeSection extends Component {
  constructor(props){
    super(props)
    this.autoCompleteInput = React.createRef();
    this.autoComplete = null;
      this.state={
        address : '',
        latitude : null ,
        longitude : null ,
        cusines : [],
        restaurants : []
      }
    }

  componentDidMount(){
    this.autoComplete = new google.maps.places.Autocomplete(this.autoCompleteInput.current , {'types':['geocode']});
    this.autoComplete.addListener('place_changed',this.handlePlaceChanged);
    if(!this.props.user.data)
    {
    axios({
            method:'get',
            url:'https://devapi.gatoes.com/user/getGuestToken',
            headers : {'contentlanguage' : 'en'}
        }).then(res=>{
            localStorage.setItem('jwt',res.data.data.token)
        }).catch((err)=>{
            console.log(err)
      })
    }
  }
  handlePlaceChanged=()=>{
    const place = this.autoComplete.getPlace();
    this.setState({
      latitude : place.geometry.location.lat() ,
      longitude : place.geometry.location.lng()
    })
    localStorage.setItem('latitude',place.geometry.location.lat())
    localStorage.setItem('longitude',place.geometry.location.lng())
    localStorage.setItem('place',JSON.stringify(place))
  }

  getLocation = () =>{
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.getCoordinates);
      this.props.getRestaurants(this.state.longitude , this.state.latitude).then(res=>{
        this.props.shopData(res.value.data.data)
        this.props.history.push('/shops')
    }).catch((err)=>{
        console.log(err)
    })
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }
  getCoordinates = (position) =>{
    this.setState({
      latitude : position.coords.latitude ,
      longitude : position.coords.longitude
    })
    localStorage.setItem('latitude',position.coords.latitude)
    localStorage.setItem('longitude',position.coords.longitude)
    axios({
      method : 'get',
      url :`https://maps.googleapis.com/maps/api/geocode/json?latlng=${this.state.latitude},${this.state.longitude}&sensor=true&key=AIzaSyD7f9oPC3ISpPjasAB3BxxjyIS2d38rQVg&libraries=places`

    }).then(res=>{
      const place = res.data.results[2]
      localStorage.setItem('place',JSON.stringify(place))
    }).catch(err=>{
      console.log(err)
    })
  }

  search = () =>{
      this.props.getRestaurants(this.state.longitude , this.state.latitude).then(res=>{
        this.props.shopData(res.value.data.data)
        this.props.history.push('/shops')
    }).catch((err)=>{
        toast('Please enter your location')
    })
  }

 
  render(){
    return (
      <>
      <div className="main-wrapper">
        <div className="header">
          <Header />
          <div className="hero-section homapage-banner">
              <div className="hero-content-ui">
                <div className="container">
                  <div className="row">
                    <div className=" col-lg-8 align-self-center">
                      <div className="hero-content">
                        <div className="hero-inner-content">
                          <h2>
                            Your favourite
                            <span className="pink-text"> restaurants </span>
                            and takeaways , 
                            <span className="dgreen-bg"> delivered to  your door</span>
                          </h2>
                          
                          <div className="hero-search-block">
                            <p>Enter your location to find local restaurants</p>
                            
                            <div className="search-field">
                              <div className="search-input-ui">
                              
                                <input ref={this.autoCompleteInput}  id="autocomplete" type="text"  autoComplete="off" role='combobox' placeholder = 'Type or search your location here...' 
                                  className="location-search-input form-control" />
                                <button className="gps-icon" onClick={this.getLocation}>
                                  <img src="http://dev.gatoes.com/assets/images/ic_gps.svg" />
                                </button>
                              </div>
                              
                              <Link className="hero-search-btn" onClick={this.search}>
                              Search</Link>
                            </div>
                            
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
          </div>
          <div className="easy-block-ui">
            <div className="container">
              <div className="row align-item">
                <div className="col-lg-12 col-md-12 align-self-center">
                  <div className="heading-block">
                    <h3>
                      How
                      <span> Gatoes </span>
                      works?
                    </h3>
                  </div>
                </div>
                <div className="col-lg-4 col-md-4">
                  <div className="order-steps">
                    <figure>
                      <img src="https://dev.gatoes.com/assets/images/step_1.png" />
                    </figure>
                    <figcaption>
                      <span className="step-count">Step 1</span>
                      <h4>Order your favourite food at your home</h4>
                    </figcaption>
                  </div>
                </div>
                <div className="col-lg-4 col-md-4">
                  <div className="order-steps">
                    <figure>
                      <img src="https://dev.gatoes.com/assets/images/step_2.png" />
                    </figure>
                    <figcaption>
                      <span className="step-count">Step 2</span>
                      <h4>Choose from the best restaurants around you</h4>
                    </figcaption>
                  </div>
                </div>
                <div className="col-lg-4 col-md-4">
                  <div className="order-steps">
                    <figure>
                      <img src="https://dev.gatoes.com/assets/images/step_3.png" />
                    </figure>
                    <figcaption>
                      <span className="step-count">Step 3</span>
                      <h4>Fast delivery at your doorstep</h4>
                    </figcaption>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="get-app-ui">
            <div className="container">
              <div className="row">
                <div className="col-sm-12 innerapp-wrapper">
                  <div className="row">
                    <div className="col-lg-5 col-md-12 align-self-center order-2">
                      <div className="app-screen-ui">
                        <figure className="screen1">
                          <img src="https://dev.gatoes.com/assets/images/phone_mockups.png" />
                        </figure>
                      </div>
                    </div>
                    <div className="col-lg-7 col-md-12 align-self-center order-1">
                      <div className="app-content-ui">
                        <h3>How you got our App?</h3>
                        <p>Get yours now - available on the Apple app store and Google play store!</p>
                        <div class="app-btn-block">
                          <a href="https://apps.apple.com/us/app/id1519726781" target="_blank" class="btn">
                            <img src="https://dev.gatoes.com/assets/images/apple-store.svg" alt="" />
                          </a>
                          <a href="https://play.google.com/store/apps/details?id=com.gatoes&amp;hl=en_US" class="btn" target="_blank">
                            <img src="https://dev.gatoes.com/assets/images/google-play.svg" alt="" />
                          </a> 
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Footer />
        </div>
      </div>
      </>
    );
  }
}

const mapStateToProps = (state) =>{
  return{
    user : state.login
  }
}


const mapDispatchToProps = (dispatch) => {
  return {
      getRestaurants : (longitude,latitude) =>dispatch(getRestaurants(longitude,latitude)) ,
      shopData : (value) =>dispatch(shopData(value))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(withRouter(HomeSection))
