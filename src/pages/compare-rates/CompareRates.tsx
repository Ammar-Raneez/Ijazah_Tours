import { ChangeEvent, useEffect, useState } from 'react';

import {
  CircularProgress,
  TextField,
} from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import axios from 'axios';
import { collection, getDocs } from 'firebase/firestore';
import { useSelector } from 'react-redux';

import ButtonAtom from '../../atoms/ButtonAtom';
import DivAtom from '../../atoms/DivAtom';
import InputAtom from '../../atoms/InputAtom';
import { db } from '../../firebase';
import { Hotels } from '../../hotels';
import FormControlInput from '../../molecules/FormControlInput';
import AccomodationCard from '../../organisms/compare-rates/AccomodationCard';
import { selectWithoutNavbarHeight, selectWithoutNavbarWidth } from '../../redux/containerSizeSlice';
import { compareRatesStyles, fetchingDataIndicatorStyles, libraryStyles } from '../../styles';
import { getDaysDifference, widthHeightDynamicStyle, XOTELO_BASE_URL } from '../../utils/helpers';
import { FlexDirection, CompareRatesAccomdation } from '../../utils/types';

function CompareRates() {
  const height = useSelector(selectWithoutNavbarHeight);
  const width = useSelector(selectWithoutNavbarWidth);

  const [search, setSearch] = useState('');
  const [invalidDate, setInvalidDate] = useState(false);

  const [checkin, setCheckin] = useState(new Date().toISOString().split('T')[0]);
  const [checkout, setCheckout] = useState(new Date().toISOString().split('T')[0]);
  const [guests, setGuests] = useState(0);

  const [accomodationData, setAccomodationData] = useState<CompareRatesAccomdation[]>();
  const [
    currentSearchedAccomodation,
    setCurrentSearchedAccomodation,
  ] = useState<CompareRatesAccomdation>();
  const [xoteloAccomodations, setXoteloAccomodations] = useState<any[]>();

  useEffect(() => {
    const getInitialData = async () => {
      const aData = (await getDocs(collection(db, 'Library Accomodation'))).docs;
      const accData = aData.map((dc) => dc.data());
      const accIds = aData.map((dc) => dc.id);
      accIds.forEach((id, i) => {
        accData[i].id = id;
      });

      accData.forEach((acc) => {
        acc.bookingEngine = 'Ijazah Tours';
        acc.roomTypes = Object.keys(acc.categoryValues);
        acc.accGradings = acc.gradings
          .filter((g: { checked: boolean }) => g.checked)
          .map((g: { val: string }) => g.val);
      });

      setAccomodationData(accData as CompareRatesAccomdation[]);
    };

    getInitialData();
  }, []);

  const searchAccomodation = async () => {
    setInvalidDate(false);
    if (search.trim() === '') {
      setCurrentSearchedAccomodation(undefined);
      setXoteloAccomodations(undefined);
      return;
    }

    const currentDate = new Date().valueOf();
    if (new Date(checkin).valueOf() > new Date(checkout).valueOf()
      || new Date(checkin).valueOf() < currentDate) {
      setInvalidDate(true);
      return;
    }

    const nightsRequired = getDaysDifference(checkout, checkin) || 0;
    const selectedAccomodation = accomodationData!.find((acc) => (
      acc.name === search
    ));

    if (selectedAccomodation) {
      await searchXoteloAPI(selectedAccomodation);

      const rate = selectedAccomodation.rates[0];
      const guestPrice = Number(rate.newSinglePrice.slice(1)) * guests;
      const temp = { ...selectedAccomodation };
      temp.total = `$${guestPrice * nightsRequired}`;
      setCurrentSearchedAccomodation(temp);
    }
  };

  const searchXoteloAPI = async (selectedAccomodation: CompareRatesAccomdation) => {
    const results = await axios.get(`${XOTELO_BASE_URL}rates`, {
      params: {
        hotel_key: Hotels[selectedAccomodation.name as keyof typeof Hotels],
        chk_in: checkin,
        chk_out: checkout,
        adults: guests,
      },
    });

    const requiredRates = results.data.result?.rates?.filter((r: any) => (
      r.name === 'Agoda.com' || r.name === 'Booking.com'
    ));

    requiredRates.forEach((r: any) => {
      r.bookingEngine = r.name;
      r.name = selectedAccomodation.name;
      r.country = selectedAccomodation.country;
      r.city = selectedAccomodation.city;
      r.total = `$${r.rate + r.tax}`;
      r.accGradings = [];
      r.roomTypes = [];
    });

    setXoteloAccomodations(requiredRates || []);
  };

  const RenderData = () => (
    currentSearchedAccomodation && xoteloAccomodations ? (
      <DivAtom>
        <AccomodationCard accomodation={currentSearchedAccomodation} />
        {xoteloAccomodations.map((acc, index) => (
          <AccomodationCard accomodation={acc} key={index} />
        ))}
      </DivAtom>
    ) : (
      <DivAtom style={fetchingDataIndicatorStyles.container}>
        <CircularProgress size={20} color="primary" />
      </DivAtom>
    )
  );

  return (
    <DivAtom style={compareRatesStyles.container}>
      <DivAtom
        style={{
          ...compareRatesStyles.innerContainer,
          ...compareRatesStyles.mainContainer,
          height: `${height}px`,
        }}
      >
        {accomodationData ? (
          <>
            <DivAtom
              style={{
                ...compareRatesStyles.toolsContainer,
                flexDirection: widthHeightDynamicStyle(width, 600, 'column', 'row') as FlexDirection,
              }}
            >
              <DivAtom
                style={{
                  ...compareRatesStyles.searchContainer,
                  margin: widthHeightDynamicStyle(width, 600, '0 0 1rem 0', '0 1rem 0 0'),
                }}
              >
                <Autocomplete
                  id="autocomplete-search-field"
                  freeSolo
                  onChange={(_, value) => setSearch(value || '')}
                  options={accomodationData.map((acc) => acc.name)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Search"
                      style={{ width: '200px' }}
                    />
                  )}
                />
              </DivAtom>
              <InputAtom
                fullWidth={false}
                value={checkin}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setCheckin(e.target.value)}
                adornmentPosition="end"
                style={{
                  ...libraryStyles.textField,
                  margin: widthHeightDynamicStyle(width, 600, '0 0 1rem 0', '0 1rem 0 0'),
                }}
                type="date"
                minValue={new Date().toISOString().split('T')[0]}
              />
              <InputAtom
                fullWidth={false}
                value={checkout}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setCheckout(e.target.value)}
                adornmentPosition="end"
                style={{
                  ...libraryStyles.textField,
                  margin: widthHeightDynamicStyle(width, 600, '0 0 1rem 0', '0 1rem 0 0'),
                }}
                type="date"
                minValue={new Date().toISOString().split('T')[0]}
              />
            </DivAtom>
            <DivAtom
              style={{
                ...compareRatesStyles.toolsContainer,
                flexDirection: widthHeightDynamicStyle(width, 600, 'column', 'row') as FlexDirection,
                marginBottom: '2rem',
              }}
            >
              <FormControlInput
                margin="1rem 1rem 0 0"
                label="Guests"
                fullWidth
                multiline={false}
                rows={1}
                width="100px"
                value={guests}
                setValue={setGuests}
                placeholder="No. of Guests"
                type="number"
              />
              <ButtonAtom
                text="Search"
                style={{
                  ...compareRatesStyles.btn,
                  width: widthHeightDynamicStyle(width, 600, '100%', '11rem'),
                }}
                onClick={searchAccomodation}
                size="large"
              />
            </DivAtom>
            {invalidDate && (
              <DivAtom style={{ paddingLeft: '1rem' }}>
                <p style={{ color: 'red', textAlign: 'center' }}>
                  {/* eslint-disable-next-line max-len */}
                  Invalid Date - please make sure that the selected dates are in the future and the checkout date is ahead of the checkin date
                </p>
              </DivAtom>
            )}
            <RenderData />
          </>
        ) : (
          <DivAtom style={fetchingDataIndicatorStyles.container}>
            <CircularProgress size={20} color="primary" />
          </DivAtom>
        )}
      </DivAtom>
    </DivAtom>
  );
}

export default CompareRates;
