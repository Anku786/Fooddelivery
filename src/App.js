import React , {Component} from 'react';
import HomeSection from './component/HomeSection';
import {BrowserRouter ,  Route , Switch } from 'react-router-dom';
import ManageAccount from './component/ManageAccount/ManageAccount'
import Shops from './Shops';
import './App.css';
import ShopDetails from './component/ShopDetail/shopDetails';
import CheckOut from './component/ShopDetail/CheckOut';
import TrackOrder from './component/ShopDetail/TrackOrder';


class App extends Component {
  render(){
    return (
      
        <BrowserRouter>
          <Switch>
            <Route exact path="/">
              <HomeSection />
            </Route>
            <Route exact path="/profile">
              <ManageAccount />
            </Route>
            <Route exact path="/shops">
              <Shops />
            </Route>
            <Route exact path="/shop/:shopId/">
              <ShopDetails />
            </Route>
            <Route exact path="/checkout">
              <CheckOut />
            </Route>
            <Route exact path="/track-order">
              <TrackOrder />
            </Route>
          </Switch>
        </BrowserRouter>
        
    );
  }
}

export default App;
