import { useEffect, useState } from 'react';
import CloseIcon from '@material-ui/icons/Close';
import { useSelector } from 'react-redux';

import Banner from '../../../../organisms/quote/quotation/create-quotation/approval/Banner';
import ApprovalRateComparisonTable from '../../../../organisms/quote/quotation/create-quotation/approval/ApprovalRateComparisonTable';
import ApprovalAccomodationTable from '../../../../organisms/quote/quotation/create-quotation/approval/ApprovalAccomodationTable';
import ApprovalOverallCost from '../../../../organisms/quote/quotation/create-quotation/approval/ApprovalOverallCost';
import GuestDetails from '../../../../organisms/quote/quotation/create-quotation/approval/GuestDetails';
import Offers from '../../../../organisms/quote/quotation/create-quotation/approval/Offers';
import DivAtom from '../../../../atoms/DivAtom';
import ParagraphAtom from '../../../../atoms/ParagraphAtom';
import IconAtom from '../../../../atoms/IconAtom';
import { selectWith2NavbarHeight } from '../../../../redux/containerSizeSlice';
import { QuotationCostingAccomodation, QuotationCostingRate } from '../../../../utils/types';
import { QUOTATIONS_COSTING_ACCOMODATION_DATA, QUOTATIONS_COSTING_RATE_DATA } from '../../../../data';
import { approvalStyles, quoteCreateQuoteStyles } from '../../../../styles';

function Approval() {
  const height = useSelector(selectWith2NavbarHeight);

  const [rateData, setRateData] = useState<QuotationCostingRate[]>([]);

  // Customer details
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

  useEffect(() => {
    const customerDetails = JSON.parse(
      localStorage.getItem('New Quote Customer')!,
    ).data[0];

    setVoucherNo('2');
    setDaysAndNights('3-2');
    setFirstName(customerDetails[1]);
    setLastName(customerDetails[2]);
    setNationality(customerDetails[4]);
    setArrival(customerDetails[5]);
    setDeparture(customerDetails[6]);
    setAdults(customerDetails[7]);
    setChildren(customerDetails[8]);

    const costDetails = JSON.parse(localStorage.getItem('Create Quote Costing')!);
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

  return (
    <DivAtom style={{ height: `${height}px` }}>
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
          {showRateContainer && QUOTATIONS_COSTING_RATE_DATA.length > 0 && (
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
        {QUOTATIONS_COSTING_ACCOMODATION_DATA.length > 0 && (
          <DivAtom style={{ marginTop: '1rem', ...quoteCreateQuoteStyles.tableContainer }}>
            <ApprovalAccomodationTable
              columns={[
                'Nights',
                'Accomodation',
                'Room Type',
                'Room View',
              ]}
              data={QUOTATIONS_COSTING_ACCOMODATION_DATA as QuotationCostingAccomodation[]}
            />
          </DivAtom>
        )}
        <ApprovalOverallCost
          sellingPrice={sellingPrice}
          discount={discount}
          netPrice={netPrice}
        />
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
      </DivAtom>
    </DivAtom>
  );
}

export default Approval;
