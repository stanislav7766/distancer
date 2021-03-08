import {
  ACTIVITY_SETTINGS_PATH,
  APP_SETTINGS_PATH,
  DEFAULT_ACTIVITY_SETTINGS,
  DEFAULT_APP_SETTINGS,
  DEFAULT_MAP_SETTINGS,
  DEFAULT_ROUTE_SETTINGS,
  MAP_SETTINGS_PATH,
  ROUTE_SETTINGS_PATH,
} from '~/constants/constants';

export const getSettingsPath = type =>
  ({
    map: MAP_SETTINGS_PATH,
    app: APP_SETTINGS_PATH,
    activity: ACTIVITY_SETTINGS_PATH,
    route: ROUTE_SETTINGS_PATH,
  }[type]);

export const getDefaultSettings = type =>
  ({
    map: DEFAULT_MAP_SETTINGS,
    app: DEFAULT_APP_SETTINGS,
    activity: DEFAULT_ACTIVITY_SETTINGS,
    route: DEFAULT_ROUTE_SETTINGS,
  }[type]);
