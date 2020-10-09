import React, { Component } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import {connect} from 'react-redux';
import {getOrderDetail, getOrder } from '../../redux/payment/paymentActions';

class Order extends Component {
    constructor(){
        super()
        this.state = {
            orders : '' ,
            method : 'ongoing' ,
            pastOrders : ''
        }
    }

    selectMethod(method){
        if(method === 'past'){
            this.setState({method : 'past'})
            axios({
                method:'get',
                url:'https://devapi.gatoes.com/user/getOrders?type=PAST',
                headers : {
                    'contentlanguage': 'en',
                    'Accept' : 'application/json',
                    authorization: "Bearer " + localStorage.getItem("jwt")
                } 
            })
            .then(res=>{
                console.log('papa',res.data.data)
                this.setState({pastOrders : res.data.data})
            }).catch((err)=>{
                console.log('sas')
            })
        }
        else{
            this.setState({method : 'ongoing'})
        }
    }

    componentDidMount(){
        axios({
            method:'get',
            url:'https://devapi.gatoes.com/user/getOrders?type=PENDING',
            headers : {
                'contentlanguage': 'en',
                'Accept' : 'application/json',
                authorization: "Bearer " + localStorage.getItem("jwt")
            } 
        })
        .then(res=>{
            this.setState({orders : res.data.data})
        }).catch((err)=>{
            console.log('sas')
        })
    }

    pastOrder=()=>{
        
    }
    
    orderDetail = (orderId)=>{
        axios({
            method:'get',
            url:`https://devapi.gatoes.com/user/getOrderDetail?orderId=${orderId}`,
            headers : {
                'contentlanguage': 'en',
                'Accept' : 'application/json',
                'authorization': 'Bearer '+localStorage.getItem('jwt'),
                'utcoffset' : -420,
                'devicetype':'WEB'
            }
        }).then(res=>{
            // this.props.getOrderDetail()
            // this.props.history.push('/track-order')
            this.props.getOrder(res.data.data.order.orderId).then(res=>{
                this.props.getOrderDetail(res.value.data.data)
                this.props.history.push('/track-order')
           }) 
        // this.props.history.push(`/track-order/${res.data.data.order.orderId}`)
        
    }).catch((err)=>{
        console.log('sas')
    })
    }
    render() {
        const {orders , pastOrders} = this.state
        return (
            <div className="tab-content">
                <div className="tab-pane active">
                    <div className="panel panel-default">
                        <div className="panel-heading">
                            <h4>Manage</h4>
                        </div>
                        <div className="panel-collapse collapse">
                            <div className="heading">My Orders</div>
                            <div className="panel-body tab-content-ui order-tabs-ui">
                                <div class="nav nav-tabs nav-fill" id="nav-tab" role="tablist">
                                    <a class={this.state.method === 'ongoing' ? "nav-item nav-link active" : "nav-item nav-link "} value="ongoing" onClick={()=>this.selectMethod('ongoing')} href="javascript:void(0)">Ongoing</a>
                                    <a class={this.state.method === 'past' ? "nav-item nav-link active" : "nav-item nav-link "} value="past" onClick={()=>this.selectMethod('past')} href="javascript:void(0)">Past</a>
                                </div>
                                <div className="tab-content">
                                <div className="tab-pane fade show active">
                                    {this.state.method === 'ongoing' &&
                                    <div className="result-tab-ui">
                                        <div className="row restaurant-ui-listing">
                                            <div className="col-lg-12 col-md-12">
                                            {orders.orders ? 
                                            orders.orders.map(orderItem=>{
                                            return(
                                                <div class="last-order-detail upcoming-order">
                                                    <figure>
                                                        {orderItem.restaurant.image ? 
                                                            <img src={orderItem.restaurant.image.original} alt={orderItem.restaurant.shopName} />
                                                        :
                                                            <img src="" alt={orderItem.restaurant.shopName} />
                                                        }
                                                    </figure>
                                                    <figcaption>
                                                        <label>ORDER #{orderItem.order.orderId}  <span class="tag in-kitchen">New</span></label>
                                                        <h5>{orderItem.restaurant.shopName}</h5>
                                                        <p>{orderItem.restaurant.shopAddress}</p>
                                                        <p class="price-text mob-show">{orderItem.order.currencySymbol}{orderItem.order.totalPrice}</p>
                                                        <div class="deliver-text-ui mob-hide">{orderItem.orderDate}</div>
                                                        <div class="buttons-block mob-hide">
                                                            <div class="left-btn-ui">
                                                                <p class="price-text">Total paid: {orderItem.order.currencySymbol}{orderItem.order.totalPrice}</p>
                                                                <a href="javascript:void(0);" class="text-btn">View Details</a>
                                                            </div>
                                                            <div class="right-btn-ui">
                                                                <button class="btn reorder-btn"  onClick={()=>this.orderDetail(orderItem.order.orderId)}>Track order</button>
                                                            </div>
                                                        </div>
                                                    </figcaption>
                                                    <div class="buttons-block mob-show">
                                                        <div class="left-btn-ui">
                                                            <a href="javascript:void(0);" class="text-btn">View Details</a>
                                                        </div>
                                                        <div class="right-btn-ui">
                                                            <button class="btn reorder-btn"  onClick={()=>this.orderDetail(orderItem.order.orderId)}>Track order</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                            }):<h2></h2>}
                                        </div>
                                    </div>
                                </div>
                                    }
                                    {this.state.method === 'past' &&
                                    <div className="result-tab-ui">
                                    <div className="row restaurant-ui-listing">
                                        <div className="col-lg-12 col-md-12">
                                        {pastOrders.orders ? 
                                        pastOrders.orders.map(orderItem=>{
                                        return(
                                            <div class="last-order-detail upcoming-order">
                                                <figure>
                                                    {orderItem.restaurant.image ? 
                                                        <img src={orderItem.restaurant.image.original} alt={orderItem.restaurant.shopName} />
                                                    :
                                                        <img src="" alt={orderItem.restaurant.shopName} />
                                                    }
                                                </figure>
                                                <figcaption>
                                                    <label>ORDER #{orderItem.order.orderId}  <span class="tag in-kitchen">New</span></label>
                                                    <h5>{orderItem.restaurant.shopName}</h5>
                                                    <p>{orderItem.restaurant.shopAddress}</p>
                                                    <p class="price-text mob-show">{orderItem.order.currencySymbol}{orderItem.order.totalPrice}</p>
                                                    <div class="deliver-text-ui mob-hide">Canceled by user on{orderItem.orderDate}</div>
                                                    <div class="buttons-block mob-hide">
                                                        <div class="left-btn-ui">
                                                            <p class="price-text">Total paid: {orderItem.order.currencySymbol}{orderItem.order.totalPrice}</p>
                                                            <a href="javascript:void(0);" class="text-btn">View Details</a>
                                                        </div>
                                                    </div>
                                                </figcaption>
                                                <div class="buttons-block mob-show">
                                                    <div class="left-btn-ui">
                                                        <a href="javascript:void(0);" class="text-btn">View Details</a>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                        }):<h2></h2>}
                                    </div>
                                </div>
                                </div>

                                    }
                           </div>
                           
                                </div>            
                        </div>
                    </div>
                </div>
            </div>
        </div>
        )
    }
}

const mapDispatchToProps = (dispatch)=>{
    return {
        getOrderDetail : (data)=>dispatch(getOrderDetail(data)) ,
        getOrder : (data)=>dispatch(getOrder(data))
    }
}

export default connect(null,mapDispatchToProps)(withRouter(Order))