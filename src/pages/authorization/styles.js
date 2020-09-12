import styled from 'styled-components';
export {Row} from '../../constants/styles';

export const Container = styled.View`
  width: 100%;
  height: 100%;
  background-color: ${props => props.backgroundColor || '#fff'};
`;

export const CenterXY = styled.View`
  margin-right: 10px;
  margin-left: 10px;
  flex: 1;
  justify-content: center;
  align-items: center;
`;
