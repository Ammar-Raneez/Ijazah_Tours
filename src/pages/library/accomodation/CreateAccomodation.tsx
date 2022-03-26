import {
  MouseEvent,
  useEffect,
  useState,
} from 'react';
import { useHistory } from 'react-router-dom';
import ChevronLeftRoundedIcon from '@material-ui/icons/ChevronLeftRounded';
import { doc, serverTimestamp, setDoc } from 'firebase/firestore';
import { v4 as uuid } from 'uuid';

import DivAtom from '../../../atoms/DivAtom';
import H2Atom from '../../../atoms/H2Atom';
import IconAtom from '../../../atoms/IconAtom';
import { db } from '../../../firebase';
import { AccomodationRate } from '../../../utils/types';
import { formCreateMemberStyles } from '../../../styles';
import CreateEditAccomodationForm from '../../../organisms/library/accomodation/CreateEditAccomodationForm';

const allRoomTypes = [
  'Cilantro Suite',
  'Executive Room',
  'Premium Room',
];

interface CreateAccomodationProps {
  isCreating: boolean;
  setIsCreating: any;
}

function CreateAccomodation({
  isCreating,
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

  const [roomCategories, setRoomCategories] = useState(new Array(3).fill(false));
  const [roomViews, setRoomViews] = useState(new Array(3).fill(false));
  const [roomGradings, setRoomGradings] = useState(new Array(3).fill(false));

  const [selectedTypes, setSelectedTypes] = useState(new Array(3).fill(undefined));
  const [selectedTypeValues, setSelectedTypeValues] = useState(
    Object.fromEntries(
      allRoomTypes.map((type: string) => [type, '']),
    ),
  );

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

    setIsCreating(true);
    await setDoc(doc(db, 'Library Accomodation', uuid()), {
      name,
      group,
      city,
      email,
      webLink,
      ijazahLink,
      gradings: roomGradings,
      country: location,
      views: roomViews,
      categories: roomCategories,
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

      <CreateEditAccomodationForm
        rateData={rateData}
        isCreating={isCreating}
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
