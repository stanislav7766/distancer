import React, {useEffect, useCallback, useState, memo} from 'react';
import {VirtualList} from '~/componets/virtualized-list';
import Toast from 'react-native-simple-toast';
import {Item} from '~/componets/item';
import {Preview} from '~/componets/preview';
import {Row, Styles, mt20, mb20} from './styles';
import {ROUTES_BATCH_LIMIT} from '~/constants/constants';
import {getFirstRoutes, getNextRoutes} from '~/actions';
import {useRunAfterInteractions} from '~/hooks/use-interaction-manager';
import {useCancelablePromise} from '~/hooks/use-cancelable-promise';
import {useOnIsDirectionsMode} from '~/hooks/use-on-effect';
import {useCurrentRoute} from '~/stores/current-route';
import {useRoutes} from '~/stores/routes';
import {observer} from 'mobx-react-lite';
import {useAuth} from '~/stores/auth';
import {isEqualJson} from '~/utils/validation/helpers';
import {useMakeRef} from '~/hooks/use-make-ref';
import {useSpinner} from '~/stores/spinner';
import {getLocaleStore} from '~/stores/locale';

const {papyrusify} = getLocaleStore();

const SavedRoutes = ({themeStyle, goToRoute}) => {
  const makeCancelable = useCancelablePromise();

  const {startLoading, isLoading, stopLoading, startMoreLoading, isMoreLoading, stopMoreLoading} = useSpinner();

  const isLoadingRef = useMakeRef(isLoading);
  const isMoreLoadingRef = useMakeRef(isMoreLoading);

  const {setCurrentRoute} = useCurrentRoute();
  const {routes, setRoutes, concatRoutes, nextKey, setNextKey} = useRoutes();
  const [mappedRoutes, setMappedRoutes] = useState([]);
  const {profile} = useAuth();

  useOnIsDirectionsMode({mount: false});

  useEffect(() => {
    setMappedRoutes(routes);
  }, [routes]);

  const onRefresh = useCallback(() => {
    if (isLoadingRef.current || isMoreLoadingRef.current) return;
    startLoading({show: false});
    makeCancelable(getFirstRoutes({payload: {userId: profile.userId}}), () => {
      stopLoading();
    })
      .then(res => {
        const {success, reason, data} = res;
        if (!success) {
          Toast.show(reason);
          return;
        }
        setRoutes(data.routes);
        setNextKey(data.nextKey);
      })
      .catch(_ => {
        Toast.show(papyrusify('common.message.errorOccurred'));
      })
      .finally(_ => {
        stopLoading();
      });
  }, [
    isLoadingRef,
    isMoreLoadingRef,
    startLoading,
    makeCancelable,
    profile.userId,
    stopLoading,
    setRoutes,
    setNextKey,
  ]);

  const onNextRoutes = useCallback(() => {
    if (isLoadingRef.current || isMoreLoadingRef.current) return;
    startMoreLoading({show: true});
    makeCancelable(getNextRoutes({payload: {userId: profile.userId, nextKey}}), () => {
      stopMoreLoading();
    })
      .then(res => {
        const {success, data} = res;
        if (!success) return;

        concatRoutes(data.routes);
        setNextKey(data.nextKey);
      })
      .catch(_ => {
        Toast.show(papyrusify('common.message.errorOccurred'));
      })
      .finally(_ => {
        stopMoreLoading();
      });
  }, [
    isLoadingRef,
    isMoreLoadingRef,
    startMoreLoading,
    makeCancelable,
    profile.userId,
    nextKey,
    stopMoreLoading,
    concatRoutes,
    setNextKey,
  ]);

  useRunAfterInteractions(onRefresh);

  const onPressItem = route => {
    setCurrentRoute(route);
    goToRoute();
  };

  const Footer = <Row {...mb20} />;

  const renderItem = ({item}) => (
    <Route
      designation={papyrusify('common.designation')}
      themeStyle={themeStyle}
      item={item}
      onPressItem={onPressItem}
    />
  );

  return (
    <VirtualList
      refresh={{refreshing: isLoading, onRefresh}}
      renderItem={renderItem}
      Footer={Footer}
      items={mappedRoutes}
      initialNumToRender={ROUTES_BATCH_LIMIT}
      onEndReached={onNextRoutes}
      onEndReachedThreshold={0.3}
      keyExtractor={item => item.id}
    />
  );
};

const onUpdate = (prev, next) => isEqualJson(prev, next);

const Route = memo(({themeStyle, item, onPressItem, designation}) => {
  const {styleItemRoute} = Styles(themeStyle);
  const IconWrap = coords => <Preview coords={coords} />;

  return (
    <Row {...mt20}>
      <Item
        style={styleItemRoute}
        onPress={() => onPressItem(item)}
        IconComponent={IconWrap(item.points)}
        text={`${item.distance} ${designation.km}`}
      />
    </Row>
  );
}, onUpdate);

export default observer(SavedRoutes);
