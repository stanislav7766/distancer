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

storesDI.Injectable('appStateStore')(AppStateStore);
storesDI.Injectable('themeStore')(ThemeStore);
storesDI.Injectable('appModeStore')(AppModeStore);
storesDI.Injectable('authStore')(AuthStore);
storesDI.Injectable('localeStore')(LocaleStore);
storesDI.Injectable('appSettingsStore')(AppSettingsStore);
storesDI.Injectable('activitySettingsStore')(ActivitySettingsStore);
storesDI.Injectable('routeSettingsStore')(RouteSettingsStore);
storesDI.Injectable('modalPickerStore')(ModalPickerStore);
storesDI.Injectable('modalConfirmStore')(ModalConfirmStore);
storesDI.Injectable('modalInputConfirmStore')(ModalInputConfirmStore);
storesDI.Injectable('modalTimerStore')(ModalTimerStore);
storesDI.Injectable('mappedRouteStore')(MappedRouteStore);
storesDI.Injectable('directionsModeStore')(DirectionsModeStore);
storesDI.Injectable('mapStore')(MapStore);
storesDI.Injectable('routesStore')(RoutesStore);
storesDI.Injectable('currentRouteStore')(CurrentRouteStore);
storesDI.Injectable('activitiesStore')(ActivitiesStore);
storesDI.Injectable('liveRouteStore')(LiveRouteStore);
storesDI.Injectable('navigationStore')(NavigationStore);
storesDI.Injectable('spinnerStore')(SpinnerStore);
