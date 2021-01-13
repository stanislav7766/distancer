import React, {useState, useEffect, useContext, useRef, useCallback} from 'react';
import VirtualList from '../virtualized-list';
import {mapContext, appModeContext, liveRouteContext} from '../../contexts/contexts';
import {Groove} from '../../contexts/Groove';
import Toast from 'react-native-simple-toast';
import {APP_MODE, ERROR_OCCURRED, ROUTE_TYPES, DIRECTIONS_MODE} from '../../constants/constants';
import WithActions from '../with-actions/WithActions';
import {useOnIsDirectionsMode} from '../../hooks/use-directions-mode';
import {getActivities as _getActivities} from '../../actions';
import useSpinner from '../spinner/useSpinner';
import {mapper} from '../../utils/mapper';
import ActivityGroup from '../activity-group';
import {observer} from 'mobx-react-lite';
import {useAuth} from '../../stores/auth';
import {useDirectionsMode} from '../../stores/directions-mode';

const {VIEW_ROUTE} = APP_MODE;
const {ACTIVITY} = ROUTE_TYPES;
const {WALKING} = DIRECTIONS_MODE;

const SavedActivities = ({themeStyle, getActivities}) => {
  const [preparedData, setPrepared] = useState([]);
  const {setLoading, isLoading} = useSpinner({position: 'top'});

  const {zoomLevel, cameraRef} = useContext(mapContext);
  const {setAppMode, setViewMode} = useContext(appModeContext);
  const {profile} = useAuth();
  const {directionsMode, setDirectionsMode} = useDirectionsMode();
  const localDirections = useRef(directionsMode);
  const {moveCamera} = Groove(cameraRef);
  const {activities, setActivities, setDefaultActivities, setLiveRoute} = useContext(liveRouteContext);

  const onRefresh = useCallback(() => {
    setLoading(true);
    const direction = localDirections.current ?? WALKING;
    getActivities({payload: {direction, userId: profile.userId}})
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
  }, [profile.userId, getActivities, setActivities, setDefaultActivities, setLoading]);
  useOnIsDirectionsMode({mount: true});

  useEffect(() => {
    onRefresh();
  }, [onRefresh]);

  useEffect(() => {
    setDefaultActivities();
  }, [setDefaultActivities]);

  useEffect(() => {
    if (localDirections.current === directionsMode) {
      return;
    }
    localDirections.current = directionsMode;
    onRefresh();
  }, [directionsMode, onRefresh]);

  useEffect(() => {
    setPrepared(mapper(activities));
  }, [activities]);

  const routeWihoutDirections = ({directionsMode, ...route}) => route;

  const onPressActivityItem = activitity => {
    setAppMode(VIEW_ROUTE);
    setViewMode(ACTIVITY);
    setDirectionsMode(activitity.directionsMode);
    setLiveRoute(routeWihoutDirections(activitity));
    moveCamera({zoomLevel, centerCoordinate: activitity.points1[0]});
  };

  const renderGroup = ({item}) => {
    const {year, month, items, monthTotals} = item;

    const groupProps = {
      themeStyle,
      items,
      header: {year, month, monthTotals},
      direction: localDirections.current,
      onPresItem: onPressActivityItem,
    };
    return <ActivityGroup {...groupProps} />;
  };

  return (
    <VirtualList
      refresh={{refreshing: isLoading, onRefresh}}
      renderItem={renderGroup}
      items={preparedData}
      initialNumToRender={2}
      keyExtractor={item => item.id}
    />
  );
};

const mapDispatchToProps = {
  getActivities: _getActivities,
};
export default WithActions(mapDispatchToProps)(observer(SavedActivities));
