import React, {Fragment, useContext} from 'react';
import {Text} from 'react-native';
import Btn from '../btn/Btn';
import {routeContext, appModeContext} from '../../contexts/contexts';
import Toast from 'react-native-simple-toast';
import {Row, Column, stylesTextKM, Styles, btnDeleteStyles, mt10} from './styles';
import {APP_MODE, ERROR_OCCURRED, DELETE_ROUTE_CONFIRM} from '../../constants/constants';
import SelectDirection from '../directions-bar/SelectDirection';
import {useModalConfirm as useConfirm} from '../../stores/modal-confirm';
import useSvgFactory from '../../hooks/use-svg-factory';
import {getMarker} from '../../assets/svg-icons/marker';
import RoundedIcon from '../rounded-icon/RoundedIcon';
import WithActions from '../with-actions/WithActions';
import {deleteRoute as _deleteRoute} from '../../actions';
const {VIEW_MODE, LIVE_MODE} = APP_MODE;

const Route = ({themeStyle, deleteRoute}) => {
  const {setDefaultRoute, setDefaultRoutes, routes, currentRoute, setCurrentRoute} = useContext(routeContext);

  const {setAppMode, directionsMode, auth} = useContext(appModeContext);
  const {authorized} = auth;
  const {liveIconDims} = Styles(themeStyle);
  const {distance} = currentRoute;

  const {setInit, onShowConfirm, onHideConfirm} = useConfirm();

  const onPressCancel = () => {
    setDefaultRoute();
    setDefaultRoutes();
    setAppMode(VIEW_MODE);
  };

  const onPressDelete = () => {
    const payload = {routeId: currentRoute.id, routes};
    deleteRoute({payload})
      .then(res => {
        const {success, reason} = res;
        success && onPressCancel();
        Toast.show(success ? 'Deleted' : reason);
      })
      .catch(_ => {
        Toast.show(ERROR_OCCURRED);
      });
  };

  const onRequestDelete = () => {
    setInit({
      text: DELETE_ROUTE_CONFIRM,
      onNo: onHideConfirm,
      onYes: onPressDelete,
    });
    onShowConfirm();
  };

  const onStartLiveWithRoute = () => {
    setDefaultRoutes();
    setCurrentRoute({inLive: true});
    setAppMode(LIVE_MODE);
  };

  const IconMarker = useSvgFactory(getMarker, {width: 27, height: 23, fillAccent: themeStyle.accentColor});

  return (
    <Fragment>
      <Row alignItems="center" {...mt10}>
        <Column flex={0.7} alignItems={'flex-start'}>
          <Text style={[stylesTextKM, {color: themeStyle.textColorSecondary}]}>{distance} km</Text>
        </Column>
        <Column flex={0.3}>
          <SelectDirection themeStyle={themeStyle} mode={directionsMode ? directionsMode : ''} />
        </Column>
        <Column>
          {authorized && <RoundedIcon style={liveIconDims} IconComponent={IconMarker} onPress={onStartLiveWithRoute} />}
        </Column>
        <Column alignItems={'flex-end'}>
          <Btn {...btnDeleteStyles} title={'Delete Route'} onPress={onRequestDelete} />
        </Column>
      </Row>
    </Fragment>
  );
};

const mapDispatchToProps = {deleteRoute: _deleteRoute};
export default WithActions(mapDispatchToProps)(Route);
