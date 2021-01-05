import React from 'react';
import {Row, SectionWrap} from './styles';

const Section = ({width, borderColor}) => (
  <Row>
    <SectionWrap borderColor={borderColor} width={width} />
  </Row>
);

export default Section;
