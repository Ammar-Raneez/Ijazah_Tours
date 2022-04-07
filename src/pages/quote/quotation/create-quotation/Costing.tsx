import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import CostingRateComparisonTable from '../../../../organisms/quote/quotation/create-quotation/costing/CostingRateComparisonTable';
import CostingAccomodationTable from '../../../../organisms/quote/quotation/create-quotation/costing/CostingAccomodationTable';
import CostingTransport from '../../../../organisms/quote/quotation/create-quotation/costing/CostingTransport';
import CostingOverallCost from '../../../../organisms/quote/quotation/create-quotation/costing/CostingOverallCost';
import DivAtom from '../../../../atoms/DivAtom';
import ParagraphAtom from '../../../../atoms/ParagraphAtom';
import ButtonAtom from '../../../../atoms/ButtonAtom';
import { selectWith2NavbarHeight, selectWith2NavbarWidth } from '../../../../redux/containerSizeSlice';
import { QuotationCostingAccomodation, QuotationCostingRate } from '../../../../utils/types';
import { mealPlanOptions, roomTypes, widthHeightDynamicStyle } from '../../../../utils/helpers';
import { QUOTATIONS_COSTING_ACCOMODATION_DATA, QUOTATIONS_COSTING_RATE_DATA } from '../../../../data';
import { quoteCreateQuoteStyles } from '../../../../styles';

function Costing() {
  const height = useSelector(selectWith2NavbarHeight);
  const width = useSelector(selectWith2NavbarWidth);

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

  const history = useHistory();

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

  const saveCost = () => {
    history.replace('/quote/quotations/create/approval');
  };

  return (
    <DivAtom style={{ height: `${height}px` }}>
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
          padding: widthHeightDynamicStyle(width, 768, '1rem', 0),
          margin: widthHeightDynamicStyle(width, 768, 0, quoteCreateQuoteStyles.addBtnContainer.margin),
        }}
      >
        <ButtonAtom
          size="large"
          text="Save"
          onClick={saveCost}
          style={{
            ...quoteCreateQuoteStyles.addBtn,
            width: widthHeightDynamicStyle(width, 768, '100%', '12%'),
            margin: '0 0 1rem 0',
          }}
        />
      </DivAtom>
    </DivAtom>
  );
}

export default Costing;
