import React, {Fragment, useContext} from 'react';
import {Text} from 'react-native';
import Btn from '../btn/Btn';
import {routeContext, appModeContext} from '../../contexts/contexts';
import Toast from 'react-native-simple-toast';
import {Row, Column, stylesTextKM, Styles} from './styles';
import {APP_MODE, ERROR_OCCURRED} from '../../constants/constants';
import SelectDirection from '../directions-bar/SelectDirection';
import IconMarker from '../svg-icons/icon-marker/IconMarker';
import RoundedIcon from '../rounded-icon/RoundedIcon';
import WithActions from '../with-actions/WithActions';
import {deleteRoute as _deleteRoute} from '../../actions';
const {VIEW_MODE, LIVE_MODE} = APP_MODE;

const Route = ({themeStyle, deleteRoute}) => {
  const {setDefaultRoute, setDefaultRoutes, routes, currentRoute, setCurrentRoute} = useContext(routeContext);

  const {setAppMode, directionsMode} = useContext(appModeContext);
  const {btnDims, liveIconDims} = Styles(themeStyle);
  const {distance} = currentRoute;

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
  const onStartLiveWithRoute = () => {
    setDefaultRoutes();
    setCurrentRoute({inLive: true});
    setAppMode(LIVE_MODE);
  };

  return (
    <Fragment>
      <Row marginTop={10}>
        <Column>
          <Row>
            <Column alignItems={'flex-start'}>
              <Text style={[stylesTextKM, {color: themeStyle.textColorSecondary}]}>{distance} km</Text>
            </Column>
          </Row>
          <Row>
            <Column alignItems={'flex-start'}>
              <SelectDirection themeStyle={themeStyle} mode={directionsMode ? directionsMode : ''} />
            </Column>
          </Row>
        </Column>
        <Column>
          <RoundedIcon
            style={liveIconDims}
            IconComponent={<IconMarker width={27} height={23} fill={themeStyle.accentColor} />}
            onPress={onStartLiveWithRoute}
          />
        </Column>
        <Column alignItems={'flex-end'}>
          <Btn style={btnDims} title={'Delete Route'} onPress={onPressDelete} />
        </Column>
      </Row>
    </Fragment>
  );
};

const mapDispatchToProps = {deleteRoute: _deleteRoute};
export default WithActions(mapDispatchToProps)(Route);
