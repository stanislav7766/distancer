import React, {Fragment, useContext} from 'react';
import {Text} from 'react-native';
import Btn from '../btn/Btn';
import {routeContext, appModeContext} from '../../contexts/contexts';
import {writeRoutes} from '../../utils/fs';
import Toast from 'react-native-simple-toast';
import {Row, Column, stylesTextKM, Styles} from './styles';
import {APP_MODE, ERROR_OCCURRED} from '../../constants/constants';

const {VIEW_MODE} = APP_MODE;
const removeRoute = (arr, id) => arr.filter(route => route.id !== id);

const ViewRoute = ({themeStyle}) => {
  const {setDefaultRoute, setDefaultRoutes, routes, currentRoute} = useContext(routeContext);
  const {setAppMode} = useContext(appModeContext);
  const {btnDims} = Styles(themeStyle);
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

  return (
    <Fragment>
      <Row marginTop={10}>
        <Column alignItems={'flex-start'}>
          <Text style={[stylesTextKM, {color: themeStyle.textColor}]}>{distance} km</Text>
        </Column>
        <Column alignItems={'flex-end'}>
          <Btn style={btnDims} title={'Delete Route'} onPress={onPressDelete} />
        </Column>
      </Row>
    </Fragment>
  );
};
export default ViewRoute;
