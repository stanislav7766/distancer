export {Row, Column, mt10} from '~/constants/styles';

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

  const styleSection = {
    color: themeStyle.textColorSecondary,
    fontSize: 20,
    textAlign: 'center',
  };

  return {
    styleItem,
    styleItemRoute,
    styleSection,
  };
};

export const mt20 = {
  marginTop: 20,
};

export const mb20 = {
  marginTop: 20,
};

export const spinnerStyle = {
  height: 80,
  width: 80,
  alignSelf: 'center',
};
