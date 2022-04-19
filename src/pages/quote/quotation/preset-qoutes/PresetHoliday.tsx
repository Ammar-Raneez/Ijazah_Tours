import {
  useEffect,
  useState,
  MouseEvent,
} from 'react';

import { CircularProgress } from '@material-ui/core';
import ChevronLeftRoundedIcon from '@material-ui/icons/ChevronLeftRounded';
import {
  collection,
  getDocs,
} from 'firebase/firestore';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import DivAtom from '../../../../atoms/DivAtom';
import H2Atom from '../../../../atoms/H2Atom';
import IconAtom from '../../../../atoms/IconAtom';
import { db } from '../../../../firebase';
import HolidayForm from '../../../../organisms/quote/quotation/preset-quotes/HolidayForm';
import { selectWith2NavbarHeight, selectWith2NavbarWidth } from '../../../../redux/containerSizeSlice';
import {
  fetchingDataIndicatorStyles,
  quoteCreateQuoteStyles,
} from '../../../../styles';
import { dateTypeOptions, mealPlanOptions } from '../../../../utils/helpers';
import { DropdownOption, SettingsLocation } from '../../../../utils/types';

function PresetHoliday() {
  const height = useSelector(selectWith2NavbarHeight);
  const width = useSelector(selectWith2NavbarWidth);

  const [accomodationLocationData, setAccomodationLocationData] = useState<SettingsLocation[]>();
  const [holidayTypeData, setHolidayTypeData] = useState<DropdownOption[]>();

  const [title, setTitle] = useState('');

  const [destinations, setDestinations] = useState<string[]>([]);
  const [toStoreDestinations, setToStoreDestinations] = useState<string[]>([]);
  const [additionalBed, setAdditionalBed] = useState(false);
  const [mealPlan, setMealPlan] = useState(mealPlanOptions[0].value);

  const [holidayType, setHolidayType] = useState('');
  const [checkin, setCheckin] = useState('2022-01-01');
  const [checkout, setCheckout] = useState('2022-01-31');
  const [dateType, setDateType] = useState(dateTypeOptions[0].value);

  const history = useHistory();

  useEffect(() => {
    const getInitialData = async () => {
      const hData = (await getDocs(collection(db, 'Settings Holiday Types'))).docs;
      const lData = (await getDocs(collection(db, 'Settings Locations'))).docs;

      const htData = hData.map((dc) => dc.data());
      const locData = lData.map((dc) => dc.data());

      const htIds = hData.map((dc) => dc.id);
      const locIds = lData.map((dc) => dc.id);

      htIds.forEach((id, i) => {
        htData[i].id = id;
      });
      locIds.forEach((id, i) => {
        locData[i].id = id;
      });

      const holidays = htData.map((hol) => ({
        value: hol.val,
        label: hol.val,
      }));

      setAccomodationLocationData(locData as SettingsLocation[]);
      setHolidayType(holidays[0].value);
      setHolidayTypeData(holidays);

      const storedHolidayData = localStorage.getItem('New Preset Quote Holiday');
      if (storedHolidayData) {
        const holData = JSON.parse(storedHolidayData).data[0];
        setTitle(holData[0]);
      }
    };

    getInitialData();
  }, []);

  const onCreateHoliday = (
    event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>,
  ) => {
    event.preventDefault();
    const saveCheckin = checkin.split('-').length === 2 ? `${checkin}-15` : checkin;
    const saveCheckout = checkout.split('-').length === 2 ? `${checkout}-15` : checkout;

    localStorage.setItem(
      'New Preset Quote Holiday',
      JSON.stringify({
        data: [[
          title,
          saveCheckin,
          saveCheckout,
          holidayType,
          mealPlan,
          additionalBed,
          toStoreDestinations,
        ]],
      }),
    );

    history.replace('/quote/quotations/create/preset/accomodation');
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
        <H2Atom style={quoteCreateQuoteStyles.title} text="Create Preset Quote" />
      </DivAtom>

      {holidayTypeData && accomodationLocationData ? (
        <HolidayForm
          accomodationLocationData={accomodationLocationData}
          holidayTypeData={holidayTypeData}
          width={width}
          title={title}
          holidayType={holidayType}
          destinations={destinations}
          mealPlan={mealPlan}
          dateType={dateType}
          checkin={checkin}
          checkout={checkout}
          additionalBed={additionalBed}
          onCreateHoliday={onCreateHoliday}
          setTitle={setTitle}
          setHolidayType={setHolidayType}
          setDestinations={setDestinations}
          setToStoreDestinations={setToStoreDestinations}
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

export default PresetHoliday;
