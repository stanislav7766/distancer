export {Row, Column, mt10} from '../../constants/styles';

export const Styles = themeStyle => {
  const styleItem = {
    flexIcon: 0.3,
    backgroundColor: themeStyle.backgroundColorSecondary,
    textColor: themeStyle.textColorSecondary,
    height: 50,
  };
  const styleItemRoute = {
    ...styleItem,
    height: 50,
  };
  const styleItemActivity = {
    ...styleItem,
    fontSize: 12,
  };

  const styleSection = {
    color: themeStyle.textColorSecondary,
    fontSize: 18,
    textAlign: 'center',
  };

  const styleFormHeaderDate = {
    color: themeStyle.textColorSecondary,
    fontSize: 15,
  };
  const styleFormHeaderInfo = {
    color: themeStyle.textColorSecondary,
    fontSize: 12,
  };

  return {
    styleItem,
    styleItemRoute,
    styleItemActivity,
    styleFormHeaderDate,
    styleFormHeaderInfo,
    styleSection,
  };
};

export const mt20 = {
  marginTop: 20,
};
