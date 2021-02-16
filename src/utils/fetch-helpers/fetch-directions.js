import {MAP_TOKEN} from 'react-native-dotenv';

const filterResponse = res => res.routes[0].geometry.coordinates;

const getURL = ({directionsMode, start, end}) =>
  `https://api.mapbox.com/directions/v5/mapbox/${directionsMode}/${start[0]}%2C${start[1]}%3B${end[0]}%2C${end[1]}?alternatives=false&geometries=geojson&steps=false&access_token=${MAP_TOKEN}`;

export const FetchDirections = (coords, directionsMode) =>
  new Promise((resolve, reject) => {
    const [start, end] = coords;
    const url = getURL({directionsMode, start, end});
    fetch(url)
      .then(response => response.json())
      .then(res => {
        res.code !== 'Ok' && resolve([]);
        resolve(filterResponse(res));
      })
      .catch(err => reject(err));
  });
