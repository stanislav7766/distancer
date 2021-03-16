import {StyleSheet} from 'react-native';

export const Styles = themeStyle => {
  const savedIcon = {
    position: 'relative',
    backgroundColor: themeStyle.backgroundColorSecondary,
    elevation: 7,
    marginRight: 10,
  };

  const continueIcon = {
    position: 'relative',
    backgroundColor: themeStyle.backgroundColorSecondary,
    elevation: 7,
  };

  return {savedIcon, continueIcon};
};

export const styles = StyleSheet.create({
  styleActions: {
    flexDirection: 'row',
    backgroundColor: 'transparent',
  },
});
