import {toLatin} from '~/utils/translit';
import {MAP_TOKEN} from 'react-native-dotenv';
import {isFilledArr} from '~/utils/validation/helpers';

const filterResponse = arr => arr.map(({text, center}) => ({text, center}));
const getURL = text =>
  `https://api.mapbox.com/geocoding/v5/mapbox.places/${toLatin(
    text,
  )}.json?limit=4&types=place&access_token=${MAP_TOKEN}`;

export const FetchCities = text =>
  new Promise((resolve, reject) => {
    const url = getURL(text);
    fetch(url)
      .then(response => response.json())
      .then(({features}) => {
        if (!isFilledArr(features)) {
          resolve([null, 'Error occurred']);
          return;
        }
        resolve([filterResponse(features), '']);
      })
      .catch(err => reject(err));
  });
