import moment from 'moment';
export const convertFarengateToCelcius = (f: number) => `${Math.round((5 / 9) * (f - 32))}°C`;

export const convertRawDailyToState = (daily: any[]) => {
  return daily.map((val: any) => {
    return {
      time: moment.unix(val.time).format('dddd'),
      temperature: convertFarengateToCelcius(val.temperatureHigh),
      summary: val.summary || '',
    };
  });
};
