import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import ChevronLeftRoundedIcon from '@material-ui/icons/ChevronLeftRounded';

import ImageUploader from '../../../organisms/library/guest/ImageUploader';
import FormControlInput from '../../../molecules/FormControlInput';
import DivAtom from '../../../atoms/DivAtom';
import H2Atom from '../../../atoms/H2Atom';
import ButtonAtom from '../../../atoms/ButtonAtom';
import IconAtom from '../../../atoms/IconAtom';
import { libraryCreateGuestStyles } from '../../../styles';

function CreateGuest() {
  // Generate ref num on creation
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [country, setCountry] = useState('');
  const [city, setCity] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [email, setEmail] = useState('');
  const [occupation, setOccupation] = useState('');
  const [adults, setAdults] = useState(0);
  const [children, setChildren] = useState(0);
  const [allChildren, setAllChildren] = useState<number[]>([]);
  const [rooms, setRooms] = useState(0);
  const [passport, setPassport] = useState([]);
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

  const onAddGuest = () => {
    // eslint-disable-next-line no-console
    console.log('add guest');
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
              value={children}
              setValue={setChildren}
              placeholder="Enter Childs Age"
            />
            <ButtonAtom
              size="large"
              onClick={() => setAllChildren([...allChildren, children])}
              style={{
                ...libraryCreateGuestStyles.addBtn,
                width: width < 768 ? '100%' : '18%',
                height: '100%',
                margin: width < 768 ? '0 0 1rem 0' : '0.5rem 0 0 1rem',
              }}
              text="Add Child"
            />
          </DivAtom>
          <H2Atom text="All Children" style={libraryCreateGuestStyles.subtitle} />
          <ul>
            {allChildren.map((age, i) => <li key={i}>{age}</li>)}
          </ul>
        </DivAtom>
      </DivAtom>

      <DivAtom>
        <ImageUploader
          passport={passport}
          setPassport={setPassport}
        />
      </DivAtom>

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
          onClick={onAddGuest}
          style={{
            ...libraryCreateGuestStyles.addBtn,
            width: width < 768 ? '100%' : '18%',
            margin: width < 768 ? '0 0 1rem 0' : '0 0 0 1rem',
          }}
          text="Create"
        />
        <ButtonAtom
          size="large"
          onClick={onAddReminder}
          style={{
            ...libraryCreateGuestStyles.addBtn,
            width: width < 768 ? '100%' : '18%',
          }}
          text="Add Reminder"
        />
      </DivAtom>
    </DivAtom>
  );
}

export default CreateGuest;
