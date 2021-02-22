import React, {useEffect, useCallback, useState, memo} from 'react';
import {VirtualList} from '~/componets/virtualized-list';
import Toast from 'react-native-simple-toast';
import {Item} from '~/componets/item';
import {Preview} from '~/componets/preview';
import {Row, Styles, mt20, mb20, spinnerStyle} from './styles';
import {ERROR_OCCURRED, ROUTES_BATCH_LIMIT} from '~/constants/constants';
import {getFirstRoutes, getNextRoutes} from '~/actions';
import useSpinner from '~/componets/spinner/useSpinner';
import {useRunAfterInteractions} from '~/hooks/use-interaction-manager';
import {useCancelablePromise} from '~/hooks/use-cancelable-promise';
import {useOnIsDirectionsMode} from '~/hooks/use-on-effect';
import {useCurrentRoute} from '~/stores/current-route';
import {useRoutes} from '~/stores/routes';
import {observer} from 'mobx-react-lite';
import {useAuth} from '~/stores/auth';
import {isEqualJson} from '~/utils/validation/helpers';
import {View} from 'react-native';
import {useMakeRef} from '~/hooks/use-make-ref';

const SavedRoutes = ({themeStyle, goToRoute}) => {
  const makeCancelable = useCancelablePromise();

  const {setLoading, isLoading} = useSpinner({position: 'top'});
  const {setLoading: setMoreLoading, isLoading: isMoreLoading, SpinnerComponent} = useSpinner({position: 'top'});

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
    setLoading(true);
    makeCancelable(getFirstRoutes({payload: {userId: profile.userId}}), () => {
      setLoading(false);
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
        Toast.show(ERROR_OCCURRED);
      })
      .finally(_ => {
        setLoading(false);
      });
  }, [isLoadingRef, isMoreLoadingRef, setLoading, makeCancelable, profile.userId, setRoutes, setNextKey]);

  const onNextRoutes = useCallback(() => {
    if (isLoadingRef.current || isMoreLoadingRef.current) return;
    setMoreLoading(true);
    makeCancelable(getNextRoutes({payload: {userId: profile.userId, nextKey}}), () => {
      setMoreLoading(false);
    })
      .then(res => {
        const {success, data} = res;
        if (!success) return;

        concatRoutes(data.routes);
        setNextKey(data.nextKey);
      })
      .catch(_ => {
        Toast.show(ERROR_OCCURRED);
      })
      .finally(_ => {
        setMoreLoading(false);
      });
  }, [
    isLoadingRef,
    isMoreLoadingRef,
    setMoreLoading,
    makeCancelable,
    profile.userId,
    nextKey,
    concatRoutes,
    setNextKey,
  ]);

  useRunAfterInteractions(onRefresh);

  const onPressItem = route => {
    setCurrentRoute(route);
    goToRoute();
  };

  const Footer = (
    <>
      {isMoreLoading && <View style={spinnerStyle}>{SpinnerComponent}</View>}
      <Row {...mb20} />
    </>
  );

  const renderItem = ({item}) => <Route themeStyle={themeStyle} item={item} onPressItem={onPressItem} />;

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

const Route = memo(({themeStyle, item, onPressItem}) => {
  const {styleItemRoute} = Styles(themeStyle);
  const IconWrap = coords => <Preview coords={coords} />;

  return (
    <Row {...mt20}>
      <Item
        style={styleItemRoute}
        onPress={() => onPressItem(item)}
        IconComponent={IconWrap(item.points)}
        text={`${item.distance} km`}
      />
    </Row>
  );
}, onUpdate);

export default observer(SavedRoutes);
