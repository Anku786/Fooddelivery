import React , {Component} from 'react';
import {connect} from 'react-redux';
import AllHeader from './AllHeader';
import Footer from './Footer';
import {Link , withRouter} from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroll-component';
class App extends Component {
    constructor(props){
        super(props)
        this.state = {
            longitude : localStorage.getItem('longitude'),
            latitude : localStorage.getItem('latitude')
        }
    }    


  render(){
    return (
        <>
        <AllHeader />
        <div className="content-wrapper">
            <div className="hero-slider-ui special-offer-ui aos-init aos-animate" data-aos="fade" data-aos-delay="300">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-12">
                        {
                        this.props.shopData.shops.items.map(item=>{
                                if(item.type === 'promotions')
                                {
                                        return(
                            <div className="owl-carousel offer-slide owl-theme owl-loaded owl-drag">
                                <div className="owl-stage-outer">
                                    <div className="owl-stage" style={{width:'1987px' ,paddingLeft:'10px' ,paddingRight:'10px',
                                transform: 'translate3d(0px, 0px, 0px)', transition: 'all 0s ease 0s'}}>
                                    
                                    {item.promos.map(itm=>{
                                                        return(
                                            <div className="owl-item" style={{width:'363.333px',marginRight:'30px'}}>
                                            <div className="item">
                                            <div className="offer-slide-ui">
                                                <a href="">
                                                    
                                                            <figure>
                                                        <img src={itm.image.original} />
                                                    </figure>
                                                       
                                                    
                                                </a>
                                            </div>
                                        </div>

                                        </div>
                                       
                                       )
                                                        
                                    })}
                                </div>
                                </div>
                                <div className="owl-nav">
                                    <button type="button" role="presentation" className="owl-prev disabled">
                                        <span className="icon-ic-arrow-left"></span>
                                    </button>
                                    <button type="button" role="presentation" className="owl-next">
                                        <span className="icon-ic-arrow-right"></span>
                                    </button>
                                </div>
                                <div className="owl-dots">
                                    <button role="button" className="owl-dot active">
                                        <span></span>
                                    </button>
                                    <button role="button" className="owl-dot">
                                        <span></span>
                                    </button>
                                </div>
                            </div>
                         )
                        }
                            }
                            
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>


      <div className="order-now-block p-b90">
          <div className="container filter-ui">
              <div className="row">
                  <div className="col-sm-12">
                      <div className="orders-type-ui">
                          <p>Ordering</p>
                          <ul>
                              <li>
                                  <a href="javascript:;" className="active">
                                      <span className="icon">
                                          <img src="http://dev.gatoes.com/assets/images/ic_food.png" />
                                      </span>
                                      Food
                                  </a>
                              </li>
                              <li>
                                    <a href="javascript:;" className="active">
                                        <span className="icon">
                                            <img src="http://dev.gatoes.com/assets/images/ic_grocery.png" />
                                        </span>
                                        Groceries
                                    </a>
                              </li>
                          </ul>
                      </div>
                  </div>
              </div>
              <div className="row top-filter-ui">
                    <div className="col-lg-4 align-self-center">
                        <div className="search-module">
                            <input type="search" placeholder="Search for vendors" name="name" />
                        </div>
                    </div>
                    <div className="col-lg-8 align-self-center">
                        <div className="filter-listing">
                            <ul className="nav nav-tabs">
                                <li className="nav-item">
                                    <a href="javascript:;">Relevance</a>
                                </li>
                                <li className="nav-item">
                                    <a href="javascript:;">Rating</a>
                                </li>
                                <li className="nav-item">
                                    <a href="javascript:;">Delivery Time</a>
                                </li>
                                <li className="nav-item">
                                    <a href="javascript:;">Cost</a>
                                </li>
                                <li className="nav-item">
                                    <a href="javascript:;">Filters</a>
                                </li>
                            </ul>
                        </div>
                    </div>
              </div>
              {
              <InfiniteScroll 
                dataLength={3} 
                next={this.props.shopData.shops.items.type === 'restaurant'}
                hasMore={true}
                loader={this.props.shopData ? <h4></h4> :<h4>Loading...</h4>}
                >
              {/* <div className="infinite-scroll-component__outerdiv" >
                <div className="infinite-scroll-component" style={{height:'auto',overflow:'auto'}}> */}
                    <div className="row product-list-wrapper">
                        {
                            this.props.shopData.shops.isServiceAvailable === 0 ?
                            <div className="cs-message-wrapper">
                                <div className="message-image-ui">
                                    <img src="https://dev.gatoes.com/assets/images/no_search_results.png" />
                                </div>
                                <div className="message-content-ui">
                                    <h4 className="title">No results found</h4>
                                    <p>We cannot find what you are looking for.Try searching a new one.</p>
                                </div>
                            </div>
                        :
                        this.props.shopData.shops.items.map(item=>{
                            console.log('sssss',item)
                                if(item.type === 'restaurant')
                                {
                                
                                    return(
                                        <div className="col-sm-3">
                                        <div className="order-now-ui" style={{height:'400px'}}>
                                        <Link to={'/shop/'+`${item.restaurant.shopSlug}`}
                                        onClick={()=>localStorage.setItem('id',item.restaurant.shopId)}>
                                            <figure>
                                                {item.restaurant.image ? 
                                                <img src={item.restaurant.image.original}/>
                                                :
                                                <img src=""/>
                                                }
                                            </figure>
                                            <figcaption>
                                                <div className="product-title">
                                                    <h3>{item.restaurant.shopName}</h3>
                                                    <p>{item.restaurant.shopCuisines}</p>
                                                </div>
                                                <div className="crnt-offer">
                                                    <span>{item.restaurant.promoText}</span>
                                                </div>
                                                <div className="location">{item.restaurant.deliveryZoneName}</div>
                                                <div className="order-estimate">
                                                    <div className="pickup-ui">
                                                        <span className="watch-icon">
                                                            <img src="http://gatoes.com/assets/images/ic_rest_time.svg" />
                                                        </span>
                                                        <span className="ord-content">
                                                        {item.restaurant.averageTime}
                                                            mins
                                                        </span>
                                                    </div>
                                                    <div className="order-price">
                                                        <span className="price-icon">
                                                            <img src="http://gatoes.com/assets/images/ic_rest_cost.svg" />
                                                        </span>
                                                        <span className="ord-content">
                                                            {item.restaurant.currencySymbol}{item.restaurant.costForTwo} for two
                                                        </span>
                                                    </div>
                                                </div>
                                            </figcaption>
                                            <span className="rating-ui">
                                                <i className="rate-icon">
                                                    <img src="http://gatoes.com/assets/images/ic_star_g.svg" />
                                                </i>
                                                {item.restaurant.averageRating}
                                            </span>
                                        </Link>                           
                                    </div>
                                    
                                    
                                    
                                    </div>
                                    
                                    )
                                }
                                
                                })
                            }
                        </div>
                    {/* </div>
                </div> */}
                        </InfiniteScroll> }
              </div>
              
          </div>
          <Footer />
          </>
    );
  }
}

const mapStateToProps = (state) => {
    console.log('shopData',state)
    return {
      shopData : state.shop
    }
  }
  

  
export default connect(mapStateToProps,null)(withRouter(App))
