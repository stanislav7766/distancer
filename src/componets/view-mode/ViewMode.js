import React, {Fragment, useContext} from 'react';
import {mapContext, modalContext, placesContext, routeContext} from '../../contexts/contexts';
import {Groove} from '../../contexts/Groove';
import RoundedIcon from '../rounded-icon/RoundedIcon';
import TextInput from '../text-input/TextInput';
import Item from '../item/Item';
import IconMarker from '../svg-icons/icon-marker/IconMarker';
import IconLeftArrow from '../svg-icons/icon-left-arrow/IconLeftArrow';
import {Fetch} from '../../utils/geolocation';
import {isFilledArr} from '../../utils/isFilledArr';
import {Row, Column, Styles} from './styles';
import {CITY_NOT_FOUND, CHOOSE_YOUR_LOCATION, TYPE_CITY} from '../../constants/constants';

const ViewMode = ({themeStyle, closeModal, openModal}) => {
  const {cameraRef, zoomLevel} = useContext(mapContext);
  const {moveToCurrPosition, moveCamera} = Groove(cameraRef);
  const {currentRoute, setCurrentRoute} = useContext(routeContext);
  const {expanded} = useContext(modalContext);
  const {places, setPlaces} = useContext(placesContext);

  const {styleItem, arrowIconDims, inputStyle} = Styles(themeStyle);

  const IconMarkerWrap = <IconMarker width={24} height={32} fill={themeStyle.accentColor} />;
  const IconLeftArrowWrap = <IconLeftArrow width={30} height={33} fill={themeStyle.accentColor} />;

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
          <Row key={i} marginTop={20}>
            <Item
              style={styleItem}
              onPress={() => el.text !== CITY_NOT_FOUND && onPressItem(el)}
              IconComponent={IconMarkerWrap}
              text={el.text}
            />
          </Row>
        ))}
      <Row marginTop={20}>
        <Item
          style={styleItem}
          onPress={onCurrentLocation}
          IconComponent={IconMarkerWrap}
          text={CHOOSE_YOUR_LOCATION}
        />
      </Row>
    </Fragment>
  );

  const ExpandedModal = (
    <Row>
      <Column alignItems={'flex-start'}>
        <RoundedIcon style={arrowIconDims} IconComponent={IconLeftArrowWrap} onPress={closeModal} />
      </Column>
    </Row>
  );

  return (
    <Fragment>
      {expanded && ExpandedModal}
      <Row marginTop={10}>
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
