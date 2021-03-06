import React, {useState, useEffect} from 'react';
import {Text, View} from 'react-native';
import SavedRoutes from './SavedRoutes';
import SavedActivities from './SavedActivities';
import {Section} from '~/componets/section';
import {Touchable} from '~/componets/touchable';
import {Row, Column, Styles, mt20, mt10} from './styles';
import {ROUTE_TYPES} from '~/constants/constants';
import {useAuth} from '~/stores/auth';
import {useOnDefaultRoutes, useOnDefaultActivities, useOnShowMapIcons} from '~/hooks/use-on-effect';
import {useAppMode} from '~/stores/app-mode';
import {observer} from 'mobx-react-lite';
import {useNavigation} from '~/stores/navigation';
import {getLocaleStore} from '~/stores/locale';

const {papyrusify} = getLocaleStore();
const {ROUTE, ACTIVITY} = ROUTE_TYPES;

const SavedMode = ({themeStyle}) => {
  const {viewRouteMode, setViewRouteMode, isViewRouteMode} = useAppMode();
  const [buttonsHeight, setButtonsHeight] = useState(0);
  const {authorized} = useAuth();
  const {pushScreen} = useNavigation();
  useOnDefaultActivities({unmount: true});
  useOnDefaultRoutes({unmount: true});
  useOnShowMapIcons({mount: false});

  useEffect(() => {
    !authorized && setButtonsHeight(0);
  }, [authorized]);

  const goToRoute = () => {
    pushScreen({screenId: 'ViewRoute'});
  };

  const {styleSection} = Styles(themeStyle);
  const routeTypeBorder = type => (type === viewRouteMode ? themeStyle.accentColor : themeStyle.sectionColor);
  const changeRouteType = _routeType => setViewRouteMode(_routeType);

  const renderButton = ({title, type}) => (
    <>
      <Text style={styleSection}>{title}</Text>
      <Section width={130} borderColor={routeTypeBorder(type)} />
    </>
  );

  const onLayoutButtons = e => {
    setButtonsHeight(e?.nativeEvent?.layout?.height ?? 0);
  };

  const Buttons = authorized && (
    <View onLayout={onLayoutButtons}>
      <Row {...mt20}>
        <Column>
          <Touchable
            onPress={changeRouteType.bind(null, ACTIVITY)}
            Child={renderButton({title: papyrusify('savedMode.button.activities'), type: ACTIVITY})}
          />
        </Column>
        <Column>
          <Touchable
            onPress={changeRouteType.bind(null, ROUTE)}
            Child={renderButton({title: papyrusify('savedMode.button.routes'), type: ROUTE})}
          />
        </Column>
      </Row>
    </View>
  );
  const List = (
    <Row paddingBottom={buttonsHeight * 2} {...mt10}>
      {isViewRouteMode ? (
        <SavedRoutes goToRoute={goToRoute} themeStyle={themeStyle} />
      ) : (
        <SavedActivities goToRoute={goToRoute} themeStyle={themeStyle} />
      )}
    </Row>
  );

  return (
    <>
      {Buttons}
      {List}
    </>
  );
};

export default observer(SavedMode);
