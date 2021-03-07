import React from 'react';
import {useSwitchCommon} from '~/hooks/use-switch';
import {useActivitySettings} from '~/stores/activity-settings';
import {useModalPicker as usePicker} from '~/stores/modal-picker';
import {useTheme} from '~/stores/theme';
import {orangeColor} from '../styles';
import {FormGroup, GroupText} from '~/componets/form-group';
import {Touchable} from '~/componets/touchable';
import {GET_TIMER_PICKER_ITEMS} from '~/constants/constants';
import {observer} from 'mobx-react-lite';
import {getLocaleStore} from '~/stores/locale';

const {papyrusify} = getLocaleStore();

const GroupActivity = () => {
  const {
    vibrateOnStart,
    autoPause,
    timerOnStart,
    setVibrateOnStart,
    setAutoPause,
    setTimerOnStart,
  } = useActivitySettings();

  const {themeStyle} = useTheme();
  const {setInit: setInitPicker, onShowPicker} = usePicker();

  const [, renderSwitchCommon] = useSwitchCommon();

  const onChangeTimerOnStart = ([value]) => {
    setTimerOnStart(value);
  };
  const onSelectTimerOnStart = () => {
    setInitPicker({
      pickerItems: GET_TIMER_PICKER_ITEMS({sec: papyrusify('menuMode.picker.sec')}),
      selectedItems: [`${timerOnStart}`],
      defaultItem: `${timerOnStart}`,
      setSelectedItems: onChangeTimerOnStart,
    });
    onShowPicker();
  };

  const AutoPauseSwitch = renderSwitchCommon({
    position: autoPause,
    onTrue: () => setAutoPause(true),
    onFalse: () => setAutoPause(false),
  });
  const VibrateOnStartSwitch = renderSwitchCommon({
    position: vibrateOnStart,
    onTrue: () => setVibrateOnStart(true),
    onFalse: () => setVibrateOnStart(false),
  });

  const AutoPauseText = <GroupText title={papyrusify('menuMode.preference.autoPause')} themeStyle={themeStyle} />;
  const VibrateOnStartText = (
    <GroupText title={papyrusify('menuMode.preference.vibrateOnStart')} themeStyle={themeStyle} />
  );
  const TimerOnStartText = <GroupText title={papyrusify('menuMode.preference.timerOnStart')} themeStyle={themeStyle} />;
  const TimerOnStartValue = (
    <GroupText
      title={`${timerOnStart} ${papyrusify('menuMode.picker.sec')}`}
      style={orangeColor}
      themeStyle={themeStyle}
    />
  );

  const DefaultScreenPicker = <Touchable Child={TimerOnStartValue} onPress={onSelectTimerOnStart} />;

  const activitySettingsItems = [
    {Left: AutoPauseText, Right: AutoPauseSwitch},
    {Left: VibrateOnStartText, Right: VibrateOnStartSwitch},
    {Left: TimerOnStartText, Right: DefaultScreenPicker},
  ];

  const ActivitySettingsGroup = (
    <FormGroup
      items={activitySettingsItems}
      themeStyle={themeStyle}
      title={papyrusify('menuMode.title.activitySettings')}
    />
  );

  return <>{ActivitySettingsGroup}</>;
};

export const ActivityGroup = observer(GroupActivity);
