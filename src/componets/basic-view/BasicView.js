import React, {Fragment, useContext} from 'react';
import {mapContext, modalContext, placesContext, appModeContext, routeContext} from '../../contexts/contexts';
import {Groove} from '../../contexts/Groove';
import RoundedIcon from '../rounded-icon/RoundedIcon';
import TextInput from '../text-input/TextInput';
import Item from '../item/Item';
import Btn from '../btn/Btn';
import IconMarker from '../svg-icons/icon-marker/IconMarker';
import IconLeftArrow from '../svg-icons/icon-left-arrow/IconLeftArrow';
import {Fetch} from '../../utils/geolocation';
import {isEmptyArr} from '../../utils/isEmptyArr';
import {Row, Column, Styles} from './styles';
import {APP_MODE, CITY_NOT_FOUND, CHOOSE_YOUR_LOCATION, TYPE_CITY, DRAW_ROUTE_BTN} from '../../constants/constants';

const {DRAW_ROUTE} = APP_MODE;

const BasicView = ({themeStyle, closeModal, openModal}) => {
  const {cameraRef, zoomLevel} = useContext(mapContext);
  const {moveToCurrPosition, moveCamera} = Groove(cameraRef);
  const {currentRoute, setCurrentRoute} = useContext(routeContext);
  const {setAppMode} = useContext(appModeContext);
  const {expanded} = useContext(modalContext);
  const {places, setPlaces} = useContext(placesContext);

  const {styleItem, arrowIconDims, inputStyle} = Styles(themeStyle);

  const IconMarkerWrap = <IconMarker width={24} height={32} fill={themeStyle.accentColor} />;
  const IconLeftArrowWrap = <IconLeftArrow width={30} height={33} fill={themeStyle.accentColor} />;

  const {city} = currentRoute;

  const onPressItem = ({text: name, center: centerCoords}) => {
    setCurrentRoute({
      ...currentRoute,
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
  const onPressDrawRoute = () => setAppMode(DRAW_ROUTE);
  const onChangeText = text => setCurrentRoute({...currentRoute, city: {...city, name: text}});

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
      {isEmptyArr(places) &&
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

  const NotExpandedModal = (
    <Row>
      <Column top={10}>
        <Btn
          onPress={onPressDrawRoute}
          width={'160px'}
          title={DRAW_ROUTE_BTN}
          backgroundColor={themeStyle.accentColor}
        />
      </Column>
    </Row>
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
      {expanded ? ExpandedModal : NotExpandedModal}
      <Row>
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

export default BasicView;
