import React, {Fragment, useEffect, useState, useContext, useMemo} from 'react';
import {Text} from 'react-native';
import Btn from '../btn/Btn';
import RoundedIcon from '../rounded-icon/RoundedIcon';
import {routeContext, modalContext} from '../../contexts/contexts';
import IconLeftArrow from '../svg-icons/icon-left-arrow/IconLeftArrow';
import IconDrag from '../svg-icons/icon-drag/IconDrag';
import Toast from 'react-native-simple-toast';
import {readRoutes, writeRoutes} from '../../utils/fs';
import {randomID} from '../../utils/randomID';
import {measureDistance} from '../../utils/measureDistanceCoords';
import DoubleBtn from '../double-btn/DoubleBtn';
import {Row, Column, stylesTextKM, Styles} from './styles';

const DrawMode = ({themeStyle}) => {
  const [typeSwitched, setTypeSwitched] = useState(false);
  const {setCurrentRoute, setDefaultRoute, currentRoute} = useContext(routeContext);
  const {dragMode, setDragMode} = useContext(modalContext);

  const {arrowIconDims, dragIconDims, btnDims, styleDoubleBtn} = Styles(themeStyle);
  const styledDoubleBtn = styleDoubleBtn(typeSwitched);

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
        <Row marginTop={10}>
          <Column alignItems={'flex-start'}>
            <Text style={[stylesTextKM, {color: themeStyle.textColor}]}>{distance} km</Text>
          </Column>
          <Column alignItems={'flex-end'}>
            <DoubleBtn
              style={styledDoubleBtn}
              textL={'Dots'}
              value={typeSwitched}
              textR={'Lines'}
              onPress={() => setTypeSwitched(!typeSwitched)}
            />
          </Column>
        </Row>
        <Row>
          <Column alignItems={'flex-start'}>
            <RoundedIcon style={arrowIconDims} IconComponent={IconLeftArrowWrap} onPress={onPressBackStep} />
          </Column>
          <Column>
            <RoundedIcon style={dragIconDims} IconComponent={IconDragWrap} onPress={onPressDragMode} />
          </Column>
          <Column alignItems={'flex-end'} marginTop={10}>
            <Btn onPress={onPressSave} style={btnDims} title={'Save Route'} />
          </Column>
        </Row>
      </Fragment>
    ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [distance, dragMode, typeSwitched],
  );
};

export default DrawMode;
