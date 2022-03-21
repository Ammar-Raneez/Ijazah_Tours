import { ChangeEvent, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import ChevronLeftRoundedIcon from '@material-ui/icons/ChevronLeftRounded';

import ImageUploader from '../../../organisms/library/driver/ImageUploader';
import FormControlInput from '../../../molecules/FormControlInput';
import CheckboxGroup from '../../../molecules/CheckboxGroup';
import DivAtom from '../../../atoms/DivAtom';
import H2Atom from '../../../atoms/H2Atom';
import ButtonAtom from '../../../atoms/ButtonAtom';
import IconAtom from '../../../atoms/IconAtom';
import TextFieldAtom from '../../../atoms/TextFieldAtom';
import { formCreateMemberStyles, libraryStyles } from '../../../styles';

const options = [
  { label: 'Nissan', value: 'Nissan' },
  { label: 'Suzuki', value: 'Suzuki' },
  { label: 'BMW', value: 'BMW' },
];

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
  const [english, setEnglish] = useState(false);
  const [arabic, setArabic] = useState(false);
  const [insurance, setInsurance] = useState([]);
  const [profilePic, setProfilePic] = useState([]);
  const [vehiclePic, setVehiclePic] = useState([]);
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

  const onAddDriver = () => {
    // eslint-disable-next-line no-console
    console.log('add driver');
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
            checked={[english, arabic]}
            setChecked={[setEnglish, setArabic]}
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
