export const Styles = (themeStyle, height) => {
  const styleCarIcon = {
    position: 'relative',
    left: 0,
    backgroundColor: 'transparent',
    elevation: 0,
  };
  const styleManIcon = {
    position: 'relative',
    backgroundColor: 'transparent',
    elevation: 0,
  };
  const styleBikeIcon = {
    position: 'relative',
    right: 0,
    backgroundColor: 'transparent',
    elevation: 0,
  };
  const styleDirections = {
    flexDirection: 'row',
    minWidth: 150,
    right: 10,
    top: 10,
    backgroundColor: themeStyle.backgroundColorSecondary,
  };

  return {styleBikeIcon, styleCarIcon, styleManIcon, styleDirections};
};
