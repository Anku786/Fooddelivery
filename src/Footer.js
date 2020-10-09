import React , {Component} from 'react';
class Footer extends Component {
    componentDidMount(){
        window.scroll(0,0)
    }
  render(){
    return (
        <footer className="main-footer">
            <div className="scroll-arrow-ui">
                <a href="javascript:;" className="arrow-img" onClick={this.componentDidMount}>
                    <img src="https://dev.gatoes.com/assets/images/up_arrow.svg" />
                </a>
            </div>
            <div className="top-footer-ui">
                <div className="container">
                    <div className="row">
                        <div className="col-md-3 col-sm-6">
                            <div className="footer-logo-ui">
                                <div className="logo-block">
                                    <a className="white-logo">
                                        <img src="https://dev.gatoes.com/assets/images/footer-logo.svg" />
                                    </a>
                                </div>
                                <ul className="store-icon-list">
                                    <li>
                                        <a href="https://apps.apple.com/us/app/id1519726781" target="_blank">
                                            <img src="https://dev.gatoes.com/assets/images/apple-store.svg" alt="" />
                                        </a>
                                    </li>
                                    <li>
                                        <a href="https://play.google.com/store/apps/details?id=com.gatoes&amp;hl=en_US" target="_blank">
                                            <img src="https://dev.gatoes.com/assets/images/google-play.svg" alt="" />
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-md-3 col-sm-6">
                            <div className="footer-nav-ui">
                                <h4>Discover Gatoes</h4>
                                <ul>
                                    <li>
                                        <a href="">About us</a>
                                    </li>
                                    <li>
                                        <a href="">Become a partner</a>
                                    </li>
                                    <li>
                                        <a href="">Ride with us</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-md-3 col-sm-6">
                            <div className="footer-nav-ui">
                                <h4>Help</h4>
                                    <ul>
                                        <li>
                                            <a href="">Contact us</a>
                                        </li>
                                        <li>
                                            <a href="">FAQs</a>
                                        </li>
                                    </ul>
                            </div>
                        </div>
                        <div className="col-md-3 col-sm-6">
                            <div className="footer-nav-ui">
                                <h4>Legal</h4>
                                    <ul>
                                        <li>
                                            <a href="">Terms & Conditions</a>
                                        </li>
                                        <li>
                                            <a href="">Refund & Cancellations</a>
                                        </li>
                                        <li>
                                            <a href="">Privacy Policy</a>
                                        </li>
                                        <li>
                                            <a href="">Cookie Policy</a>
                                        </li>
                                    </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="bottom-footer-ui"></div>
        </footer>  
    );
  }
}




  export default Footer