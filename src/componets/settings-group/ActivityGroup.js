import React from 'react';
import {useSwitchCommon} from '../../hooks/use-switch';
import {useActivitySettings} from '../../stores/activity-settings';
import {useModalPicker as usePicker} from '../../stores/modal-picker';
import {orangeColor} from './styles';
import {FormGroup, GroupText} from '../form-group';
import Touchable from '../../componets/touchable/Touchable';
import {GET_TIMER_PICKER_ITEMS} from '../../constants/constants';
import {observer} from 'mobx-react-lite';

const GroupActivity = ({themeStyle}) => {
  const {
    vibrateOnStart,
    autoPause,
    timerOnStart,
    setVibrateOnStart,
    setAutoPause,
    setTimerOnStart,
  } = useActivitySettings();
  const {setInit: setInitPicker, onShowPicker} = usePicker();

  const [, renderSwitchCommon] = useSwitchCommon();

  const onChangeTimerOnStart = ([value]) => {
    setTimerOnStart(value);
  };
  const onSelectTimerOnStart = () => {
    setInitPicker({
      pickerItems: GET_TIMER_PICKER_ITEMS(),
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

  const AutoPauseText = <GroupText title="Auto pause" themeStyle={themeStyle} />;
  const VibrateOnStartText = <GroupText title="Vibrate on start" themeStyle={themeStyle} />;
  const TimerOnStartText = <GroupText title="Timer on start" themeStyle={themeStyle} />;
  const TimerOnStartValue = <GroupText title={`${timerOnStart} sec`} style={orangeColor} themeStyle={themeStyle} />;

  const DefaultScreenPicker = <Touchable Child={TimerOnStartValue} onPress={onSelectTimerOnStart} />;

  const activitySettingsItems = [
    {Left: AutoPauseText, Right: AutoPauseSwitch},
    {Left: VibrateOnStartText, Right: VibrateOnStartSwitch},
    {Left: TimerOnStartText, Right: DefaultScreenPicker},
  ];

  const ActivitySettingsGroup = (
    <FormGroup items={activitySettingsItems} themeStyle={themeStyle} title="Activity settings" />
  );

  return <>{ActivitySettingsGroup}</>;
};

export const ActivityGroup = observer(GroupActivity);
