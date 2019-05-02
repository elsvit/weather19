import {DARKSKY_API_KEY} from '../constants/config';

export function getWeatherFromLocation(location: any) {
  const {latitude, longitude} = location;
  const qry = `https://api.darksky.net/forecast/${DARKSKY_API_KEY}/${latitude},${longitude}`;
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