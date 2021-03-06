import React, {useEffect} from 'react';
import {Text} from 'react-native';
import {Btn} from '~/componets/btn';
import Toast from 'react-native-simple-toast';
import {Row, Column, stylesTextKM, Styles, btnDeleteStyles, mt10, mx0} from './styles';
import {APP_MODE, ACCENT_BLUE} from '~/constants/constants';
import SelectDirection from '~/componets/directions-bar/SelectDirection';
import {useModalConfirm as useConfirm} from '~/stores/modal-confirm';
import useSvgFactory from '~/hooks/use-svg-factory';
import {getMarker} from '~/assets/svg-icons/marker';
import {RoundedIcon} from '~/componets/rounded-icon';
import {deleteRoute} from '~/actions';
import {useLocationPosition} from '~/hooks/use-location-position';
import {observer} from 'mobx-react-lite';
import {useAuth} from '~/stores/auth';
import {useAppMode} from '~/stores/app-mode';
import {useMap} from '~/stores/map';
import {useCurrentRoute} from '~/stores/current-route';
import {useRoutes} from '~/stores/routes';
import {isFilledArr} from '~/utils/validation/helpers';
import {getLocaleStore} from '~/stores/locale';

const {papyrusify} = getLocaleStore();
const {LIVE_MODE} = APP_MODE;

const Route = ({themeStyle, goToMain}) => {
  const {setDefaultRoute, currentRoute} = useCurrentRoute();
  const {distance, points, directionsMode, id: routeId} = currentRoute;
  const {setDefaultRoutes, removeById} = useRoutes();

  const {setAppMode, setLiveWithRoute} = useAppMode();
  const {zoomLevel, cameraRef} = useMap();
  const {moveCamera} = useLocationPosition(cameraRef);
  const {profile} = useAuth();
  const {liveIconDims} = Styles(themeStyle);

  useEffect(() => {
    isFilledArr(points) && moveCamera({zoomLevel, centerCoordinate: points[0]});
  }, [moveCamera, points, zoomLevel]);

  const {setInit, onShowConfirm, onHideConfirm} = useConfirm();

  const onPressCancel = () => {
    removeById(routeId);
    setDefaultRoute();
    goToMain();
  };

  const onPressDelete = () => {
    const payload = {routeId, userId: profile.userId};
    deleteRoute({payload})
      .then(res => {
        const {success, reason} = res;
        success && onPressCancel();
        Toast.show(success ? papyrusify('savedMode.message.deleted') : reason);
      })
      .catch(_ => {
        Toast.show(papyrusify('common.message.errorOccurred'));
      });
  };

  const onRequestDelete = () => {
    setInit({
      text: papyrusify('savedMode.message.deleteRouteConfirm'),
      onNo: onHideConfirm,
      onYes: onPressDelete,
    });
    onShowConfirm();
  };

  const onStartLiveWithRoute = () => {
    setDefaultRoutes();
    setLiveWithRoute(true);
    setAppMode(LIVE_MODE);
    goToMain();
  };

  const IconMarker = useSvgFactory(getMarker, {width: 27, height: 23, fillAccent: themeStyle.accentColor});

  return (
    <>
      <Row alignItems="center" {...mt10}>
        <Column>
          <Row {...mx0}>
            <Column flex={0.5} alignItems={'flex-start'}>
              <Text style={[stylesTextKM, {color: themeStyle.textColorSecondary}]}>
                {distance} {papyrusify('common.designation.km')}
              </Text>
            </Column>
            <Column flex={0.2} alignItems={'flex-start'}>
              <SelectDirection mode={directionsMode} color={ACCENT_BLUE} />
            </Column>
            <Column flex={0.3} alignItems={'flex-end'}>
              <RoundedIcon style={liveIconDims} IconComponent={IconMarker} onPress={onStartLiveWithRoute} />
            </Column>
          </Row>
        </Column>
        <Column alignItems={'flex-end'}>
          <Btn {...btnDeleteStyles} title={papyrusify('savedMode.button.deleteRoute')} onPress={onRequestDelete} />
        </Column>
      </Row>
    </>
  );
};

export default observer(Route);
