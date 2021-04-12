import React, {useCallback, useState} from 'react';
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
import {observer} from 'mobx-react-lite';
import Toast from 'react-native-simple-toast';
import {getLocaleStore} from '~/stores/locale';
import {debounce} from '~/utils/common-helpers/fun-helpers';

const {papyrusify} = getLocaleStore();

const ViewMode = ({themeStyle, closeModal, openModal}) => {
  const {zoomLevel, setShowMapIcons} = useMap();
  const {moveToCurrPosition, moveCamera} = useLocationPosition();
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
  const onChangeText = text => {
    setCity(old => ({...old, name: text}));
    debouncedSave(text);
  };

  const onDebounce = async query => {
    try {
      const [res, err] = await FetchCities(query);
      setPlaces(err === '' ? res : [{text: papyrusify('viewMode.message.cityNotFound')}]);
    } catch (error) {
      Toast.show(papyrusify('common.message.errorOccurred'));
    }
  };

  const onSubmitEditing = async () => {
    try {
      const [res, err] = await FetchCities(city.name);
      setPlaces(err === '' ? res : [{text: papyrusify('viewMode.message.cityNotFound')}]);
    } catch (error) {
      Toast.show(papyrusify('common.message.errorOccurred'));
    }
  };

  const debouncedSave = useCallback(debounce(onDebounce, 1000), []);

  const InputVariants = (
    <>
      {isFilledArr(places) &&
        places.map((el, i) => (
          <Row key={i} {...mt20}>
            <Item
              style={styleItem}
              IconComponent={IconMarker}
              text={el.text}
              {...(el.text !== papyrusify('viewMode.message.cityNotFound') ? {onPress: () => onPressItem(el)} : {})}
            />
          </Row>
        ))}
      <Row {...mt20}>
        <Item
          style={styleItem}
          onPress={onCurrentLocation}
          IconComponent={IconMarker}
          text={papyrusify('viewMode.message.chooseYourLocation')}
        />
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
          placeholder={papyrusify('viewMode.input.typeCity')}
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
