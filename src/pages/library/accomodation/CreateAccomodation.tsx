import {
  MouseEvent,
  useEffect,
  useState,
} from 'react';
import { useHistory } from 'react-router-dom';
import ChevronLeftRoundedIcon from '@material-ui/icons/ChevronLeftRounded';
import {
  doc,
  serverTimestamp,
  setDoc,
} from 'firebase/firestore';
import { v4 as uuid } from 'uuid';

import DivAtom from '../../../atoms/DivAtom';
import H2Atom from '../../../atoms/H2Atom';
import IconAtom from '../../../atoms/IconAtom';
import { db } from '../../../firebase';
import { AccomodationRate, SettingsRoomProperties } from '../../../utils/types';
import { formCreateMemberStyles } from '../../../styles';
import CreateEditAccomodationForm from '../../../organisms/library/accomodation/CreateEditAccomodationForm';

interface CreateAccomodationProps {
  isCreating: boolean;
  roomViewData: SettingsRoomProperties[];
  roomCategoriesData: SettingsRoomProperties[];
  roomGradingsData: SettingsRoomProperties[];
  setIsCreating: any;
}

function CreateAccomodation({
  isCreating,
  roomViewData,
  roomCategoriesData,
  roomGradingsData,
  setIsCreating,
}: CreateAccomodationProps) {
  const [name, setName] = useState('');
  const [group, setGroup] = useState('');
  const [location, setLocation] = useState('');
  const [city, setCity] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [email, setEmail] = useState('');
  const [webLink, setWebLink] = useState('');
  const [ijazahLink, setIjazahLink] = useState('');

  const [roomCategories, setRoomCategories] = useState<boolean[]>(
    new Array(roomCategoriesData.length).fill(false),
  );
  const [roomViews, setRoomViews] = useState<boolean[]>(
    new Array(roomViewData.length).fill(false),
  );
  const [roomGradings, setRoomGradings] = useState<boolean[]>(
    new Array(roomGradingsData.length).fill(false),
  );

  const [selectedTypes, setSelectedTypes] = useState<string[]>(
    new Array(roomCategoriesData.length).fill(undefined),
  );
  const [selectedTypeValues, setSelectedTypeValues] = useState<{ [k: string]: string; }>({});

  const [rateData, setRateData] = useState<AccomodationRate[]>([]);
  const [newRateStart, setNewRateStart] = useState('');
  const [newRateEnd, setNewRateEnd] = useState('');
  const [newMealPlan, setNewMealPlan] = useState('');
  const [newSinglePrice, setNewSinglePrice] = useState('');
  const [newDoublePrice, setNewDoublePrice] = useState('');
  const [newTriplePrice, setNewTriplePrice] = useState('');

  const [showValidationErrorMessage, setShowValidationErrorMessage] = useState(false);

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
    setShowValidationErrorMessage(false);
    if (name.trim() === '' || group.trim() === '' || location.trim() === ''
      || city.trim() === '' || contactNumber.trim() === '' || email.trim() === ''
      || webLink.trim() === '' || ijazahLink.trim() === '' || rateData.length === 0) {
      setShowValidationErrorMessage(true);
      return;
    }

    const views = [...roomViewData];
    views.forEach((v, i) => {
      v.checked = roomViews[i];
    });
    const gradings = [...roomGradingsData];
    gradings.forEach((v, i) => {
      v.checked = roomGradings[i];
    });

    setIsCreating(true);
    await setDoc(doc(db, 'Library Accomodation', uuid()), {
      name,
      group,
      city,
      email,
      webLink,
      ijazahLink,
      views,
      gradings,
      country: location,
      categoryValues: selectedTypeValues,
      tel: contactNumber,
      rates: rateData,
      createdAt: serverTimestamp(),
    });

    setIsCreating(false);
    clearInputs();
    history.replace('/library/accomodation');
  };

  const onCreateRate = (
    event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>,
  ) => {
    event.preventDefault();
    setRateData([
      ...rateData,
      {
        id: uuid(),
        newRateStart,
        newRateEnd,
        newMealPlan,
        newSinglePrice,
        newDoublePrice,
        newTriplePrice,
      },
    ]);

    clearRateInputs();
  };

  const deleteRate = (row: AccomodationRate) => {
    const updatedRateData = [...rateData];
    updatedRateData.splice(rateData.findIndex((val) => val.id === row.id), 1);
    setRateData(updatedRateData);
  };

  const clearRateInputs = () => {
    setNewMealPlan('');
    setNewSinglePrice('');
    setNewDoublePrice('');
    setNewTriplePrice('');
  };

  const clearInputs = () => {
    setName('');
    setGroup('');
    setLocation('');
    setCity('');
    setContactNumber('');
    setEmail('');
    setWebLink('');
    setIjazahLink('');
    clearRateInputs();
  };

  const addRoomGradings = (i: number) => {
    const updatedGradings = roomGradings.map((val, index) => (index === i ? !val : val));
    setRoomGradings(updatedGradings);
  };

  const addRoomView = (i: number) => {
    const updatedViews = roomViews.map((val, index) => (index === i ? !val : val));
    setRoomViews(updatedViews);
  };

  const addRoomCategory = (i: number) => {
    const updatedCategories = roomCategories.map((val, index) => (index === i ? !val : val));
    setRoomCategories(updatedCategories);

    const updatedSelectedTypes = roomCategoriesData.filter(({ val }, index: number) => (
      updatedCategories[index] && val
    ));

    setSelectedTypes(updatedSelectedTypes.map((type) => type.val));
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

      <CreateEditAccomodationForm
        rateData={rateData}
        allRoomTypes={roomCategoriesData}
        allRoomViews={roomViewData}
        allRoomGradings={roomGradingsData}
        isCreating={isCreating}
        deleteRate={(row: AccomodationRate) => deleteRate(row)}
        showValidationErrorMessage={showValidationErrorMessage}
        width={width}
        btnText="Create"
        location={location}
        city={city}
        group={group}
        name={name}
        contactNumber={contactNumber}
        email={email}
        webLink={webLink}
        ijazahLink={ijazahLink}
        newRateStart={newRateStart}
        newRateEnd={newRateEnd}
        newMealPlan={newMealPlan}
        newSinglePrice={newSinglePrice}
        newDoublePrice={newDoublePrice}
        newTriplePrice={newTriplePrice}
        selectedTypes={selectedTypes}
        roomCategories={roomCategories}
        roomViews={roomViews}
        roomGradings={roomGradings}
        selectedTypeValues={selectedTypeValues}
        addRoomCategory={addRoomCategory}
        addRoomView={addRoomView}
        addRoomGradings={addRoomGradings}
        onSetSelectedTypeValue={onSetSelectedTypeValue}
        onCreateRate={onCreateRate}
        onAddEditAccomodation={onAddAccomodation}
        setLocation={setLocation}
        setCity={setCity}
        setGroup={setGroup}
        setName={setName}
        setContactNumber={setContactNumber}
        setEmail={setEmail}
        setWebLink={setWebLink}
        setIjazahLink={setIjazahLink}
        setNewRateStart={setNewRateStart}
        setNewRateEnd={setNewRateEnd}
        setNewMealPlan={setNewMealPlan}
        setNewSinglePrice={setNewSinglePrice}
        setNewDoublePrice={setNewDoublePrice}
        setNewTriplePrice={setNewTriplePrice}
      />
    </DivAtom>
  );
}

export default CreateAccomodation;
