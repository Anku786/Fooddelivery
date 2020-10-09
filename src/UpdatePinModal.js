import React , {Component} from 'react';
import Header from './component/Header'
import {Link} from 'react-router-dom';
import axios from 'axios';
import {toast } from 'react-toastify';
import {Modal , Button} from 'react-bootstrap';


class UpdatePinModal extends Component {

    constructor(){
        super()
        this.state = {
            oldpassword : '',
            newpassword: '' ,
            password : ''
        }
    }

    onChange = (e) =>{
        this.setState({[e.target.name] : e.target.value})
    }

    formData = (e)=>{
        e.preventDefault();
        
        axios({
          method:'post',
          url:'https://devapi.gatoes.com/user/changepassword',
          headers : {'contentlanguage' : 'en',
          'Accept' : 'application/json',
          'authorization': 'Bearer '+localStorage.getItem('jwt')},
          data : {oldpassword : this.state.oldpassword , newpassword:this.state.newpassword}
      }).then(res=>{
          console.log('eres',res)
          this.props.onHide()
          toast('Password Changed')
      }).catch((err)=>{
          toast(err.response.data.message)
          console.log(err)
      })
        

    }

 

  render(){
  return (
    <>
        <div>
        <Modal show={this.props.changePinModal} onHide={this.props.onHide} className="modalStyle">
        <Modal.Header closeButton>
          <Modal.Body>
            <div class="modal-body">
              <div class="popup-content-block">
                <div class="login-block">
                  <div class="modal-heading-block">
                    <h4>Edit Pin</h4>
                  </div>
                  <form onSubmit={this.formData}>
                    <div className="form-fields">
                      <div className=" floating-effect form-group">
                        <input type="text" name="oldpassword" onChange={this.onChange} value={this.state.oldpassword} placeholder="OTP"  />
                        <label>Current PIN</label>
                      </div>
                      <div className="floating-effect form-group">
                        <input type="text" name="newpassword" onChange={this.onChange} value={this.state.newpassword} placeholder="OTP"  />
                        <label>New PIN</label>
                      </div>
                    </div>
                    <div class="submit-btn">
                      <button class="btn cta-btn"  onClick={this.formData}>Proceed</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </Modal.Body>
        </Modal.Header>
      </Modal>  
    </div>
    </>
  );
  }
}


  export default UpdatePinModal;
