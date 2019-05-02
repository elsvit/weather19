import { put, takeEvery, select } from 'redux-saga/effects';

import { IAppState } from '../store';
import {
  GET_ADDRESS,
  GET_WEATHER,
  GET_LOCATION,
  ILocation,
  setAddress,
  getWeather,
  setWeather,
  setLocation,
  setMapLocation,
} from './location';
import { getAddressFromLocation, getLocationFromAddress } from '../../services/geocoding';
import { getWeatherFromLocation } from '../../services/weather';
import { convertFarengateToCelcius, convertRawDailyToState } from '../../services/utils';
import { setError, setLoaded, setLoading } from '../common';

function* sagaGetAddress({ payload, type }: { payload: ILocation; type: typeof GET_ADDRESS }) {
  try {
    yield put(setLoading({ actionType: type }));
    const res = yield getAddressFromLocation(payload);
    const address = res && res.results && res.results[0] && res.results[0].components;
    if (address) {
      yield put(
        setAddress({ country: address.country, town: address.town, county: address.county }),
      );
      yield put(getWeather(payload));
    }
    yield put(setLoaded({ actionType: type }));
  } catch (err) {
    // tslint:disable-next-line
    console.log('sagaGetAddress error:', err);
    yield put(setError({ actionType: type, message: err.message }));
  }
}

function* sagaGetLocation({ payload, type }: { payload: string; type: typeof GET_LOCATION }) {
  try {
    yield put(setLoading({ actionType: type }));
    const res = yield getLocationFromAddress(payload);
    const geometry = res && res.results && res.results[0] && res.results[0].geometry;
    if (geometry) {
      const location = { latitude: geometry.lat, longitude: geometry.lng };
      yield put(setLocation(location));
      const stateMapLocation = yield select((state: IAppState) => state.location.mapLocation);
      const mapLocation = {
        mapLatitude: location.latitude,
        mapLongitude: location.longitude,
        mapLatitudeDelta: stateMapLocation.mapLatitudeDelta,
        mapLongitudeDelta: stateMapLocation.mapLongitudeDelta,
      };
      yield put(setMapLocation(mapLocation));
      yield put(getWeather(location));
      yield put(setLoaded({ actionType: type }));
    }
  } catch (err) {
    // tslint:disable-next-line
    console.log('sagaGetLocation error:', err);
    yield put(setError({ actionType: type, message: err.message }));
  }
}

function* sagaGetWeather({ payload, type }: { payload: ILocation; type: typeof GET_WEATHER }) {
  try {
    yield put(setLoading({ actionType: type }));
    const res = yield getWeatherFromLocation(payload);
    const currently = res && res.currently;
    const daily = res && res.daily;
    if (currently) {
      yield put(
        setWeather({
          temperature: convertFarengateToCelcius(currently.temperature),
          summary: currently.summary,
          daily: daily ? convertRawDailyToState(daily.data) : [],
        }),
      );
      yield put(setLoaded({ actionType: type }));
    }
  } catch (err) {
    // tslint:disable-next-line
    console.log('sagaGetWeather error:', err);
    yield put(setError({ actionType: type, message: err.message }));
  }
}

export default function*(): Generator {
  yield takeEvery(GET_ADDRESS, sagaGetAddress);
  yield takeEvery(GET_LOCATION, sagaGetLocation);
  yield takeEvery(GET_WEATHER, sagaGetWeather);
}
