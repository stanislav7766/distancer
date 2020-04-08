import React, {Fragment, useEffect, useContext, useMemo} from 'react';
import Btn from '../btn/Btn';
import RoundedIcon from '../rounded-icon/RoundedIcon';
import {routeContext, modalContext, appModeContext} from '../../contexts/contexts';
import IconLeftArrow from '../svg-icons/icon-left-arrow/IconLeftArrow';
import IconDrag from '../svg-icons/icon-drag/IconDrag';
import Toast from 'react-native-simple-toast';
import {readRoutes, writeRoutes} from '../../utils/fs';
import {randomID} from '../../utils/randomID';
import {measureDistance} from '../../utils/measureDistanceCoords';
import {Row, Column, TextKM, Styles} from './styles';
import {APP_MODE} from '../../constants/constants';

const {BASIC_VIEW} = APP_MODE;

const DrawRoute = ({themeStyle}) => {
  const {setDefaultRoute, setCurrentRoute, currentRoute} = useContext(routeContext);
  const {setAppMode} = useContext(appModeContext);
  const {dragMode, setDragMode} = useContext(modalContext);

  const {arrowIconDims, dragIconDims} = Styles(themeStyle);

  const IconLeftArrowWrap = <IconLeftArrow width={30} height={33} fill={themeStyle.accentColor} />;
  const IconDragWrap = <IconDrag width={29} height={38} fill={themeStyle.accentColor} />;

  const {points, distance} = currentRoute;

  const setDistance = _distance => setCurrentRoute({...currentRoute, distance: _distance});
  const setPoints = _points => setCurrentRoute({...currentRoute, points: _points});

  useEffect(() => {
    setDistance(measureDistance(points));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [points]);

  const onPressCancel = () => {
    setDragMode(false);
    setDefaultRoute();
    setAppMode(BASIC_VIEW);
  };

  const onPressBackStep = () => setPoints(points.slice(0, -1));
  const onPressDragMode = () => setDragMode(!dragMode);
  const onPressSave = async () => {
    try {
      if (currentRoute.distance > 0) {
        const route = {...currentRoute, id: randomID()};
        const routes = await readRoutes();
        const res = await writeRoutes(routes.length > 0 ? [...routes, route] : [route]);
        res && onPressCancel();
        Toast.show(res ? 'Saved' : 'An error occurred');
      }
    } catch (error) {
      Toast.show('An error occurred');
    }
  };

  return useMemo(
    () => (
      <Fragment>
        <Row justifyContent={'flex-start'} marginBottom={10} marginTop={10}>
          <TextKM textColor={themeStyle.textColor}>{distance} km</TextKM>
        </Row>
        <Row>
          <Column alignItems={'flex-start'}>
            <RoundedIcon style={arrowIconDims} IconComponent={IconLeftArrowWrap} onPress={onPressBackStep} />
          </Column>
          <Column>
            <RoundedIcon style={dragIconDims} IconComponent={IconDragWrap} onPress={onPressDragMode} />
          </Column>
          <Column alignItems={'flex-end'} marginTop={10}>
            <Btn width={'160px'} title={'Save Route'} onPress={onPressSave} backgroundColor={themeStyle.accentColor} />
          </Column>
        </Row>
      </Fragment>
    ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [distance, dragMode],
  );
};

export default DrawRoute;
