import {ThemeStore, ThemeContext} from '../../stores/theme';
import {AppSettingsStore, AppSettingsContext} from '../../stores/app-settings';
import {ActivitySettingsStore, ActivitySettingsContext} from '../../stores/activity-settings';
import {RouteSettingsStore, RouteSettingsContext} from '../../stores/route-settings';
import {ModalPickerStore, ModalPickerContext} from '../../stores/modal-picker';
import {ModalConfirmStore, ModalConfirmContext} from '../../stores/modal-confirm';
import {MapRouteStore, MapRouteContext} from '../../stores/map-route';
import {DirectionsModeStore, DirectionsModeContext} from '../../stores/directions-mode';

const themeStore = new ThemeStore();
const appSettingsStore = new AppSettingsStore(themeStore);
const activitySettingsStore = new ActivitySettingsStore();
const routeSettingsStore = new RouteSettingsStore();
const modalPickerStore = new ModalPickerStore();
const modalConfirmStore = new ModalConfirmStore();
const mapRouteStore = new MapRouteStore();
const directionsModeStore = new DirectionsModeStore();

const entities = [
  {Context: ThemeContext, value: themeStore},
  {Context: AppSettingsContext, value: appSettingsStore},
  {Context: ActivitySettingsContext, value: activitySettingsStore},
  {Context: RouteSettingsContext, value: routeSettingsStore},
  {Context: ModalPickerContext, value: modalPickerStore},
  {Context: ModalConfirmContext, value: modalConfirmStore},
  {Context: MapRouteContext, value: mapRouteStore},
  {Context: DirectionsModeContext, value: directionsModeStore},
];
export default entities;
