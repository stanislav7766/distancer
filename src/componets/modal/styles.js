import styled from 'styled-components';
export {Row, Column} from '../../constants/styles';
export const ModalStyle = styled.View`
  width: 100%;
  background-color: ${props => props.backgroundColor || '#fff'};
  border-radius: 15px;
`;

export const Container = styled.View`
  position: absolute;
  width: 100%;
  height: 100%;
`;
