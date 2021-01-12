import React, {useEffect, useContext, useMemo} from 'react';
import {Text} from 'react-native';
import Btn from '../btn/Btn';
import RoundedIcon from '../rounded-icon/RoundedIcon';
import {routeContext, modalContext, mapContext} from '../../contexts/contexts';
import {useSwitchDrawMode} from '../../hooks/use-switch';
import {useRouteSettings} from '../../stores/route-settings';
import useSvgFactory from '../../hooks/use-svg-factory';
import {useOnIsDirectionsMode, useOnDirectionsMode} from '../../hooks/use-directions-mode';
import {getLeftArrow} from '../../assets/svg-icons/left-arrow';
import {Groove} from '../../contexts/Groove';
import {getDrag} from '../../assets/svg-icons/drag';
import Toast from 'react-native-simple-toast';
import {randomID} from '../../utils/randomID';
import {measureDistance} from '../../utils/measureDistanceCoords';
import {Row, Column, Styles, btnSaveStyles, mt10} from './styles';
import {ACCENT_RED, ERROR_OCCURRED, SELECT_NEEDED_POINT, DIRECTIONS_MODE} from '../../constants/constants';
import {saveRoute as _saveRoute} from '../../actions';
import WithActions from '../with-actions/WithActions';
import {isFilledArr} from '../../utils/isFilledArr';
import {useDirectionsMode} from '../../stores/directions-mode';
import {observer} from 'mobx-react-lite';

const {WALKING} = DIRECTIONS_MODE;

const DrawMode = ({themeStyle, saveRoute}) => {
  const [SwitchDrawMode, drawMode] = useSwitchDrawMode();
  const {cameraRef} = useContext(mapContext);
  const {dragHints} = useRouteSettings();
  const {setCurrentRoute, setDefaultRoute, currentRoute} = useContext(routeContext);
  const {directionsMode} = useDirectionsMode();
  const {dragMode, setDragMode} = useContext(modalContext);
  const {moveCamera} = Groove(cameraRef);

  const {arrowIconDims, dragIconDims, stylesTextKM} = Styles(themeStyle);

  const dragIconBg = {backgroundColor: dragMode ? ACCENT_RED : themeStyle.backgroundColorSecondary};
  const dragIconColor = dragMode ? '#fff' : themeStyle.accentColor;

  const IconLeftArrow = useSvgFactory(getLeftArrow, {width: 30, height: 33, fillAccent: themeStyle.accentColor});
  const IconDrag = useSvgFactory(getDrag, {
    width: 26,
    height: 35,
    fillAccent: dragIconColor,
  });

  const {points, distance} = currentRoute;

  const setDistance = _distance => setCurrentRoute({distance: _distance});
  const setPoints = _points => setCurrentRoute({points: _points});

  useEffect(() => {
    setDistance(measureDistance(points));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [points]);

  const flyToFirst = () => {
    const coordinate = points[0];
    isFilledArr(coordinate) && moveCamera({zoomLevel: 16, centerCoordinate: coordinate});
  };

  useOnIsDirectionsMode({mount: drawMode});
  useOnDirectionsMode({mount: drawMode ? WALKING : '', unmount: WALKING});

  const onPressCancel = () => {
    setDragMode(false);
    setDefaultRoute();
  };

  const onPressBackStep = () => {
    setPoints(points.slice(0, -1));
  };
  const onClearPoints = () => setPoints([]);

  const onPressDragMode = () => {
    if (!dragMode) {
      dragHints && Toast.show(SELECT_NEEDED_POINT);
      flyToFirst();
    }
    setDragMode(!dragMode);
  };

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
            <RoundedIcon
              style={arrowIconDims}
              IconComponent={IconLeftArrow}
              onPress={onPressBackStep}
              onLongPress={onClearPoints}
            />
          </Column>
          <Column>
            <RoundedIcon style={{...dragIconDims, ...dragIconBg}} IconComponent={IconDrag} onPress={onPressDragMode} />
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
export default WithActions(mapDispatchToProps)(observer(DrawMode));
