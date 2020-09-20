import React, {useContext} from 'react';
import Btn from '../btn/Btn';
import {appModeContext} from '../../contexts/contexts';
import {Row, Column, Styles} from './styles';
import {Form} from '../../constants/styles';
import WithActions from '../with-actions/WithActions';
import {logoutUser as _logoutUser} from '../../actions';
import Toast from 'react-native-simple-toast';
import {NO_CURRENT_USER} from '../../constants/constants';

const Authorized = ({themeStyle, navigator, setDefaultAuth, logoutUser}) => {
  const {auth} = useContext(appModeContext);
  const {btnDims, bgRed} = Styles(themeStyle);

  const onPressLogout = () => {
    logoutUser({payload: {userId: auth.userId}})
      .then(({success, reason}) => {
        if (!success) {
          Toast.show(reason);
          return;
        }
        setDefaultAuth();
      })
      .catch(err => {
        err === NO_CURRENT_USER ? setDefaultAuth() : Toast.show(err);
      });
  };

  const UserInfoGroup = (
    <Form backgroundColor={themeStyle.backgroundColor}>
      <Row>
        <Column alignItems={'flex-end'}>
          <Btn onPress={onPressLogout} style={{...btnDims, ...bgRed}} title={'logoutUser'} />
        </Column>
      </Row>
    </Form>
  );

  return <Row marginTop={10}>{UserInfoGroup}</Row>;
};

const mapDispatchToProps = {
  logoutUser: _logoutUser,
};
export default WithActions(mapDispatchToProps)(Authorized);
