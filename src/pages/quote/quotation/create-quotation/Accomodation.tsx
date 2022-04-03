import {
  ChangeEvent,
  useEffect,
  useState,
} from 'react';
import { useHistory } from 'react-router-dom';
import SearchIcon from '@material-ui/icons/Search';

import AccomodationTable from '../../../../organisms/quote/quotation/create-quotation/accomodation/AccomodationTable';
import DivAtom from '../../../../atoms/DivAtom';
import ButtonAtom from '../../../../atoms/ButtonAtom';
import ParagraphAtom from '../../../../atoms/ParagraphAtom';
import InputAtom from '../../../../atoms/InputAtom';
import { FlexDirection, QuotationAccomodation } from '../../../../utils/types';
import { mealPlanOptions, roomTypes, widthHeightDynamicStyle } from '../../../../utils/helpers';
import { QUOTATIONS_ACCOMODATION_DATA } from '../../../../data';
import {
  quoteCreateQuoteStyles,
} from '../../../../styles';

function Accomodation() {
  const [accomodationData, setAccomodationData] = useState<QuotationAccomodation[]>([]);

  const [search, setSearch] = useState('');

  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const history = useHistory();

  useEffect(() => {
    setAccomodationData(QUOTATIONS_ACCOMODATION_DATA);
  }, []);

  useEffect(() => {
    setWidth(window.innerWidth);
    setHeight(window.innerHeight - 220);
    const widthListener = window.addEventListener('resize', () => {
      setWidth(window.innerWidth);
    });
    const heightListener = window.addEventListener('resize', () => {
      setHeight(window.innerHeight - 220);
    });

    const removeEventListeners = () => {
      window.removeEventListener('resize', widthListener as any);
      window.removeEventListener('resize', heightListener as any);
    };

    return removeEventListeners();
  }, [width, height]);

  const deleteAccomodation = (acc: QuotationAccomodation) => {
    const removeIndex = accomodationData.findIndex((ac) => ac.id === acc.id);
    const tempAccomodation = [...accomodationData];
    tempAccomodation.splice(removeIndex, 1);
    setAccomodationData(tempAccomodation);
  };

  return (
    <DivAtom style={{ height: `${height}px` }}>
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
            onClick={() => null}
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
            onClick={() => null}
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
        {accomodationData.length > 0 && (
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
            mealPlanOptions={mealPlanOptions}
            roomTypes={roomTypes}
            deleteAccomodation={deleteAccomodation}
            data={accomodationData}
          />
        )}
      </DivAtom>

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
          onClick={() => history.replace('/quote/quotations/create/costing')}
          style={{
            ...quoteCreateQuoteStyles.addBtn,
            width: widthHeightDynamicStyle(width, 768, '100%', '18%'),
            margin: '0 0 1rem 0',
          }}
        />
      </DivAtom>
    </DivAtom>
  );
}

export default Accomodation;
