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
export const REQUIRE_LOCATION_PERMS = 'App requires location tracking permission';
export const QUESTION_OPEN_SETTINGS = 'Would you like to open app settings?';
export const APP_MODE = {
  LIVE_MODE: 'Live',
  VIEW_MODE: 'View',
  DRAW_MODE: 'Draw',
  MENU_MODE: 'Menu',
  SAVED_MODE: 'Saved',
  VIEW_ROUTE: 'viewRoute',
};

export const GET_SCREEN_MODE = ({VIEW_ROUTE: _, ...modes}) => ({...modes});

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

export const DEFAULT_ROUTE_SETTINGS = {
  dragHints: DEFAULT_DRAG_HINTS,
};

export const DEFAULT_ACTIVITY_SETTINGS = {
  timerOnStart: DEFAULT_TIMER_ON_START,
  vibrateOnStart: DEFAULT_VIBRATE_ON_START,
  autoPause: DEFAULT_AUTO_PAUSE,
};

export const GET_SCREEN_PICKER_ITEMS = () =>
  Object.values(GET_SCREEN_MODE(APP_MODE)).map(text => ({label: text, value: text}));

export const GET_TIMER_PICKER_ITEMS = () => new Array(11).fill(0).map((_, i) => ({label: `${i} sec`, value: `${i}`}));

export const GET_HEIGHT_PICKER_ITEMS = () =>
  new Array(MAX_HEIGHT).fill(0).map((_, i) => ({label: `${i + 1} cm`, value: `${i + 1}`}));

export const GET_WEIGHT_PICKER_ITEMS = () =>
  new Array(MAX_WEIGHT).fill(0).map((_, i) => ({label: `${i + 1} kgs`, value: `${i + 1}`}));

export const GET_GENDER_PICKER_ITEMS = () => [
  {label: 'Male', value: 'Male'},
  {label: 'Female', value: 'Female'},
];
export const LIVE_TYPES = {
  STOP: 'stop',
  PAUSE: 'pause',
  GO: 'go',
};
export const LIVE_MODDING = [
  {title: '', subTitle: 'Pace', type: 'pace'},
  {title: ' km/h', subTitle: 'Avg. speed', type: 'avgSpeed'},
  {title: ' km', subTitle: 'Distance', type: 'distance'},
  {title: '', subTitle: 'Time', type: 'time'},
];
export const LIVE_SPECS_DEFAULT = {
  avgSpeed: 0.0,
  distance: 0,
  time: '00:00:00',
  pace: '0\'0"',
  currSpeed: 0.0,
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

export const NAVBAR_HEIGHT = height * 0.06;

export const DEFAULT_ROUTE = {
  inLive: false,
  distance: 0,
  id: '',
  points: [],
  city: {
    name: '',
    centerCoords: [],
  },
};
export const DEFAULT_LIVE_ROUTE = {
  distance: 0,
  pace: '0\'0"',
  date: '',
  movingTime: '00:00:00',
  totalTime: '00:00:00',
  avgSpeed: 0.0,
  currentSpeed: 0.0,
  status: 'stop',
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
export const DEFAULT_ACTIVITIES = [];
export const DEFAULT_ROUTES = [];
export const DEFAULT_PLACES = [];
export const DEFAULT_MAP = {
  ZOOM: 14,
  COORDINATES: [30.5238, 50.45466],
};

export const MAX_HEIGHT = 220;
export const MAX_WEIGHT = 230;

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
export const ERROR_GPS_TURNED_OFF = 'No location provider available. Turn on GPS';
export const ERROR_TRY_AGAIN = 'Try again';
export const ERROR_OCCURRED = 'An error occurred';
export const ERROR_NETWORK_FAILED = 'Network request failed';
export const GPS_PERMISSIONS_DENIED = 'Location permissions denied';
export const GPS_PERMISSIONS_GRANTED = 'Location permissions granted';
export const GPS_ALLOW_PERMISSIONS = 'Allow permissions in settings';
export const ROUTES_LIST_EMPTY = 'Routes list is empty';
export const ACTIVITIES_LIST_EMPTY = 'Activities list is empty';
export const GIVE_GPS_PERMISSIONS = 'Give Location Permission';
export const GIVE_GPS_PERMISSIONS_DETAILED = 'App needs location permission to find your position';
export const GPS_PERMS_ACCESS_COARSE = 'android.permission.ACCESS_COARSE_LOCATION';
export const GPS_PERMS_ACCESS_FINE = 'android.permission.ACCESS_FINE_LOCATION';
export const PLEASE_FINISH_ACTIVITY = 'Please finish activity';
export const EMAIL_ALREADY_USED = 'The email address is already in use by another account';
export const WEAK_PASSWORD = 'Password should be at least 6 characters';
export const INVALID_EMAIL = 'The email address is invalid';
export const USER_NOT_FOUND = 'User not found';
export const WRONG_PASSWORD = 'Password wrong';
export const NO_CURRENT_USER = 'You are not signed';
export const WEB_CLIENT_ID = '904930169800-gdj1tqibo2rd87m8cu0pchdhjcitso6a.apps.googleusercontent.com';
export const WRONG_AGE = 'Type the correct age';
export const DELETE_ACTIVITY_CONFIRM = 'Are you sure you want to delete this activity?';
export const DELETE_ROUTE_CONFIRM = 'Are you sure you want to delete this route?';
export const LOGOUT_CONFIRM = 'Are you sure you want to logout?';
export const DELETE_ACCOUNT_CONFIRM = 'Are you sure you want to delete your account?';
export const NOT_IN_DRAG_MODE = 'Drag mode not active. Press drag button';
export const SELECT_NEEDED_POINT = "Press on point that you'll drag";
export const DRAG_POINT_NOW = 'Drag selected point now';
