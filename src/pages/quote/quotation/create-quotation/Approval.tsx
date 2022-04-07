import { useEffect, useState } from 'react';
import CloseIcon from '@material-ui/icons/Close';
import { useSelector } from 'react-redux';

import Banner from '../../../../organisms/quote/quotation/create-quotation/approval/Banner';
import ApprovalRateComparisonTable from '../../../../organisms/quote/quotation/create-quotation/approval/ApprovalRateComparisonTable';
import ApprovalAccomodationTable from '../../../../organisms/quote/quotation/create-quotation/approval/ApprovalAccomodationTable';
import ApprovalOverallCost from '../../../../organisms/quote/quotation/create-quotation/approval/ApprovalOverallCost';
import DivAtom from '../../../../atoms/DivAtom';
import { selectWith2NavbarHeight } from '../../../../redux/containerSizeSlice';
import { QuotationCostingAccomodation, QuotationCostingRate } from '../../../../utils/types';
import { QUOTATIONS_COSTING_ACCOMODATION_DATA, QUOTATIONS_COSTING_RATE_DATA } from '../../../../data';
import { approvalStyles, quoteCreateQuoteStyles } from '../../../../styles';
import ParagraphAtom from '../../../../atoms/ParagraphAtom';
import IconAtom from '../../../../atoms/IconAtom';

function Approval() {
  const height = useSelector(selectWith2NavbarHeight);

  const [rateData, setRateData] = useState<QuotationCostingRate[]>([]);

  const [sellingPrice, setSellingPrice] = useState('');
  const [discount, setDiscount] = useState('');
  const [netPrice, setNetPrice] = useState('');

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
      <Banner />
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
              <ParagraphAtom style={approvalStyles.rates.titleText} text="Rate Comparison" />
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
    </DivAtom>
  );
}

export default Approval;
