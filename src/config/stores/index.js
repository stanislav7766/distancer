import {ThemeStore, ThemeContext} from '../../stores/theme';
import {AppSettingsStore, AppSettingsContext} from '../../stores/app-settings';
import {ActivitySettingsStore, ActivitySettingsContext} from '../../stores/activity-settings';
import {ModalPickerStore, ModalPickerContext} from '../../stores/modal-picker';
import {ModalConfirmStore, ModalConfirmContext} from '../../stores/modal-confirm';

const themeStore = new ThemeStore();
const appSettingsStore = new AppSettingsStore(themeStore);
const activitySettingsStore = new ActivitySettingsStore();
const modalPickerStore = new ModalPickerStore();
const modalConfirmStore = new ModalConfirmStore();

const entities = [
  {Context: ThemeContext, value: themeStore},
  {Context: AppSettingsContext, value: appSettingsStore},
  {Context: ActivitySettingsContext, value: activitySettingsStore},
  {Context: ModalPickerContext, value: modalPickerStore},
  {Context: ModalConfirmContext, value: modalConfirmStore},
];
export default entities;
