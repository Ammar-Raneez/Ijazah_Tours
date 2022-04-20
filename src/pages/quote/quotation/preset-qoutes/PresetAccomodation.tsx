import {
  ChangeEvent,
  useEffect,
  useState,
} from 'react';

import { CircularProgress } from '@material-ui/core';
import ChevronLeftRoundedIcon from '@material-ui/icons/ChevronLeftRounded';
import SearchIcon from '@material-ui/icons/Search';
import {
  collection,
  doc,
  getDocs,
  serverTimestamp,
  setDoc,
} from 'firebase/firestore';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { v4 as uuid } from 'uuid';

import ButtonAtom from '../../../../atoms/ButtonAtom';
import DivAtom from '../../../../atoms/DivAtom';
import H2Atom from '../../../../atoms/H2Atom';
import IconAtom from '../../../../atoms/IconAtom';
import InputAtom from '../../../../atoms/InputAtom';
import ParagraphAtom from '../../../../atoms/ParagraphAtom';
import { db } from '../../../../firebase';
import AccomodationTable from '../../../../organisms/quote/quotation/create-quotation/accomodation/AccomodationTable';
import Searchbar from '../../../../organisms/quote/quotation/create-quotation/accomodation/search-bar/Searchbar';
import { selectWith2NavbarHeight, selectWith2NavbarWidth } from '../../../../redux/containerSizeSlice';
import {
  fetchingDataIndicatorStyles,
  quoteCreateQuoteStyles,
} from '../../../../styles';
import { getDaysDifference, widthHeightDynamicStyle } from '../../../../utils/helpers';
import {
  FlexDirection,
  SettingsSingleInput,
  UserAccomodation,
} from '../../../../utils/types';

function PresetAccomodation() {
  const height = useSelector(selectWith2NavbarHeight);
  const width = useSelector(selectWith2NavbarWidth);

  const [accomodationData, setAccomodationData] = useState<UserAccomodation[]>();
  const [selectedAccomodations, setSelectedAccomodations] = useState<UserAccomodation[]>([]);

  const [accomodationTypesData, setAccomodationTypesData] = useState<SettingsSingleInput[]>();
  const [roomTypesData, setRoomTypesData] = useState<SettingsSingleInput[]>();
  const [roomViewsData, setRoomViewsData] = useState<SettingsSingleInput[]>();
  const [roomGradingsData, setRoomGradingsData] = useState<SettingsSingleInput[]>();

  const [selectedAccomodationsNights, setSelectedAccomodationsNights] = useState<string[]>([]);
  const [
    selectedAccomodationsRoomTypes,
    setSelectedAccomodationsRoomTypes,
  ] = useState<string[]>([]);

  const [
    selectedAccomodationsMealPlans,
    setSelectedAccomodationsMealPlans,
  ] = useState<string[]>([]);

  const [search, setSearch] = useState('');

  const [savingPresetQuote, setSavingPresetQuote] = useState(false);
  const [showValidationErrorMessage, setShowValidationErrorMessage] = useState(false);
  const [validationNightsRequired, setValidationNightsRequired] = useState(0);

  const history = useHistory();

  useEffect(() => {
    const getInitialData = async () => {
      const aData = (await getDocs(collection(db, 'Library Accomodation'))).docs;
      const atData = (await getDocs(collection(db, 'Settings Accomodation Types'))).docs;
      const rtData = (await getDocs(collection(db, 'Settings Room Types'))).docs;
      const vData = (await getDocs(collection(db, 'Settings Room Views'))).docs;
      const gData = (await getDocs(collection(db, 'Settings Room Gradings'))).docs;

      const accData = aData.map((dc) => dc.data());
      const accTypesData = atData.map((dc) => dc.data());
      const rTypesData = rtData.map((dc) => dc.data());
      const viewsData = vData.map((dc) => dc.data());
      const gradingsData = gData.map((dc) => dc.data());

      const accIds = aData.map((dc) => dc.id);
      const accTypesIds = atData.map((dc) => dc.id);
      const roomTypesIds = rtData.map((dc) => dc.id);
      const viewsIds = vData.map((dc) => dc.id);
      const gradingsIds = gData.map((dc) => dc.id);

      accIds.forEach((id, i) => {
        accData[i].id = id;
      });
      accTypesIds.forEach((id, i) => {
        accTypesData[i].id = id;
      });
      roomTypesIds.forEach((id, i) => {
        rTypesData[i].id = id;
      });
      viewsIds.forEach((id, i) => {
        viewsData[i].id = id;
      });
      gradingsIds.forEach((id, i) => {
        gradingsData[i].id = id;
      });

      if (localStorage.getItem('New Quote Accomodation')) {
        const selectedAcc = JSON.parse(
          localStorage.getItem('New Quote Accomodation')!,
        ).selectedAccomodations as UserAccomodation[];

        setSelectedAccomodations(selectedAcc);
      }

      setAccomodationData(accData as UserAccomodation[]);
      setAccomodationTypesData(accTypesData as SettingsSingleInput[]);
      setRoomTypesData(rTypesData as SettingsSingleInput[]);
      setRoomViewsData(viewsData as SettingsSingleInput[]);
      setRoomGradingsData(gradingsData as SettingsSingleInput[]);
    };

    getInitialData();
  }, []);

  const addAccomodation = (acc: UserAccomodation) => {
    const roomTypes = Object.keys(acc.categoryValues)
      .map((cat) => ({ value: cat, label: cat }));

    const mealPlanOptions = acc.rates
      .map((rate) => rate.newMealPlan)
      .map((rate) => ({ value: rate, label: rate }));

    acc.nights = '1';
    acc.roomRate = '';
    acc.total = '';
    acc.pax = 'Single'; // do calculation
    acc.roomType = roomTypes[0].value;
    acc.mealPlan = mealPlanOptions[0].value;

    const tempAccomodation = [...selectedAccomodations];
    tempAccomodation.push(acc);
    setSelectedAccomodations(tempAccomodation);
  };

  const deleteAccomodation = (acc: UserAccomodation) => {
    const removeIndex = selectedAccomodations.findIndex((ac) => ac.id === acc.id);
    const tempAccomodationNights = [...selectedAccomodationsNights];
    const tempAccomodationRoomTypes = [...selectedAccomodationsRoomTypes];
    const tempAccomodationMealPlans = [...selectedAccomodationsMealPlans];
    const tempAccomodation = [...selectedAccomodations];
    tempAccomodationNights.splice(removeIndex, 1);
    tempAccomodationRoomTypes.splice(removeIndex, 1);
    tempAccomodationMealPlans.splice(removeIndex, 1);
    tempAccomodation.splice(removeIndex, 1);
    setSelectedAccomodationsNights(tempAccomodationNights);
    setSelectedAccomodationsRoomTypes(tempAccomodationRoomTypes);
    setSelectedAccomodationsMealPlans(tempAccomodationMealPlans);
    setSelectedAccomodations(tempAccomodation);
  };

  const savePresetQuote = async () => {
    setShowValidationErrorMessage(false);

    const holidayDetails = JSON.parse(
      localStorage.getItem('New Preset Quote Holiday')!,
    ).data[0];

    // Subtract 1 to equal number of nights
    const nightsRequired = getDaysDifference(holidayDetails[2], holidayDetails[1]) - 1;
    setValidationNightsRequired(nightsRequired);
    const totalUsedNights = selectedAccomodationsNights.reduce((prev, curr) => (
      prev + Number(curr)
    ), 0);

    if (nightsRequired !== totalUsedNights) {
      setShowValidationErrorMessage(true);
    } else {
      setSavingPresetQuote(true);
      const tempAccomodation = [...selectedAccomodations];
      tempAccomodation.forEach((acc, index) => {
        acc.nights = selectedAccomodationsNights[index];
        acc.roomType = selectedAccomodationsRoomTypes[index];

        const needAdditionalBed = holidayDetails[5];

        const rate = acc.rates.find((r) => r.newMealPlan === holidayDetails[4]);
        if (!rate) {
          window.alert(`Rate for meal plan ${holidayDetails[4]} does not exist`);
          return;
        }

        const roomTypeCost = acc.categoryValues[
          Object.keys(acc.categoryValues)
            .find((cat) => cat === selectedAccomodationsRoomTypes[index])!
        ];

        // eslint-disable-next-line max-len
        const totalSingleSum = Number(rate?.newSinglePrice?.slice(1)) + Number(roomTypeCost.slice(1)) + (needAdditionalBed ? Number(acc.additionalBedPrice.slice(1)) : 0);
        // eslint-disable-next-line max-len
        const totalDoubleSum = Number(rate?.newDoublePrice?.slice(1)) + Number(roomTypeCost.slice(1)) + (needAdditionalBed ? Number(acc.additionalBedPrice.slice(1)) : 0);
        // eslint-disable-next-line max-len
        const totalTripleSum = Number(rate?.newTriplePrice?.slice(1)) + Number(roomTypeCost.slice(1)) + (needAdditionalBed ? Number(acc.additionalBedPrice.slice(1)) : 0);

        acc.roomRate = `$${rate?.newSinglePrice} | $${rate?.newDoublePrice} | $${rate?.newTriplePrice}`;
        acc.total = `$${String(totalSingleSum * nightsRequired + 1)} | $${String(totalDoubleSum * nightsRequired + 1)} | $${String(totalTripleSum * nightsRequired + 1)}`;
      });

      await setDoc(doc(db, 'Preset Quotes', uuid()), {
        holidayDetails: holidayDetails.slice(0, -1),
        holidayDestinations: holidayDetails[6],
        selectedAccomodations: tempAccomodation,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });

      setSavingPresetQuote(false);
      localStorage.removeItem('New Preset Quote Holiday');
      history.replace('/quote/quotations');
    }
  };

  return (
    <DivAtom style={{ height: `${height}px` }}>
      <DivAtom style={quoteCreateQuoteStyles.header}>
        <IconAtom
          size="small"
          children={<ChevronLeftRoundedIcon />}
          style={quoteCreateQuoteStyles.backBtn}
          onClick={() => history.replace('/quote/quotations/create/preset/holiday')}
        />
        <H2Atom style={quoteCreateQuoteStyles.title} text="Accomodation" />
      </DivAtom>

      {(accomodationData && accomodationTypesData
        && roomTypesData && roomViewsData && roomGradingsData) ? (
          <>
            <DivAtom style={quoteCreateQuoteStyles.tableContainer}>
              <DivAtom
                style={{
                  ...quoteCreateQuoteStyles.btnMainContainer,
                  flexDirection: widthHeightDynamicStyle(width, 768, 'column', 'row') as FlexDirection,
                }}
              >
                <ButtonAtom
                  text="Luxury"
                  style={{
                    ...quoteCreateQuoteStyles.btn,
                    marginRight: '16px',
                    marginBottom: widthHeightDynamicStyle(width, 768, '1rem', 0),
                    width: widthHeightDynamicStyle(width, 768, '100%', '11rem'),
                  }}
                  onClick={() => null}
                  size="large"
                />
                <ButtonAtom
                  text="3 Star"
                  style={{
                    ...quoteCreateQuoteStyles.btn,
                    marginRight: '16px',
                    marginBottom: widthHeightDynamicStyle(width, 768, '1rem', 0),
                    width: widthHeightDynamicStyle(width, 768, '100%', '11rem'),
                  }}
                  onClick={() => null}
                  size="large"
                />
                <ButtonAtom
                  text="Boutique"
                  style={{
                    ...quoteCreateQuoteStyles.btn,
                    marginBottom: widthHeightDynamicStyle(width, 768, '1rem', 0),
                    width: widthHeightDynamicStyle(width, 768, '100%', '11rem'),
                  }}
                  onClick={() => null}
                  size="large"
                />
              </DivAtom>
              <DivAtom style={quoteCreateQuoteStyles.searchContainer}>
                <InputAtom
                  placeholder="Search"
                  adornmentPosition="start"
                  fullWidth={width < 768}
                  value={search}
                  plain="false"
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
                  children={<SearchIcon />}
                  style={{ padding: '0.2rem' }}
                />
              </DivAtom>
              {search !== '' && (
                <DivAtom style={quoteCreateQuoteStyles.searchBar.wrapper}>
                  <Searchbar
                    searchTerm={search}
                    accomodationData={accomodationData}
                    accomodationTypesData={accomodationTypesData}
                    roomTypesData={roomTypesData}
                    roomViewsData={roomViewsData}
                    roomGradingsData={roomGradingsData}
                    addAccomodation={addAccomodation}
                  />
                </DivAtom>
              )}
              {selectedAccomodations.length > 0 && (
                <AccomodationTable
                  columns={[
                    'LOCATION',
                    'NIGHTS',
                    'CATEGORY',
                    'ACCOMODATION',
                    'PAX',
                    'ROOM TYPE',
                    'MEAL PLAN',
                    'CITY',
                    '',
                  ]}
                  selectedAccomodations={selectedAccomodations}
                  selectedAccomodationsNights={selectedAccomodationsNights}
                  selectedAccomodationsRoomTypes={selectedAccomodationsRoomTypes}
                  selectedAccomodationsMealPlans={selectedAccomodationsMealPlans}
                  setSelectedAccomodationsNights={setSelectedAccomodationsNights}
                  setSelectedAccomodationsRoomTypes={setSelectedAccomodationsRoomTypes}
                  setSelectedAccomodationsMealPlans={setSelectedAccomodationsMealPlans}
                  deleteAccomodation={deleteAccomodation}
                />
              )}
            </DivAtom>

            {showValidationErrorMessage && (
              <ParagraphAtom
                text={`Please specify the same number of nights as your departure - check-in. (Nights required - ${validationNightsRequired})`}
                style={quoteCreateQuoteStyles.errorMsg}
              />
            )}

            <DivAtom
              style={{
                ...quoteCreateQuoteStyles.addBtnContainer,
                padding: widthHeightDynamicStyle(width, 768, '1rem', 0),
                margin: widthHeightDynamicStyle(
                  width,
                  768,
                  0,
                  quoteCreateQuoteStyles.addBtnContainer.margin,
                ),
              }}
            >
              <ButtonAtom
                size="large"
                text="Save"
                endIcon={savingPresetQuote && <CircularProgress size={20} color="inherit" />}
                disabled={accomodationData.length === 0 || savingPresetQuote}
                onClick={savePresetQuote}
                style={{
                  ...quoteCreateQuoteStyles.addBtn,
                  width: widthHeightDynamicStyle(width, 768, '100%', '18%'),
                  margin: '0 0 1rem 0',
                }}
              />
            </DivAtom>
          </>
        ) : (
          <DivAtom style={fetchingDataIndicatorStyles.container}>
            <CircularProgress size={20} color="primary" />
          </DivAtom>
        )}
    </DivAtom>
  );
}

export default PresetAccomodation;
