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

import CreateEditDriverForm from '../../../organisms/library/driver/CreateEditDriverForm';
import DivAtom from '../../../atoms/DivAtom';
import H2Atom from '../../../atoms/H2Atom';
import IconAtom from '../../../atoms/IconAtom';
import { formCreateMemberStyles } from '../../../styles';
import { db } from '../../../firebase';
import { statusOptions, vehicleOptions } from '../../../utils/helpers';

const storage = getStorage();

function CreateDriver() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [email, setEmail] = useState('');
  const [nic, setNic] = useState('');
  const [boardCertNum, setBoardCertNum] = useState('');
  const [address, setAddress] = useState('');
  const [vehicleType, setVehicleType] = useState(vehicleOptions[0].value);
  const [status, setStatus] = useState(statusOptions[0].value);
  const [rate, setRate] = useState('');
  const [notes, setNotes] = useState('');
  const [languages, setLanguages] = useState(new Array(2).fill(false));
  const [insurance, setInsurance] = useState<any[]>([]);
  const [profilePic, setProfilePic] = useState<any[]>([]);
  const [vehiclePic, setVehiclePic] = useState<any[]>([]);
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

  const onAddDriver = async () => {
    const [insuranceUrl, profilePicUrl, vehiclePicUrl] = await uploadImages();
    const selectedLanguages = [];
    if (languages[0]) {
      selectedLanguages.push('English');
    }
    if (languages[1]) {
      selectedLanguages.push('Arabic');
    }

    await setDoc(doc(db, 'Library Drivers', uuid()), {
      name: `${firstName} ${lastName}`,
      email,
      tel: contactNumber,
      nic,
      boardCertNum,
      address,
      vehicleType,
      status,
      insurance: insuranceUrl,
      profilePic: profilePicUrl,
      vehiclePic: vehiclePicUrl,
      languages: selectedLanguages,
      createdAt: serverTimestamp(),
    });

    clearInputs();
  };

  const uploadImages = async () => {
    const insuRandom = uuid();
    const profRandom = uuid();
    const vehiRandom = uuid();
    const storageRefInsurance = ref(storage, `library-driver/${insuRandom + insurance[0].file.name}`);
    const storageRefProfilePic = ref(storage, `library-driver/${profRandom + profilePic[0].file.name}`);
    const storageRefVehiclePic = ref(storage, `library-driver/${vehiRandom + vehiclePic[0].file.name}`);

    await uploadString(storageRefInsurance, insurance[0].data_url, 'data_url');
    await uploadString(storageRefProfilePic, profilePic[0].data_url, 'data_url');
    await uploadString(storageRefVehiclePic, vehiclePic[0].data_url, 'data_url');
    const insuranceUrl = await getDownloadURL(storageRefInsurance);
    const profilePicUrl = await getDownloadURL(storageRefProfilePic);
    const vehiclePicUrl = await getDownloadURL(storageRefVehiclePic);

    return [insuranceUrl, profilePicUrl, vehiclePicUrl];
  };

  const clearInputs = () => {
    setFirstName('');
    setLastName('');
    setContactNumber('');
    setEmail('');
    setNic('');
    setBoardCertNum('');
    setAddress('');
    setRate('');
    setNotes('');
    setInsurance([]);
    setProfilePic([]);
    setVehiclePic([]);
  };

  const onChangeLanguage = (i: number) => {
    const updatedCheckedState = languages.map((lang, index) => (index === i ? !lang : lang));
    setLanguages(updatedCheckedState);
  };

  return (
    <DivAtom>
      <DivAtom style={formCreateMemberStyles.header}>
        <IconAtom
          size="small"
          children={<ChevronLeftRoundedIcon />}
          style={formCreateMemberStyles.backBtn}
          onClick={() => history.replace('/library/driver')}
        />
        <H2Atom style={formCreateMemberStyles.title} text="Create Driver" />
      </DivAtom>

      <CreateEditDriverForm
        width={width}
        firstName={firstName}
        lastName={lastName}
        nic={nic}
        boardCertNum={boardCertNum}
        vehicleType={vehicleType}
        status={status}
        rate={rate}
        notes={notes}
        contactNumber={contactNumber}
        email={email}
        address={address}
        languages={languages}
        insurance={insurance}
        profilePic={profilePic}
        vehiclePic={vehiclePic}
        setFirstName={setFirstName}
        setLastName={setLastName}
        setNic={setNic}
        setBoardCertNum={setBoardCertNum}
        setVehicleType={setVehicleType}
        setStatus={setStatus}
        setRate={setRate}
        setNotes={setNotes}
        setContactNumber={setContactNumber}
        setEmail={setEmail}
        setAddress={setAddress}
        setInsurance={setInsurance}
        setProfilePic={setProfilePic}
        setVehiclePic={setVehiclePic}
        onChangeLanguage={onChangeLanguage}
        onAddDriver={onAddDriver}
      />
    </DivAtom>
  );
}

export default CreateDriver;
