import React, {Fragment, useContext} from 'react';
import {Text} from 'react-native';
import Btn from '../btn/Btn';
import {routeContext, appModeContext} from '../../contexts/contexts';
import {writeRoutes} from '../../utils/fs';
import Toast from 'react-native-simple-toast';
import {Row, Column, stylesTextKM, Styles} from './styles';
import {APP_MODE, ERROR_OCCURRED} from '../../constants/constants';
import SelectDirection from '../directions-bar/SelectDirection';
import {removeRoute} from '../../utils/removeRoute';
import IconMarker from '../svg-icons/icon-marker/IconMarker';
import RoundedIcon from '../rounded-icon/RoundedIcon';

const {VIEW_MODE, LIVE_MODE} = APP_MODE;

const Route = ({themeStyle}) => {
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
    (async () => {
      try {
        const _routes = removeRoute(routes, currentRoute.id);
        const written = await writeRoutes(_routes);
        written && onPressCancel();
        Toast.show(written ? 'Deleted' : ERROR_OCCURRED);
      } catch (error) {
        Toast.show(ERROR_OCCURRED);
      }
    })();
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

export default Route;
