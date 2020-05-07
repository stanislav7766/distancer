import {Dimensions} from 'react-native';
const {height, width} = Dimensions.get('window');

export const THEMES = {
  DARK: 'dark',
  LIGHT: 'light',
};

export const WINDOW_HEIGHT = height;
export const WINDOW_WIDTH = width;

export const APP_MODE = {
  VIEW_MODE: 'View',
  DRAW_MODE: 'Draw',
  MENU_MODE: 'Menu',
  SAVED_MODE: 'Saved',
  VIEW_ROUTE: 'viewRoute',
};

export const NAVBAR_HEIGHT = height * 0.06;

export const DEFAULT_ROUTE = {
  distance: 0,
  id: '',
  points: [],
  city: {
    name: '',
    centerCoords: [],
  },
};
export const DEFAULT_ROUTES = [];
export const DEFAULT_PLACES = [];
export const DEFAULT_MAP = {
  ZOOM: 14,
  COORDINATES: [30.5238, 50.45466],
};

export const CITY_NOT_FOUND = 'City Not Found';
export const CHOOSE_YOUR_LOCATION = 'Choose your location';
export const TYPE_CITY = 'Type City';
export const DRAW_ROUTE_BTN = 'Draw Route';

export const chars = {
  а: 'a',
  б: 'b',
  в: 'v',
  г: 'g',
  д: 'd',
  е: 'e',
  ё: 'e',
  ж: 'j',
  з: 'z',
  и: 'i',
  к: 'k',
  л: 'l',
  м: 'm',
  н: 'n',
  о: 'o',
  п: 'p',
  р: 'r',
  с: 's',
  т: 't',
  у: 'u',
  ф: 'f',
  х: 'h',
  ц: 'c',
  ч: 'ch',
  ш: 'sh',
  щ: 'shch',
  ы: 'y',
  э: 'e',
  ю: 'u',
  я: 'ya',
  ї: 'yi',
  є: 'ye',
  i: 'i',
  ґ: 'g',
};

export const HAS_LAUNCHED = 'hasLaunched';
