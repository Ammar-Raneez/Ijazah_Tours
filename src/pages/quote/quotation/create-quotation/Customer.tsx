import {
  useEffect, useState, MouseEvent,
} from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { CircularProgress } from '@material-ui/core';
import ChevronLeftRoundedIcon from '@material-ui/icons/ChevronLeftRounded';
import {
  collection,
  getDocs,
} from 'firebase/firestore';

import CustomerForm from '../../../../organisms/quote/quotation/create-quotation/customer/CustomerForm';
import DivAtom from '../../../../atoms/DivAtom';
import H2Atom from '../../../../atoms/H2Atom';
import IconAtom from '../../../../atoms/IconAtom';
import { selectWith2NavbarHeight, selectWith2NavbarWidth } from '../../../../redux/containerSizeSlice';
import { db } from '../../../../firebase';
import { DropdownOption, LibraryGuest } from '../../../../utils/types';
import { dateTypeOptions, mealPlanOptions } from '../../../../utils/helpers';
import {
  fetchingDataIndicatorStyles,
  quoteCreateQuoteStyles,
} from '../../../../styles';

function Customer() {
  const height = useSelector(selectWith2NavbarHeight);
  const width = useSelector(selectWith2NavbarWidth);

  const [customerData, setCustomerData] = useState<LibraryGuest[]>();
  const [refData, setRefData] = useState<DropdownOption[]>();
  const [holidayTypeData, setHolidayTypeData] = useState<DropdownOption[]>();
  const [destinationData, setDestinationData] = useState<DropdownOption[]>();

  const [selectedCustomer, setSelectedCustomer] = useState<LibraryGuest>();
  const [refNum, setRefNum] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [email, setEmail] = useState('');
  const [country, setCountry] = useState('');
  const [city, setCity] = useState('');

  const [destination, setDestination] = useState('');
  const [additionalBed, setAdditionalBed] = useState(false);
  const [mealPlan, setMealPlan] = useState(mealPlanOptions[0].value);

  const [holidayType, setHolidayType] = useState('');
  const [checkin, setCheckin] = useState('2022-01-01');
  const [checkout, setCheckout] = useState('2022-01-31');
  const [dateType, setDateType] = useState(dateTypeOptions[0].value);

  const history = useHistory();

  useEffect(() => {
    const getInitialData = async () => {
      const rData = (await getDocs(collection(db, `Library Guests`))).docs;
      const hData = (await getDocs(collection(db, `Settings Holiday Types`))).docs;
      const dData = (await getDocs(collection(db, `Library Accomodation`))).docs;

      const rfData = rData.map((dc) => dc.data());
      const htData = hData.map((dc) => dc.data());
      const deData = dData.map((dc) => dc.data());

      const rfIds = rfData.map((dc) => dc.id);
      const htIds = htData.map((dc) => dc.id);
      const deIds = deData.map((dc) => dc.id);

      rfIds.forEach((id, i) => {
        rfData[i].id = id;
      });
      htIds.forEach((id, i) => {
        htData[i].id = id;
      });
      deIds.forEach((id, i) => {
        deData[i].id = id;
      });

      const refNums = rfData.map((cus) => ({
        value: cus.refNum,
        label: cus.refNum,
      }));
      const holidays = htData.map((hol) => ({
        value: hol.val,
        label: hol.val,
      }));
      const destinations = deData.map((des) => ({
        value: des.name,
        label: des.name,
      }));

      setCustomerData(rfData as LibraryGuest[]);
      onRefNumChange(rfData as LibraryGuest[], refNums[0].value);

      setRefNum(refNums[0].value);
      setHolidayType(holidays[0].value);
      setDestination(destinations[0].value);

      setRefData(refNums);
      setHolidayTypeData(holidays);
      setDestinationData(destinations);
    };

    getInitialData();
  }, []);

  const onRefNumChange = (data: LibraryGuest[], rf: string) => {
    setRefNum(rf);
    const customer = data.find((cus) => cus.refNum === rf);
    setSelectedCustomer(customer);
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
    const saveCheckin = checkin.split('-').length === 2 ? `${checkin}-15` : checkin;
    const saveCheckout = checkout.split('-').length === 2 ? `${checkout}-15` : checkout;

    localStorage.setItem(
      'New Quote Customer',
      JSON.stringify({
        data: [[
          refNum,
          firstName,
          lastName,
          contactNumber,
          country,
          saveCheckin,
          saveCheckout,
          selectedCustomer?.adults,
          selectedCustomer?.childrenAges,
        ]],
      }),
    );

    history.replace('/quote/quotations/create/accomodation');
  };

  return (
    <DivAtom style={{ height: `${height}px` }}>
      <DivAtom style={quoteCreateQuoteStyles.header}>
        <IconAtom
          size="small"
          children={<ChevronLeftRoundedIcon />}
          style={quoteCreateQuoteStyles.backBtn}
          onClick={() => history.replace('/quote/quotations')}
        />
        <H2Atom style={quoteCreateQuoteStyles.title} text="Create Quotation" />
      </DivAtom>

      {customerData && refData && holidayTypeData && destinationData ? (
        <CustomerForm
          customerData={customerData}
          refData={refData}
          holidayTypeData={holidayTypeData}
          destinationData={destinationData}
          width={width}
          refNum={refNum}
          firstName={firstName}
          lastName={lastName}
          contactNumber={contactNumber}
          email={email}
          country={country}
          city={city}
          holidayType={holidayType}
          destination={destination}
          mealPlan={mealPlan}
          dateType={dateType}
          checkin={checkin}
          checkout={checkout}
          additionalBed={additionalBed}
          onCreateCustomer={onCreateCustomer}
          onRefNumChange={onRefNumChange}
          setFirstName={setFirstName}
          setLastName={setLastName}
          setContactNumber={setContactNumber}
          setEmail={setEmail}
          setCountry={setCountry}
          setCity={setCity}
          setHolidayType={setHolidayType}
          setDestination={setDestination}
          setMealPlan={setMealPlan}
          setAdditionalBed={setAdditionalBed}
          setDateType={setDateType}
          setCheckin={setCheckin}
          setCheckout={setCheckout}
        />
      ) : (
        <DivAtom style={fetchingDataIndicatorStyles.container}>
          <CircularProgress size={20} color="primary" />
        </DivAtom>
      )}
    </DivAtom>
  );
}

export default Customer;
