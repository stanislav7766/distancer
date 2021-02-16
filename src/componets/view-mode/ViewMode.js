import React, {useState} from 'react';
import {Keyboard} from 'react-native';
import {useLocationPosition} from '~/hooks/use-location-position';
import {RoundedIcon} from '~/componets/rounded-icon';
import {TextInput} from '~/componets/text-input';
import {Item} from '~/componets/item';
import useSvgFactory from '~/hooks/use-svg-factory';
import {useMap} from '~/stores/map';
import {getMarker} from '~/assets/svg-icons/marker';
import {getLeftArrow} from '~/assets/svg-icons/left-arrow';
import {FetchCities} from '~/utils/fetch-helpers/fetch-city';
import {isFilledArr} from '~/utils/validation/helpers';
import {useOnIsDirectionsMode, useOnShowMapIcons} from '~/hooks/use-on-effect';
import {Row, Column, Styles, mt20, mt10} from './styles';
import {CITY_NOT_FOUND, CHOOSE_YOUR_LOCATION, TYPE_CITY, ERROR_OCCURRED} from '~/constants/constants';
import {observer} from 'mobx-react-lite';
import Toast from 'react-native-simple-toast';

const ViewMode = ({themeStyle, closeModal, openModal}) => {
  const {cameraRef, zoomLevel, setShowMapIcons} = useMap();
  const {moveToCurrPosition, moveCamera} = useLocationPosition(cameraRef);
  const [places, setPlaces] = useState([]);
  const [expanded, setExpanded] = useState(false);

  const {styleItem, arrowIconDims, inputStyle} = Styles(themeStyle);

  useOnIsDirectionsMode({mount: false});
  useOnShowMapIcons({mount: true});

  const IconMarker = useSvgFactory(getMarker, {width: 24, height: 32, fillAccent: themeStyle.accentColor});
  const IconLeftArrow = useSvgFactory(getLeftArrow, {width: 30, height: 33, fillAccent: themeStyle.accentColor});
  const [city, setCity] = useState({
    name: '',
    centerCoordinate: [],
  });

  const onCloseModal = () => {
    setExpanded(false);
    Keyboard.dismiss();
    closeModal();
    setShowMapIcons(true);
  };
  const onOpenModal = () => {
    setExpanded(true);
    setShowMapIcons(false);
    openModal();
  };

  const onPressItem = ({text: name, center: centerCoords}) => {
    setCity({
      name,
      centerCoords,
    });
    onCloseModal();
    moveCamera({zoomLevel, centerCoordinate: centerCoords});
  };

  const onCurrentLocation = () => {
    onCloseModal();
    moveToCurrPosition(zoomLevel);
  };
  const onChangeText = text => setCity(old => ({...old, name: text}));

  const onSubmitEditing = async () => {
    try {
      const [res, err] = await FetchCities(city.name);
      setPlaces(err === '' ? res : [{text: CITY_NOT_FOUND}]);
    } catch (error) {
      Toast.show(ERROR_OCCURRED);
    }
  };

  const InputVariants = (
    <>
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
    </>
  );

  const ExpandedModal = (
    <Row>
      <Column alignItems={'flex-start'}>
        <RoundedIcon style={arrowIconDims} IconComponent={IconLeftArrow} onPress={onCloseModal} />
      </Column>
    </Row>
  );

  return (
    <>
      {expanded && ExpandedModal}
      <Row {...mt10}>
        <TextInput
          style={inputStyle}
          placeholder={TYPE_CITY}
          value={city?.name}
          onSubmitEditing={onSubmitEditing}
          openModal={onOpenModal}
          closeModal={onCloseModal}
          onChangeText={onChangeText}
        />
      </Row>
      {expanded && InputVariants}
    </>
  );
};

export default observer(ViewMode);
