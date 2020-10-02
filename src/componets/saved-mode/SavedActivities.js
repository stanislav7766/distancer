import React, {useState, useEffect, useContext, useRef} from 'react';
import {ScrollView, Text} from 'react-native';
import {mapContext, appModeContext, liveRouteContext} from '../../contexts/contexts';
import {Groove} from '../../contexts/Groove';
import Toast from 'react-native-simple-toast';
import Item from '../item/Item';
import Preview from '../preview/Preview';
import {isFilledArr} from '../../utils/isFilledArr';
import {Row, Column, Styles} from './styles';
import {
  APP_MODE,
  WINDOW_HEIGHT,
  NAVBAR_HEIGHT,
  ERROR_OCCURRED,
  ROUTE_TYPES,
  DIRECTIONS_MODE,
} from '../../constants/constants';
import WithActions from '../with-actions/WithActions';
import {getActivities as _getActivities} from '../../actions';
import useSpinner from '../spinner/useSpinner';
import {mapper} from '../../utils/mapper';
import {calcFromMonth} from '../../utils/calcActivities';
import {randomID} from '../../utils/randomID';
import {Form} from '../../constants/styles';
const {VIEW_ROUTE} = APP_MODE;
const {ACTIVITY} = ROUTE_TYPES;
const {WALKING} = DIRECTIONS_MODE;

const SavedActivities = ({themeStyle, closeModal, getActivities}) => {
  const [preparedData, setPrepared] = useState([]);
  const {setLoading, isLoading, SpinnerComponent} = useSpinner({position: 'top'});

  const {zoomLevel, cameraRef} = useContext(mapContext);
  const {setAppMode, setViewMode, directionsMode, setDirectionsMode, setIsDirectionsMode, auth} = useContext(
    appModeContext,
  );
  let localDirections = useRef(directionsMode);
  const {moveCamera} = Groove(cameraRef);
  const {activities, setActivities, setDefaultActivities, setLiveRoute} = useContext(liveRouteContext);
  const maxHeight = WINDOW_HEIGHT - WINDOW_HEIGHT * 0.15 - NAVBAR_HEIGHT - 100;

  const fetchActivities = direction => {
    setLoading(true);
    setTimeout(() => {
      getActivities({payload: {direction, userId: auth.userId}})
        .then(res => {
          const {success, reason, data} = res;
          if (!success) {
            Toast.show(reason);
            setDefaultActivities();
            return;
          }
          setActivities(data.activities);
        })
        .catch(_ => {
          setDefaultActivities();
          Toast.show(ERROR_OCCURRED);
        })
        .finally(_ => {
          setLoading(false);
        });
    }, 200);
  };

  useEffect(() => {
    setIsDirectionsMode(true);
    fetchActivities(directionsMode);
    return () => {
      setIsDirectionsMode(false);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    localDirections.current !== directionsMode && fetchActivities(directionsMode);
    localDirections.current = directionsMode;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [directionsMode]);

  useEffect(() => {
    setPrepared(mapper(activities));
  }, [activities]);

  const {styleItemActivity, styleFormHeaderDate, styleFormHeaderInfo} = Styles(themeStyle);
  const routeWihoutDirections = ({directionsMode, ...route}) => route;
  const IconWrap = coords => <Preview coords={coords} />;

  const onPressActivityItem = activitity => {
    setAppMode(VIEW_ROUTE);
    setViewMode(ACTIVITY);
    setDirectionsMode(activitity.directionsMode);
    setLiveRoute(routeWihoutDirections(activitity));
    moveCamera({zoomLevel, centerCoordinate: activitity.points1[0]});
    closeModal();
  };

  const buildItemString = ({date, distance, pace, movingTime, avgSpeed}, direction) =>
    `${date}\n ${distance} km     ${direction === WALKING ? pace + ' /km' : avgSpeed + 'km/h'}      ${movingTime}`;

  const renderItem = (el, direction) => (
    <Row key={randomID()} marginTop={10}>
      <Item
        style={styleItemActivity}
        IconComponent={IconWrap(el.points1)}
        onPress={() => onPressActivityItem(el)}
        text={buildItemString(el, direction)}
      />
    </Row>
  );
  const renderFormHeaderInfo = text => <Text style={styleFormHeaderInfo}>{text}</Text>;

  const renderGroup = (
    {month, year, itemComponents, monthAvgSpeed, monthAvgPace, monthDistance, monthCount},
    direction,
  ) => (
    <Row key={randomID()} marginTop={10}>
      <Form backgroundColor={themeStyle.backgroundColor}>
        <Row marginTop={10}>
          <Column alignItems={'flex-start'}>
            <Text style={styleFormHeaderDate}>
              {month.toUpperCase()} {year}
            </Text>
          </Column>
          <Column alignItems={'flex-end'}>
            {renderFormHeaderInfo(
              direction === WALKING
                ? `${monthCount} runs    ${monthDistance} km   ${monthAvgPace} /km`
                : `${monthCount} activities    ${monthDistance} km   ${monthAvgSpeed} km/h`,
            )}
          </Column>
        </Row>
        {itemComponents}
      </Form>
    </Row>
  );

  const UserActivities = () => {
    const components = [];

    preparedData.forEach(([year, data]) => {
      Object.keys(data).forEach(month => {
        const activs = data[month];
        const monthTotals = calcFromMonth(activs);
        const itemComponents = activs.map(el => renderItem(el, directionsMode));
        components.push(renderGroup({itemComponents, year, month, ...monthTotals}, directionsMode));
      });
    });

    return (
      <>
        {isFilledArr(preparedData) && components.map(C => C)}
        <Row marginBottom={20} />
      </>
    );
  };

  return isLoading ? SpinnerComponent : <ScrollView style={{maxHeight}}>{UserActivities()}</ScrollView>;
};

const mapDispatchToProps = {
  getActivities: _getActivities,
};
export default WithActions(mapDispatchToProps)(SavedActivities);
