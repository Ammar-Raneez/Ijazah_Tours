import {
  ChangeEvent, useEffect, useState, MouseEvent,
} from 'react';
import { Link, useHistory } from 'react-router-dom';
import ChevronLeftRoundedIcon from '@material-ui/icons/ChevronLeftRounded';
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import {
  collection,
  getDocs,
} from 'firebase/firestore';

import RadioButtonGroup from '../../../../molecules/RadioButtonGroup';
import FormControlInput from '../../../../molecules/FormControlInput';
import DivAtom from '../../../../atoms/DivAtom';
import H2Atom from '../../../../atoms/H2Atom';
import ButtonAtom from '../../../../atoms/ButtonAtom';
import IconAtom from '../../../../atoms/IconAtom';
import TextFieldAtom from '../../../../atoms/TextFieldAtom';
import ParagraphAtom from '../../../../atoms/ParagraphAtom';
import CheckboxAtom from '../../../../atoms/CheckboxAtom';
import { db } from '../../../../firebase';
import { DropdownOption, LibraryGuest } from '../../../../utils/types';
import {
  libraryStyles,
  TableToolbarStyles,
  quoteCreateQuoteStyles,
} from '../../../../styles';

const holidayTypes = [
  { label: 'Hotel', value: 'Hotel' },
  { label: 'Villa', value: 'Villa' },
  { label: 'Appartment', value: 'Appartment' },
];

const holidayDestinations = [
  { label: 'Hotel', value: 'Hotel' },
  { label: 'Villa', value: 'Villa' },
  { label: 'Appartment', value: 'Appartment' },
];

const mealPlanOptions = [
  { label: 'BB', value: 'BB' },
  { label: 'FB', value: 'FB' },
  { label: 'HB', value: 'HB' },
];

const dateTypeOptions = [
  { label: 'Specific Dates', value: 'specific-dates' },
  { label: 'Not Specific', value: 'not-specific' },
];

function Customer() {
  const [customerData, setCustomerData] = useState<LibraryGuest[]>([]);
  const [refData, setRefData] = useState<DropdownOption[]>([]);

  const [refNum, setRefNum] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [email, setEmail] = useState('');
  const [country, setCountry] = useState('');
  const [city, setCity] = useState('');

  const [destination, setDestination] = useState(holidayDestinations[0].value);
  const [mealPlan, setMealPlan] = useState(mealPlanOptions[0].value);
  const [additionalBed, setAdditionalBed] = useState(false);

  const [dateType, setDateType] = useState(dateTypeOptions[0].value);
  const [checkin, setCheckin] = useState('');
  const [checkout, setCheckout] = useState('');
  // const [adults, setAdults] = useState(0);
  // const [children, setChildren] = useState(0);
  // const [age, setAge] = useState(0);
  const [width, setWidth] = useState(0);
  const [containerHeight, setContainerHeight] = useState(0);
  const [numberOfDays, setNumberOfDays] = useState(0);
  const [holidayType, setHolidayType] = useState(holidayTypes[0].value);
  const history = useHistory();

  useEffect(() => {
    setWidth(window.innerWidth);
    setContainerHeight(window.innerHeight - 220);
    const widthListener = window.addEventListener('resize', () => {
      setWidth(window.innerWidth);
    });
    const heightListener = window.addEventListener('resize', () => {
      setContainerHeight(window.innerHeight - 220);
    });

    const removeEventListeners = () => {
      window.removeEventListener('resize', widthListener as any);
      window.removeEventListener('resize', heightListener as any);
    };

    return removeEventListeners();
  }, [width, containerHeight]);

  useEffect(() => {
    const getInitialData = async () => {
      const rData = (await getDocs(collection(db, `Library Guests`))).docs;
      const data = rData.map((dc) => dc.data());
      const ids = rData.map((dc) => dc.id);
      ids.forEach((id, i) => {
        data[i].id = id;
      });

      const refNums = data.map((cus) => ({
        value: cus.refNum,
        label: cus.refNum,
      }));

      setCustomerData(data as LibraryGuest[]);
      onRefNumChange(data as LibraryGuest[], refNums[0].value);
      setRefNum(refNums[0].value);
      setRefData(refNums);
    };

    getInitialData();
  }, []);

  const onRefNumChange = (data: LibraryGuest[], rf: string) => {
    setRefNum(rf);
    const customer = data.find((cus) => cus.refNum === rf);
    if (customer) {
      setFirstName(customer.name.split(' ')[0]);
      setLastName(customer.name.split(' ')[1]);
      setContactNumber(customer.tel);
      setEmail(customer.email);
      setCountry(customer.country);
      setCity(customer.city);
    }
  };

  const onCreateCustomer = (
    event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>,
  ) => {
    event.preventDefault();
    localStorage.setItem(
      'New Quote Customer',
      JSON.stringify({
        data: [[
          refNum,
          firstName,
          lastName,
          checkin,
          checkout,
          contactNumber,
          // adults,
          // children,
          // age,
          numberOfDays,
        ]],
      }),
    );

    history.replace('/quote/quotations/create/accomodation');
  };

  return (
    <DivAtom style={{ height: `${containerHeight}px` }}>
      <DivAtom style={quoteCreateQuoteStyles.header}>
        <IconAtom
          size="small"
          children={<ChevronLeftRoundedIcon />}
          style={quoteCreateQuoteStyles.backBtn}
          onClick={() => history.replace('/quote/quotations')}
        />
        <H2Atom style={quoteCreateQuoteStyles.title} text="Create Quotation" />
      </DivAtom>

      <DivAtom style={quoteCreateQuoteStyles.formContainer}>
        <ParagraphAtom
          style={{
            ...quoteCreateQuoteStyles.title,
            marginBottom: '1rem',
          }}
          text="Guest"
        />
        <DivAtom
          style={{
            ...quoteCreateQuoteStyles.multiFieldContainer,
            flexDirection: width < 600 ? 'column' : 'row',
          }}
        >
          <TextFieldAtom
            variant="standard"
            size="medium"
            label="Reference Number"
            value={refNum}
            onChange={(e: ChangeEvent<HTMLTextAreaElement>) => onRefNumChange(customerData, e.target.value)}
            options={refData}
            adornmentposition="end"
            style={{
              ...libraryStyles.textField,
              flex: 1,
              width: width < 600 ? '100%' : 'auto',
            }}
            disableUnderline={false}
            select
          />
          <Link to={`/library/guest/create`}>
            <ButtonAtom
              starticon={<AddCircleOutlineOutlinedIcon />}
              text="Add New Guest"
              style={{
                ...TableToolbarStyles.addBtn,
                width: width < 600 ? '100%' : '11rem',
                marginTop: '1rem',
                marginLeft: width < 600 ? '0px' : '1rem',
              }}
              size="large"
            />
          </Link>
        </DivAtom>
        <DivAtom
          style={{
            ...quoteCreateQuoteStyles.multiFieldContainer,
            flexDirection: width < 600 ? 'column' : 'row',
          }}
        >
          <FormControlInput
            margin={width < 600 ? '0 0 1rem 0' : '0 1rem 1rem 0'}
            flex={1}
            label="First Name"
            fullWidth
            disabled
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
            disabled
            multiline={false}
            rows={1}
            value={lastName}
            setValue={setLastName}
            placeholder="Enter Last Name"
          />
        </DivAtom>
        <DivAtom
          style={{
            ...quoteCreateQuoteStyles.multiFieldContainer,
            flexDirection: width < 600 ? 'column' : 'row',
          }}
        >
          <FormControlInput
            margin={width < 600 ? '0 0 1rem 0' : '0 1rem 1rem 0'}
            label="Contact Number"
            fullWidth
            disabled
            flex={1}
            multiline={false}
            rows={1}
            value={contactNumber}
            setValue={setContactNumber}
            placeholder="Enter Contact Number"
          />
          <FormControlInput
            margin="0 0 1rem 0"
            label="Email"
            fullWidth
            disabled
            flex={1}
            multiline={false}
            rows={1}
            value={email}
            setValue={setEmail}
            placeholder="Enter Email"
          />
        </DivAtom>
        <DivAtom
          style={{
            ...quoteCreateQuoteStyles.multiFieldContainer,
            flexDirection: width < 600 ? 'column' : 'row',
          }}
        >
          <FormControlInput
            margin={width < 600 ? '0 0 1rem 0' : '0 1rem 1rem 0'}
            label="Country"
            fullWidth
            disabled
            flex={1}
            multiline={false}
            rows={1}
            value={country}
            setValue={setCountry}
            placeholder="Enter Country"
          />
          <FormControlInput
            margin="0 0 1rem 0"
            label="City"
            fullWidth
            disabled
            flex={1}
            multiline={false}
            rows={1}
            value={city}
            setValue={setCity}
            placeholder="Enter City"
          />
        </DivAtom>
        <ParagraphAtom
          style={{
            ...quoteCreateQuoteStyles.title,
            marginBottom: '1rem',
          }}
          text="Holiday"
        />
        {/* <DivAtom
          style={{
            ...quoteCreateQuoteStyles.multiFieldContainer,
            flexDirection: width < 600 ? 'column' : 'row',
          }}
        >
          <FormControlInput
            type="number"
            margin="0 1rem 1rem 0"
            flex={1}
            label="No. of Adults"
            fullWidth
            multiline={false}
            rows={1}
            value={adults}
            setValue={setAdults}
            placeholder="Enter No. of Adults"
          />
          <FormControlInput
            type="number"
            margin="0 1rem 1rem 0"
            flex={1}
            label="No. of Children"
            fullWidth
            multiline={false}
            rows={1}
            value={children}
            setValue={setChildren}
            placeholder="Enter No. of Children"
          />
          <FormControlInput
            type="number"
            margin="0 0 1rem 0"
            flex={1}
            label="Total Age"
            disabled
            fullWidth
            multiline={false}
            rows={1}
            value={age}
            setValue={setAge}
            placeholder=""
          />
        </DivAtom> */}
        <DivAtom
          style={{
            ...quoteCreateQuoteStyles.multiFieldContainer,
            flexDirection: width < 600 ? 'column' : 'row',
          }}
        >
          <FormControlInput
            margin={width < 600 ? '0 0 1rem 0' : '0 1rem 1rem 0'}
            type="number"
            flex={1}
            label="No. of Days"
            fullWidth
            multiline={false}
            rows={1}
            value={numberOfDays}
            setValue={setNumberOfDays}
            placeholder=""
          />
          <TextFieldAtom
            variant="standard"
            size="medium"
            label="Holiday Type"
            value={holidayType}
            onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setHolidayType(e.target.value)
            }
            options={holidayTypes}
            adornmentposition="end"
            style={{
              ...libraryStyles.textField,
              flex: 1,
              width: width < 600 ? '100%' : 'auto',
              margin: width < 600 ? '0 0 1rem 0' : '0 1rem 1rem 0',
            }}
            disableUnderline={false}
            select
          />
        </DivAtom>
        <DivAtom
          style={{
            ...quoteCreateQuoteStyles.multiFieldContainer,
            flexDirection: width < 600 ? 'column' : 'row',
          }}
        >
          <TextFieldAtom
            variant="standard"
            size="medium"
            label="Destination"
            value={destination}
            onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setDestination(e.target.value)
            }
            options={holidayDestinations}
            adornmentposition="end"
            style={{
              ...libraryStyles.textField,
              flex: 1,
              width: width < 600 ? '100%' : 'auto',
              margin: width < 600 ? '0 0 1rem 0' : '0 1rem 1rem 0',
            }}
            disableUnderline={false}
            select
          />
          <RadioButtonGroup
            title="Meal Plan"
            options={mealPlanOptions}
            value={mealPlan}
            radioGroupStyle={{
              ...quoteCreateQuoteStyles.radioBtnContainer,
              margin: width < 600 ? '0' : '0 1rem',
            }}
            onChange={(e) => setMealPlan(e.target.value)}
          />
          <CheckboxAtom
            label="Additional Bed"
            name="additional-bed"
            checked={additionalBed}
            style={quoteCreateQuoteStyles.singleCheckbox}
            onChange={() => setAdditionalBed(!additionalBed)}
          />
        </DivAtom>
        <DivAtom
          style={{
            ...quoteCreateQuoteStyles.multiFieldContainer,
            flexDirection: 'column',
          }}
        >
          <RadioButtonGroup
            title="Date Type"
            options={dateTypeOptions}
            value={dateType}
            radioGroupStyle={{
              ...quoteCreateQuoteStyles.radioBtnContainer,
              margin: width < 600 ? '0' : '0 1rem',
            }}
            onChange={(e) => setDateType(e.target.value)}
          />
          {dateType === dateTypeOptions[0].value ? (
            <DivAtom>
              <TextFieldAtom
                variant="standard"
                size="medium"
                label="Check-in"
                value={checkin}
                onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setCheckin(e.target.value)
                }
                adornmentposition="end"
                style={{
                  ...libraryStyles.textField,
                  flex: 1,
                  width: width < 600 ? '100%' : 'auto',
                  margin: width < 600 ? '0 0 1rem 0' : '0 1rem 0 0',
                }}
                disableUnderline={false}
                select={false}
                focused
                type="date"
              />
              <TextFieldAtom
                variant="standard"
                size="medium"
                label="Checkout"
                value={checkout}
                onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setCheckout(e.target.value)
                }
                adornmentposition="end"
                style={{
                  ...libraryStyles.textField,
                  flex: 1,
                  width: width < 600 ? '100%' : 'auto',
                }}
                disableUnderline={false}
                select={false}
                focused
                type="date"
              />
            </DivAtom>
          ) : (
            <DivAtom>
              <TextFieldAtom
                variant="standard"
                size="medium"
                label="Check-in"
                value={checkin}
                onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setCheckin(e.target.value)
                }
                adornmentposition="end"
                style={{
                  ...libraryStyles.textField,
                  flex: 1,
                  width: width < 600 ? '100%' : 'auto',
                  margin: width < 600 ? '0 0 1rem 0' : '0 1rem 0 0',
                }}
                disableUnderline={false}
                select={false}
                focused
                type="month"
              />
              <TextFieldAtom
                variant="standard"
                size="medium"
                label="Checkout"
                value={checkout}
                onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setCheckout(e.target.value)
                }
                adornmentposition="end"
                style={{
                  ...libraryStyles.textField,
                  flex: 1,
                  width: width < 600 ? '100%' : 'auto',
                }}
                disableUnderline={false}
                select={false}
                focused
                type="month"
              />
            </DivAtom>
          )}
        </DivAtom>
      </DivAtom>
      <DivAtom
        style={{
          ...quoteCreateQuoteStyles.addBtnContainer,
          padding: width < 768 ? '1rem' : '0px',
          margin:
            width < 768 ? '0px' : quoteCreateQuoteStyles.addBtnContainer.margin,
        }}
      >
        <ButtonAtom
          size="large"
          text="Continue"
          onClick={(event) => onCreateCustomer(event)}
          style={{
            ...quoteCreateQuoteStyles.addBtn,
            width: width < 768 ? '100%' : '18%',
            margin: '0 0 1rem 0',
          }}
        />
      </DivAtom>
    </DivAtom>
  );
}

export default Customer;
