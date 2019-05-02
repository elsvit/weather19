import { OPENCAGE_API_KEY } from '../constants/config';
import { ILocation } from '../store/location';

export function getAddressFromLocation(location: ILocation) {
  const { latitude, longitude } = location;
  const qry = `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${OPENCAGE_API_KEY}`;
  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  };

  return fetch(qry, requestOptions).then(handleResponse);
}

export function getLocationFromAddress(address: string) {
  const qry = `https://api.opencagedata.com/geocode/v1/json?q=${address}&key=${OPENCAGE_API_KEY}`;
  // const qry = `https://api.opencagedata.com/geocode/v1/json?q=Kyiv,Ukraine&key=647561123a5444f0bc25fb158c90aecc`;
  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  };

  return fetch(qry, requestOptions).then(handleResponse);
}

function handleResponse(res: any) {
  if (!res.ok) {
    return Promise.reject(res.statusText);
  }

  return res.json();
}
