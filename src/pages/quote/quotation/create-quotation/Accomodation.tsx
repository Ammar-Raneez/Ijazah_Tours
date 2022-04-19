import {
  ChangeEvent,
  useEffect,
  useState,
} from 'react';

import { CircularProgress } from '@material-ui/core';
import ChevronLeftRoundedIcon from '@material-ui/icons/ChevronLeftRounded';
import SearchIcon from '@material-ui/icons/Search';
import { collection, getDocs } from 'firebase/firestore';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import ButtonAtom from '../../../../atoms/ButtonAtom';
import DivAtom from '../../../../atoms/DivAtom';
import H2Atom from '../../../../atoms/H2Atom';
import IconAtom from '../../../../atoms/IconAtom';
import InputAtom from '../../../../atoms/InputAtom';
import ParagraphAtom from '../../../../atoms/ParagraphAtom';
import { db } from '../../../../firebase';
import AccomodationTable from '../../../../organisms/quote/quotation/create-quotation/accomodation/AccomodationTable';
import { selectWith2NavbarHeight, selectWith2NavbarWidth } from '../../../../redux/containerSizeSlice';
import {
  fetchingDataIndicatorStyles,
  quoteCreateQuoteStyles,
} from '../../../../styles';
import { getDaysDifference, widthHeightDynamicStyle } from '../../../../utils/helpers';
import { FlexDirection, UserAccomodation } from '../../../../utils/types';

function Accomodation() {
  const height = useSelector(selectWith2NavbarHeight);
  const width = useSelector(selectWith2NavbarWidth);

  const [accomodationData, setAccomodationData] = useState<UserAccomodation[]>();
  const [selectedAccomodations, setSelectedAccomodations] = useState<UserAccomodation[]>([]);

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

  const [showValidationErrorMessage, setShowValidationErrorMessage] = useState(false);
  const [validationNightsRequired, setValidationNightsRequired] = useState(0);

  const history = useHistory();

  useEffect(() => {
    const getInitialData = async () => {
      const aData = (await getDocs(collection(db, 'Library Accomodation'))).docs;
      const data = aData.map((dc) => dc.data());
      const ids = aData.map((dc) => dc.id);
      ids.forEach((id, i) => {
        data[i].id = id;
      });

      if (localStorage.getItem('New Quote Accomodation')) {
        const selectedAcc = JSON.parse(
          localStorage.getItem('New Quote Accomodation')!,
        ).selectedAccomodations as UserAccomodation[];

        setSelectedAccomodations(selectedAcc);
      }

      setAccomodationData(data as UserAccomodation[]);
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

  const continueToCosting = () => {
    setShowValidationErrorMessage(false);

    const customerDetails = JSON.parse(
      localStorage.getItem('New Quote Customer')!,
    ).data[0];

    // Subtract 1 to equal number of nights
    const nightsRequired = getDaysDifference(customerDetails[8], customerDetails[7]) - 1;
    setValidationNightsRequired(nightsRequired);
    const totalUsedNights = selectedAccomodationsNights.reduce((prev, curr) => (
      prev + Number(curr)
    ), 0);

    if (nightsRequired !== totalUsedNights) {
      setShowValidationErrorMessage(true);
    } else {
      const tempAccomodation = [...selectedAccomodations];
      tempAccomodation.forEach((acc, index) => {
        acc.nights = selectedAccomodationsNights[index];
        acc.roomType = selectedAccomodationsRoomTypes[index];

        const children = customerDetails[10].length;
        const adults = customerDetails[9];
        const days = nightsRequired + 1;
        const totalGuests = Number(children) + Number(adults);
        const needAdditionalBed = customerDetails[14];

        const rate = acc.rates.find((r) => r.newMealPlan === customerDetails[13]);
        if (!rate) {
          window.alert(`Rate for meal plan ${customerDetails[13]} does not exist`);
          return;
        }

        let roomPrice = rate?.newSinglePrice;
        if (totalGuests >= 3) {
          roomPrice = rate?.newTriplePrice;
        } else if (totalGuests >= 2) {
          roomPrice = rate?.newDoublePrice;
        }

        const roomTypeCost = acc.categoryValues[
          Object.keys(acc.categoryValues)
            .find((cat) => cat === selectedAccomodationsRoomTypes[index])!
        ];

        // eslint-disable-next-line max-len
        const totalSum = Number(roomPrice?.slice(1)) + Number(roomTypeCost.slice(1)) + (needAdditionalBed ? Number(acc.additionalBedPrice.slice(1)) : 0);

        acc.roomRate = `$${roomPrice}`;
        acc.total = `$${String(totalSum * days)}`;
      });

      localStorage.setItem('New Quote Accomodation', JSON.stringify({ selectedAccomodations: tempAccomodation }));
      history.replace('/quote/quotations/create/costing');
    }
  };

  return (
    <DivAtom style={{ height: `${height}px` }}>
      <DivAtom style={quoteCreateQuoteStyles.header}>
        <IconAtom
          size="small"
          children={<ChevronLeftRoundedIcon />}
          style={quoteCreateQuoteStyles.backBtn}
          onClick={() => history.replace('/quote/quotations/create/customer')}
        />
        <H2Atom style={quoteCreateQuoteStyles.title} text="Accomodation" />
      </DivAtom>

      {accomodationData ? (
        <>
          <ParagraphAtom
            style={{
              ...quoteCreateQuoteStyles.title,
              margin: '1rem 0 1rem 1rem',
            }}
            text="Preset Quotes"
          />
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
                onClick={() => addAccomodation(accomodationData[0])}
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
                onClick={() => addAccomodation(accomodationData[1])}
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
              text="Continue"
              disabled={accomodationData.length === 0}
              onClick={continueToCosting}
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

export default Accomodation;
