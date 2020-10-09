import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import { connect } from "react-redux";
import { addQuantity, cart, deleteCart } from "../../redux";

 class Cart extends Component {
    constructor(props) {
        super(props);
        this.state = {
          shopId: localStorage.getItem("id"),
          shopDetail: ""
        };
      }
    deleteCartItem = (cartData) => {
        this.props.deleteCart(cartData);
      };
    addQty = (id) => {
        this.props.addQuantity(id);
    };

    render() {
        return (
          <>
          {this.props.addedCart.cartData ? 
          <>
            <div class="cart-mobile-ui">
              <a className="btn checkout-btn">
                <span className="price">
                  {this.props.addedCart.cartData.length}
                  items - Rs {this.props.addedCart.cartData.price}
                </span>
                View cart
              </a>
            </div>
            <div class="checkout-sidebar-ui detail-checkout-sidebar">
              <div className="checkout-btn-ui">
                <Link to="/checkout" className="btn checkout-btn">Checkout</Link>
              </div>
              <div className="cart-item-list">
                <div className="total-number">
                  <p>
                    Cart
                    <span>
                      ({this.props.addedCart.cartData.length}item )
                    </span>
                  </p>
                </div>
                <ul className="cart-listing">
                  {this.props.addedCart.cartData.map((item) => {
                    return (
                      <li>
                        <div className="select-item-box">
                          <div class="v-icon"></div>
                          <p>{item.itemName}</p>
                          <span></span>
                          <div class="price-box-ui">
                            {item.currencySymbol}
                            {item.price}
                          </div>
                        </div>
                        <div className="quantity-box">
                          <div class="add-quantity">
                            <div class="quantity-input form-item fade15">
                              <button
                                type="button"
                                id="sub2"
                                class="quty-btn sub"
                                onClick={() =>
                                  this.deleteCartItem(item)
                                }
                              >
                                <span class="icon-i_minus"></span>
                              </button>
                                {item.quantity}
                              <button
                                type="button"
                                id="add2"
                                class="quty-btn add"
                                onClick={() => this.addQty(item)}
                              >
                                <span class="icon-ic_add"></span>
                              </button>
                            </div>
                          </div>
                        </div>
                      </li>
                    );
                  })}
                  </ul>
                  <div className="total-ui">
                    <div class="left-block">
                      <h5>Total Amount</h5>
                    </div>
                    <div class="right-block">
                      <p>
                        {this.props.addedCart.cartData.currencySymbol}
                        {this.props.addedCart.total}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </>         
          :<h2></h2> }
        </>
      )
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
  
export default connect(mapStateToProps, mapDispatchToProps)(Cart);