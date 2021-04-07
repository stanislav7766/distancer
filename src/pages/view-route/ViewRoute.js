import React from 'react';
import {View} from 'react-native';
import {ViewRouteModal} from '~/componets/view-route-modal';
import {RoundedIcon} from '~/componets/rounded-icon';
import useSvgFactory from '~/hooks/use-svg-factory';
import {MappedRoute, LiveRoute} from '~/componets/mapped-route';
import {default as useMapBox} from '~/hooks/use-map';
import {getCancel} from '~/assets/svg-icons/cancel';
import {getEdit} from '~/assets/svg-icons/edit';
import {observer} from 'mobx-react-lite';
import {useTheme} from '~/stores/theme';
import {useMap} from '~/stores/map';
import {useAppMode} from '~/stores/app-mode';
import {useNavigation} from '~/stores/navigation';
import {styleContainer, Styles, mapStyle} from './styles';
import {useCurrentRoute} from '~/stores/current-route';
import {pipe} from '~/utils/common-helpers/fun-helpers';

const ViewRoute = () => {
  const {themeStyle} = useTheme();
  const {isViewRouteMode} = useAppMode();
  const {setCameraRef, setMapRef, zoomLevel, coordinates} = useMap();
  const {popToMainScreen} = useNavigation();
  const {enableEditMode} = useCurrentRoute();

  const goToMain = () => {
    popToMainScreen();
  };

  const onEditRoute = pipe(goToMain, enableEditMode);

  const {styleCancelIcon, styleEditIcon} = Styles(themeStyle);
  const IconCancel = useSvgFactory(getCancel, {width: 30, height: 33, fillAccent: themeStyle.accentColor});
  const IconEditRoute = useSvgFactory(getEdit, {width: 22, height: 22, fillAccent: themeStyle.accentColor});

  const Icons = (
    <>
      <RoundedIcon style={styleCancelIcon} IconComponent={IconCancel} onPress={goToMain} />
      <RoundedIcon style={styleEditIcon} IconComponent={IconEditRoute} onPress={onEditRoute} />
    </>
  );

  const cameraProps = {
    ref: setCameraRef,
    zoomLevel,
    centerCoordinate: coordinates,
  };

  const mapViewProps = {
    ref: setMapRef,
  };
  const mapViewChildren = (
    <>
      {isViewRouteMode && <MappedRoute />}
      {!isViewRouteMode && <LiveRoute />}
    </>
  );

  const [MapView] = useMapBox({mapStyle, mapViewProps, cameraProps, mapViewChildren});

  return (
    <>
      <View style={styleContainer}>
        {MapView}
        {Icons}
      </View>
      <ViewRouteModal />
    </>
  );
};
export default observer(ViewRoute);
