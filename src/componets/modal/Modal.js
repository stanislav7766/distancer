import React, {useState, useContext} from 'react';
import {Dimensions, Keyboard, Animated, View} from 'react-native';
import {modalContext, themeContext, placesContext, appModeContext} from '../../contexts/contexts';
import DrawRoute from '../draw-route/DrawRoute';
import ViewRoute from '../view-route/ViewRoute';
import BasicView from '../basic-view/BasicView';
import {ModalStyle, Container} from './styles';
import {APP_MODE} from '../../constants/constants';

const {VIEW_ROUTE, BASIC_VIEW, DRAW_ROUTE} = APP_MODE;
const {height} = Dimensions.get('window');

const Modal = () => {
  const {setDefaultPlaces} = useContext(placesContext);
  const {theme, getThemeStyle} = useContext(themeContext);
  const {appMode} = useContext(appModeContext);
  const {setExpanded} = useContext(modalContext);
  const themeStyle = getThemeStyle(theme);
  const collapsedModalHeight = height - 150;

  const [modalY] = useState(new Animated.Value(collapsedModalHeight));

  const openModal = () => {
    setExpanded(true);
    Animated.timing(modalY, {
      duration: 300,
      toValue: height * 0.15,
      useNativeDriver: true,
    }).start();
  };

  const closeModal = () => {
    setDefaultPlaces();
    setExpanded(false);
    Keyboard.dismiss();
    Animated.timing(modalY, {
      duration: 300,
      toValue: collapsedModalHeight,
      useNativeDriver: true,
    }).start();
  };

  const appModeCall = mode =>
    ({
      [DRAW_ROUTE]: <DrawRoute themeStyle={themeStyle} />,
      [VIEW_ROUTE]: <ViewRoute themeStyle={themeStyle} />,
      [BASIC_VIEW]: <BasicView themeStyle={themeStyle} closeModal={closeModal} openModal={openModal} />,
    }[mode]);

  const Body = appModeCall(appMode);
  return (
    <Container>
      <Animated.View style={{transform: [{translateY: modalY}]}}>
        <ModalStyle backgroundColor={themeStyle.backgroundColor}>
          <View style={{height: collapsedModalHeight}}>{Body}</View>
        </ModalStyle>
      </Animated.View>
    </Container>
  );
};
export default Modal;
