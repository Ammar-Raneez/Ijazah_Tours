import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { CircularProgress } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { getStorage } from 'firebase/storage';
import { doc, setDoc } from 'firebase/firestore';
import { v4 as uuid } from 'uuid';
import JSPDF from 'jspdf';

import Banner from '../../../../organisms/quote/quotation/create-quotation/approval/Banner';
import ApprovalRateComparisonTable from '../../../../organisms/quote/quotation/create-quotation/approval/ApprovalRateComparisonTable';
import ApprovalOverallCost from '../../../../organisms/quote/quotation/create-quotation/approval/ApprovalOverallCost';
import GuestDetails from '../../../../organisms/quote/quotation/create-quotation/approval/GuestDetails';
import Offers from '../../../../organisms/quote/quotation/create-quotation/approval/Offers';
import DivAtom from '../../../../atoms/DivAtom';
import ParagraphAtom from '../../../../atoms/ParagraphAtom';
import IconAtom from '../../../../atoms/IconAtom';
import ButtonAtom from '../../../../atoms/ButtonAtom';
import { selectWith2NavbarHeight, selectWith2NavbarWidth } from '../../../../redux/containerSizeSlice';
import { db } from '../../../../firebase';
import { QuotationCostingRate, UserAccomodation } from '../../../../utils/types';
import { getDaysDifference, uploadPDF, widthHeightDynamicStyle } from '../../../../utils/helpers';
import { QUOTATIONS_COSTING_RATE_DATA } from '../../../../data';
import { approvalStyles, fetchingDataIndicatorStyles, quoteCreateQuoteStyles } from '../../../../styles';
import ApprovalAccomodationTable from '../../../../organisms/quote/quotation/create-quotation/approval/ApprovalAccomodationTable';

const storage = getStorage();

interface ApprovalProps {
  setCreated: any;
}

function Approval({ setCreated }: ApprovalProps) {
  const height = useSelector(selectWith2NavbarHeight);
  const width = useSelector(selectWith2NavbarWidth);

  const [rateData, setRateData] = useState<QuotationCostingRate[]>([]);
  const [accomodationData, setAccomodationData] = useState<UserAccomodation[]>();

  // Customer details
  const [refNum, setRefNum] = useState('');
  const [userId, setUserId] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [nationality, setNationality] = useState('');
  const [arrival, setArrival] = useState('');
  const [departure, setDeparture] = useState('');
  const [daysAndNights, setDaysAndNights] = useState('');
  const [voucherNo, setVoucherNo] = useState('');
  const [adults, setAdults] = useState('');
  const [children, setChildren] = useState<string[]>(['']);

  // Overall cost
  const [sellingPrice, setSellingPrice] = useState('');
  const [discount, setDiscount] = useState('');
  const [netPrice, setNetPrice] = useState('');

  // offer extras
  const [roomAndBreakfast, setRoomAndBreakfast] = useState(false);
  const [receptionAtAirport, setReceptionAtAirport] = useState(false);
  const [allGovernmentTaxes, setAllGovernmentTaxes] = useState(false);
  const [guideAndCar, setGuideAndCar] = useState(false);

  const [showRateContainer, setShowRateContainer] = useState(true);
  const [isSavingQuote, setIsSavingQuote] = useState(false);

  const history = useHistory();

  useEffect(() => {
    const customerDetails = JSON.parse(
      localStorage.getItem('New Quote Customer')!,
    ).data[0];
    const accomodationDetails: UserAccomodation[] = JSON.parse(
      localStorage.getItem('New Quote Accomodation')!,
    ).selectedAccomodations;

    setAccomodationData(accomodationDetails);

    const daysDifference = getDaysDifference(customerDetails[6], customerDetails[5]);
    setVoucherNo('2');
    setDaysAndNights(`${daysDifference + 1} - ${daysDifference}`);
    setRefNum(customerDetails[0]);
    setFirstName(customerDetails[1]);
    setLastName(customerDetails[2]);
    setNationality(customerDetails[4]);
    setArrival(customerDetails[5]);
    setDeparture(customerDetails[6]);
    setAdults(customerDetails[7]);
    setChildren(customerDetails[8]);
    setUserId(customerDetails[9]);

    const costDetails = JSON.parse(localStorage.getItem('New Quote Costing')!);
    setSellingPrice(costDetails.sellingPrice);
    setDiscount(costDetails.discount);
    setNetPrice(costDetails.netPrice);
  }, []);

  useEffect(() => {
    setRateData(QUOTATIONS_COSTING_RATE_DATA);
  }, []);

  useEffect(() => {
    setSellingPrice('$1000');
    setDiscount('$40');

    const netTotal = Number(sellingPrice.slice(1, sellingPrice.length))
      - Number(discount.slice(1, discount.length));
    setNetPrice(`$${netTotal}`);
  }, [sellingPrice, discount]);

  const deleteRate = (acc: QuotationCostingRate) => {
    const removeIndex = rateData.findIndex((ac) => ac.id === acc.id);
    const tempRates = [...rateData];
    tempRates.splice(removeIndex, 1);
    setRateData(tempRates);
  };

  const removeRateContainer = () => {
    setShowRateContainer(false);
  };

  const generatePDF = async () => {
    const report = new JSPDF('portrait', 'pt', 'a2');
    return report.html(document.querySelector('#report') as HTMLElement).then(async () => {
      const filename = `${uuid()}-${firstName}.pdf`;
      const pdfURL = await uploadPDF(storage, 'customer-quotation-pdfs', report.output('blob'), filename);
      report.save(filename);
      return pdfURL;
    });
  };

  const saveUserQuotation = async () => {
    setIsSavingQuote(true);
    setCreated(false);
    const pdfURL = await generatePDF();
    await setDoc(doc(db, 'Approval Quotations', userId), {
      refNum,
      nationality,
      arrival,
      departure,
      adults,
      children,
      netPrice,
      sellingPrice,
      discount,
      voucherNo,
      daysAndNights,
      roomAndBreakfast,
      receptionAtAirport,
      allGovernmentTaxes,
      guideAndCar,
      pdfURL,
      name: `${firstName} ${lastName}`,
      status: 'COMPLETE',
    });

    setIsSavingQuote(false);
    setCreated(true);
    history.replace('/quote/quotations');
  };

  const getSaveQuoteOffers = (val: boolean) => (val ? 'Yes' : 'No');

  const OffersContainer = () => (!isSavingQuote ? (
    <Offers
      roomAndBreakfast={roomAndBreakfast}
      receptionAtAirport={receptionAtAirport}
      allGovernmentTaxes={allGovernmentTaxes}
      guideAndCar={guideAndCar}
      setRoomAndBreakfast={setRoomAndBreakfast}
      setReceptionAtAirport={setReceptionAtAirport}
      setAllGovernmentTaxes={setAllGovernmentTaxes}
      setGuideAndCar={setGuideAndCar}
    />
  ) : (
    <DivAtom style={approvalStyles.offers.container}>
      <ParagraphAtom style={approvalStyles.titleText} text="This offer includes:" />
      <ul>
        <li>Room and Breakfast in the hotel: {getSaveQuoteOffers(roomAndBreakfast)}</li>
        <li>Reception at Airport: {getSaveQuoteOffers(receptionAtAirport)}</li>
        <li>All Government Taxes: {getSaveQuoteOffers(allGovernmentTaxes)}</li>
        <li>
          Guide and the Car.
          Transportation from Reception to Fairwell, (Throught the Trip): {getSaveQuoteOffers(guideAndCar)}
        </li>
      </ul>
    </DivAtom>
  ));

  return (
    <DivAtom style={{ height: `${height}px` }}>
      {(accomodationData && rateData) ? (
        <>
          <div id="report">
            <DivAtom style={{ padding: '2rem' }}>
              <Banner />
              <GuestDetails
                name={`${firstName} ${lastName}`}
                nationality={nationality}
                adults={adults}
                voucherNo={voucherNo}
                arrival={arrival}
                departure={departure}
                daysAndNights={daysAndNights}
                children={children}
              />
              <DivAtom style={quoteCreateQuoteStyles.tableContainer}>
                {showRateContainer && rateData.length > 0 && (
                  <>
                    <DivAtom style={approvalStyles.rates.titleContainer}>
                      <IconAtom
                        onClick={removeRateContainer}
                        style={{ padding: '8px' }}
                        size="small"
                        children={<CloseIcon style={{ color: 'black' }} />}
                      />
                      <ParagraphAtom style={approvalStyles.titleText} text="Rate Comparison" />
                    </DivAtom>
                    <ApprovalRateComparisonTable
                      columns={[
                        'Dates',
                        'Accomodation',
                        'Booking Engine',
                        'Rate',
                        '',
                      ]}
                      deleteRate={deleteRate}
                      data={rateData}
                    />
                  </>
                )}
              </DivAtom>
              {accomodationData.length > 0 && (
                <DivAtom style={{ marginTop: '1rem', ...quoteCreateQuoteStyles.tableContainer }}>
                  <ApprovalAccomodationTable
                    columns={[
                      'Nights',
                      'Accomodation',
                      'Room Type',
                      'Room View',
                    ]}
                    data={accomodationData}
                  />
                </DivAtom>
              )}
              <ApprovalOverallCost
                sellingPrice={sellingPrice}
                discount={discount}
                netPrice={netPrice}
              />
              <OffersContainer />
            </DivAtom>
          </div>

          <ButtonAtom
            size="large"
            text="Save"
            endIcon={isSavingQuote && <CircularProgress size={20} color="inherit" />}
            disabled={isSavingQuote}
            onClick={saveUserQuotation}
            style={{
              ...quoteCreateQuoteStyles.addBtn,
              width: widthHeightDynamicStyle(width, 768, '100%', '18%'),
              margin: '0 0 1rem 2rem',
            }}
          />
        </>
      ) : (
        <DivAtom style={fetchingDataIndicatorStyles.container}>
          <CircularProgress size={20} color="primary" />
        </DivAtom>
      )}
    </DivAtom>
  );
}

export default Approval;
