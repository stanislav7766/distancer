import React, {useContext} from 'react';
import {themeContext} from '../../contexts/contexts';
import SignIn from '../../componets/sign/SignIn';
import SignUp from '../../componets/sign/SignUp';
import {CenterXY, Container} from './styles';

const Authorization = ({navigator, type}) => {
  const {theme, getThemeStyle} = useContext(themeContext);
  const themeStyle = getThemeStyle(theme);

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

export default Authorization;
