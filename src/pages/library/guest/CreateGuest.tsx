import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import ChevronLeftRoundedIcon from '@material-ui/icons/ChevronLeftRounded';
import { doc, serverTimestamp, setDoc } from 'firebase/firestore';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadString,
} from 'firebase/storage';
import { v4 as uuid } from 'uuid';

import CreateEditGuestForm from '../../../organisms/library/guest/CreateEditGuestForm';
import DivAtom from '../../../atoms/DivAtom';
import H2Atom from '../../../atoms/H2Atom';
import IconAtom from '../../../atoms/IconAtom';
import { libraryCreateGuestStyles } from '../../../styles';
import { db } from '../../../firebase';
import { statusOptions } from '../../../utils/helpers';

const storage = getStorage();

function CreateGuest() {
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

  const onAddGuest = async () => {
    const url = await uploadImage();
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

    clearInputs();
  };

  const uploadImage = async () => {
    const passRandom = uuid();
    const storageRef = ref(storage, `library-guest/${passRandom + passport[0].file.name}`);
    await uploadString(storageRef, passport[0].data_url, 'data_url');
    return getDownloadURL(storageRef);
  };

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
        width={width}
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
        onAddGuest={onAddGuest}
        onAddReminder={onAddReminder}
      />
    </DivAtom>
  );
}

export default CreateGuest;
