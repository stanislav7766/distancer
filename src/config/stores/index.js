import {ThemeStore, ThemeContext} from '~/stores/theme';
import {AppSettingsStore, AppSettingsContext} from '~/stores/app-settings';
import {ActivitySettingsStore, ActivitySettingsContext} from '~/stores/activity-settings';
import {RouteSettingsStore, RouteSettingsContext} from '~/stores/route-settings';
import {ModalPickerStore, ModalPickerContext} from '~/stores/modal-picker';
import {ModalConfirmStore, ModalConfirmContext} from '~/stores/modal-confirm';
import {ModalTimerStore, ModalTimerContext} from '~/stores/modal-timer';
import {MappedRouteStore, MappedRouteContext} from '~/stores/mapped-route';
import {DirectionsModeStore, DirectionsModeContext} from '~/stores/directions-mode';
import {AuthStore, AuthContext} from '~/stores/auth';
import {AppModeStore, AppModeContext} from '~/stores/app-mode';
import {MapStore, MapContext} from '~/stores/map';
import {CurrentRouteStore, CurrentRouteContext} from '~/stores/current-route';
import {RoutesStore, RoutesContext} from '~/stores/routes';
import {LiveRouteStore, LiveRouteContext} from '~/stores/live-route';
import {ActivitiesStore, ActivitiesContext} from '~/stores/activities';
import {NavigationStore, NavigationContext} from '~/stores/navigation';

const themeStore = new ThemeStore();
const appSettingsStore = new AppSettingsStore(themeStore);
const activitySettingsStore = new ActivitySettingsStore();
const routeSettingsStore = new RouteSettingsStore();
const modalPickerStore = new ModalPickerStore();
const modalConfirmStore = new ModalConfirmStore();
const modalTimerStore = new ModalTimerStore();
const mappedRouteStore = new MappedRouteStore();
const directionsModeStore = new DirectionsModeStore();
const authStore = new AuthStore();
const appModeStore = new AppModeStore();
const mapStore = new MapStore();
const routesStore = new RoutesStore();
const currentRouteStore = new CurrentRouteStore();
const activitiesStore = new ActivitiesStore();
const liveRouteStore = new LiveRouteStore();
const navigationStore = new NavigationStore();

const entities = [
  {Context: NavigationContext, value: navigationStore},
  {Context: ThemeContext, value: themeStore},
  {Context: AppSettingsContext, value: appSettingsStore},
  {Context: ActivitySettingsContext, value: activitySettingsStore},
  {Context: RouteSettingsContext, value: routeSettingsStore},
  {Context: ModalPickerContext, value: modalPickerStore},
  {Context: ModalConfirmContext, value: modalConfirmStore},
  {Context: ModalTimerContext, value: modalTimerStore},
  {Context: MappedRouteContext, value: mappedRouteStore},
  {Context: DirectionsModeContext, value: directionsModeStore},
  {Context: AuthContext, value: authStore},
  {Context: AppModeContext, value: appModeStore},
  {Context: MapContext, value: mapStore},
  {Context: RoutesContext, value: routesStore},
  {Context: CurrentRouteContext, value: currentRouteStore},
  {Context: ActivitiesContext, value: activitiesStore},
  {Context: LiveRouteContext, value: liveRouteStore},
];
export default entities;
