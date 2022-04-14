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

  const [accomodationData, setAccomodationData] = useState<UserAccomodation[]>([]);
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
  const [removedAcc, setRemovedAcc] = useState(false);
  const [addedAcc, setAddedAcc] = useState(false);

  const [showValidationErrorMessage, setShowValidationErrorMessage] = useState(false);
  const [validationNightsRequired, setValidationNightssRequired] = useState(0);

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

        setSelectedAccomodationsNights(selectedAcc.map((acc) => acc.nights));
        setSelectedAccomodationsRoomTypes(selectedAcc.map((acc) => acc.roomType));
        setSelectedAccomodationsMealPlans(selectedAcc.map((acc) => acc.mealPlan));
        setSelectedAccomodations(selectedAcc);
      }

      setAccomodationData(data as UserAccomodation[]);
    };

    getInitialData();
  }, [addedAcc, removedAcc]);

  const addAccomodation = (acc: UserAccomodation) => {
    setAddedAcc(false);
    const roomTypes = Object.keys(acc.categoryValues)
      .map((cat) => ({ value: cat, label: cat }));

    const mealPlanOptions = acc.rates
      .map((rate) => rate.newMealPlan)
      .map((rate) => ({ value: rate, label: rate }));

    acc.nights = '1';
    acc.roomRate = '$50'; // do calculation
    acc.total = '$150'; // do calculation
    acc.pax = 'Single'; // do calculation
    acc.roomType = roomTypes[0].value;
    acc.mealPlan = mealPlanOptions[0].value;

    if (localStorage.getItem('New Quote Accomodation')) {
      const addedAccomodations = JSON.parse(
        localStorage.getItem('New Quote Accomodation')!,
      ).selectedAccomodations as UserAccomodation[];

      addedAccomodations.push(acc);
      localStorage.setItem('New Quote Accomodation', JSON.stringify({
        selectedAccomodations: addedAccomodations,
      }));
    } else {
      const accomodations = [acc];
      localStorage.setItem('New Quote Accomodation', JSON.stringify({
        selectedAccomodations: accomodations,
      }));
    }

    setAddedAcc(true);
  };

  const deleteAccomodation = (acc: UserAccomodation) => {
    setRemovedAcc(false);
    const removeIndex = selectedAccomodations.findIndex((ac) => ac.id === acc.id);
    const tempAccomodation = [...selectedAccomodations];
    tempAccomodation.splice(removeIndex, 1);
    localStorage.setItem('New Quote Accomodation', JSON.stringify({
      selectedAccomodations: tempAccomodation,
    }));

    setRemovedAcc(true);
  };

  const continueToCosting = () => {
    setShowValidationErrorMessage(false);

    const customerDetails = JSON.parse(
      localStorage.getItem('New Quote Customer')!,
    ).data[0];

    // Subtract 1 to equal number of nights
    const nightsRequired = getDaysDifference(customerDetails[8], customerDetails[7]) - 1;
    const totalUsedNights = selectedAccomodations.reduce((prev, curr) => (
      prev + Number(curr.nights)
    ), 0);
    setValidationNightssRequired(nightsRequired);

    if (nightsRequired !== totalUsedNights) {
      setShowValidationErrorMessage(true);
    } else {
      localStorage.setItem('New Quote Accomodation', JSON.stringify({ selectedAccomodations }));
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
                setSelectedAccomodations={setSelectedAccomodations}
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
