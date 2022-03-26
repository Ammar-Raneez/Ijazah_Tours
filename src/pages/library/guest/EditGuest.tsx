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

const storage = getStorage();

interface EditGuestProps {
  row: any;
}

function EditGuest({ row }: EditGuestProps) {
  const [refNum, setRefNum] = useState(row.refNum);
  const [firstName, setFirstName] = useState(row.name.split(' ')[0]);
  const [lastName, setLastName] = useState(row.name.split(' ')[1]);
  const [country, setCountry] = useState(row.country);
  const [city, setCity] = useState(row.city);
  const [contactNumber, setContactNumber] = useState(row.tel);
  const [email, setEmail] = useState(row.email);
  const [occupation, setOccupation] = useState(row.occupation);
  const [adults, setAdults] = useState(row.adults);
  const [childAge, setChildAge] = useState(0);
  const [status, setStatus] = useState(row.status);
  const [childrenAges, setChildrenAges] = useState<number[]>(row.childrenAges);
  const [rooms, setRooms] = useState(row.rooms);
  const [passport, setPassport] = useState<any[]>([row.passport]);
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

  const onEditGuest = async () => {
    let url;
    if (passport[0].file) {
      url = await uploadImage();
    }

    await setDoc(doc(db, 'Library Guests', row.id), {
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
      passport: url || passport[0],
      tel: contactNumber,
      createdAt: serverTimestamp(),
    });
  };

  const uploadImage = async () => {
    const passRandom = uuid();
    const storageRef = ref(storage, `library-guest/${passRandom + passport[0].file.name}`);
    await uploadString(storageRef, passport[0].data_url, 'data_url');
    return getDownloadURL(storageRef);
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
        <H2Atom style={libraryCreateGuestStyles.title} text="Edit Guest" />
      </DivAtom>

      <CreateEditGuestForm
        width={width}
        btnText="Update"
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
        onAddEditGuest={onEditGuest}
      />
    </DivAtom>
  );
}

export default EditGuest;
