import {toLatin} from './translit';
import {MAP_TOKEN} from 'react-native-dotenv';

const filterResponse = arr => arr.map(({text, center}) => ({text, center}));

export const Fetch = text =>
  new Promise((resolve, reject) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${toLatin(
      text,
    )}.json?limit=4&types=place&access_token=${MAP_TOKEN}`;
    fetch(url)
      .then(response => response.json())
      .then(({features}) => {
        (!Array.isArray(features) || features.length === 0) && resolve([null, 'City Not Found']);
        resolve([filterResponse(features), '']);
      })
      .catch(err => reject(err));
  });
