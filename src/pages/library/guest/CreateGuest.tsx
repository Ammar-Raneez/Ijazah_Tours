import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import ChevronLeftRoundedIcon from '@material-ui/icons/ChevronLeftRounded';
import { doc, serverTimestamp, setDoc } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { v4 as uuid } from 'uuid';

import CreateEditGuestForm from '../../../organisms/library/guest/CreateEditGuestForm';
import DivAtom from '../../../atoms/DivAtom';
import H2Atom from '../../../atoms/H2Atom';
import IconAtom from '../../../atoms/IconAtom';
import { selectWithNavbarWidth } from '../../../redux/containerSizeSlice';
import { db } from '../../../firebase';
import { statusOptions, uploadImage } from '../../../utils/helpers';
import { libraryCreateGuestStyles } from '../../../styles';

const storage = getStorage();

interface CreateGuestProps {
  isCreating: boolean;
  setIsCreating: any;
}

function CreateGuest({
  isCreating,
  setIsCreating,
}: CreateGuestProps) {
  const width = useSelector(selectWithNavbarWidth);

  const [refNum, setRefNum] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [country, setCountry] = useState('');
  const [city, setCity] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [email, setEmail] = useState('');
  const [occupation, setOccupation] = useState('');
  const [adults, setAdults] = useState(0);
  const [childAge, setChildAge] = useState(0);
  const [status, setStatus] = useState(statusOptions[0].value);
  const [childrenAges, setChildrenAges] = useState<number[]>([]);
  const [rooms, setRooms] = useState(0);
  const [passport, setPassport] = useState<any[]>([]);

  const [showValidationErrorMessage, setShowValidationErrorMessage] = useState(false);

  const history = useHistory();

  const onAddGuest = async () => {
    setShowValidationErrorMessage(false);
    if (firstName.trim() === '' || lastName.trim() === '' || refNum.trim() === ''
      || country.trim() === '' || contactNumber.trim() === '' || email.trim() === ''
      || city.trim() === '' || occupation.trim() === '' || status.trim() === ''
      || passport.length === 0 || !passport) {
      setShowValidationErrorMessage(true);
      return;
    }

    setIsCreating(true);
    const url = await uploadPassport();
    await setDoc(doc(db, 'Library Guests', uuid()), {
      name: `${firstName} ${lastName}`,
      refNum,
      email,
      country,
      city,
      occupation,
      adults,
      rooms,
      childrenAges,
      status,
      passport: url,
      tel: contactNumber,
      createdAt: serverTimestamp(),
    });

    setIsCreating(false);
    clearInputs();
    history.replace('/library/guest');
  };

  const uploadPassport = async () => (
    uploadImage(storage, 'library-guest', passport[0].data_url, passport[0].file.name)
  );

  const clearInputs = () => {
    setRefNum('');
    setFirstName('');
    setLastName('');
    setEmail('');
    setCountry('');
    setCity('');
    setOccupation('');
    setContactNumber('');
    setAdults(0);
    setRooms(0);
    setChildAge(0);
    setChildrenAges([]);
  };

  const onAddReminder = () => {
    // eslint-disable-next-line no-console
    console.log('add reminder');
  };

  return (
    <DivAtom>
      <DivAtom style={libraryCreateGuestStyles.header}>
        <IconAtom
          size="small"
          children={<ChevronLeftRoundedIcon />}
          style={libraryCreateGuestStyles.backBtn}
          onClick={() => history.replace('/library/guest')}
        />
        <H2Atom style={libraryCreateGuestStyles.title} text="Create Guest" />
      </DivAtom>

      <CreateEditGuestForm
        showValidationErrorMessage={showValidationErrorMessage}
        isCreating={isCreating}
        width={width}
        btnText="Create"
        refNum={refNum}
        setRefNum={setRefNum}
        firstName={firstName}
        lastName={lastName}
        country={country}
        city={city}
        status={status}
        contactNumber={contactNumber}
        email={email}
        occupation={occupation}
        adults={adults}
        rooms={rooms}
        childAge={childAge}
        childrenAges={childrenAges}
        passport={passport}
        setFirstName={setFirstName}
        setLastName={setLastName}
        setCountry={setCountry}
        setCity={setCity}
        setStatus={setStatus}
        setContactNumber={setContactNumber}
        setEmail={setEmail}
        setOccupation={setOccupation}
        setAdults={setAdults}
        setRooms={setRooms}
        setChildAge={setChildAge}
        setChildrenAges={setChildrenAges}
        setPassport={setPassport}
        onAddEditGuest={onAddGuest}
        onAddReminder={onAddReminder}
      />
    </DivAtom>
  );
}

export default CreateGuest;
