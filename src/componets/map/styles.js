export const styleContainer = {
  height: 300,
  width: 300,
};
export const styleMap = {
  flex: 1,
};

export const Styles = (themeStyle, height) => {
  const styleGpsIcon = {
    right: 10,
    bottom: height * 0.35,
    backgroundColor: themeStyle.backgroundColorSecondary,
  };
  const styleInfoIcon = {
    left: 10,
    bottom: height * 0.35,
    backgroundColor: themeStyle.backgroundColorSecondary,
  };
  const styleMenuIcon = {
    left: 10,
    top: 10,
    backgroundColor: themeStyle.backgroundColorSecondary,
  };
  const styleCancelIcon = {
    right: 10,
    top: 10,
    backgroundColor: themeStyle.backgroundColorSecondary,
  };
  return {styleCancelIcon, styleGpsIcon, styleInfoIcon, styleMenuIcon};
};
