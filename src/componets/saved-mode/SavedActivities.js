import React, {useEffect, useCallback, useMemo} from 'react';
import {VirtualList} from '~/componets/virtualized-list';
import Toast from 'react-native-simple-toast';
import {ERROR_OCCURRED, DIRECTIONS_MODE} from '~/constants/constants';
import {useOnDirectionsMode, useOnIsDirectionsMode} from '~/hooks/use-on-effect';
import {useCancelablePromise} from '~/hooks/use-cancelable-promise';
import {getFirstActivities, getNextActivities} from '~/actions';
import {ActivityGroup} from '~/componets/activity-group';
import {observer} from 'mobx-react-lite';
import {useAuth} from '~/stores/auth';
import {useDirectionsMode} from '~/stores/directions-mode';
import {useLiveRoute} from '~/stores/live-route';
import {useManagedMounted} from '~/hooks/use-mounted';
import {useActivities} from '~/stores/activities';
import {useRunAfterInteractions} from '~/hooks/use-interaction-manager';
import {useMakeRef} from '~/hooks/use-make-ref';
import {countInitialGroupsToRender} from '~/utils/activity-helpers';
import {useSpinner} from '~/stores/spinner';

const {WALKING} = DIRECTIONS_MODE;

const SavedActivities = ({themeStyle, goToRoute}) => {
  const [mounted, setMounted] = useManagedMounted(false);
  const {startLoading, isLoading, stopLoading, startMoreLoading, isMoreLoading, stopMoreLoading} = useSpinner();

  const makeCancelable = useCancelablePromise();

  const isLoadingRef = useMakeRef(isLoading);
  const isMoreLoadingRef = useMakeRef(isMoreLoading);

  const {profile} = useAuth();
  const {directionsMode, setDirectionsMode} = useDirectionsMode();
  const directionsModeRef = useMakeRef(directionsMode);

  const {setLiveRoute} = useLiveRoute();
  const {
    grouppedActivities,
    setActivities,
    setDefaultActivities,
    setNextKey,
    nextKey,
    concatActivities,
  } = useActivities();

  const nextKeyRef = useMakeRef(nextKey);

  const initNumToRender = useMemo(() => countInitialGroupsToRender(grouppedActivities), [grouppedActivities]);

  const onRefresh = useCallback(() => {
    if (isLoadingRef.current || isMoreLoadingRef.current) return;
    startLoading({show: false});
    const direction = directionsModeRef.current || WALKING;
    makeCancelable(getFirstActivities({payload: {direction, userId: profile.userId}}), stopLoading)
      .then(res => {
        const {success, reason, data} = res;
        if (!success) {
          Toast.show(reason);
          setDefaultActivities();
          return;
        }
        setActivities(data.activities, data.groupsTotals);
        setNextKey(data.nextKey);
      })
      .catch(_ => {
        setDefaultActivities();
        Toast.show(ERROR_OCCURRED);
      })
      .finally(_ => {
        stopLoading();
      });
  }, [
    directionsModeRef,
    isLoadingRef,
    isMoreLoadingRef,
    makeCancelable,
    profile.userId,
    setActivities,
    setDefaultActivities,
    setNextKey,
    startLoading,
    stopLoading,
  ]);

  const onNextActivities = useCallback(() => {
    if (isLoadingRef.current || isMoreLoadingRef.current) return;
    startMoreLoading({show: true});
    const direction = directionsModeRef.current || WALKING;
    makeCancelable(
      getNextActivities({payload: {direction, userId: profile.userId, nextKey: nextKeyRef.current}}),
      stopMoreLoading,
    )
      .then(res => {
        const {success, data} = res;
        if (!success) return;

        concatActivities(data.activities, data.groupsTotals);
        setNextKey(data.nextKey);
      })
      .catch(_ => {
        setDefaultActivities();
        Toast.show(ERROR_OCCURRED);
      })
      .finally(_ => {
        stopMoreLoading();
      });
  }, [
    directionsModeRef,
    isLoadingRef,
    isMoreLoadingRef,
    startMoreLoading,
    makeCancelable,
    profile.userId,
    nextKeyRef,
    stopMoreLoading,
    concatActivities,
    setNextKey,
    setDefaultActivities,
  ]);

  useOnIsDirectionsMode({mount: true});
  useOnDirectionsMode({mount: WALKING});

  const onRefreshAgain = useRunAfterInteractions(
    useCallback(() => {
      onRefresh();
      setMounted(true);
    }, [onRefresh, setMounted]),
  );

  useEffect(() => {
    if (!mounted.current) return;

    onRefreshAgain();
  }, [directionsMode, mounted, onRefreshAgain]);

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
      direction: directionsModeRef.current,
      onPresItem: onPressActivityItem,
      onNext: onNextActivities,
    };
    return <ActivityGroup {...groupProps} />;
  };

  return (
    <>
      <VirtualList
        refresh={{refreshing: isLoading, onRefresh}}
        renderItem={renderGroup}
        items={grouppedActivities}
        initialNumToRender={initNumToRender}
        keyExtractor={item => item.id}
      />
    </>
  );
};

export default observer(SavedActivities);
