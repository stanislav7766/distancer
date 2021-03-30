import React, {useEffect, useCallback, useMemo} from 'react';
import {VirtualList} from '~/componets/virtualized-list';
import Toast from 'react-native-simple-toast';
import {DIRECTIONS_MODE} from '~/constants/constants';
import {useOnDefaultMultipleSelect, useOnDirectionsMode, useOnIsDirectionsMode} from '~/hooks/use-on-effect';
import {useCancelablePromise} from '~/hooks/use-cancelable-promise';
import {deleteMultipleActivities, getFirstActivities, getNextActivities} from '~/actions';
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
import {getLocaleStore} from '~/stores/locale';
import {getMultipleSelectBar, useMultipleSelectBar} from '~/stores/multiple-select-bar';

const {papyrusify} = getLocaleStore();
const multipleSelectStore = getMultipleSelectBar();
const {WALKING} = DIRECTIONS_MODE;

const SavedActivities = ({themeStyle, goToRoute}) => {
  const [mounted, setMounted] = useManagedMounted(false);
  const {startLoading, isLoading, stopLoading, startMoreLoading, isMoreLoading, stopMoreLoading} = useSpinner();
  const {showBar} = useMultipleSelectBar();

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
    removeByIds,
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
        Toast.show(papyrusify('common.message.errorOccurred'));
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
        Toast.show(papyrusify('common.message.errorOccurred'));
      })
      .finally(_ => {
        stopMoreLoading();
      });
  }, [
    isLoadingRef,
    isMoreLoadingRef,
    startMoreLoading,
    directionsModeRef,
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
  useOnDefaultMultipleSelect({mount: true, unmount: true});

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

  const onDeleteMultiple = () => {
    if (isLoadingRef.current || isMoreLoadingRef.current) return;
    startLoading({show: true});

    const payload = {activities: multipleSelectStore.selected, userId: profile.userId};
    makeCancelable(deleteMultipleActivities({payload}), () => {
      stopLoading();
    })
      .then(res => {
        const {success, reason} = res;
        if (!success) {
          Toast.show(reason);
          return;
        }
        removeByIds(multipleSelectStore.selected);
        multipleSelectStore.onCancel();
        Toast.show(papyrusify('savedMode.message.deleted'));
      })
      .catch(_ => {
        Toast.show(papyrusify('common.message.errorOccurred'));
      })
      .finally(_ => {
        stopLoading();
      });
  };

  const onActivateSelect = item => {
    multipleSelectStore.setInit({
      deleteMultiple: onDeleteMultiple,
      deleteHeaderText: papyrusify('savedMode.message.deleteSelectedActivitiesConfirm'),
    });
    multipleSelectStore.onShowBar();
    multipleSelectStore.addSelected(item);
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
      designation: papyrusify('common.designation'),
      activeSelect: showBar,
      onActivateSelect,
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
