import { ChangeEvent } from 'react';
import { CircularProgress } from '@material-ui/core';

import FormControlInput from '../../../molecules/FormControlInput';
import ButtonAtom from '../../../atoms/ButtonAtom';
import DivAtom from '../../../atoms/DivAtom';
import TextFieldAtom from '../../../atoms/TextFieldAtom';
import { libraryCreateGuestStyles, libraryStyles } from '../../../styles';
import ImageUploader from './ImageUploader';
import { statusOptions } from '../../../utils/helpers';
import H2Atom from '../../../atoms/H2Atom';
import ParagraphAtom from '../../../atoms/ParagraphAtom';

interface CreateEditGuestFormProps {
  width: number;
  isCreating: boolean;
  showValidationErrorMessage: boolean;
  btnText: string;
  refNum: string;
  firstName: string;
  lastName: string;
  country: string;
  city: string;
  status: string;
  contactNumber: string;
  email: string;
  occupation: string;
  adults: number;
  rooms: number;
  childAge: number;
  childrenAges: number[];
  passport: any[];
  setRefNum: any;
  setFirstName: any;
  setLastName: any;
  setCountry: any;
  setCity: any;
  setStatus: any;
  setContactNumber: any;
  setEmail: any;
  setOccupation: any;
  setAdults: any;
  setRooms: any;
  setChildAge: any;
  setChildrenAges: any;
  setPassport: any;
  onAddEditGuest: () => Promise<void>;
  onAddReminder?: () => void;
}

function CreateEditGuestForm({
  width,
  isCreating,
  showValidationErrorMessage,
  btnText,
  refNum,
  firstName,
  lastName,
  country,
  city,
  status,
  contactNumber,
  email,
  occupation,
  adults,
  rooms,
  childAge,
  childrenAges,
  passport,
  setRefNum,
  setFirstName,
  setLastName,
  setCountry,
  setCity,
  setStatus,
  setContactNumber,
  setEmail,
  setOccupation,
  setAdults,
  setRooms,
  setChildAge,
  setChildrenAges,
  setPassport,
  onAddEditGuest,
  onAddReminder,
}: CreateEditGuestFormProps) {
  const getAgeString = (age: number) => (age === 1 ? `${age} year old` : `${age} years old`);

  return (
    <>
      <DivAtom style={libraryCreateGuestStyles.formContainer}>
        <DivAtom
          style={{
            ...libraryCreateGuestStyles.multiFieldContainer,
            justifyContent: 'space-between',
            flexDirection: width < 600 ? 'column' : 'row',
          }}
        >
          <FormControlInput
            margin={width < 600 ? '0 0 1rem 0' : '0 1rem 1rem 0'}
            flex={1}
            label="Reference Number"
            fullWidth
            multiline={false}
            rows={1}
            value={refNum}
            setValue={setRefNum}
            placeholder="Enter Reference Number"
          />
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
            margin={width < 600 ? '0 0 1rem 0' : '0 1rem 1rem 0'}
            flex={1}
            label="Last Name"
            fullWidth
            multiline={false}
            rows={1}
            value={lastName}
            setValue={setLastName}
            placeholder="Enter Last Name"
          />
          <TextFieldAtom
            variant="standard"
            size="medium"
            label="Status"
            value={status}
            onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setStatus(e.target.value)}
            options={statusOptions}
            adornmentPosition="end"
            style={{
              ...libraryStyles.textField,
              flex: 1,
              width: width < 600 ? '100%' : 'auto',
            }}
            disableUnderline={false}
            select
          />
        </DivAtom>
        <DivAtom
          style={{
            ...libraryCreateGuestStyles.multiFieldContainer,
            justifyContent: 'space-between',
            flexDirection: width < 600 ? 'column' : 'row',
          }}
        >
          <FormControlInput
            margin={width < 600 ? '0 0 1rem 0' : '0 1rem 1rem 0'}
            flex={1}
            label="Country"
            fullWidth
            multiline={false}
            rows={1}
            value={country}
            setValue={setCountry}
            placeholder="Enter Country"
          />
          <FormControlInput
            margin="0 0 1rem 0"
            flex={1}
            label="City"
            fullWidth
            multiline={false}
            rows={1}
            value={city}
            setValue={setCity}
            placeholder="Enter City"
          />
        </DivAtom>
        <DivAtom
          style={{
            ...libraryCreateGuestStyles.multiFieldContainer,
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
        <FormControlInput
          margin="0 0 1rem 0"
          label="Occupation"
          fullWidth
          multiline={false}
          rows={1}
          value={occupation}
          setValue={setOccupation}
          placeholder="Enter Occupation"
        />
        <DivAtom
          style={{
            ...libraryCreateGuestStyles.multiFieldContainer,
            justifyContent: 'space-between',
            flexDirection: width < 600 ? 'column' : 'row',
          }}
        >
          <FormControlInput
            margin={width < 600 ? '0 0 1rem 0' : '0 1rem 1rem 0'}
            flex={1}
            type="number"
            label="Adults"
            fullWidth
            multiline={false}
            rows={1}
            value={adults}
            setValue={setAdults}
            placeholder="Enter No. of Adults"
          />
          <FormControlInput
            margin="0 0 1rem 0"
            flex={1}
            type="number"
            label="Rooms"
            fullWidth
            multiline={false}
            rows={1}
            value={rooms}
            setValue={setRooms}
            placeholder="Enter No. of Rooms"
          />
        </DivAtom>
        <DivAtom>
          <DivAtom
            style={{
              ...libraryCreateGuestStyles.multiFieldContainer,
              justifyContent: 'flex-start',
              flexDirection: width < 768 ? 'column' : 'row',
            }}
          >
            <FormControlInput
              margin={width < 768 ? '0 0 1rem 0' : '0 1rem 1rem 0'}
              type="number"
              label="Childs Age"
              fullWidth
              multiline={false}
              rows={1}
              value={childAge}
              setValue={setChildAge}
              placeholder="Enter Childs Age"
            />
            <ButtonAtom
              size="large"
              onClick={() => setChildrenAges([...childrenAges, childAge])}
              style={{
                ...libraryCreateGuestStyles.addBtn,
                width: width < 768 ? '100%' : '18%',
                height: '100%',
                margin: width < 768 ? '0 0 1rem 0' : '0.5rem 0 0 1rem',
              }}
              text="Add Child"
            />
          </DivAtom>
          <H2Atom text="All Children Ages" style={libraryCreateGuestStyles.subtitle} />
          <ul>
            {childrenAges.map((age, i) => (
              <li key={i}>{getAgeString(Number(age))}</li>
            ))}
          </ul>
        </DivAtom>
      </DivAtom>

      <DivAtom>
        <ImageUploader
          passport={passport}
          setPassport={setPassport}
        />
      </DivAtom>

      {showValidationErrorMessage && (
        <ParagraphAtom
          text="Please fill in all the fields"
          style={{ color: 'red', textAlign: 'center' }}
        />
      )}

      <DivAtom
        style={{
          ...libraryCreateGuestStyles.addBtnContainer,
          flexDirection: width < 768 ? 'column' : 'row',
          padding: width < 768 ? '1rem' : '0px',
          margin:
            width < 768
              ? '0px'
              : libraryCreateGuestStyles.addBtnContainer.margin,
        }}
      >
        <ButtonAtom
          size="large"
          endIcon={isCreating && <CircularProgress size={20} color="inherit" />}
          onClick={onAddEditGuest}
          disabled={isCreating}
          style={{
            ...libraryCreateGuestStyles.addBtn,
            width: width < 768 ? '100%' : '18%',
            margin: width < 768 ? '0 0 1rem 0' : '0 0 0 1rem',
          }}
          text={btnText}
        />
        {onAddReminder && (
          <ButtonAtom
            size="large"
            onClick={onAddReminder}
            style={{
              ...libraryCreateGuestStyles.addBtn,
              width: width < 768 ? '100%' : '18%',
            }}
            text="Add Reminder"
          />
        )}
      </DivAtom>
    </>
  );
}

export default CreateEditGuestForm;
