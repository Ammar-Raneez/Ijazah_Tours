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
          name="Ammar"
          nationality="LK"
          adults="2"
          voucherNo="2"
          arrival="28 sept"
          departure="31 sept"
          daysAndNights="4 - 3"
          children={['4', '5']}
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
