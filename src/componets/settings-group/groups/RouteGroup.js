import React from 'react';
import {useSwitchCommon} from '~/hooks/use-switch';
import {useRouteSettings} from '~/stores/route-settings';
import {FormGroup, GroupText} from '~/componets/form-group';
import {useTheme} from '~/stores/theme';
import {observer} from 'mobx-react-lite';
import {getLocaleStore} from '~/stores/locale';

const {papyrusify} = getLocaleStore();

const GroupRoute = () => {
  const {themeStyle} = useTheme();
  const {dragHints, setDragHints} = useRouteSettings();

  const [, renderSwitchCommon] = useSwitchCommon();

  const DragHintsSwitch = renderSwitchCommon({
    position: dragHints,
    onTrue: () => setDragHints(true),
    onFalse: () => setDragHints(false),
  });

  const DragHintsText = <GroupText title={papyrusify('menuMode.preference.dragHints')} themeStyle={themeStyle} />;

  const routeSettingsItems = [{Left: DragHintsText, Right: DragHintsSwitch}];

  const RouteSettingsGroup = (
    <FormGroup items={routeSettingsItems} themeStyle={themeStyle} title={papyrusify('menuMode.title.routeSettings')} />
  );

  return <>{RouteSettingsGroup}</>;
};

export const RouteGroup = observer(GroupRoute);
