import React, { Component } from 'react';
import MapView from 'react-native-maps'
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import { connect } from "react-redux";
import { locate } from "../store/action/action";

class Home extends Component {
  static navigationOptions = { header: null };

  constructor(props) {
    super(props);
    this.state = {
      region: null,
      email: this.props.email,
    }
    this._getLocationAsync();
  }

  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') 
      console.log('permission to access location is denied');
      let location = await Location.getCurrentPositionAsync({enableHightAccuracy: true})
      let region = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.045,
        longitudeDelta: 0.045,
      }
      this.setState({ region })
      this.props.saveLocation(region, this.props.email)
  }

  render(){
    return(
        <MapView  
        initialRegion={this.state.region}
        showsUserLocation={true}
        showsMyLocationButton={true}
        style={{ flex: 1 }}
        />
    );
  }
}

function mapStateToProps(state) {
  return ({
      email: state.basicInfo.email,
  })
}

function mapDispatchToProps(dispatch) {
  return ({
    saveLocation: (region, email) => {
          dispatch(locate(region, email))
      }
  })
}
export default connect(mapStateToProps, mapDispatchToProps)(Home)
