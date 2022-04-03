import { ChangeEvent, useEffect, useState } from 'react';
import { Link, Route } from 'react-router-dom';
import SearchIcon from '@material-ui/icons/Search';

import Customer from './create-quotation/Customer';
import Accomodation from './create-quotation/Accomodation';
import Costing from './create-quotation/Costing';
import Approval from './create-quotation/Approval';
import QuotationsTable from '../../../organisms/quote/quotation/QuotationsTable';
import CreateQuotationNavbar from '../../../organisms/quote/quotation/CreateQuotationNavbar';
import DataCard from '../../../molecules/DataCard';
import DivAtom from '../../../atoms/DivAtom';
import ButtonAtom from '../../../atoms/ButtonAtom';
import InputAtom from '../../../atoms/InputAtom';
import { FlexDirection, JustifyContent } from '../../../utils/types';
import { widthHeightDynamicStyle } from '../../../utils/helpers';
import { QUOTATIONS_DATA } from '../../../data';
import { quotationsStyles } from '../../../styles';

function Quotations() {
  const [search, setSearch] = useState('');
  const [width, setWidth] = useState(0);
  const [containerHeight, setContainerHeight] = useState(0);

  useEffect(() => {
    setWidth(window.innerWidth);
    setContainerHeight(window.innerHeight - 180);
    const widthListener = window.addEventListener('resize', () => {
      setWidth(window.innerWidth);
    });
    const heightListener = window.addEventListener('resize', () => {
      setContainerHeight(window.innerHeight - 180);
    });

    const removeEventListeners = () => {
      window.removeEventListener('resize', widthListener as any);
      window.removeEventListener('resize', heightListener as any);
    };

    return removeEventListeners();
  }, [width, containerHeight]);

  return (
    <>
      <Route path="/quote/quotations/create">
        <DivAtom
          style={{ ...quotationsStyles.container, flexDirection: 'column' }}
        >
          <DivAtom>
            <CreateQuotationNavbar />
          </DivAtom>
          <DivAtom
            style={{
              ...quotationsStyles.innerContainer,
              height: `${containerHeight}px`,
            }}
          >
            <Route path="/quote/quotations/create/customer">
              <Customer />
            </Route>
            <Route path="/quote/quotations/create/accomodation">
              <Accomodation />
            </Route>
            <Route path="/quote/quotations/create/costing">
              <Costing />
            </Route>
            <Route path="/quote/quotations/create/approval">
              <Approval />
            </Route>
          </DivAtom>
        </DivAtom>
      </Route>

      <Route exact path="/quote/quotations">
        <DivAtom style={quotationsStyles.container}>
          <DivAtom
            style={{
              ...quotationsStyles.innerContainer,
              height: `${containerHeight}px`,
            }}
          >
            <DivAtom
              style={{
                ...quotationsStyles.btnMainContainer,
                flexDirection: widthHeightDynamicStyle(width, 768, 'column', 'row') as FlexDirection,
              }}
            >
              <Link to="/quote/quotations/create/customer">
                <ButtonAtom
                  text="New Quote +"
                  style={{
                    ...quotationsStyles.btn,
                    marginRight: '16px',
                    marginBottom: widthHeightDynamicStyle(width, 768, '1rem', 0),
                    width: widthHeightDynamicStyle(width, 768, '100%', '11rem'),
                  }}
                  onClick={() => null}
                  size="large"
                />
              </Link>
              <ButtonAtom
                text="Compare Rates"
                style={{
                  ...quotationsStyles.btn,
                  marginRight: '16px',
                  marginBottom: widthHeightDynamicStyle(width, 768, '1rem', 0),
                  width: widthHeightDynamicStyle(width, 768, '100%', '11rem'),
                }}
                onClick={() => null}
                size="large"
              />
              <ButtonAtom
                text="Preset Quotes"
                style={{
                  ...quotationsStyles.btn,
                  marginBottom: widthHeightDynamicStyle(width, 768, '1rem', 0),
                  width: widthHeightDynamicStyle(width, 768, '100%', '11rem'),
                }}
                onClick={() => null}
                size="large"
              />
            </DivAtom>
            <DivAtom
              style={{
                ...quotationsStyles.dataCardContainer,
                flexDirection: widthHeightDynamicStyle(width, 768, 'column', 'row') as FlexDirection,
              }}
            >
              <DataCard title="Total" total={60} />
              <DataCard title="Closed" total={16} />
              <DataCard title="Completed" total={43} />
              <DataCard title="On Going" total={64} />
            </DivAtom>
            <DivAtom
              style={{
                ...quotationsStyles.btnSubContainer,
                flexDirection: widthHeightDynamicStyle(width, 768, 'column', 'row') as FlexDirection,
              }}
            >
              <DivAtom
                style={{
                  ...quotationsStyles.btnSubInnerContainer,
                  margin: widthHeightDynamicStyle(width, 768, '0 0 1rem 0', 0),
                }}
              >
                <ButtonAtom
                  text="Approved"
                  style={{
                    ...quotationsStyles.btn,
                    marginRight: '16px',
                  }}
                  onClick={() => null}
                  size="large"
                />
                <ButtonAtom
                  text="Complete"
                  style={quotationsStyles.btn}
                  onClick={() => null}
                  size="large"
                />
              </DivAtom>
              <DivAtom
                style={{
                  ...quotationsStyles.searchContainer,
                  justifyContent: widthHeightDynamicStyle(width, 768, 'flex-start', 'flex-end') as JustifyContent,
                }}
              >
                <InputAtom
                  placeholder="Search"
                  adornmentPosition="start"
                  fullWidth={width < 768}
                  value={search}
                  plain="false"
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)
                  }
                  children={<SearchIcon />}
                />
              </DivAtom>
            </DivAtom>
            <QuotationsTable
              rowdata={QUOTATIONS_DATA}
            />
          </DivAtom>
        </DivAtom>
      </Route>
    </>
  );
}

export default Quotations;
