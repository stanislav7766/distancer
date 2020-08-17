import React, {Fragment, useEffect, useContext} from 'react';
import {ScrollView} from 'react-native';
import {mapContext, appModeContext, liveRouteContext} from '../../contexts/contexts';
import {Groove} from '../../contexts/Groove';
import Toast from 'react-native-simple-toast';
import Item from '../item/Item';
import Preview from '../preview/Preview';
import {readActivities} from '../../utils/fs';
import {isFilledArr} from '../../utils/isFilledArr';
import {Row, Styles} from './styles';
import {
  APP_MODE,
  WINDOW_HEIGHT,
  NAVBAR_HEIGHT,
  ERROR_OCCURRED,
  ROUTE_TYPES,
  ACTIVITIES_LIST_EMPTY,
} from '../../constants/constants';

const {VIEW_ROUTE} = APP_MODE;
const {ACTIVITY} = ROUTE_TYPES;

const SavedMode = ({themeStyle, closeModal}) => {
  const {zoomLevel, cameraRef} = useContext(mapContext);
  const {setAppMode, setViewMode, setDirectionsMode} = useContext(appModeContext);
  const {moveCamera} = Groove(cameraRef);
  const {activities, setActivities, setLiveRoute} = useContext(liveRouteContext);
  const maxHeight = WINDOW_HEIGHT - WINDOW_HEIGHT * 0.15 - NAVBAR_HEIGHT - 100;

  useEffect(() => {
    (async () => {
      try {
        const _activities = await readActivities();
        isFilledArr(_activities) ? setActivities(_activities) : Toast.show(ACTIVITIES_LIST_EMPTY);
      } catch (error) {
        Toast.show(ERROR_OCCURRED);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const {styleItem} = Styles(themeStyle);
  const routeWihoutDirections = ({directionsMode, ...route}) => route;
  const IconWrap = coords => <Preview coords={coords} />;

  const onPressActivityItem = activitity => {
    setAppMode(VIEW_ROUTE);
    setViewMode(ACTIVITY);
    setDirectionsMode(activitity.directionsMode || '');
    setLiveRoute(routeWihoutDirections(activitity));
    moveCamera({zoomLevel, centerCoordinate: activitity.points1[0]});
    closeModal();
  };
  const isLastActivitiesPoint = i => i === activities.length - 1;

  const UserActivities = (
    <Fragment>
      {isFilledArr(activities) &&
        activities.map((el, i) => (
          <Row key={i} marginBottom={isLastActivitiesPoint(i) ? 20 : 0} marginTop={20}>
            <Item
              style={styleItem}
              onPress={() => onPressActivityItem(el)}
              IconComponent={IconWrap(el.points1)}
              text={`${el.distance} km`}
            />
          </Row>
        ))}
    </Fragment>
  );

  return <ScrollView style={{maxHeight}}>{UserActivities}</ScrollView>;
};

export default SavedMode;
