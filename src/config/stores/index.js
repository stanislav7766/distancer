import {ThemeStore} from '~/stores/theme';
import {AppSettingsStore} from '~/stores/app-settings';
import {ActivitySettingsStore} from '~/stores/activity-settings';
import {RouteSettingsStore} from '~/stores/route-settings';
import {ModalPickerStore} from '~/stores/modal-picker';
import {ModalConfirmStore} from '~/stores/modal-confirm';
import {ModalInputConfirmStore} from '~/stores/modal-input-confirm';
import {ModalTimerStore} from '~/stores/modal-timer';
import {MappedRouteStore} from '~/stores/mapped-route';
import {DirectionsModeStore} from '~/stores/directions-mode';
import {AuthStore} from '~/stores/auth';
import {AppModeStore} from '~/stores/app-mode';
import {MapStore} from '~/stores/map';
import {CurrentRouteStore} from '~/stores/current-route';
import {RoutesStore} from '~/stores/routes';
import {LiveRouteStore} from '~/stores/live-route';
import {ActivitiesStore} from '~/stores/activities';
import {NavigationStore} from '~/stores/navigation';
import {SpinnerStore} from '~/stores/spinner';
import {storesDI} from '~/utils/store-di';
import {LocaleStore} from '~/stores/locale';
import {AppStateStore} from '~/stores/app-state';
import {StopwatchStore} from '~/stores/stopwatch';
import {persistStore} from '~/utils/persist-helpers';

storesDI.Injectable('stopwatchStore')(StopwatchStore);
storesDI.Injectable('appStateStore')(AppStateStore);
storesDI.Injectable('themeStore')(
  persistStore(new ThemeStore(), {
    name: 'themeStore',
    properties: ['theme', 'themeStyle'],
  }),
);
storesDI.Injectable('appModeStore')(AppModeStore);
storesDI.Injectable('authStore')(
  persistStore(new AuthStore(), {
    name: 'authStore',
    properties: ['authorized', 'profile'],
  }),
);
storesDI.Injectable('localeStore')(
  persistStore(new LocaleStore(), {
    name: 'localeStore',
    properties: ['locale', 'papyrus'],
  }),
);
storesDI.Injectable('appSettingsStore')(
  persistStore(new AppSettingsStore(), {
    name: 'appSettingsStore',
    properties: ['defaultScreen'],
  }),
);
storesDI.Injectable('activitySettingsStore')(
  persistStore(new ActivitySettingsStore(), {
    name: 'activitySettingsStore',
    properties: ['timerOnStart', 'vibrateOnStart', 'autoPause'],
  }),
);
storesDI.Injectable('routeSettingsStore')(
  persistStore(new RouteSettingsStore(), {
    name: 'routeSettingsStore',
    properties: ['dragHints'],
  }),
);
storesDI.Injectable('modalPickerStore')(ModalPickerStore);
storesDI.Injectable('modalConfirmStore')(ModalConfirmStore);
storesDI.Injectable('modalInputConfirmStore')(ModalInputConfirmStore);
storesDI.Injectable('modalTimerStore')(ModalTimerStore);
storesDI.Injectable('mappedRouteStore')(MappedRouteStore);
storesDI.Injectable('directionsModeStore')(DirectionsModeStore);
storesDI.Injectable('mapStore')(
  persistStore(new MapStore(), {
    name: 'mapStore',
    properties: ['zoomLevel', 'centerCoordinate'],
  }),
);
storesDI.Injectable('routesStore')(RoutesStore);
storesDI.Injectable('currentRouteStore')(CurrentRouteStore);
storesDI.Injectable('activitiesStore')(ActivitiesStore);
storesDI.Injectable('liveRouteStore')(LiveRouteStore);
storesDI.Injectable('navigationStore')(NavigationStore);
storesDI.Injectable('spinnerStore')(SpinnerStore);
