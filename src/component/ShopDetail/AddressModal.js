import React, { Component } from "react";
import { Modal } from "react-bootstrap";
import axios from "axios";
import "../../App.css";
import { connect } from "react-redux";
import { getaddress } from "../../redux";
import {toast } from 'react-toastify';

const google = window.google;

class AddressModal extends Component {
  constructor(props) {
    super(props);
    this.autoCompleteInput = React.createRef();
    this.autoComplete = null;
    this.state = {
      flatNumber: "",
      houseNumber: "",
      buildingName: "",
      user_address: "",
      selectedOption: "",
      place: "",
    };
  }

  location = () => {
    let input_from = document.getElementById("autocomplete");
    let autocomplete = new google.maps.places.Autocomplete(input_from, {
      types: ["geocode"],
    });

    google.maps.event.addListener(autocomplete, "place_changed", function () {
      let place = autocomplete.getPlace();
      localStorage.setItem("latitude", place.geometry.location.lat());
      localStorage.setItem("longitude", place.geometry.location.lng());
      localStorage.setItem("place", JSON.stringify(place));
    });
  };

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  handleOptionChange = (event) => {
    this.setState({
      selectedOption: event.target.value,
    });
  };

  addAddress = (event) => {
    event.preventDefault();
    var latitude = localStorage.getItem("latitude");
    var longitude = localStorage.getItem("longitude");
    var address = JSON.parse(localStorage.getItem("place"));
    var addressData = {
      address: address.formatted_address,
      type: this.state.selectedOption,
      userLatitude: latitude,
      userLongitude: longitude,
      user_address: address.formatted_address,
      flatNumber: this.state.flatNumber,
      houseNumber: this.state.houseNumber,
      buildingName: this.state.buildingName,
    };
    axios({
      method: "post",
      url: "https://devapi.gatoes.com/user/addAddress",
      headers: {
        contentlanguage: "en",
        Accept: "application/json",
        authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      data: addressData,
    })
      .then((res) => {
        toast('Address added')
        this.props.onHide();
      })
      .catch((err) => {
            toast(err.response.data.message)
      });
  };

  render() {
    return (
      <Modal show={this.props.addAddressModal} onHide={this.props.onHide}>
        <Modal.Header closeButton>
          <div className="modal-body">
            <div class="modal-inner-block">
              <div class="popup-content-block  ada-block">
                <div class="login-block">
                  <div class="modal-heading-block">
                    <h4>Add Delivery Address</h4>
                  </div>
                  <div class="form-fields">
                    <form onSubmit={this.addAddress}>
                      <div class="floating-effect  form-group">
                        <div>
                          <input
                            ref={this.autoCompleteInput}
                            onChange={this.location}
                            id="autocomplete"
                            type="text"
                            autoComplete="off"
                            role="combobox"
                            placeholder="Type or search your location here..."
                            className="location-search-input form-control "
                          />
                        </div>
                        <input
                          name="user_address"
                          class="textfield"
                          type="hidden"
                        />
                        <label>Location</label>
                        <span class="icon-ic_gps"></span>
                      </div>
                      <div class="floating-effect  form-group">
                        <input
                          name="flatNumber"
                          onChange={this.onChange}
                          value={this.state.flatNumber}
                          class=" textfield   "
                          placeholder="Address"
                          type="text"
                        />
                        <label>Address</label>
                      </div>
                      <div class="floating-effect  form-group">
                        <input
                          name="houseNumber"
                          class=" textfield"
                          onChange={this.onChange}
                          value={this.state.houseNumber}
                          placeholder="House No / Block (Optional)"
                          type="text"
                        />
                        <label>House No / Block (Optional)</label>
                      </div>
                      <div class="floating-effect  form-group">
                        <input
                          name="buildingName"
                          class=" textfield"
                          onChange={this.onChange}
                          value={this.state.buildingName}
                          placeholder="Landmark"
                          type="text"
                        />
                        <label>Landmark</label>
                      </div>
                      <div class="form-group address-type-ui">
                        <ul>
                          <li class="home-icon">
                            <label>
                              <div class="radio-active   ">
                                <input
                                  name="type"
                                  id="home"
                                  checked={this.state.selectedOption === "HOME"}
                                  onChange={this.handleOptionChange}
                                  type="radio"
                                  value="HOME"
                                />
                                <span>
                                  <i class="icon-ic_home_address"></i>Home
                                </span>
                              </div>
                            </label>
                          </li>
                          <li class="home-icon">
                            <label>
                              <div class="radio-active   ">
                                <input
                                  name="type"
                                  id="work"
                                  checked={this.state.selectedOption === "WORK"}
                                  onChange={this.handleOptionChange}
                                  type="radio"
                                  value="WORK"
                                />
                                <span>
                                  <i class="icon-ic_work"></i>Work
                                </span>
                              </div>
                            </label>
                          </li>
                          <li class="home-icon">
                            <label>
                              <div class="radio-active   ">
                                <input
                                  name="type"
                                  id="other"
                                  checked={
                                    this.state.selectedOption === "OTHER"
                                  }
                                  onChange={this.handleOptionChange}
                                  type="radio"
                                  value="OTHER"
                                />
                                <span>
                                  <i class="icon-ic_location_d"></i>Other
                                </span>
                              </div>
                            </label>
                          </li>
                        </ul>
                      </div>
                      <div class="submit-btn">
                        <button
                          type="submit"
                          onClick={this.props.getaddress()}
                          class="btn cta-btn"
                        >
                          PROCEED
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Modal.Header>
      </Modal>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getaddress: () => dispatch(getaddress()),
  };
};

export default connect(null, mapDispatchToProps)(AddressModal);
