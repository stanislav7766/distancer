export {Row, Column, mt10, mx0} from '~/constants/styles';

export const Styles = themeStyle => {
  const styleItemActivity = {
    flexIcon: 0.3,
    backgroundColor: themeStyle.backgroundColorSecondary,
    textColor: themeStyle.textColorSecondary,
    height: 50,
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
    styleItemActivity,
    styleFormHeaderDate,
    styleFormHeaderInfo,
    styleSection,
  };
};

export const mt20 = {
  marginTop: 20,
};

export const mb20 = {
  marginTop: 20,
};
export const flex0 = {
  flex: 0,
};
