/* eslint-disable @typescript-eslint/no-unused-vars */
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
import { AccomodationRate, LibraryAccomodation, SettingsRoomProperties } from '../../../utils/types';
import { libraryAccomodationStyles } from '../../../styles';

interface EditAccomodationProps {
  row: LibraryAccomodation;
  isUpdating: boolean;
  roomViewData: SettingsRoomProperties[];
  roomCategoriesData: SettingsRoomProperties[];
  roomGradingsData: SettingsRoomProperties[];
  setIsUpdating: any;
}

function EditAccomodation({
  row,
  isUpdating,
  roomViewData,
  roomCategoriesData,
  roomGradingsData,
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

  const [roomCategories, setRoomCategories] = useState(
    roomCategoriesData.map((category) => (!!row.categoryValues[category.val])),
  );
  const [roomViews, setRoomViews] = useState(
    row.views.map((val) => val.checked || false),
  );
  const [roomGradings, setRoomGradings] = useState(
    row.gradings.map((val) => val.checked || false),
  );

  const [selectedTypes, setSelectedTypes] = useState(Object.keys(row.categoryValues));

  const [selectedTypeValues, setSelectedTypeValues] = useState(row.categoryValues);

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

    const updatedSelectedTypes = roomCategoriesData.filter((label, index: number) => (
      updatedCategories[index] && label.val
    ));

    setSelectedTypes(updatedSelectedTypes.map((type) => type.val));
  };

  const onSetSelectedTypeValue = (type: string, val: string) => {
    const updatedSelectedTypeValues = { ...selectedTypeValues, [type]: val };
    setSelectedTypeValues(updatedSelectedTypeValues);
  };

  return (
    <DivAtom>
      <DivAtom style={libraryAccomodationStyles.header}>
        <IconAtom
          size="small"
          children={<ChevronLeftRoundedIcon />}
          style={libraryAccomodationStyles.backBtn}
          onClick={() => history.replace('/library/accomodation')}
        />
        <H2Atom
          style={libraryAccomodationStyles.title}
          text="Edit Accomodation"
        />
      </DivAtom>

      <CreateEditAccomodationForm
        isCreating={isUpdating}
        allRoomTypes={roomCategoriesData}
        allRoomViews={roomViewData}
        allRoomGradings={roomGradingsData}
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
