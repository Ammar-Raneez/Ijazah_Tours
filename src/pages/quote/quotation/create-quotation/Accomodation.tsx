import {
  ChangeEvent,
  useEffect,
  useState,
} from 'react';
import { useHistory } from 'react-router-dom';
import SearchIcon from '@material-ui/icons/Search';

import ACreateQuotationTable from '../../../../organisms/quote/quotation/ACreateQuotationTable';
import DivAtom from '../../../../atoms/DivAtom';
import ButtonAtom from '../../../../atoms/ButtonAtom';
import ParagraphAtom from '../../../../atoms/ParagraphAtom';
import InputAtom from '../../../../atoms/InputAtom';
import { QuotationAccomodation } from '../../../../utils/types';
import { QUOTATIONS_ACCOMODATION_DATA } from '../../../../data';
import {
  quoteCreateQuoteStyles,
} from '../../../../styles';

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

function Accomodation() {
  const [search, setSearch] = useState('');

  const [width, setWidth] = useState(0);
  const [containerHeight, setContainerHeight] = useState(0);
  const history = useHistory();

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

  const deleteAccomodation = (acc: QuotationAccomodation) => {
    console.log(acc);
  };

  return (
    <DivAtom style={{ height: `${containerHeight}px` }}>
      <ParagraphAtom
        style={{
          ...quoteCreateQuoteStyles.title,
          marginBottom: '1rem',
          marginLeft: '1rem',
        }}
        text="Preset Quotes"
      />
      <DivAtom style={quoteCreateQuoteStyles.tableContainer}>
        <DivAtom
          style={{
            ...quoteCreateQuoteStyles.btnMainContainer,
            flexDirection: width < 768 ? 'column' : 'row',
          }}
        >
          <ButtonAtom
            text="Luxury"
            style={{
              ...quoteCreateQuoteStyles.btn,
              marginRight: '16px',
              marginBottom: width < 768 ? '1rem' : 0,
              width: width < 768 ? '100%' : '11rem',
            }}
            onClick={() => null}
            size="large"
          />
          <ButtonAtom
            text="3 Star"
            style={{
              ...quoteCreateQuoteStyles.btn,
              marginRight: '16px',
              marginBottom: width < 768 ? '1rem' : 0,
              width: width < 768 ? '100%' : '11rem',
            }}
            onClick={() => null}
            size="large"
          />
          <ButtonAtom
            text="Boutique"
            style={{
              ...quoteCreateQuoteStyles.btn,
              marginBottom: width < 768 ? '1rem' : 0,
              width: width < 768 ? '100%' : '11rem',
            }}
            onClick={() => null}
            size="large"
          />
        </DivAtom>
        <DivAtom style={quoteCreateQuoteStyles.searchContainer}>
          <InputAtom
            placeholder="Search"
            adornmentposition="start"
            fullWidth={width < 768}
            value={search}
            plain="false"
            onChange={(e: ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
            children={<SearchIcon />}
            style={{ padding: '0.2rem' }}
          />
        </DivAtom>
        {QUOTATIONS_ACCOMODATION_DATA.length > 0 && (
          <ACreateQuotationTable
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
            mealPlanOptions={mealPlanOptions}
            roomTypes={roomTypes}
            deleteAccomodation={deleteAccomodation}
            data={QUOTATIONS_ACCOMODATION_DATA as QuotationAccomodation[]}
          />
        )}
      </DivAtom>

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
          text="Continue"
          disabled={QUOTATIONS_ACCOMODATION_DATA.length === 0}
          onClick={() => history.replace('/quote/quotations/create/costing')}
          style={{
            ...quoteCreateQuoteStyles.addBtn,
            width: width < 768 ? '100%' : '18%',
            margin: '0 0 1rem 0',
          }}
        />
      </DivAtom>
    </DivAtom>
  );
}

export default Accomodation;
