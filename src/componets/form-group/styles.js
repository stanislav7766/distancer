export {Row, Column, Form, mx0, mt10} from '../../constants/styles';

export const Styles = themeStyle => {
  const headerSettingsStyle = {
    fontSize: 18,
    color: themeStyle.textColorSecondary,
  };
  const groupTextStyle = {
    fontSize: 18,
    color: themeStyle.textColorSecondary,
  };
  return {headerSettingsStyle, groupTextStyle};
};

export const mb30 = {
  marginBottom: 30,
};
