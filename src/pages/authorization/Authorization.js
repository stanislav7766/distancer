import React from 'react';
import {SignIn, SignUp} from '~/componets/sign';
import {CenterXY, Container} from './styles';
import {useTheme} from '~/stores/theme';
import {useNavigation} from '~/stores/navigation';
import {observer} from 'mobx-react-lite';

const Authorization = ({type}) => {
  const {themeStyle} = useTheme();
  const {popScreen, resetScreen} = useNavigation();

  const goToMain = () => {
    popScreen();
  };
  const goToProfile = () => {
    resetScreen({screenId: 'EditProfile', screenProps: {withNewUser: true}});
  };

  const signModeCall = mode =>
    ({
      ['signIn']: <SignIn goToMain={goToMain} themeStyle={themeStyle} />,
      ['signUp']: <SignUp goToProfile={goToProfile} goBack={goToMain} themeStyle={themeStyle} />,
    }[mode]);
  const Sign = signModeCall(type);
  return (
    <Container backgroundColor={themeStyle.backgroundColor}>
      <CenterXY>{Sign}</CenterXY>
    </Container>
  );
};

export default observer(Authorization);
