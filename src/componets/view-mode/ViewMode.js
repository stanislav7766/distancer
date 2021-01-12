import React, {Fragment, useContext, useState} from 'react';
import {mapContext, modalContext, routeContext} from '../../contexts/contexts';
import {Groove} from '../../contexts/Groove';
import RoundedIcon from '../rounded-icon/RoundedIcon';
import TextInput from '../text-input/TextInput';
import Item from '../item/Item';
import useSvgFactory from '../../hooks/use-svg-factory';
import {getMarker} from '../../assets/svg-icons/marker';
import {getLeftArrow} from '../../assets/svg-icons/left-arrow';
import {Fetch} from '../../utils/geolocation';
import {isFilledArr} from '../../utils/isFilledArr';
import {Row, Column, Styles, mt20, mt10} from './styles';
import {CITY_NOT_FOUND, CHOOSE_YOUR_LOCATION, TYPE_CITY} from '../../constants/constants';

const ViewMode = ({themeStyle, closeModal, openModal}) => {
  const {cameraRef, zoomLevel} = useContext(mapContext);
  const {moveToCurrPosition, moveCamera} = Groove(cameraRef);
  const {currentRoute, setCurrentRoute} = useContext(routeContext);
  const {expanded} = useContext(modalContext);
  const [places, setPlaces] = useState([]);

  const {styleItem, arrowIconDims, inputStyle} = Styles(themeStyle);

  const IconMarker = useSvgFactory(getMarker, {width: 24, height: 32, fillAccent: themeStyle.accentColor});
  const IconLeftArrow = useSvgFactory(getLeftArrow, {width: 30, height: 33, fillAccent: themeStyle.accentColor});
  const {city} = currentRoute;

  const onPressItem = ({text: name, center: centerCoords}) => {
    setCurrentRoute({
      city: {
        name,
        centerCoords,
      },
    });
    closeModal();
    moveCamera({zoomLevel, centerCoordinate: centerCoords});
  };

  const onCurrentLocation = () => {
    closeModal();
    moveToCurrPosition(zoomLevel);
  };
  const onChangeText = text => setCurrentRoute({city: {...city, name: text}});

  const onSubmitEditing = async () => {
    try {
      const [res, err] = await Fetch(city.name);
      setPlaces(err === '' ? res : [{text: CITY_NOT_FOUND}]);
    } catch (error) {
      console.log(error);
    }
  };

  const InputVariants = (
    <Fragment>
      {isFilledArr(places) &&
        places.map((el, i) => (
          <Row key={i} {...mt20}>
            <Item
              style={styleItem}
              onPress={() => el.text !== CITY_NOT_FOUND && onPressItem(el)}
              IconComponent={IconMarker}
              text={el.text}
            />
          </Row>
        ))}
      <Row {...mt20}>
        <Item style={styleItem} onPress={onCurrentLocation} IconComponent={IconMarker} text={CHOOSE_YOUR_LOCATION} />
      </Row>
    </Fragment>
  );

  const ExpandedModal = (
    <Row>
      <Column alignItems={'flex-start'}>
        <RoundedIcon style={arrowIconDims} IconComponent={IconLeftArrow} onPress={closeModal} />
      </Column>
    </Row>
  );

  return (
    <Fragment>
      {expanded && ExpandedModal}
      <Row {...mt10}>
        <TextInput
          style={inputStyle}
          placeholder={TYPE_CITY}
          value={city.name}
          onSubmitEditing={onSubmitEditing}
          openModal={openModal}
          closeModal={closeModal}
          onChangeText={onChangeText}
        />
      </Row>
      {expanded && InputVariants}
    </Fragment>
  );
};

export default ViewMode;
