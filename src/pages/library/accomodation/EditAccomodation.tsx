import {
  MouseEvent,
  useEffect,
  useState,
} from 'react';
import { useHistory } from 'react-router-dom';
import ChevronLeftRoundedIcon from '@material-ui/icons/ChevronLeftRounded';
import { doc, serverTimestamp, updateDoc } from 'firebase/firestore';
import { v4 as uuid } from 'uuid';

import CreateEditAccomodationForm from '../../../organisms/library/accomodation/CreateEditAccomodationForm';
import DivAtom from '../../../atoms/DivAtom';
import H2Atom from '../../../atoms/H2Atom';
import IconAtom from '../../../atoms/IconAtom';
import { db } from '../../../firebase';
import { AccomodationRate, LibraryAccomodation } from '../../../utils/types';
import { formCreateMemberStyles } from '../../../styles';

interface EditAccomodationProps {
  row: LibraryAccomodation;
  isUpdating: boolean;
  setIsUpdating: any;
}

const allRoomTypes = [
  'Cilantro Suite',
  'Executive Room',
  'Premium Room',
];

function EditAccomodation({
  row,
  isUpdating,
  setIsUpdating,
}: EditAccomodationProps) {
  const [name, setName] = useState(row.name);
  const [group, setGroup] = useState(row.group);
  const [location, setLocation] = useState(row.country);
  const [city, setCity] = useState(row.city);
  const [contactNumber, setContactNumber] = useState(row.tel);
  const [email, setEmail] = useState(row.email);
  const [webLink, setWebLink] = useState(row.webLink);
  const [ijazahLink, setIjazahLink] = useState(row.ijazahLink);

  const [roomCategories, setRoomCategories] = useState(row.categories);
  const [roomViews, setRoomViews] = useState(row.views);
  const [roomGradings, setRoomGradings] = useState(row.gradings);

  const [selectedTypes, setSelectedTypes] = useState(
    allRoomTypes.filter((type, index) => roomCategories[index] && type),
  );

  const [selectedTypeValues, setSelectedTypeValues] = useState(
    Object.fromEntries(
      allRoomTypes.map((type) => [type, row.categoryValues[type]]),
    ),
  );

  const [rateData, setRateData] = useState<AccomodationRate[]>(row.rates);
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

  const onEditAccomodation = async () => {
    setShowValidationErrorMessage(false);
    if (name.trim() === '' || group.trim() === '' || location.trim() === ''
      || city.trim() === '' || contactNumber.trim() === '' || email.trim() === ''
      || webLink.trim() === '' || ijazahLink.trim() === '' || rateData.length === 0) {
      setShowValidationErrorMessage(true);
      return;
    }

    setIsUpdating(true);
    await updateDoc(doc(db, 'Library Accomodation', row.id), {
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
      updatedAt: serverTimestamp(),
    });

    setIsUpdating(false);
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

  const deleteRate = (rw: AccomodationRate) => {
    const updatedRateData = [...rateData];
    updatedRateData.splice(rateData.findIndex((val) => val.id === rw.id), 1);
    setRateData(updatedRateData);
  };

  const clearRateInputs = () => {
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
          text="Edit Accomodation"
        />
      </DivAtom>

      <CreateEditAccomodationForm
        isCreating={isUpdating}
        deleteRate={deleteRate}
        rateData={rateData}
        width={width}
        btnText="Update"
        showValidationErrorMessage={showValidationErrorMessage}
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
        onAddEditAccomodation={onEditAccomodation}
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

export default EditAccomodation;
