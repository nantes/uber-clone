import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MapView, { Marker,Polyline, PROVIDER_GOOGLE } from "react-native-maps";


const LATITUDE_DELTA = 0.009;
const LONGITUDE_DELTA = 0.009;
const LATITUDE = -34.619010;
const LONGITUDE = -58.516050;

class App extends React.Component  {

  constructor(props) {
    super(props);
    this.state = {
     latitude: LATITUDE,
     longitude: LONGITUDE,
     error: null,
     routeCoordinates: [],
    };
   }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      position => {
        console.log(position);
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          error: null
        });
      },
      error => this.setState({ error: error.message }),
        { enableHighAccuracy: true, timeout: 200000, maximumAge: 1000 }
    );
    navigator.geolocation.watchPosition(
      position => {
       const { latitude, longitude } = position.coords;
       const { routeCoordinates } = this.state;
       const newCoordinate = {  latitude,  longitude  };
       this.setState({
        latitude,
        longitude,
         routeCoordinates: routeCoordinates.concat([newCoordinate])
       });      
      })
    }
   
  getMapRegion = () => ({
    latitude: this.state.latitude,
    longitude: this.state.longitude,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA
  });
  // style={{ ...StyleSheet.absoluteFillObject }}
  render() {
    return (
      <View style={styles.container}>
        <MapView style={{ ...StyleSheet.absoluteFillObject }} provider={PROVIDER_GOOGLE} region={this.getMapRegion()} >
          <Polyline coordinates={this.state.routeCoordinates} strokeWidth={2} />
          <Marker coordinate={this.getMapRegion()} />
        </MapView>                 
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});


export default App