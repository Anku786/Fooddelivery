import React, { Component } from "react";
import { connect } from "react-redux";
import AllHeader from "../../AllHeader";
import Footer from "../../Footer";
import { Link} from "react-router-dom";
import axios from "axios";
import { addQuantity, cart, deleteCart } from "../../redux";
import Cart from './Cart';



class shopDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shopId: localStorage.getItem("id"),
      shopDetail: "",
      addModal: false,
    };
  }

  addModalClose = () => {
    this.setState({ addModal: false });
  };

  componentDidMount() {
    axios({
      method: "get",
      url: `https://devapi.gatoes.com/user/getRestaurantDetails?shopId=${this.state.shopId}`,
      headers: {
        contentlanguage: "en",
        Accept: "application/json",
        authorization: "Bearer " + localStorage.getItem("jwt"),
        utcoffset: -420,
      },
    })
      .then((res) => {
        this.setState({ shopDetail: res.data });
      })
      .catch((err) => {
        console.log("sas");
    });
  }

  cartDetailsWithVariants = (cartData) => {
    this.setState({ addModal: true });
    this.props.cart(cartData);
    
  };
  cartDetails = (cartData) => {
    this.props.cart(cartData);
  };

  

  render() {
    const { shopDetail } = this.state;
    return (
      <>
        <AllHeader />
        {shopDetail.data ? (
          <div className="content-wrapper">
            <div className="hero-detail-blcok">
              <div className="container">
                <div className="row">
                  <div className="col-sm-12">
                    <div className="breadcrum-ui">
                      <ul>
                        <li>
                          <Link to="/shops">Home</Link>
                        </li>
                        <li>{shopDetail.data.restaurant.shopName}</li>
                      </ul>
                    </div>
                  </div>
                  <div className="col-sm-12 col-lg-8 col-xl-9">
                    <div className="left-detail-block">
                      <figure>
                        {shopDetail.data.restaurant.image ? 
                        <img src={shopDetail.data.restaurant.image.original} />
                        :
                        <img src="" />
                        }
                        <div className="mobile-content">
                          <h2>{shopDetail.data.restaurant.shopName}</h2>
                          <p></p>
                          <span className="address-text">
                            {shopDetail.data.restaurant.shopAddress}
                          </span>
                        </div>
                        <div className="mobile-share-ui">
                          <div className="bookmark-icon-ui icon active">
                          </div>
                        </div>
                      </figure>
                      <figcaption>
                        <div className="mobile-hide">
                          <h2>{shopDetail.data.restaurant.shopName}</h2>
                          <div className="rating-tag-ui">
                            <p></p>
                          </div>
                          <p>{shopDetail.data.restaurant.shopAddress}</p>
                        </div>
                        <div className="hero-price-ui">
                          <div className="price-ui left-ui">
                            <label>Deliver in</label>
                            <span>
                              {shopDetail.data.restaurant.averageTime}
                              min
                            </span>
                          </div>
                          <div className="price-ui right-ui">
                            <label>Minimum Order</label>
                            <span>
                              {shopDetail.data.restaurant.currencySymbol}
                              {shopDetail.data.restaurant.minOrder}
                            </span>
                          </div>
                          <div className="price-ui mob-ui">
                            <label>Overall Rating</label>
                            <span className="rating-ui"></span>
                          </div>
                        </div>
                        <div className="mobile-offer-ui">
                          {shopDetail.data.promo.map((item) => {
                            return (
                              <div className="mob-coupon-ui">
                                <p>{item.description}</p>
                                <span className="coupon-code-ui">
                                  {item.name}
                                </span>
                              </div>
                            );
                          })}
                        </div>
                      </figcaption>
                    </div>
                  </div>
                  <div className="col-sm-12 col-lg-4 col-xl-3">
                    {shopDetail.data.promo.map((item) => {
                      return (
                        <div className="offer-ui">
                          <div className="offer-heading-ui">
                            <h4>OFFERS</h4>
                          </div>
                          <ul>
                            <li>
                              <div class="offer-content-ui">
                                <div class="tag-icon">
                                  <img src="https://dev.gatoes.com/assets/images/discount.svg" />
                                </div>
                                <h5>{item.description}</h5>
                                <span class="coupon-code-ui">{item.name}</span>
                              </div>
                            </li>
                          </ul>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <h2></h2>
        )}
          <div className="product-list">
            <div className="cs-search-ui">
              <div className="container">
                <div className="search-ui-block">
                  <div className="search-left-ui">
                    <div className="form-group">
                      <input
                        type="search"
                        placeholder="Search for items"
                        name="name"
                      />
                    </div>
                  </div>
                  <div className="search-right-ui">
                    <div className="custom-checkbox">
                      <label>
                        <input type="checkbox" id="veg" value="1" name="veg" />
                        <span className="check-ui">Veg only</span>
                      </label>
                    </div>
                    <div className="custom-checkbox egg-field">
                      <label>
                        <input type="checkbox" id="veg" value="2" name="veg" />
                        <span className="check-ui">Egg only</span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="container">
              <div className="row">
                
                    <div className="col-md-3 col-lg-3">
                   
                      <div className="product-nav-ui">
                        <nav
                          className="navbar product-navbar"
                          data-toggle="sticky-onscroll"
                        >
                          <div className="main-tab">
                            <div className="main-tab">
                              <ul className="nav nav-pills">
                              {shopDetail.data ? 
                          shopDetail.data.menu.map((item)=>{
                          return(
                                <li className="nav-item">
                                  <a
                                    href={'#'+`${item.category_name}`}
                                    className="nav-link"
                                    data-toggle="tab"
                                    onClick={()=>this.link}
                                  >
                                    {item.category_name}
                                  </a>
                                </li>
                                 )
                                })
                              :<h2></h2>}
                              </ul>
                            </div>
                          </div>
                        </nav>
                      </div>
                     
                    </div>
                  
                  <div className="col-md-6 col-lg-6 l-custom-width">
                    {shopDetail ?
                    shopDetail.data.menu.map(item=>{
                      return(
                        <>
                        <div id={item.category_name} className="product-wrapper">
                        <div className="row"></div>
                        </div>
                        {item.item ? (
                        <div id={item.category_name} className="product-wrapper">
                          <div className="row">
                            <div className="col-md-12 product-heading-ui">
                              <h3>{item.category_name}</h3>
                            </div>

                            <div className="col-sm-12 col-md-12 col-lg-12">
                              {item.item.map((item) => {
                                return (
                                  <div className="product-ui">
                                    <a>
                                      <figcaption>
                                        <div className="description-block">
                                          <div className="desc-left-ui align-self-center">
                                            <div className="v-icon">
                                              {item.itemName}
                                            </div>
                                            <p>{item.itemDescription}</p>
                                          </div>
                                          <div className="desc-right-ui align-self-center">
                                            <div className="add-btn-ui">
                                              {item.variants ? (
                                                <>
                                                
                                                  <button
                                                    className="btn"
                                                    onClick={() =>
                                                      this.cartDetailsWithVariants(
                                                        item
                                                      )
                                                    }
                                                  >
                                                    Add
                                                  </button>
                                                  
                                                </>
                                              ) : (
                                                <button
                                                  className="btn"
                                                  onClick={() =>
                                                    this.cartDetails(item)
                                                  }
                                                >
                                                  Add
                                                </button>
                                              )}
                                            </div>
                                          </div>
                                        </div>
                                        <div className="price-block">
                                          <div className="price-text-ui">
                                            <p>
                                              {item.currencySymbol}
                                              {item.price}
                                            </p>
                                            <span className="customize-text">
                                              Customisable
                                            </span>
                                          </div>
                                        </div>
                                      </figcaption>
                                    </a>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        </div>
                      ) : (
                        <h2></h2>
                      )}
                        </>
                      )
                    }):<h2></h2>}
                  </div>
                <div className="col-md-3 col-lg-3 r-custom-width 123">
                {this.props.addedCart.cartData ? 
                    this.props.addedCart.cartData.length != 0 ? 
                      <Cart />
                     : 
                     <>
                     <div class="cart-mobile-ui"></div>
                        <div class="checkout-sidebar-ui detail-checkout-sidebar">
                          <div class="content-ui">
                            <div class="empty-checkout-ui">
                              <figure>
                                <img
                                  src="https://dev.gatoes.com/assets/images/cart_empty.png"
                                  alt=""
                                />
                              </figure>
                              <p>
                                Good food is always cooking! Go ahead, order
                                some yummy items from the menu.
                              </p>
                            </div>
                          </div>
                        </div>
                        </>
                :<h2></h2>}
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
  return {
    addedCart: state.cart,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    cart: (cartData) => dispatch(cart(cartData)),
    deleteCart: (cartData) => dispatch(deleteCart(cartData)),
    addQuantity: (id) => dispatch(addQuantity(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(shopDetails);
