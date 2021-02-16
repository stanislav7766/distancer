import React, {useEffect, useCallback, useState} from 'react';
import {InteractionManager} from 'react-native';
import {VirtualList} from '~/componets/virtualized-list';
import Toast from 'react-native-simple-toast';
import {Item} from '~/componets/item';
import {Preview} from '~/componets/preview';
import {Row, Styles, mt20, mb20} from './styles';
import {ERROR_OCCURRED} from '~/constants/constants';
import {getRoutes} from '~/actions';
import useSpinner from '~/componets/spinner/useSpinner';
import {useOnIsDirectionsMode} from '~/hooks/use-on-effect';
import {useCurrentRoute} from '~/stores/current-route';
import {useRoutes} from '~/stores/routes';
import {observer} from 'mobx-react-lite';
import {useAuth} from '~/stores/auth';

const SavedRoutes = ({themeStyle, goToRoute}) => {
  const {setLoading, isLoading} = useSpinner({position: 'top'});
  const {setCurrentRoute} = useCurrentRoute();
  const {routes, setRoutes} = useRoutes();
  const [mappedRoutes, setMappedRoutes] = useState([]);
  const {profile} = useAuth();

  useOnIsDirectionsMode({mount: false});

  useEffect(() => {
    setMappedRoutes(routes);
  }, [routes]);

  const onRefresh = useCallback(() => {
    setLoading(true);
    getRoutes({payload: {userId: profile.userId}})
      .then(res => {
        const {success, reason, data} = res;
        success ? setRoutes(data.routes) : Toast.show(reason);
      })
      .catch(_ => {
        Toast.show(ERROR_OCCURRED);
      })
      .finally(_ => {
        setLoading(false);
      });
  }, [setLoading, setRoutes, profile.userId]);

  useEffect(() => {
    const interactionPromise = InteractionManager.runAfterInteractions(() => onRefresh());
    return () => interactionPromise.cancel();
  }, [onRefresh]);

  const {styleItemRoute} = Styles(themeStyle);
  const IconWrap = coords => <Preview coords={coords} />;

  const onPressItem = route => {
    setCurrentRoute(route);
    goToRoute();
  };

  const Footer = <Row {...mb20} />;

  const renderItem = ({item}) => (
    <Row {...mt20}>
      <Item
        style={styleItemRoute}
        onPress={() => onPressItem(item)}
        IconComponent={IconWrap(item.points)}
        text={`${item.distance} km`}
      />
    </Row>
  );

  return (
    <VirtualList
      refresh={{refreshing: isLoading, onRefresh}}
      renderItem={renderItem}
      Footer={Footer}
      items={mappedRoutes}
      initialNumToRender={10}
      keyExtractor={item => item.id}
    />
  );
};

export default observer(SavedRoutes);
