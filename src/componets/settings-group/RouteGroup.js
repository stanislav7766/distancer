import React from 'react';
import {useSwitchCommon} from '../../hooks/use-switch';
import {useRouteSettings} from '../../stores/route-settings';
import {FormGroup, GroupText} from '../form-group';
import {observer} from 'mobx-react-lite';

const GroupRoute = ({themeStyle}) => {
  const {dragHints, setDragHints} = useRouteSettings();

  const [, renderSwitchCommon] = useSwitchCommon();

  const DragHintsSwitch = renderSwitchCommon({
    position: dragHints,
    onTrue: () => setDragHints(true),
    onFalse: () => setDragHints(false),
  });

  const DragHintsText = <GroupText title="Drag's hints" themeStyle={themeStyle} />;

  const routeSettingsItems = [{Left: DragHintsText, Right: DragHintsSwitch}];

  const RouteSettingsGroup = <FormGroup items={routeSettingsItems} themeStyle={themeStyle} title="Route settings" />;

  return <>{RouteSettingsGroup}</>;
};

export const RouteGroup = observer(GroupRoute);
