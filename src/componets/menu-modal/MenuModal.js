import React, {useContext} from 'react';
import {TouchableWithoutFeedback, Modal} from 'react-native';
import {modalContext, themeContext} from '../../contexts/contexts';
import RoundedIcon from '../rounded-icon/RoundedIcon';
import Item from '../item/Item';
import IconDot from '../svg-icons/icon-dot/IconDot';
import IconTheme from '../svg-icons/icon-theme/IconTheme';
import {Container, Wrap, ModalStyle, Styles} from './styles';
import {THEMES} from '../../constants/constants';

const MenuModal = ({navigator}) => {
  const {theme, getThemeStyle, setTheme} = useContext(themeContext);
  const {shownMenu, setShownMenu} = useContext(modalContext);
  const themeStyle = getThemeStyle(theme);

  const IconDotWrap = <IconDot width={16} height={16} fill={themeStyle.accentColor} />;
  const IconThemeWrap = <IconTheme width={25} height={25} fill={themeStyle.accentColor} />;
  const {styleIcon, styleItem} = Styles(themeStyle);

  const hideModal = () => setShownMenu(false);
  const onPressTheme = () => setTheme(theme === THEMES.LIGHT ? THEMES.DARK : THEMES.LIGHT);
  const onPressRoutes = () => {
    if (navigator.stack.slice(-1)[0].screen !== 'Routes') {
      hideModal();
      navigator.push('Routes', {}, {animation: 'bottom'});
    }
  };

  return (
    <Container>
      <Modal transparent={true} animationType="fade" visible={shownMenu}>
        <TouchableWithoutFeedback onPress={hideModal}>
          <Container backgroundColor="rgba(15, 15, 15, 0.425)">
            <ModalStyle backgroundColor={themeStyle.backgroundColor} width={modalDims.width} height={modalDims.height}>
              <RoundedIcon style={styleIcon} onPress={onPressTheme} IconComponent={IconThemeWrap} />
              <Wrap>
                <Item style={styleItem} onPress={onPressRoutes} IconComponent={IconDotWrap} text={'Routes'} />
              </Wrap>
              <Wrap>
                <Item style={styleItem} IconComponent={IconDotWrap} text={'Import Route'} />
              </Wrap>
              <Wrap>
                <Item style={styleItem} IconComponent={IconDotWrap} text={'Export All'} />
              </Wrap>
            </ModalStyle>
          </Container>
        </TouchableWithoutFeedback>
      </Modal>
    </Container>
  );
};
const modalDims = {
  width: 280,
  height: 280,
};

export default MenuModal;
