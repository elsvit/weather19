import {
  DEFAULT_LATITUDE,
  DEFAULT_LATITUDE_DELTA,
  DEFAULT_LONGITUDE,
  DEFAULT_LONGITUDE_DELTA,
} from '../../constants/map';
import { Reducer } from 'redux';

export const GET_ADDRESS: 'location/GET_ADDRESS' = 'location/GET_ADDRESS';
export const GET_LOCATION: 'location/GET_LOCATION' = 'location/GET_LOCATION';
export const GET_WEATHER: 'location/GET_WEATHER' = 'location/GET_WEATHER';
export const SET_ADDRESS: 'location/SET_ADDRESS' = 'location/SET_ADDRESS';
export const SET_WEATHER: 'location/SET_WEATHER' = 'location/SET_WEATHER';
export const SET_LOCATION: 'location/SET_LOCATION' = 'location/SET_LOCATION';
export const SET_MAP_LOCATION: 'location/SET_MAP_LOCATION' = 'location/SET_MAP_LOCATION';

export type LocationApiT =
  | typeof GET_ADDRESS
  | typeof GET_LOCATION
  | typeof GET_WEATHER
  ;

export interface ILocation {
  latitude: number;
  longitude: number;
}

export interface IAddress {
  country: string;
  town?: string;
  county?: string;
}

export interface IMapLocation {
  mapLatitude: number;
  mapLongitude: number;
  mapLatitudeDelta: number;
  mapLongitudeDelta: number;
}

export interface ILocationState {
  location: Maybe<ILocation>;
  address: IAddress;
  weather: any;
  mapLocation: IMapLocation;
}

export type LocationStateT = Readonly<ILocationState>;

interface IGetAddressAction {
  type: typeof GET_ADDRESS;
  payload: ILocation;
}

interface IGetLocationAction {
  type: typeof GET_LOCATION;
  payload: string;
}

interface ISetLocationAction {
  type: typeof SET_LOCATION;
  payload: ILocation;
}

interface ISetMapLocationAction {
  type: typeof SET_MAP_LOCATION;
  payload: ILocation;
}

interface ISetAddressAction {
  type: typeof SET_ADDRESS;
  payload: IAddress;
}

export type TLocationActions = ISetLocationAction &
  ISetMapLocationAction &
  ISetAddressAction &
  IGetLocationAction &
  IGetAddressAction;

const initialState: ILocationState = {
  location: undefined,
  address: {
    country: '',
    town: '',
    county: '',
  },
  weather: undefined,
  mapLocation: {
    mapLatitude: DEFAULT_LATITUDE,
    mapLongitude: DEFAULT_LONGITUDE,
    mapLatitudeDelta: DEFAULT_LATITUDE_DELTA,
    mapLongitudeDelta: DEFAULT_LONGITUDE_DELTA,
  },
};

const reducer: Reducer<ILocationState> = (state: ILocationState = initialState, action) => {
  switch (action.type) {
    case SET_LOCATION:
      return {
        ...state,
        location: action.payload,
      };

    case SET_MAP_LOCATION:
      return {
        ...state,
        mapLocation: action.payload,
      };

    case SET_ADDRESS:
      return {
        ...state,
        address: action.payload,
      };

    case SET_WEATHER:
      return {
        ...state,
        weather: action.payload,
      };

    default:
      return state;
  }
};

export default reducer;

export const setLocation = (payload: ILocation) => ({
  payload,
  type: SET_LOCATION,
});

export const setMapLocation = (payload: IMapLocation) => ({
  payload,
  type: SET_MAP_LOCATION,
});

export const setAddress = (payload: IAddress) => ({
  payload,
  type: SET_ADDRESS,
});

export const setWeather = (payload: any) => ({
  payload,
  type: SET_WEATHER,
});

export const getAddress = (payload: ILocation) => ({
  payload,
  type: GET_ADDRESS,
});

export const getLocation = (payload: string) => ({
  payload,
  type: GET_LOCATION,
});

export const getWeather = (payload: ILocation) => ({
  payload,
  type: GET_WEATHER,
});
