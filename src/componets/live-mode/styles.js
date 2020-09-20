export {Row, Column} from '../../constants/styles';

export const Styles = themeStyle => {
  const btnDims = {
    width: 155,
    height: 46,
    color: '#fff',
    backgroundColor: themeStyle.accentColor,
  };
  const btnPauseDims = {
    width: 155,
    height: 46,
    color: '#fff',
    backgroundColor: '#F6A444',
  };
  const btnContinueDims = {
    width: 155,
    height: 46,
    color: '#fff',
    backgroundColor: '#BFE3A5',
  };
  const liveInfoDims = {
    width: 155,
    height: 96,
    color: '#fff',
    backgroundColor: themeStyle.accentColor,
  };

  return {btnDims, btnPauseDims, btnContinueDims, liveInfoDims};
};
