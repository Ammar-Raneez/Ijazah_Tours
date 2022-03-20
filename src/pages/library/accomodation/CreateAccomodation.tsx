import {
  ChangeEvent,
  MouseEvent,
  MouseEventHandler,
  useEffect,
  useState,
} from 'react';
import { useHistory } from 'react-router-dom';
import ChevronLeftRoundedIcon from '@material-ui/icons/ChevronLeftRounded';
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import DivAtom from '../../../atoms/DivAtom';
import H2Atom from '../../../atoms/H2Atom';
import ButtonAtom from '../../../atoms/ButtonAtom';
import IconAtom from '../../../atoms/IconAtom';
import FormControlInput from '../../../molecules/FormControlInput';
import { formCreateMemberStyles, libraryStyles, libraryTableToolbarStyles } from '../../../styles';
import CheckboxGroup from '../../../molecules/CheckboxGroup';
import AccomodationPriceTable from '../../../organisms/library/accomodation/AccomodationPriceTable';
import TextFieldAtom from '../../../atoms/TextFieldAtom';

function CreateAccomodation() {
  // Generate ref num on creation
  const [name, setName] = useState('');
  const [group, setGroup] = useState('');
  const [location, setLocation] = useState('');
  const [city, setCity] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [email, setEmail] = useState('');
  const [webLink, setWebLink] = useState('');
  const [ijazahLink, setIjazahLink] = useState('');

  const [cilantro, setCilantro] = useState(false);
  const [executive, setExecutive] = useState(false);
  const [premium, setPremium] = useState(false);

  const [fiveStar, setFiveStar] = useState(false);
  const [fourStar, setFourStar] = useState(false);
  const [threeStar, setThreeStar] = useState(false);

  const [rateData, setRateData] = useState<any>([]);
  const [newRateStart, setNewRateStart] = useState('');
  const [newRateEnd, setNewRateEnd] = useState('');
  const [newMealPlan, setNewMealPlan] = useState('');
  const [newSinglePrice, setNewSinglePrice] = useState('');
  const [newDoublePrice, setNewDoublePrice] = useState('');
  const [newTriplePrice, setNewTriplePrice] = useState('');

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

  const onAddAccomodation = () => {
    // eslint-disable-next-line no-console
    console.log('add accomodation');
  };

  const onCreateRate = (
    event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>,
  ) => {
    event.preventDefault();
    localStorage.setItem(
      'New Accomodation Rates',
      JSON.stringify({
        data: [
          ...rateData,
          [newRateStart, newRateEnd, newMealPlan, newSinglePrice, newDoublePrice, newTriplePrice],
        ],
      }),
    );

    setRateData([
      ...rateData,
      [newRateStart, newRateEnd, newMealPlan, newSinglePrice, newDoublePrice, newTriplePrice],
    ]);

    setNewMealPlan('');
    setNewSinglePrice('');
    setNewDoublePrice('');
    setNewTriplePrice('');
  };

  return (
    <DivAtom>
      <DivAtom style={formCreateMemberStyles.header}>
        <IconAtom
          size="small"
          children={<ChevronLeftRoundedIcon />}
          style={formCreateMemberStyles.backBtn}
          onClick={() => history.replace('/library/accomodation')}
        />
        <H2Atom
          style={formCreateMemberStyles.title}
          text="Create Accomodation"
        />
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
            label="Location"
            fullWidth
            multiline={false}
            rows={1}
            value={location}
            setValue={setLocation}
            placeholder="Enter Location"
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
            ...formCreateMemberStyles.multiFieldContainer,
            flexDirection: width < 600 ? 'column' : 'row',
          }}
        >
          <FormControlInput
            margin={width < 600 ? '0 0 1rem 0' : '0 1rem 1rem 0'}
            flex={1}
            label="Group"
            fullWidth
            multiline={false}
            rows={1}
            value={group}
            setValue={setGroup}
            placeholder="Enter Group"
          />
          <FormControlInput
            margin="0 0 1rem 0"
            flex={1}
            label="Name"
            fullWidth
            multiline={false}
            rows={1}
            value={name}
            setValue={setName}
            placeholder="Enter Name"
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
            flex={1}
            label="Web Link"
            fullWidth
            multiline={false}
            rows={1}
            value={webLink}
            setValue={setWebLink}
            placeholder="Enter Web Link"
          />
          <FormControlInput
            margin="0 0 1rem 0"
            flex={1}
            label="Ijazah Link"
            fullWidth
            multiline={false}
            rows={1}
            value={ijazahLink}
            setValue={setIjazahLink}
            placeholder="Enter Ijazah Link"
          />
        </DivAtom>

        <DivAtom
          style={{
            ...formCreateMemberStyles.multiFieldContainer,
            flexDirection: width < 600 ? 'column' : 'row',
            justifyContent: 'flex-start',
            marginTop: '0.8rem',
          }}
        >
          <CheckboxGroup
            grouptitle="Room Categories"
            labels={[`Cilantro Suite ($150)`, 'Executive Room ($90)', 'Premium Room ($20)']}
            names={['cilantro-suite', 'executive-room', 'premium-room']}
            checked={[cilantro, executive, premium]}
            setChecked={[setCilantro, setExecutive, setPremium]}
            style={{ flexDirection: 'column', marginBottom: '1rem' }}
          />
          <CheckboxGroup
            grouptitle="Gradings"
            labels={['5 Star', '4 Star', '3 Star']}
            names={['five', 'four', 'three']}
            checked={[fiveStar, fourStar, threeStar]}
            setChecked={[setFiveStar, setFourStar, setThreeStar]}
            style={{
              flexDirection: 'column',
            }}
          />
        </DivAtom>

        <RatesContainer
          width={width}
          newRateStart={newRateStart}
          newRateEnd={newRateEnd}
          newMealPlan={newMealPlan}
          newSinglePrice={newSinglePrice}
          newDoublePrice={newDoublePrice}
          newTriplePrice={newTriplePrice}
          setNewRateStart={setNewRateStart}
          setNewRateEnd={setNewRateEnd}
          setNewMealPlan={setNewMealPlan}
          setNewSinglePrice={setNewSinglePrice}
          setNewDoublePrice={setNewDoublePrice}
          setNewTriplePrice={setNewTriplePrice}
          rateData={rateData}
          onCreateRate={onCreateRate}
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
          text="Create"
          onClick={onAddAccomodation}
          style={{
            ...formCreateMemberStyles.addBtn,
            width: width < 768 ? '100%' : '18%',
            margin: width < 768 ? '0 0 1rem 0' : '0px',
          }}
        />
      </DivAtom>
    </DivAtom>
  );
}

interface RatesContainerProps {
  width: number;
  newRateStart: string;
  newRateEnd: string;
  newMealPlan: string;
  newSinglePrice: string;
  newDoublePrice: string;
  newTriplePrice: string;
  onCreateRate: MouseEventHandler<HTMLButtonElement>;
  setNewRateStart: any;
  setNewRateEnd: any;
  setNewMealPlan: any;
  setNewSinglePrice: any;
  setNewDoublePrice: any;
  setNewTriplePrice: any;
  rateData: any;
}

function RatesContainer({
  width,
  newRateStart,
  newRateEnd,
  newMealPlan,
  newSinglePrice,
  newDoublePrice,
  newTriplePrice,
  setNewRateStart,
  setNewRateEnd,
  setNewMealPlan,
  setNewSinglePrice,
  setNewDoublePrice,
  setNewTriplePrice,
  rateData,
  onCreateRate,
}: RatesContainerProps) {
  return (
    <>
      <H2Atom
        style={formCreateMemberStyles.title}
        text="Rates"
      />
      <DivAtom
        style={{
          ...formCreateMemberStyles.multiFieldContainer,
          flexDirection: width < 1000 ? 'column' : 'row',
          marginTop: '1rem',
        }}
      >
        <TextFieldAtom
          variant="standard"
          size="medium"
          label="Start Date"
          value={newRateStart}
          onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setNewRateStart(e.target.value)
          }
          adornmentposition="end"
          style={{
            ...libraryStyles.textField,
            flex: 1,
            width: width < 1000 ? '100%' : 'auto',
            margin: width < 1000 ? '0 0 1rem 0' : '0 1rem 0 0',
          }}
          disableUnderline={false}
          select={false}
          focused
          type="date"
        />
        <TextFieldAtom
          variant="standard"
          size="medium"
          label="End Date"
          value={newRateEnd}
          onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setNewRateEnd(e.target.value)
          }
          adornmentposition="end"
          style={{
            ...libraryStyles.textField,
            flex: 1,
            width: width < 1000 ? '100%' : 'auto',
            margin: width < 1000 ? '0 0 1rem 0' : '0 1rem 1rem 0',
          }}
          disableUnderline={false}
          select={false}
          focused
          type="date"
        />
        <FormControlInput
          margin={width < 1000 ? '0 0 1rem 0' : '0 1rem 1rem 0'}
          flex={1}
          label="Meal Plan"
          fullWidth
          multiline={false}
          rows={1}
          value={newMealPlan}
          setValue={setNewMealPlan}
          placeholder="Enter Meal Plan"
        />
        <FormControlInput
          margin={width < 1000 ? '0 0 1rem 0' : '0 1rem 1rem 0'}
          flex={1}
          label="Single Price"
          fullWidth
          multiline={false}
          rows={1}
          value={newSinglePrice}
          setValue={setNewSinglePrice}
          placeholder="Enter Single Price"
        />
        <FormControlInput
          margin={width < 1000 ? '0 0 1rem 0' : '0 1rem 1rem 0'}
          flex={1}
          label="Double Price"
          fullWidth
          multiline={false}
          rows={1}
          value={newDoublePrice}
          setValue={setNewDoublePrice}
          placeholder="Enter Double Price"
        />
        <FormControlInput
          margin="0 0 1rem 0"
          flex={1}
          label="Triple Price"
          fullWidth
          multiline={false}
          rows={1}
          value={newTriplePrice}
          setValue={setNewTriplePrice}
          placeholder="Enter Triple Price"
        />
        <ButtonAtom
          starticon={<AddCircleOutlineOutlinedIcon />}
          text={width < 1000 ? 'Add Rate' : 'Add'}
          disabled={
            newRateStart === ''
            || newRateEnd === ''
            || newMealPlan === ''
            || newSinglePrice === ''
            || newDoublePrice === ''
            || newTriplePrice === ''
          }
          onClick={(event) => onCreateRate(event)}
          style={{
            ...libraryTableToolbarStyles.addBtn,
            width: width < 1000 ? '100%' : 'auto',
            height: '3rem',
            marginLeft: width < 1000 ? '0px' : '1rem',
            marginBottom: width < 1000 ? '1rem' : '0',
          }}
          size="large"
        />
      </DivAtom>
      <DivAtom style={formCreateMemberStyles.tableContainer}>
        {rateData.length > 0 && (
          <AccomodationPriceTable
            columns={[
              'START DATE',
              'END DATE',
              'MEAL PLAN',
              'SINGLE',
              'DOUBLE',
              'TRIPLE',
            ]}
            data={rateData}
          />
        )}
      </DivAtom>
    </>
  );
}

export default CreateAccomodation;
