import React from 'react';
import {Text} from 'react-native';
import {isFilledArr} from '../../utils/isFilledArr';
import {Row, Column, mx0, mb30, mt10, Form, Styles} from './styles';

const Item = ({item}) => (
  <Row {...mx0}>
    <Column alignItems="flex-start">{item?.Left}</Column>
    <Column alignItems="flex-end">{item?.Right}</Column>
  </Row>
);

export const FormGroup = ({items, themeStyle, title}) => {
  const {headerSettingsStyle} = Styles(themeStyle);

  const Header = <Text style={headerSettingsStyle}>{title}</Text>;
  const Items = isFilledArr(items) && items.map((item, i) => <Item key={i} item={item} />);

  return (
    <Row {...mb30} {...mt10}>
      <Form backgroundColor={themeStyle.backgroundColor}>
        <Row>{Header}</Row>
        <Row {...mt10}>
          <Column>{Items}</Column>
        </Row>
      </Form>
    </Row>
  );
};
