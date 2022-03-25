import { ChangeEvent, useEffect, useState } from 'react';
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

import ImageUploader from '../../../organisms/library/driver/ImageUploader';
import FormControlInput from '../../../molecules/FormControlInput';
import CheckboxGroup from '../../../molecules/CheckboxGroup';
import DivAtom from '../../../atoms/DivAtom';
import H2Atom from '../../../atoms/H2Atom';
import ButtonAtom from '../../../atoms/ButtonAtom';
import IconAtom from '../../../atoms/IconAtom';
import TextFieldAtom from '../../../atoms/TextFieldAtom';
import { formCreateMemberStyles, libraryStyles } from '../../../styles';
import { db } from '../../../firebase';

const options = [
  { label: 'Nissan', value: 'Nissan' },
  { label: 'Suzuki', value: 'Suzuki' },
  { label: 'BMW', value: 'BMW' },
];

const storage = getStorage();

function CreateDriver() {
  // Generate ref num on creation
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [email, setEmail] = useState('');
  const [nic, setNic] = useState('');
  const [boardCertNum, setBoardCertNum] = useState('');
  const [address, setAddress] = useState('');
  const [address2, setAddress2] = useState('');
  const [vehicleType, setVehicleType] = useState(options[0].value);
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
      address2,
      vehicleType,
      insurance: insuranceUrl,
      profilePic: profilePicUrl,
      vehiclePic: vehiclePicUrl,
      languages: selectedLanguages,
      status: 'Registered',
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
    setAddress2('');
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
            label="First Name"
            fullWidth
            multiline={false}
            rows={1}
            value={firstName}
            setValue={setFirstName}
            placeholder="Enter First Name"
          />
          <FormControlInput
            margin="0 0 1rem 0"
            flex={1}
            label="Last Name"
            fullWidth
            multiline={false}
            rows={1}
            value={lastName}
            setValue={setLastName}
            placeholder="Enter Last Name"
          />
        </DivAtom>
        <DivAtom
          style={{
            ...formCreateMemberStyles.multiFieldContainer,
            justifyContent: 'space-between',
            flexDirection: width < 600 ? 'column' : 'row',
          }}
        >
          <FormControlInput
            margin={width < 600 ? '0 0 1rem 0' : '0 1rem 1rem 0'}
            flex={1}
            label="NIC"
            fullWidth
            multiline={false}
            rows={1}
            value={nic}
            setValue={setNic}
            placeholder="Enter NIC"
          />
          <FormControlInput
            margin="0 0 1rem 0"
            flex={1}
            label="Tourist Board Certificate Number"
            fullWidth
            multiline={false}
            rows={1}
            value={boardCertNum}
            setValue={setBoardCertNum}
            placeholder="Enter Tourist Board Certificate Number"
          />
        </DivAtom>
        <DivAtom
          style={{
            ...formCreateMemberStyles.multiFieldContainer,
            flexDirection: width < 600 ? 'column' : 'row',
          }}
        >
          <TextFieldAtom
            variant="standard"
            size="medium"
            label="Vehicle"
            value={vehicleType}
            onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setVehicleType(e.target.value)
            }
            options={options}
            adornmentposition="end"
            style={{
              ...libraryStyles.textField,
              flex: 1,
              width: width < 600 ? '100%' : 'auto',
              margin: '0 1rem 1rem 0',
            }}
            disableUnderline={false}
            select
          />
          <FormControlInput
            margin="0 0 1rem 0"
            flex={1}
            label="Rate"
            fullWidth
            multiline={false}
            rows={1}
            value={rate}
            setValue={setRate}
            placeholder="Enter Rate"
          />
          <CheckboxGroup
            grouptitle="Language"
            labels={['English', 'Arabic']}
            names={['english', 'arabic']}
            checked={languages}
            onChange={(_, i: number) => onChangeLanguage(i)}
            style={{ flexDirection: 'row' }}
          />
        </DivAtom>
        <FormControlInput
          margin="0 0 1rem 0"
          flex={1}
          label="Notes"
          fullWidth
          multiline
          rows={2}
          value={notes}
          setValue={setNotes}
          placeholder="Enter Notes"
        />
        <DivAtom
          style={{
            ...formCreateMemberStyles.multiFieldContainer,
            justifyContent: 'space-between',
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
            type="email"
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
            label="Address Line 01"
            fullWidth
            flex={1}
            multiline={false}
            rows={1}
            value={address}
            setValue={setAddress}
            placeholder="Enter Address Line 01"
          />
          <FormControlInput
            margin="0 0 1rem 0"
            label="Address Line 02"
            fullWidth
            flex={1}
            multiline={false}
            rows={1}
            value={address2}
            setValue={setAddress2}
            placeholder="Enter Address Line 02"
          />
        </DivAtom>
      </DivAtom>

      <DivAtom>
        <ImageUploader
          insurance={insurance}
          setInsurance={setInsurance}
          profilePic={profilePic}
          setProfilePic={setProfilePic}
          vehiclePic={vehiclePic}
          setVehiclePic={setVehiclePic}
        />
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
          onClick={onAddDriver}
          disabled={
            firstName === ''
            || lastName === ''
            || contactNumber === ''
            || email === ''
            || nic === ''
            || boardCertNum === ''
            || address === ''
            || address2 === ''
            || rate === ''
            || notes === ''
            || insurance === []
            || profilePic === []
            || vehiclePic === []
          }
          style={{
            ...formCreateMemberStyles.addBtn,
            width: width < 768 ? '100%' : '18%',
            margin: width < 768 ? '0 0 1rem 0' : '0px',
          }}
          text="Create"
        />
      </DivAtom>
    </DivAtom>
  );
}

export default CreateDriver;
