import React from 'react';
import SignIn from '../../componets/sign/SignIn';
import SignUp from '../../componets/sign/SignUp';
import {CenterXY, Container} from './styles';
import {useTheme} from '../../stores/theme';
import {observer} from 'mobx-react-lite';

const Authorization = ({navigator, type}) => {
  const {themeStyle} = useTheme();

  const goToMain = () => {
    navigator.pop({animation: 'left'});
  };
  const goToProfile = () => {
    navigator.push('EditProfile', {}, {animation: 'right'});
  };
  const SignInComponent = <SignIn goToMain={goToMain} themeStyle={themeStyle} />;
  const SignUpComponent = <SignUp goToMain={goToProfile} goBack={goToMain} themeStyle={themeStyle} />;
  const signModeCall = mode =>
    ({
      ['signIn']: SignInComponent,
      ['signUp']: SignUpComponent,
    }[mode]);
  const Sign = signModeCall(type);
  return (
    <Container backgroundColor={themeStyle.backgroundColor}>
      <CenterXY>{Sign}</CenterXY>
    </Container>
  );
};

export default observer(Authorization);
