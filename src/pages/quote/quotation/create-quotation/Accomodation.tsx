import {
  ChangeEvent,
  useEffect,
  useState,
} from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { CircularProgress } from '@material-ui/core';
import ChevronLeftRoundedIcon from '@material-ui/icons/ChevronLeftRounded';
import SearchIcon from '@material-ui/icons/Search';
import { collection, getDocs } from 'firebase/firestore';

import AccomodationTable from '../../../../organisms/quote/quotation/create-quotation/accomodation/AccomodationTable';
import DivAtom from '../../../../atoms/DivAtom';
import ButtonAtom from '../../../../atoms/ButtonAtom';
import ParagraphAtom from '../../../../atoms/ParagraphAtom';
import InputAtom from '../../../../atoms/InputAtom';
import IconAtom from '../../../../atoms/IconAtom';
import H2Atom from '../../../../atoms/H2Atom';
import { selectWith2NavbarHeight, selectWith2NavbarWidth } from '../../../../redux/containerSizeSlice';
import { db } from '../../../../firebase';
import { FlexDirection, UserAccomodation } from '../../../../utils/types';
import { getDaysDifference, widthHeightDynamicStyle } from '../../../../utils/helpers';
import {
  fetchingDataIndicatorStyles,
  quoteCreateQuoteStyles,
} from '../../../../styles';

function Accomodation() {
  const height = useSelector(selectWith2NavbarHeight);
  const width = useSelector(selectWith2NavbarWidth);

  const [accomodationData, setAccomodationData] = useState<UserAccomodation[]>([]);
  const [selectedAccomodations, setSelectedAccomodations] = useState<UserAccomodation[]>([]);

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
        setSelectedAccomodations(
          JSON.parse(
            localStorage.getItem('New Quote Accomodation')!,
          ).selectedAccomodations as UserAccomodation[],
        );
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
    const selectedAccomodationDetails: UserAccomodation[] = JSON.parse(
      localStorage.getItem('New Quote Accomodation')!,
    ).selectedAccomodations;

    // Subtract 1 to equal number of nights
    const nightsRequired = getDaysDifference(customerDetails[6], customerDetails[5]) - 1;
    const totalUsedNights = selectedAccomodationDetails.reduce((prev, curr) => (
      prev + Number(curr.nights)
    ), 0);
    setValidationNightssRequired(nightsRequired);

    if (nightsRequired !== totalUsedNights) {
      setShowValidationErrorMessage(true);
    } else {
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
                deleteAccomodation={deleteAccomodation}
                data={selectedAccomodations}
              />
            )}
          </DivAtom>

          {showValidationErrorMessage && (
            <ParagraphAtom
              // eslint-disable-next-line max-len
              text={`Please specify the same number of nights as your departure - check-in. (Nights required - ${validationNightsRequired})`}
              style={quoteCreateQuoteStyles.errorMsg}
            />
          )}

          <DivAtom
            style={{
              ...quoteCreateQuoteStyles.addBtnContainer,
              padding: widthHeightDynamicStyle(width, 768, '1rem', 0),
              margin: widthHeightDynamicStyle(width, 768, 0, quoteCreateQuoteStyles.addBtnContainer.margin),
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
