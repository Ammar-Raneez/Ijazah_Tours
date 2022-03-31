import { useEffect, useState } from 'react';

import CostingRateComparisonTable from '../../../../organisms/quote/quotation/create-quotation/costing/CostingRateComparisonTable';
import CostingAccomodationTable from '../../../../organisms/quote/quotation/create-quotation/costing/CostingAccomodationTable';
import CostingTransport from '../../../../organisms/quote/quotation/create-quotation/costing/CostingTransport';
import DivAtom from '../../../../atoms/DivAtom';
import ParagraphAtom from '../../../../atoms/ParagraphAtom';
import { QUOTATIONS_COSTING_ACCOMODATION_DATA, QUOTATIONS_COSTING_RATE_DATA } from '../../../../data';
import { quoteCreateQuoteStyles } from '../../../../styles';
import { QuotationCostingAccomodation, QuotationCostingRate } from '../../../../utils/types';
import CostingOverallCost from '../../../../organisms/quote/quotation/create-quotation/costing/CostingOverallCost';
import ButtonAtom from '../../../../atoms/ButtonAtom';

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
  // Overall cost
  const [totalExpense, setTotalExpense] = useState('');
  const [commission, setCommission] = useState('30%');
  const [totalPrice, setTotalPrice] = useState('');
  const [sellingPrice, setSellingPrice] = useState('$1000');
  const [discount, setDiscount] = useState('$40');
  const [netPrice, setNetPrice] = useState('');

  // transport
  const [rate, setRate] = useState('$60');
  const [days, setDays] = useState('6');
  const [transport, setTransport] = useState('0');

  // accomodation
  const [accomodationTotal, setAccomodationTotal] = useState('0');

  const [width, setWidth] = useState(0);
  const [containerHeight, setContainerHeight] = useState(0);

  useEffect(() => {
    let accTotal = 0;
    QUOTATIONS_COSTING_ACCOMODATION_DATA.forEach((rt) => {
      accTotal += Number(rt.total.slice(1, rt.total.length));
    });
    setAccomodationTotal(`$${accTotal}`);

    const transportTotal = Number(rate.slice(1, rate.length)) * Number(days);
    setTransport(`$${transportTotal}`);

    const expenseTotal = Number(accTotal + transportTotal);
    setTotalExpense(`$${expenseTotal}`);

    const priceTotal = ((Number(commission.slice(0, commission.length - 1)) + 100) / 100) * expenseTotal;
    setTotalPrice(`$${priceTotal}`);

    const netTotal = Number(sellingPrice.slice(1, sellingPrice.length))
      - Number(discount.slice(1, discount.length));
    setNetPrice(`$${netTotal}`);
  }, [rate, commission, sellingPrice, discount]);

  useEffect(() => {
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
      <DivAtom style={quoteCreateQuoteStyles.tableContainer}>
        {QUOTATIONS_COSTING_RATE_DATA.length > 0 && (
          <CostingRateComparisonTable
            columns={[
              'Dates',
              'Accomodation',
              'Booking Engine',
              'Rate',
            ]}
            data={QUOTATIONS_COSTING_RATE_DATA as QuotationCostingRate[]}
          />
        )}
      </DivAtom>
      <ParagraphAtom
        style={{
          ...quoteCreateQuoteStyles.title,
          margin: '1rem 0 1rem 1rem',
        }}
        text="Accomodation"
      />
      <DivAtom style={quoteCreateQuoteStyles.tableContainer}>
        {QUOTATIONS_COSTING_ACCOMODATION_DATA.length > 0 && (
          <>
            <CostingAccomodationTable
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
              accTotal={accomodationTotal}
              mealPlanOptions={mealPlanOptions}
              roomTypes={roomTypes}
              data={QUOTATIONS_COSTING_ACCOMODATION_DATA as QuotationCostingAccomodation[]}
            />
          </>
        )}
      </DivAtom>
      <ParagraphAtom
        style={{
          ...quoteCreateQuoteStyles.title,
          margin: '1rem 0 1rem 1rem',
        }}
        text="Transporation"
      />
      <CostingTransport
        width={width}
        rate={rate}
        days={days}
        transport={transport}
        setRate={setRate}
        setDays={setDays}
        setTransport={setTransport}
      />
      <DivAtom style={quoteCreateQuoteStyles.tableContainer}>
        <hr />
      </DivAtom>
      <CostingOverallCost
        width={width}
        totalExpense={totalExpense}
        commission={commission}
        totalPrice={totalPrice}
        sellingPrice={sellingPrice}
        discount={discount}
        netPrice={netPrice}
        setTotalExpense={setTotalExpense}
        setCommission={setCommission}
        setTotalPrice={setTotalPrice}
        setSellingPrice={setSellingPrice}
        setDiscount={setDiscount}
        setNetPrice={setNetPrice}
      />
      <DivAtom
        style={{
          ...quoteCreateQuoteStyles.addBtnContainer,
          padding: width < 768 ? '1rem' : '0px',
          margin:
            width < 768 ? '0px' : quoteCreateQuoteStyles.addBtnContainer.margin,
        }}
      >
        <ButtonAtom
          size="large"
          text="Save"
          onClick={() => null}
          style={{
            ...quoteCreateQuoteStyles.addBtn,
            width: width < 768 ? '100%' : '12%',
            margin: '0 0 1rem 0',
          }}
        />
      </DivAtom>
    </DivAtom>
  );
}

export default Costing;
