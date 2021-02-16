import React, {useState, useEffect, useRef, useCallback} from 'react';
import {InteractionManager} from 'react-native';
import {VirtualList} from '~/componets/virtualized-list';
import Toast from 'react-native-simple-toast';
import {ERROR_OCCURRED, DIRECTIONS_MODE} from '~/constants/constants';
import {useOnDirectionsMode, useOnIsDirectionsMode} from '~/hooks/use-on-effect';
import {getActivities} from '~/actions';
import useSpinner from '~/componets/spinner/useSpinner';
import {mapper} from '~/utils/activity-helpers/mapper';
import {ActivityGroup} from '~/componets/activity-group';
import {observer} from 'mobx-react-lite';
import {useAuth} from '~/stores/auth';
import {useDirectionsMode} from '~/stores/directions-mode';
import {useLiveRoute} from '~/stores/live-route';
import {useActivities} from '~/stores/activities';

const {WALKING} = DIRECTIONS_MODE;

const SavedActivities = ({themeStyle, goToRoute}) => {
  const mounted = useRef(false);
  const [preparedData, setPrepared] = useState([]);
  const {setLoading, isLoading} = useSpinner({position: 'top'});

  const {profile} = useAuth();
  const {directionsMode, setDirectionsMode} = useDirectionsMode();
  const localDirections = useRef(directionsMode);
  const {setLiveRoute} = useLiveRoute();
  const {activities, setActivities, setDefaultActivities} = useActivities();

  const onRefresh = useCallback(() => {
    setLoading(true);
    const direction = localDirections.current || WALKING;
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
  }, [profile.userId, setActivities, setDefaultActivities, setLoading]);

  useOnIsDirectionsMode({mount: true});
  useOnDirectionsMode({mount: WALKING});

  useEffect(() => {
    const interactionPromise = InteractionManager.runAfterInteractions(() => {
      onRefresh();
      mounted.current = true;
    });
    return () => interactionPromise.cancel();
  }, [onRefresh]);

  useEffect(() => {
    if (localDirections.current === directionsMode) return;
    localDirections.current = directionsMode;

    if (!mounted.current) return;
    const interactionPromise = InteractionManager.runAfterInteractions(() => onRefresh());
    return () => interactionPromise.cancel();
  }, [directionsMode, onRefresh]);

  useEffect(() => {
    setPrepared(mapper(activities));
  }, [activities]);

  const onPressActivityItem = activitity => {
    setDirectionsMode(activitity.directionsMode);
    setLiveRoute(activitity);
    goToRoute();
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

export default observer(SavedActivities);
