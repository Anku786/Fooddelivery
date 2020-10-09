import React, { Component } from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
import { getAddressData } from '../../redux/address/addressActions';
import AddressModal from '../ShopDetail/AddressModal'
import EditModal from './EditModal';

class ManageAddress extends Component {
    constructor(props){
        super(props)
        this.state = {
            addAddressModal : false ,
            editAddressModal : false ,
            selectedAddress : ''
        }
    }

    handleAddress = () =>{
        this.setState({addAddressModal : true})
    }

    closeAddAddressModal = () =>{
        this.setState({addAddressModal : false})
    }

    closeEditAddressModal = () =>{
        this.setState({editAddressModal : false})
    }

    editAddress = (id) =>{
            axios({
                method:'get',
                url:`https://devapi.gatoes.com/user/getAllAddress?addressId=${id}`,
                headers : {
                    'contentlanguage': 'en',
                    'Accept' : 'application/json',
                    authorization: "Bearer " + localStorage.getItem("jwt")
                }
            })
                .then(res=>{
                    console.log(res.data)
                    this.setState({selectedAddress : res.data.data})
                    // this.props.getAddressData(res.data.data)
                    this.setState({editAddressModal :  true})
                }).catch((err)=>{
                    console.log(err)
                
            })
        }

    deleteAddress = (id) =>{
        axios({
            method : 'post' ,
            url : 'https://devapi.gatoes.com/user/deleteAddress' ,
            headers : {
                'contentlanguage': 'en',
                'Accept' : 'application/json',
                authorization: "Bearer " + localStorage.getItem("jwt") ,
                'Content-Type': 'application/json'
            } ,
            data : {addressId : id}
        }).then(res=>{
            let deleteAddress = this.props.address.address.find(addressData=>addressData.id === id)
            let filterAddress = this.props.address.address.filter(addressData=>addressData.id !== id)
            console.log('f1',deleteAddress)
            console.log('f2',filterAddress)
            this.props.getAddressData(filterAddress)
        }).catch(err=>{
            console.log(err)
        })
    }

    render() {
        const address = this.props.address
        return (
            <div class="tab-content">
                <div class="tab-pane active">
                    <div class="panel panel-default">
                        <div class="panel-heading">
                            <h4 class="panel-title">
                                <a data-toggle="collapse" data-parent=".tab-pane" href="#collapseThree">
                                    <span class="icon-ic_location_b"></span>
                                    Manage addresses
                                </a>
                            </h4>
                        </div>
                        <div class="panel-collapse collapse in">
                            <div class="panel-body tab-content-ui manage-address-ui">
                                <div class="heading">
                                    Manage Addresses
                                    <a href="javascript:void(0);" onClick={this.handleAddress}  class="new-address-ui">Add New</a>
                                </div>
                                <a href="javascript:void(0);" onClick={this.handleAddress} class="new-address-ui mob-view">Add New</a>
                                {address.length != 0 ?
                                <div class="address-field-block"> 
                                    {address.address.map(adrs=>{
                                        return(
                                            <div class="address-ui">
                                                <span class="icon-ic_work"></span>
                                                <h5>{adrs.type}</h5>
                                                <p>{adrs.address} </p>
                                                <div class="btns-block">
                                                    <a href="javascript:void(0);" onClick={()=>this.editAddress(adrs.id)} class="text-btn">edit</a>
                                                    <a href="javascript:void(0);" onClick={()=>this.deleteAddress(adrs.id)} class="text-btn">Delete</a>
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                                :
                                <div class="address-field-block">
                                    <div class="cs-message-wrapper">
                                        <div class="message-image-ui">
                                            <img src="https://dev.gatoes.com/assets/images/ic_manage_address_empty.png" alt="" />
                                        </div>
                                        <div class="message-content-ui">
                                            <h4 class="title">Address book is empty</h4>
                                            <p>Save addresses to let us know where to find you.</p>
                                            <a href="javascript:void(0);" class="btn cta-btn" onClick={this.handleAddress}>Add new address</a>
                                        </div>
                                    </div>
                                </div>
                                }
                            </div>
                        </div>
                    </div>
                </div>
                <AddressModal addAddressModal={this.state.addAddressModal} onHide={this.closeAddAddressModal} />
                <EditModal address={this.state.selectedAddress} editAddressModal={this.state.editAddressModal} onHide={this.closeEditAddressModal} />
            </div>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        address : state.address.address
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getAddressData : (data)=>{dispatch(getAddressData(data))}
    }
}

export default connect(mapStateToProps , mapDispatchToProps)(ManageAddress)