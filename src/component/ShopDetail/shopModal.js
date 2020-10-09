import React, { Component } from 'react'
import {  Modal} from 'react-bootstrap';

class shopModal extends Component {
    render() {
        return (
            <div>
                <h2>sasa</h2>
                <Modal show={this.state.addModal} onHide={this.addModalClose}>
                    <Modal.Header closeButton>
                        <div>
                            <div class="modal-body">
                                <div class="popup-content-block">
                                    <div class="login-block">
                                        <div class="modal-heading-block">
                                            <h4>
                                            <span className="v-icon"></span>
                                            Parantha
                                            </h4>
                                        </div>
                                        <div className="customise-detail-ui">
                                            <div className="choose-listing-ui">
                                                <div className="listing-heading-ui">
                                                    <p>
                                                    2
                                                    <span>Please select any one option</span>
                                                    </p>
                                                </div>
                                                
                                                <ul className="listing-ui">
                                                {item.variants.itemCustom.map(varItem=>{
                                                                    return(
                                                    <li>
                                                        <div className="custom-checkbox">
                                                            <label>
                                                            <input type="radio" name="variants" value="520"  />
                                                            <span class="check-ui">{varItem.name}</span>
                                                            </label>
                                                        </div>
                                                            <div className="price-ui">{varItem.currencySymbol}{varItem.price}</div>
                                                    </li>
                                                    )
                                                })}
                                                </ul>
                                                
                                            </div>
                                            <div className="choose-listing-ui">
                                                <div className="listing-heading-ui">
                                                    <p>
                                                    Extra
                                                    <span>(Please select at least 0 and upto 2 options)</span>
                                                    </p>
                                                </div>
                                                <ul className="listing-ui">
                                                    <li>
                                                        <div className="custom-checkbox">
                                                            <label>
                                                            <input type="checkbox" name="addons" value="441" />
                                                            <span class="check-ui">Curd</span>
                                                            </label>
                                                        </div>
                                                        <div className="price-ui">Rs 20.00</div>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div className="product-btn-ui">
                                            <div class="left-btn-block">
                                                <div class="quantity-input form-item fade15">
                                                    <button type="button" id="sub3" class="quty-btn sub">
                                                        <span class="icon-i_minus"></span>
                                                    </button>
                                                    <input type="number" id="2" min="1" max="1000" value="1" />
                                                    <button type="button" id="add3" class="quty-btn add">
                                                        <span class="icon-ic_add"></span>
                                                    </button>
                                                </div>
                                            </div>
                                            <div class="right-btn-block">
                                                <button class="btn cta-btn" data-toggle="modal" data-target="#duplicate-order" data-dismiss="modal">
                                                    Add For Rs 70
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Modal.Header>
                </Modal>
            </div>
        )
    }
}

export default shopModal