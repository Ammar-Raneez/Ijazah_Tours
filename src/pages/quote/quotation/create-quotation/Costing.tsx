import { useEffect, useState } from 'react';

import ACreateQuotationRCTable from '../../../../organisms/quote/quotation/ACreateQuotationRCTable';
import CCreateQuotationTable from '../../../../organisms/quote/quotation/CCreateQuotationTable';
import DivAtom from '../../../../atoms/DivAtom';
import ParagraphAtom from '../../../../atoms/ParagraphAtom';
import { QUOTATIONS_COSTING_ACCOMODATION_DATA, QUOTATIONS_COSTING_RATE_DATA } from '../../../../data';
import { quoteCreateQuoteStyles } from '../../../../styles';
import { QuotationCostingAccomodation, QuotationCostingRate } from '../../../../utils/types';

const roomTypes = [
  { label: 'Diluxe', value: 'Diluxe' },
  { label: 'Mega', value: 'Mega' },
  { label: 'Suite', value: 'Suite' },
];

const mealPlanOptions = [
  { label: 'BB', value: 'BB' },
  { label: 'FB', value: 'FB' },
  { label: 'HB', value: 'HB' },
];

function Costing() {
  const [width, setWidth] = useState(0);
  const [containerHeight, setContainerHeight] = useState(0);
  const [accomodationTotal, setAccomodationTotal] = useState(0);

  useEffect(() => {
    let total = 0;
    QUOTATIONS_COSTING_ACCOMODATION_DATA.forEach((rate) => {
      total += Number(rate.total.slice(1, rate.total.length));
    });
    setAccomodationTotal(total);

    setWidth(window.innerWidth);
    setContainerHeight(window.innerHeight - 220);
    const widthListener = window.addEventListener('resize', () => {
      setWidth(window.innerWidth);
    });
    const heightListener = window.addEventListener('resize', () => {
      setContainerHeight(window.innerHeight - 220);
    });

    const removeEventListeners = () => {
      window.removeEventListener('resize', widthListener as any);
      window.removeEventListener('resize', heightListener as any);
    };

    return removeEventListeners();
  }, [width, containerHeight]);

  return (
    <DivAtom style={{ height: `${containerHeight}px` }}>
      <ParagraphAtom
        style={{
          ...quoteCreateQuoteStyles.title,
          marginBottom: '1rem',
          marginLeft: '1rem',
        }}
        text="Rate Comparison"
      />
      {QUOTATIONS_COSTING_RATE_DATA.length > 0 && (
        <ACreateQuotationRCTable
          columns={[
            'Dates',
            'Accomodation',
            'Booking Engine',
            'Rate',
          ]}
          data={QUOTATIONS_COSTING_RATE_DATA as QuotationCostingRate[]}
        />
      )}
      <ParagraphAtom
        style={{
          ...quoteCreateQuoteStyles.title,
          margin: '1rem 0 1rem 1rem',
        }}
        text="Accomodation"
      />
      {QUOTATIONS_COSTING_ACCOMODATION_DATA.length > 0 && (
        <>
          <CCreateQuotationTable
            columns={[
              'LOCATION',
              'NIGHTS',
              'ACCOMODATION',
              'PAX',
              'ROOM TYPE',
              'ROOM RATE',
              'MEAL PLAN',
              'TOTAL',
            ]}
            accTotal={`$${accomodationTotal}`}
            mealPlanOptions={mealPlanOptions}
            roomTypes={roomTypes}
            data={QUOTATIONS_COSTING_ACCOMODATION_DATA as QuotationCostingAccomodation[]}
          />
        </>
      )}
      <ParagraphAtom
        style={{
          ...quoteCreateQuoteStyles.title,
          margin: '1rem 0 1rem 1rem',
        }}
        text="Transporation"
      />
    </DivAtom>
  );
}

export default Costing;
