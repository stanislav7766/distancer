import styled from 'styled-components';

export const Container = styled.View`
  width: 100%;
  height: 100%;
  position: absolute;
  background-color: transparent;
`;
export const CenterXY = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const Form = styled.View`
  flex-direction: row;
  padding: 10px;
  width: ${props => props.width + 'px' || '100%'};
  border-radius: 15px;
  justify-content: center;
  background-color: ${props => props.backgroundColor || '#fff'};
  elevation: 7;
`;
export const checkWrap = {
  position: 'absolute',
  zIndex: 100,
  top: 10,
  right: 10,
};
