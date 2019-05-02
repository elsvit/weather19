/**
 * Map screen
 */

import * as React from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { NavigationScreenProps } from 'react-navigation';
import MapView, { Marker } from 'react-native-maps';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';

import { BottomBtns } from '../../ui-blocks';
import { IAppState } from '../../../store';
import {
  getAddress,
  IAddress,
  ILocation,
  IMapLocation,
  setLocation,
  setMapLocation,
} from '../../../store/location';

interface IStateMap {
  address: IAddress;
  weather: any;
  location: Maybe<ILocation>;
  mapLocation: IMapLocation;
}

interface IDispatchMap {
  getAddress: typeof getAddress;
  setLocation: typeof setLocation;
  setMapLocation: typeof setMapLocation;
}

type TMapProps = IStateMap & IDispatchMap & NavigationScreenProps;

class Map extends React.Component<TMapProps> {
  public onRegionChangeComplete = (value: any) => {
    const {
      mapLatitude,
      mapLongitude,
      mapLatitudeDelta,
      mapLongitudeDelta,
    } = this.props.mapLocation;
    if (
      mapLatitude !== value.latitude ||
      mapLongitude !== value.longitude ||
      mapLatitudeDelta !== value.latitudeDelta ||
      mapLongitudeDelta !== value.longitudeDelta
    ) {
      this.props.setMapLocation({
        mapLatitude: value.latitude,
        mapLongitude: value.longitude,
        mapLatitudeDelta: value.latitudeDelta,
        mapLongitudeDelta: value.longitudeDelta,
      });
    }
  };

  longPressOnMap = (e: any) => {
    const latitude = e.coordinate.latitude;
    const longitude = e.coordinate.longitude;
    this.props.setLocation({ latitude, longitude });
    this.props.getAddress({ latitude, longitude });
  };

  render() {
    const {
      address: { country, town, county },
      weather,
      location,
    } = this.props;
    const latitude = location && location.latitude;
    const longitude = location && location.longitude;
    const {
      mapLatitude,
      mapLongitude,
      mapLatitudeDelta,
      mapLongitudeDelta,
    } = this.props.mapLocation;
    let address = `${town || ''} ${county || ''}`.trim();
    if (address) {
      if (country) {
        address = `${address}, ${country}`;
      }
    } else {
      if (country) {
        address = country;
      }
    }

    return (
      <View style={styles.container}>
        <MapView
          region={{
            latitude: mapLatitude,
            longitude: mapLongitude,
            latitudeDelta: mapLatitudeDelta,
            longitudeDelta: mapLongitudeDelta,
          }}
          style={StyleSheet.absoluteFill}
          onRegionChangeComplete={this.onRegionChangeComplete}
          onLongPress={e => {
            this.longPressOnMap(e.nativeEvent);
          }}
        >
          {latitude && longitude && <Marker coordinate={{ latitude, longitude }} />}
          {!!latitude && !!longitude && !!address && (
            <Marker coordinate={{ latitude, longitude }}>
              <View style={styles.markerComponent}>
                <Text>{address}</Text>
                {weather && <Text>{`${weather.temperature || ''} ${weather.summary || ''}`}</Text>}
              </View>
            </Marker>
          )}
        </MapView>
        <View style={styles.topTitleView}>
          <Text style={styles.topTitle}>{'Location'}</Text>
        </View>
        <BottomBtns navigation={this.props.navigation} active={'Map'} />
      </View>
    );
  }
}

const mapStateToProps = (state: IAppState) => ({
  address: state.location.address,
  weather: state.location.weather,
  location: state.location.location,
  mapLocation: state.location.mapLocation,
});

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      getAddress,
      setLocation,
      setMapLocation,
    },
    dispatch,
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Map);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topTitleView: {
    position: 'absolute',
    top: 20,
    width: '100%',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  topTitle: {
    color: '#3090EE',
    fontSize: 16,
    fontWeight: '500',
  },
  markerComponent: {
    maxWidth: 150,
    padding: 8,
    backgroundColor: '#FFFFFF',
    borderColor: '#999999',
    borderRadius: 8,
    marginBottom: 45,
  },
});
