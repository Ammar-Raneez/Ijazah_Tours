import {
  ChangeEvent,
  MouseEvent,
  useEffect,
  useState,
} from 'react';
import { useHistory } from 'react-router-dom';
import { FormControl, InputLabel } from '@material-ui/core';
import ChevronLeftRoundedIcon from '@material-ui/icons/ChevronLeftRounded';
import { doc, setDoc } from 'firebase/firestore';
import { v4 as uuid } from 'uuid';

import AccomodationRatesContainer from '../../../organisms/library/accomodation/AccomodationRatesContainer';
import FormControlInput from '../../../molecules/FormControlInput';
import CheckboxGroup from '../../../molecules/CheckboxGroup';
import DivAtom from '../../../atoms/DivAtom';
import H2Atom from '../../../atoms/H2Atom';
import ButtonAtom from '../../../atoms/ButtonAtom';
import IconAtom from '../../../atoms/IconAtom';
import ParagraphAtom from '../../../atoms/ParagraphAtom';
import InputAtom from '../../../atoms/InputAtom';
import { db } from '../../../firebase';
import { formCreateMemberStyles } from '../../../styles';

function CreateAccomodation() {
  const [name, setName] = useState('');
  const [group, setGroup] = useState('');
  const [location, setLocation] = useState('');
  const [city, setCity] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [email, setEmail] = useState('');
  const [webLink, setWebLink] = useState('');
  const [ijazahLink, setIjazahLink] = useState('');

  const [roomCategories, setRoomCategories] = useState(new Array(3).fill(false));
  const [roomViews, setRoomViews] = useState(new Array(3).fill(false));
  const [roomGradings, setRoomGradings] = useState(new Array(3).fill(false));

  const allRoomTypes = [
    'Cilantro Suite',
    'Executive Room',
    'Premium Room',
  ];

  const allRoomViews = [
    'Cilantro Suite',
    'Executive Room',
    'Premium Room',
  ];

  const allRoomGradings = [
    '5 Star',
    '2 Star',
    '3 Star',
  ];

  const [selectedTypes, setSelectedTypes] = useState(new Array(3).fill(undefined));
  const [selectedTypeValues, setSelectedTypeValues] = useState(
    Object.fromEntries(
      allRoomTypes.map((type: string) => [type, '']),
    ),
  );

  const [rateData, setRateData] = useState<any>([]);
  const [newRateStart, setNewRateStart] = useState('');
  const [newRateEnd, setNewRateEnd] = useState('');
  const [newMealPlan, setNewMealPlan] = useState('');
  const [newSinglePrice, setNewSinglePrice] = useState('');
  const [newDoublePrice, setNewDoublePrice] = useState('');
  const [newTriplePrice, setNewTriplePrice] = useState('');

  const [width, setWidth] = useState(0);
  const history = useHistory();

  useEffect(() => {
    setWidth(window.innerWidth);
    const widthListener = window.addEventListener('resize', () => {
      setWidth(window.innerWidth);
    });

    const removeEventListeners = () => {
      window.removeEventListener('resize', widthListener as any);
    };

    return removeEventListeners();
  }, [width]);

  const onAddAccomodation = async () => {
    await setDoc(doc(db, 'Library Accomodation', uuid()), {
      name,
      group,
      location,
      city,
      email,
      webLink,
      ijazahLink,
      gradings: roomGradings,
      views: roomViews,
      categories: roomCategories,
      categoryValues: selectedTypeValues,
      tel: contactNumber,
      rates: rateData,
    });
  };

  const onCreateRate = (
    event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>,
  ) => {
    event.preventDefault();
    setRateData([
      ...rateData,
      {
        newRateStart,
        newRateEnd,
        newMealPlan,
        newSinglePrice,
        newDoublePrice,
        newTriplePrice,
      },
    ]);

    setNewMealPlan('');
    setNewSinglePrice('');
    setNewDoublePrice('');
    setNewTriplePrice('');
  };

  const addRoomGradings = (i: number) => {
    const updatedGradings = roomGradings.map((lang, index) => (index === i ? !lang : lang));
    setRoomGradings(updatedGradings);
  };

  const addRoomView = (i: number) => {
    const updatedViews = roomViews.map((lang, index) => (index === i ? !lang : lang));
    setRoomViews(updatedViews);
  };

  const addRoomCategory = (i: number) => {
    const updatedCategories = roomCategories.map((lang, index) => (index === i ? !lang : lang));
    setRoomCategories(updatedCategories);

    const updatedSelectedTypes = allRoomTypes.filter((label: string, index: number) => (
      updatedCategories[index] && label
    ));

    setSelectedTypes(updatedSelectedTypes);
  };

  const onSetSelectedTypeValue = (type: string, val: string) => {
    const updatedSelectedTypeValues = { ...selectedTypeValues, [type]: val };
    setSelectedTypeValues(updatedSelectedTypeValues);
  };

  return (
    <DivAtom>
      <DivAtom style={formCreateMemberStyles.header}>
        <IconAtom
          size="small"
          children={<ChevronLeftRoundedIcon />}
          style={formCreateMemberStyles.backBtn}
          onClick={() => history.replace('/library/accomodation')}
        />
        <H2Atom
          style={formCreateMemberStyles.title}
          text="Create Accomodation"
        />
      </DivAtom>

      <DivAtom style={formCreateMemberStyles.formContainer}>
        <DivAtom
          style={{
            ...formCreateMemberStyles.multiFieldContainer,
            flexDirection: width < 600 ? 'column' : 'row',
          }}
        >
          <FormControlInput
            margin={width < 600 ? '0 0 1rem 0' : '0 1rem 1rem 0'}
            flex={1}
            label="Location"
            fullWidth
            multiline={false}
            rows={1}
            value={location}
            setValue={setLocation}
            placeholder="Enter Location"
          />
          <FormControlInput
            margin="0 0 1rem 0"
            flex={1}
            label="City"
            fullWidth
            multiline={false}
            rows={1}
            value={city}
            setValue={setCity}
            placeholder="Enter City"
          />
        </DivAtom>
        <DivAtom
          style={{
            ...formCreateMemberStyles.multiFieldContainer,
            flexDirection: width < 600 ? 'column' : 'row',
          }}
        >
          <FormControlInput
            margin={width < 600 ? '0 0 1rem 0' : '0 1rem 1rem 0'}
            flex={1}
            label="Group"
            fullWidth
            multiline={false}
            rows={1}
            value={group}
            setValue={setGroup}
            placeholder="Enter Group"
          />
          <FormControlInput
            margin="0 0 1rem 0"
            flex={1}
            label="Name"
            fullWidth
            multiline={false}
            rows={1}
            value={name}
            setValue={setName}
            placeholder="Enter Name"
          />
        </DivAtom>
        <DivAtom
          style={{
            ...formCreateMemberStyles.multiFieldContainer,
            flexDirection: width < 600 ? 'column' : 'row',
          }}
        >
          <FormControlInput
            margin={width < 600 ? '0 0 1rem 0' : '0 1rem 1rem 0'}
            flex={1}
            label="Contact Number"
            fullWidth
            multiline={false}
            rows={1}
            value={contactNumber}
            setValue={setContactNumber}
            placeholder="Enter Contact Number"
          />
          <FormControlInput
            margin="0 0 1rem 0"
            flex={1}
            label="Email"
            fullWidth
            multiline={false}
            rows={1}
            value={email}
            setValue={setEmail}
            placeholder="Enter Email"
          />
        </DivAtom>
        <DivAtom
          style={{
            ...formCreateMemberStyles.multiFieldContainer,
            flexDirection: width < 600 ? 'column' : 'row',
          }}
        >
          <FormControlInput
            margin={width < 600 ? '0 0 1rem 0' : '0 1rem 1rem 0'}
            flex={1}
            label="Web Link"
            fullWidth
            multiline={false}
            rows={1}
            value={webLink}
            setValue={setWebLink}
            placeholder="Enter Web Link"
          />
          <FormControlInput
            margin="0 0 1rem 0"
            flex={1}
            label="Ijazah Link"
            fullWidth
            multiline={false}
            rows={1}
            value={ijazahLink}
            setValue={setIjazahLink}
            placeholder="Enter Ijazah Link"
          />
        </DivAtom>

        <DivAtom
          style={{
            ...formCreateMemberStyles.multiFieldContainer,
            flexDirection: width < 600 ? 'column' : 'row',
            justifyContent: 'flex-start',
            marginTop: '0.8rem',
          }}
        >
          <CheckboxGroup
            grouptitle="Room Categories"
            labels={allRoomTypes}
            names={['cilantro-suite', 'executive-room', 'premium-room']}
            checked={roomCategories}
            onChange={(_, i: number) => addRoomCategory(i)}
            style={{ flexDirection: 'column', marginBottom: '1rem' }}
          />
          <CheckboxGroup
            grouptitle="Room View"
            labels={allRoomViews}
            names={['cilantro-suite', 'executive-room', 'premium-room']}
            checked={roomViews}
            onChange={(_, i: number) => addRoomView(i)}
            style={{ flexDirection: 'column', marginBottom: '1rem' }}
          />
          <CheckboxGroup
            grouptitle="Gradings"
            labels={allRoomGradings}
            names={['five', 'four', 'three']}
            checked={roomGradings}
            onChange={(_, i: number) => addRoomGradings(i)}
            style={{
              flexDirection: 'column',
            }}
          />
        </DivAtom>

        <AccomodationRatesContainer
          width={width}
          newRateStart={newRateStart}
          newRateEnd={newRateEnd}
          newMealPlan={newMealPlan}
          newSinglePrice={newSinglePrice}
          newDoublePrice={newDoublePrice}
          newTriplePrice={newTriplePrice}
          setNewRateStart={setNewRateStart}
          setNewRateEnd={setNewRateEnd}
          setNewMealPlan={setNewMealPlan}
          setNewSinglePrice={setNewSinglePrice}
          setNewDoublePrice={setNewDoublePrice}
          setNewTriplePrice={setNewTriplePrice}
          rateData={rateData}
          onCreateRate={onCreateRate}
        />

        {(selectedTypes[0] || selectedTypes[1] || selectedTypes[2]) && selectedTypes.map((type, ind) => (
          <DivAtom
            key={ind}
            style={{
              ...formCreateMemberStyles.multiFieldContainer,
              flexDirection: width < 600 ? 'column' : 'row',
              justifyContent: 'flex-start',
              marginTop: '0.8rem',
            }}
          >
            <ParagraphAtom style={{ width: '150px' }} text={type} />
            <FormControl style={{ margin: '0 0 1rem 1rem' }}>
              <InputLabel>Price</InputLabel>
              <InputAtom
                plain="true"
                fullWidth
                multiline={false}
                rows={1}
                value={selectedTypeValues[type]}
                onChange={(e: ChangeEvent<HTMLInputElement>) => onSetSelectedTypeValue(type, e.target.value)}
                placeholder="Enter Price"
              />
            </FormControl>
          </DivAtom>
        ))}
      </DivAtom>

      <DivAtom
        style={{
          ...formCreateMemberStyles.addBtnContainer,
          padding: width < 768 ? '1rem' : '0px',
          margin:
            width < 768 ? '0px' : formCreateMemberStyles.addBtnContainer.margin,
        }}
      >
        <ButtonAtom
          size="large"
          text="Create"
          onClick={onAddAccomodation}
          style={{
            ...formCreateMemberStyles.addBtn,
            width: width < 768 ? '100%' : '18%',
            margin: width < 768 ? '0 0 1rem 0' : '0px',
          }}
        />
      </DivAtom>
    </DivAtom>
  );
}

export default CreateAccomodation;
