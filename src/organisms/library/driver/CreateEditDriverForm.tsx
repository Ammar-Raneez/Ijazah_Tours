import { ChangeEvent } from 'react';

import FormControlInput from '../../../molecules/FormControlInput';
import ButtonAtom from '../../../atoms/ButtonAtom';
import DivAtom from '../../../atoms/DivAtom';
import TextFieldAtom from '../../../atoms/TextFieldAtom';
import { formCreateMemberStyles, libraryStyles } from '../../../styles';
import ImageUploader from './ImageUploader';
import CheckboxGroup from '../../../molecules/CheckboxGroup';
import { statusOptions, vehicleOptions } from '../../../utils/helpers';

interface CreateEditDriverFormProps {
  width: number;
  firstName: string;
  lastName: string;
  nic: string;
  boardCertNum: string;
  vehicleType: string;
  status: string;
  rate: string;
  notes: string;
  contactNumber: string;
  email: string;
  address: string;
  languages: boolean[];
  insurance: any[];
  profilePic: any[];
  vehiclePic: any[];
  setFirstName: any;
  setLastName: any;
  setNic: any;
  setBoardCertNum: any;
  setVehicleType: any;
  setStatus: any;
  setRate: any;
  setNotes: any;
  setContactNumber: any;
  setEmail: any;
  setAddress: any;
  setInsurance: any;
  setProfilePic: any;
  setVehiclePic: any;
  onChangeLanguage: (i: number) => void;
  onAddDriver: () => Promise<void>;
}

function CreateEditDriverForm({
  width,
  firstName,
  lastName,
  nic,
  boardCertNum,
  vehicleType,
  status,
  rate,
  notes,
  contactNumber,
  email,
  address,
  languages,
  insurance,
  profilePic,
  vehiclePic,
  setFirstName,
  setLastName,
  setNic,
  setBoardCertNum,
  setVehicleType,
  setStatus,
  setRate,
  setNotes,
  setContactNumber,
  setEmail,
  setAddress,
  setInsurance,
  setProfilePic,
  setVehiclePic,
  onChangeLanguage,
  onAddDriver,
}: CreateEditDriverFormProps) {
  return (
    <>
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
            onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setVehicleType(e.target.value)}
            options={vehicleOptions}
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
          <TextFieldAtom
            variant="standard"
            size="medium"
            label="Status"
            value={status}
            onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setStatus(e.target.value)}
            options={statusOptions}
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
            label="Address"
            fullWidth
            flex={1}
            multiline={false}
            rows={1}
            value={address}
            setValue={setAddress}
            placeholder="Enter Address"
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
    </>
  );
}

export default CreateEditDriverForm;
