import React, {Fragment, useEffect, useContext, useMemo} from 'react';
import {Text} from 'react-native';
import Btn from '../btn/Btn';
import RoundedIcon from '../rounded-icon/RoundedIcon';
import {routeContext, modalContext, appModeContext} from '../../contexts/contexts';
import {useSwitchDrawMode} from '../../hooks/use-switch';
import useSvgFactory from '../../hooks/use-svg-factory';
import {getLeftArrow} from '../../assets/svg-icons/left-arrow';
import {getDrag} from '../../assets/svg-icons/drag';
import Toast from 'react-native-simple-toast';
import {randomID} from '../../utils/randomID';
import {measureDistance} from '../../utils/measureDistanceCoords';
import {Row, Column, Styles, btnSaveStyles, mt10} from './styles';
import {ERROR_OCCURRED} from '../../constants/constants';
import {saveRoute as _saveRoute} from '../../actions';
import WithActions from '../with-actions/WithActions';

const DrawMode = ({themeStyle, saveRoute}) => {
  const [SwitchDrawMode, drawMode] = useSwitchDrawMode();
  const {setCurrentRoute, setDefaultRoute, currentRoute} = useContext(routeContext);
  const {setIsDirectionsMode, directionsMode} = useContext(appModeContext);
  const {dragMode, setDragMode} = useContext(modalContext);

  const {arrowIconDims, dragIconDims, stylesTextKM} = Styles(themeStyle);

  const IconLeftArrow = useSvgFactory(getLeftArrow, {width: 30, height: 33, fillAccent: themeStyle.accentColor});
  const IconDrag = useSvgFactory(getDrag, {width: 29, height: 38, fillAccent: themeStyle.accentColor});

  const {points, distance} = currentRoute;

  const setDistance = _distance => setCurrentRoute({distance: _distance});
  const setPoints = _points => setCurrentRoute({points: _points});

  useEffect(() => {
    setDistance(measureDistance(points));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [points]);

  useEffect(() => {
    setIsDirectionsMode(drawMode);
    return () => {
      setIsDirectionsMode(false);
    };
  }, [drawMode, setIsDirectionsMode]);

  const onPressCancel = () => {
    setDragMode(false);
    setDefaultRoute();
  };

  const onPressBackStep = () => setPoints(points.slice(0, -1));
  const onPressDragMode = () => setDragMode(!dragMode);
  const onPressSave = () => {
    distance > 0 &&
      saveRoute({payload: {route: {...currentRoute, directionsMode, id: randomID()}}})
        .then(res => {
          const {success, reason} = res;
          success && onPressCancel();
          Toast.show(success ? 'Saved' : reason);
        })
        .catch(_ => {
          Toast.show(ERROR_OCCURRED);
        });
  };

  return useMemo(
    () => (
      <>
        <Row {...mt10}>
          <Column alignItems={'flex-start'}>
            <Text style={stylesTextKM}>{distance} km</Text>
          </Column>
          <Column alignItems={'flex-end'}>{SwitchDrawMode}</Column>
        </Row>
        <Row {...mt10}>
          <Column alignItems={'flex-start'}>
            <RoundedIcon style={arrowIconDims} IconComponent={IconLeftArrow} onPress={onPressBackStep} />
          </Column>
          <Column>
            <RoundedIcon style={dragIconDims} IconComponent={IconDrag} onPress={onPressDragMode} />
          </Column>
          <Column alignItems={'flex-end'}>
            <Btn onPress={onPressSave} title={'Save Route'} {...btnSaveStyles} />
          </Column>
        </Row>
      </>
    ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [distance, dragMode, drawMode],
  );
};

const mapDispatchToProps = {
  saveRoute: _saveRoute,
};
export default WithActions(mapDispatchToProps)(DrawMode);
