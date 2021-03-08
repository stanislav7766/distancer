import {Dimensions} from 'react-native';
const {height, width} = Dimensions.get('window');

export const THEMES = {
  DARK: 'dark',
  LIGHT: 'light',
};

export const ACCENT_GREEN = '#BFE3A5';
export const ACCENT_RED = '#e76d6f';
export const ACCENT_BLUE = '#75bbfb';
export const ACCENT_ORANGE = '#F6A444';

export const DEFAULT_GENDER = 'Male';
export const DEFAULT_HEIGHT = '170';
export const DEFAULT_WEIGHT = '70';
export const WINDOW_HEIGHT = height;
export const WINDOW_WIDTH = width;
export const NAVBAR_HEIGHT = height * 0.06;
export const CURRENT_POSITION_ZOOM = 15;

export const APP_MODE = {
  LIVE_MODE: 'Live',
  VIEW_MODE: 'View',
  DRAW_MODE: 'Draw',
  MENU_MODE: 'Menu',
  SAVED_MODE: 'Saved',
};

export const LOCALES = {
  EN: 'en_US',
  UK: 'uk_UA',
};

export const APP_SETTINGS_PATH = 'app_settings';
export const MAP_SETTINGS_PATH = 'map_settings';
export const ACTIVITY_SETTINGS_PATH = 'activity_settings';
export const ROUTE_SETTINGS_PATH = 'route_settings';

export const DEFAULT_LOCALE = LOCALES.EN;

export const MODAL_HEIGHTS = {
  LIVE_HEIGHT: 70,
  LIVE_EXP_HEIGHT: 180,
  VIEW_HEIGHT: 70,
  VIEW_EXP_HEIGHT: WINDOW_HEIGHT * 0.8,
  DRAW_HEIGHT: 120,
  SAVED_HEIGHT: WINDOW_HEIGHT * 0.8,
  MENU_HEIGHT: WINDOW_HEIGHT - NAVBAR_HEIGHT,
  VIEW_ROUTE_HEIGHT: 70,
  VIEW_ACTIVITY_HEIGHT: 210,
};

export const DEFAULT_THEME = THEMES.LIGHT;
export const DEFAULT_SCREEN = APP_MODE.VIEW_MODE;
export const DEFAULT_TIMER_ON_START = 0;
export const DEFAULT_VIBRATE_ON_START = false;
export const DEFAULT_AUTO_PAUSE = false;
export const DEFAULT_DRAG_HINTS = false;

export const DEFAULT_APP_SETTINGS = {
  theme: DEFAULT_THEME,
  defaultScreen: DEFAULT_SCREEN,
};

export const DEFAULT_MAP_SETTINGS = {
  zoomLevel: 14,
  centerCoordinate: [30.5238, 50.45466],
};

export const DEFAULT_ROUTE_SETTINGS = {
  dragHints: DEFAULT_DRAG_HINTS,
};

export const DEFAULT_ACTIVITY_SETTINGS = {
  timerOnStart: DEFAULT_TIMER_ON_START,
  vibrateOnStart: DEFAULT_VIBRATE_ON_START,
  autoPause: DEFAULT_AUTO_PAUSE,
};

export const LIVE_STATIONARY_FILTER_M = 5;
export const GET_SCREEN_PICKER_ITEMS = () => Object.values(APP_MODE).map(text => ({label: text, value: text}));
export const GET_LOCALES_ITEMS = () => [
  {label: 'English', value: 'en_US'},
  {label: 'Українська', value: 'uk_UA'},
];

export const GET_TIMER_PICKER_ITEMS = ({sec = 'sec'} = {sec: 'sec'}) =>
  new Array(11).fill(0).map((_, i) => ({label: `${i} ${sec}`, value: `${i}`}));

export const GET_HEIGHT_PICKER_ITEMS = ({cm = 'cm'} = {cm: 'cm'}) =>
  new Array(MAX_HEIGHT).fill(0).map((_, i) => ({label: `${i + 1} ${cm}`, value: `${i + 1}`}));

export const GET_WEIGHT_PICKER_ITEMS = ({kgs = 'kgs'} = {kgs: 'kgs'}) =>
  new Array(MAX_WEIGHT).fill(0).map((_, i) => ({label: `${i + 1} ${kgs}`, value: `${i + 1}`}));

export const GET_GENDER_PICKER_ITEMS = ({male = 'Male', female = 'Female'} = {male: 'Male', female: 'Female'}) => [
  {label: male, value: 'Male'},
  {label: female, value: 'Female'},
];
export const LIVE_TYPES = {
  STOP: 'stop',
  PAUSE: 'pause',
  GO: 'go',
};
export const LIVE_MODDING = designation => [
  {title: '', subTitle: `${designation.currentPace}`, type: 'pace'},
  {title: ` ${designation.kmPerH}`, subTitle: `${designation.avgSpeed}`, type: 'avgSpeed'},
  {title: ` ${designation.km}`, subTitle: `${designation.distance}`, type: 'distance'},
  {title: '', subTitle: `${designation.time}`, type: 'time'},
];
export const LIVE_CURRENT_PROPS = designation => [
  {title: ` ${designation.kmPerH}`, subTitle: `${designation.currentSpeed}`, type: 'currentSpeed'},
  {title: '', subTitle: `${designation.currentPace}`, type: 'currentPace'},
];
export const LIVE_SPECS_DEFAULT = {
  avgSpeed: 0.0,
  distance: 0,
  time: '00:00:00',
  pace: '0\'0"',
  currentPace: '0\'0"',
  currentSpeed: 0.0,
};

export const ROUTE_TYPES = {
  ACTIVITY: 'activity',
  ROUTE: 'route',
};

export const DIRECTIONS_MODE = {
  WALKING: 'walking',
  CYCLING: 'cycling',
  DRIVING: 'driving',
};

export const DEFAULT_ROUTE = {
  distance: 0,
  id: '',
  directionsMode: '',
  timestamp: 0,
  points: [],
};
export const DEFAULT_LIVE_ROUTE = {
  distance: 0,
  pace: '0\'0"',
  date: '',
  timestamp: 0,
  movingTime: '00:00:00',
  totalTime: '00:00:00',
  avgSpeed: 0.0,
  directionsMode: '',
  id: '',
  points1: [],
};
export const DEFAULT_PROFILE = {
  userId: '',
  email: '',
  age: '',
  height: '',
  weight: '',
  gender: '',
  firstName: '',
  lastName: '',
  photoURL: '',
};
export const VIEWED_PROFILE_KEYS = ['age', 'height', 'weight', 'gender', 'firstName', 'lastName'];
export const DEFAULT_ACTIVITIES = [];
export const DEFAULT_ROUTES = [];
export const DEFAULT_PLACES = [];

export const ROUTES_BATCH_LIMIT = 30;
export const ACTIVITIES_BATCH_LIMIT = 30;

export const MAX_HEIGHT = 220;
export const MAX_WEIGHT = 230;

export const HAS_LAUNCHED = 'hasLaunched';

export const GPS_PERMS_ACCESS_COARSE = 'android.permission.ACCESS_COARSE_LOCATION';
export const GPS_PERMS_ACCESS_FINE = 'android.permission.ACCESS_FINE_LOCATION';

export const WEB_CLIENT_ID = '904930169800-gdj1tqibo2rd87m8cu0pchdhjcitso6a.apps.googleusercontent.com';

export const PART_KEY_FILLED_PROFILE = '-filled-profile';
