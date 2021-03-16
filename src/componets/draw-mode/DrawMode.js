import React from 'react';
import {Text} from 'react-native';
import {Btn} from '~/componets/btn';
import {RoundedIcon} from '~/componets/rounded-icon';
import {useSwitchDrawMode} from '~/hooks/use-switch';
import {useRouteSettings} from '~/stores/route-settings';
import useSvgFactory from '~/hooks/use-svg-factory';
import {
  useOnIsDirectionsMode,
  useOnDirectionsMode,
  useOnDragMode,
  useOnWatchRoutePoints,
  useOnDefaultRoute,
  useOnShowMapIcons,
} from '~/hooks/use-on-effect';
import {getLeftArrow} from '~/assets/svg-icons/left-arrow';
import {useLocationPosition} from '~/hooks/use-location-position';
import {getDrag} from '~/assets/svg-icons/drag';
import Toast from 'react-native-simple-toast';
import {Row, Column, Styles, btnSaveStyles, mt10, mx0} from './styles';
import {ACCENT_RED, DIRECTIONS_MODE} from '~/constants/constants';
import {saveRoute} from '~/actions';
import {isFilledArr} from '~/utils/validation/helpers';
import {useDirectionsMode} from '~/stores/directions-mode';
import {useMap} from '~/stores/map';
import {useCurrentRoute} from '~/stores/current-route';
import {useAppMode} from '~/stores/app-mode';
import {observer} from 'mobx-react-lite';
import {useAuth} from '~/stores/auth';
import {getLocaleStore} from '~/stores/locale';

const {papyrusify} = getLocaleStore();

const {WALKING} = DIRECTIONS_MODE;

const DrawMode = ({themeStyle}) => {
  const [SwitchDrawMode, drawMode] = useSwitchDrawMode();
  const {cameraRef} = useMap();
  const {dragHints} = useRouteSettings();
  const {dragMode, setDragMode} = useAppMode();
  const {clearPoints, popPoints, setDefaultRoute, currentRoute, resume} = useCurrentRoute();
  const {directionsMode} = useDirectionsMode();
  const {moveCamera} = useLocationPosition(cameraRef);
  const {points, distance} = currentRoute;
  const {profile} = useAuth();

  const {arrowIconDims, dragIconDims, stylesTextKM} = Styles(themeStyle);

  const dragIconBg = {backgroundColor: dragMode ? ACCENT_RED : themeStyle.backgroundColorSecondary};
  const dragIconColor = dragMode ? '#fff' : themeStyle.accentColor;

  const IconLeftArrow = useSvgFactory(getLeftArrow, {width: 30, height: 33, fillAccent: themeStyle.accentColor});
  const IconDrag = useSvgFactory(getDrag, {
    width: 26,
    height: 35,
    fillAccent: dragIconColor,
  });

  const flyToFirst = () => {
    isFilledArr(points[0]) && moveCamera({zoomLevel: 16, centerCoordinate: points[0]});
  };

  useOnIsDirectionsMode({mount: drawMode});
  useOnDefaultRoute({unmount: true, ...(resume ? {} : {mount: true})});
  useOnShowMapIcons({mount: true});
  useOnDragMode({mount: false, unmount: false});
  useOnDirectionsMode({mount: drawMode ? WALKING : '', unmount: WALKING});
  useOnWatchRoutePoints({mount: true, unmount: false});

  const onPressCancel = () => {
    setDragMode(false);
    setDefaultRoute();
  };

  const onPressDragMode = () => {
    if (!dragMode) {
      dragHints && Toast.show(papyrusify('drawMode.message.selectNeededPoint'));
      isFilledArr(points) && flyToFirst();
    }
    setDragMode(!dragMode);
  };

  const onSaveRoute = payload => {
    saveRoute({payload})
      .then(res => {
        const {success, reason} = res;
        success && onPressCancel();
        Toast.show(success ? papyrusify('drawMode.message.saved') : reason);
      })
      .catch(_ => {
        Toast.show(papyrusify('common.message.errorOccurred'));
      });
  };

  const onPressSave = () => {
    if (distance <= 0) return;

    const payload = {
      userId: profile.userId,
      route: {...currentRoute, directionsMode},
    };
    onSaveRoute(payload);
  };

  return (
    <>
      <Row {...mt10}>
        <Column alignItems={'flex-start'}>
          <Text style={stylesTextKM}>
            {distance} {papyrusify('common.designation.km')}
          </Text>
        </Column>
        <Column alignItems={'flex-end'}>{SwitchDrawMode}</Column>
      </Row>
      <Row {...mt10}>
        <Column>
          <Row {...mx0}>
            <Column alignItems={'flex-start'}>
              <RoundedIcon
                style={arrowIconDims}
                IconComponent={IconLeftArrow}
                onPress={popPoints}
                onLongPress={clearPoints}
              />
            </Column>
            <Column alignItems={'flex-end'}>
              <RoundedIcon
                style={{...dragIconDims, ...dragIconBg}}
                IconComponent={IconDrag}
                onPress={onPressDragMode}
              />
            </Column>
          </Row>
        </Column>
        <Column alignItems={'flex-end'}>
          <Btn onPress={onPressSave} title={papyrusify('drawMode.button.saveRoute')} {...btnSaveStyles} />
        </Column>
      </Row>
    </>
  );
};

export default observer(DrawMode);
