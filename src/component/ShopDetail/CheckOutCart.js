import React, { Component } from 'react'
import {connect} from 'react-redux';
import { withRouter } from 'react-router-dom';
import { toast } from 'react-toastify';
import {addQuantity, deleteCoupon, deleteCart, cartDetail, checkOutCartData, getaddress, finalCartDetail} from "../../redux";
import AddCouponModal from './AddCouponModal';



 class CheckOutCart extends Component {
    constructor(props){
        super(props)
        this.state = {
            cartDetail : JSON.parse(localStorage.getItem('cartData')),
            latitude : localStorage.getItem('latitude'),
            longitude : localStorage.getItem('longitude'),
            shopId : JSON.parse(localStorage.getItem('id')) ,
            items : JSON.stringify(this.props.cartData),
            couponModal : false ,
            timeStamp : '' 
        }
    }

    applyCoupon = () =>{
        this.setState({couponModal : true})
    }

    closeCouponModal = () =>{
        this.setState({couponModal : false})
    }

    componentWillReceiveProps(nextProps){
        for(var i=0 ;i<nextProps.cartData.length ; i++){
            for(var j=0 ; j<this.props.cartData.length ;j++)
            {
             if(nextProps.cartData[i].quantity != this.props.cartData[j].quantity && nextProps.cartData[i].id == this.props.cartData[j].id ){
                 var localState = this.state
                 localState = Object.assign(localState , {items : JSON.stringify(nextProps.cartData) })
                 this.props.cartDetail(localState)   
                }             
            } 
                  
        }   
           
    }

    deleteCartItem = (item) => {
        this.props.deleteCart(item)
    }
    
    addQty = (id) => {
        this.props.addQuantity(id);
    };

    componentDidMount(){
        if(this.props.address.id){
            const data = {
                shopId : this.state.shopId,
                longitude:this.state.longitude,
                latitude:this.state.latitude,
                items:this.state.items ,
                addressId : this.props.address.id
            }
            this.props.finalCartDetail(data)
        }
        else{
        const data = {
            shopId : this.state.shopId,
            longitude:this.state.longitude,
            latitude:this.state.latitude,
            items:this.state.items 
        }
        this.props.cartDetail(data)
        }
    }

    cancelCoupon = () =>{
        this.props.deleteCoupon()
        toast('coupon deleted')
    }

    render() {
        return (
            <>
                {this.props.checkOutCartDetail.totalPrice ?
                <div class="chekout-right-ui">
                    <div class="checkout-sidebar-ui">
                        <div class="content-ui">
                            <div class="cart-item-list">
                                <div class="resturant-info">
                                    <a href="/shop/abc-chandigarh-india-102">
                                        <figure>
                                            {this.props.checkOutCartDetail.restaurant.image ? 
                                            <img src={this.props.checkOutCartDetail.restaurant.image.original} alt={this.props.checkOutCartDetail.restaurant.shopName} />
                                            :
                                            <img src="" alt={this.props.checkOutCartDetail.restaurant.shopName} />
                                            }
                                        </figure>
                                        <figcaption>
                                            <h5>{this.props.checkOutCartDetail.restaurant.shopName}</h5>
                                            <p>{this.props.checkOutCartDetail.restaurant.shopAddress}</p>
                                        </figcaption>
                                    </a>
                                </div>
                                
                                <ul className="cart-listing">
                                {this.props.checkOutCartDetail.items.map(orderFood=>{
                                    return(
                                    <li>
                                        <div class="desc-block">
                                            <div class="select-item-box">
                                                <div class="v-icon"></div>
                                                <p>{orderFood.itemName}</p>
                                                <span>{orderFood.itemDescription}</span>
                                            </div>
                                            <div className="price-box-ui">
                                                {orderFood.currencySymbol} {orderFood.cartPrice}
                                            </div>
                                        </div>
                                        <div className="quantity-box">
                                            <div className="add-quantity">
                                                <div className="quantity-input form-item fade15">
                                                    <button
                                                        type="button"
                                                        id="sub2"
                                                        class="quty-btn sub"
                                                        onClick={() =>
                                                        this.deleteCartItem(orderFood)
                                                        }
                                                    >
                                                        <span className="icon-i_minus"></span>
                                                    </button>
                                                    {orderFood.quantity}
                                                    <button
                                                        type="button"
                                                        id="add2"
                                                        class="quty-btn add"
                                                        onClick={() => this.addQty(orderFood)}
                                                    >
                                                        <span class="icon-ic_add"></span>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                    )
                                })}
                                </ul>
                                
                               
                                <form>
                                    <div class="suggestion-box">
                                        <input type="text" placeholder="Add requests? We will pass it on..." />
                                    </div>
                                </form>
                                    <div class="apply-coupon-block">
                                        {this.props.coupon.appliedCoupon ?
                                        <a href="javascript:void(0)" class="active" onClick={()=>this.cancelCoupon()}>{this.props.coupon.appliedCoupon.name} <span>coupon applied successfully</span><small>Cancel</small></a>
                                        :
                                            <a href="javascript:void(0)" onClick={()=>this.applyCoupon()} >APPLY COUPON</a>
                                        }
                                    </div>
                                   
                                        <div class="b-detail-block">
                                        <h5>Bill Details</h5>
                                        <div class="bill-detail-list">
                                            <div class="left-block">
                                                <p>Item Total</p>
                                            </div>
                                            <div class="right-block">
                                            <p>{this.props.checkOutCartDetail.currencySymbol}{this.props.checkOutCartDetail.itemTotalPrice}</p>
                                            </div>
                                        </div>
                                        {this.props.checkOutCartDetail.deliveryCharge ? 
                                        <div class="bill-detail-list">
                                            <div class="left-block">
                                                <p>Delivery Charge</p>
                                            </div>
                                            <div class="right-block">
                                            <p>{this.props.checkOutCartDetail.currencySymbol}{this.props.checkOutCartDetail.deliveryCharge}</p>
                                            </div>
                                        </div>
                                        :<h2></h2>
                                        }
                                        {this.props.coupon.appliedCoupon ?
                                        <div className="bill-detail-list">
                                            <div class="left-block">
                                                <p>Coupon</p>
                                            </div>
                                            <div class="right-block">
                                            <p>-₹{this.props.coupon.appliedCoupon.deduction}</p>
                                            </div>
                                        </div>
                                       :<h2></h2>}
                                        {this.props.checkOutCartDetail.restaurantCharges.map(charge=>{
                                        return(
                                        <div class="bill-detail-list">
                                            <div class="left-block">
                                                <p>{charge.name}</p>
                                            </div>
                                            <div class="right-block">
                                                <p>₹{charge.amount}</p>
                                            </div>
                                        </div>
                                        )
                                })}
                                    </div>
                                   
                                   <div class="total-ui">
                                        <div class="left-block">
                                            <h5>Total Amount</h5>
                                        </div>
                                        {this.props.coupon.appliedCoupon ? 
                                            <div class="right-block">
                                                <p>₹{this.props.coupon.totalPrice}</p>
                                            </div>
                                        :
                                            <div class="right-block">
                                                <p>₹{this.props.checkOutCartDetail.totalPrice}</p>
                                            </div>
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="mob-cart-login-ui">
                            <div class="without-login-ui">
                                <h4>Almost There 0</h4>
                                <p>Please add the delivery address before proceeding</p>
                                <a href="javascript:void(0);" class="btn btn2">Add Address</a>
                            </div>
                            <div class=""></div>
                        </div>
                    </div>
                :<h2></h2>}
                <AddCouponModal couponModal={this.state.couponModal} onHide={this.closeCouponModal} />
            </>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user : state.login.user ,  
        cartData : state.cart.cartData ,
        checkOutCartDetail : state.cart.checkOutCart ,
        cart : state.cart ,
        coupon : state.coupon.coupon ,
        address : state.address.deliverAddress
    }
  }
  
  const mapDispatchToProps = (dispatch) => {
    return {
        cartDetail : (data) =>dispatch(cartDetail(data)) ,
        checkOutCartData : (data)=>dispatch(checkOutCartData(data)) ,
        deleteCart: (cartData) => dispatch(deleteCart(cartData)),
        addQuantity: (id) => dispatch(addQuantity(id)),
        deleteCoupon : () => dispatch(deleteCoupon()),
        getaddress : () => dispatch(getaddress()) ,
        finalCartDetail : (data) => dispatch(finalCartDetail(data))
    };
  };

  export default connect(mapStateToProps,mapDispatchToProps)(withRouter(CheckOutCart))