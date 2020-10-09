import React ,{Component} from 'react'
import {Map, Marker, GoogleApiWrapper} from 'google-maps-react';
 
export class MapContainer extends Component {
  render() {
    return (
      <Map google={this.props.google} zoom={14} initialCenter={{lat:this.props.latitude , lng:this.props.longitude }}>
        <Marker onClick={this.onMarkerClick}
          name={'Current location'} />
      </Map>
    );
  }
}
 
export default GoogleApiWrapper({
  apiKey: ('AIzaSyD7f9oPC3ISpPjasAB3BxxjyIS2d38rQVg&libraries=places')
})(MapContainer)