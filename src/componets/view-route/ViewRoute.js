import React, {Fragment, useContext} from 'react';
import Btn from '../btn/Btn';
import {routeContext, appModeContext} from '../../contexts/contexts';
import TextUnderline from '../text-underline/TextUnderline';
import {writeRoutes} from '../../utils/fs';
import Toast from 'react-native-simple-toast';
import {Row, Column, TextKM, Styles} from './styles';
import {APP_MODE} from '../../constants/constants';

const {BASIC_VIEW} = APP_MODE;
const removeRoute = (arr, id) => arr.filter(route => route.id !== id);

const ViewRoute = ({themeStyle}) => {
  const {setDefaultRoute, setDefaultRoutes, routes, currentRoute} = useContext(routeContext);
  const {setAppMode} = useContext(appModeContext);
  const {distance} = currentRoute;
  const onPressCancel = () => {
    setDefaultRoute();
    setDefaultRoutes();
    setAppMode(BASIC_VIEW);
  };
  const {styleTextUnderline} = Styles(themeStyle);
  const onPressDelete = () => {
    (async () => {
      try {
        const _routes = removeRoute(routes, currentRoute.id);
        const written = await writeRoutes(_routes);
        written && onPressCancel();
        Toast.show(written ? 'Deleted' : 'An error occurred');
      } catch (error) {
        Toast.show('An error occurred');
      }
    })();
  };

  return (
    <Fragment>
      <Row justifyContent={'flex-start'} marginBottom={10} marginTop={10}>
        <TextKM textColor={themeStyle.textColor}>{distance} km</TextKM>
      </Row>
      <Row>
        <Column alignItems={'flex-start'}>
          <TextUnderline text={currentRoute.city.name} style={styleTextUnderline} />
        </Column>
        <Column alignItems={'flex-end'} marginTop={10}>
          <Btn
            width={'160px'}
            title={'Delete Route'}
            onPress={onPressDelete}
            backgroundColor={themeStyle.accentColorSecondary}
          />
        </Column>
      </Row>
    </Fragment>
  );
};
export default ViewRoute;
