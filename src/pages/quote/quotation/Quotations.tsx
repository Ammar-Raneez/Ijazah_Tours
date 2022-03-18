import { ChangeEvent, useEffect, useState } from 'react';
import SearchIcon from '@material-ui/icons/Search';
import { Link, Route } from 'react-router-dom';
import DivAtom from '../../../atoms/DivAtom';
import QuotationsTable from '../../../organisms/quote/quotation/QuotationsTable';
import { QUOTATIONS_DATA } from '../../../data';
import ButtonAtom from '../../../atoms/ButtonAtom';
import InputAtom from '../../../atoms/InputAtom';
import { quotationsStyles } from '../../../styles';
import Customer from './create-quotation/Customer';
import Accomodation from './create-quotation/Accomodation';
import Costing from './create-quotation/Costing';
import Approval from './create-quotation/Approval';
import CreateQuotationNavbar from '../../../organisms/quote/quotation/CreateQuotationNavbar';
import DataCard from '../../../molecules/DataCard';

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
            <DivAtom style={quotationsStyles.btnMainContainer}>
              <Link to="/quote/quotations/create/customer">
                <ButtonAtom
                  text="New Quote +"
                  style={{
                    ...quotationsStyles.btn,
                    marginRight: '16px',
                  }}
                  onClick={() => null}
                  size="large"
                />
              </Link>
              <ButtonAtom
                text="Compare Rates"
                style={quotationsStyles.btn}
                onClick={() => null}
                size="large"
              />
            </DivAtom>
            <DivAtom
              style={{
                ...quotationsStyles.dataCardContainer,
                flexDirection: width < 768 ? 'column' : 'row',
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
                flexDirection: width < 768 ? 'column' : 'row',
              }}
            >
              <DivAtom
                style={{
                  ...quotationsStyles.btnSubInnerContainer,
                  margin: width < 768 ? '0 0 16px 0' : '0',
                }}
              >
                <ButtonAtom
                  text="Approved Quotes"
                  style={{
                    ...quotationsStyles.btn,
                    marginRight: '16px',
                  }}
                  onClick={() => null}
                  size="large"
                />
                <ButtonAtom
                  text="On Progress"
                  style={quotationsStyles.btn}
                  onClick={() => null}
                  size="large"
                />
              </DivAtom>
              <DivAtom
                style={{
                  ...quotationsStyles.btnSubInnerContainer,
                  justifyContent: width < 768 ? 'flex-start' : 'flex-end',
                }}
              >
                <InputAtom
                  placeholder="Search"
                  adornmentposition="start"
                  fullWidth={width < 768}
                  value={search}
                  plain="false"
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)
                  }
                  children={<SearchIcon />}
                />
                <ButtonAtom
                  text="Search"
                  style={{
                    ...quotationsStyles.btn,
                    marginLeft: '16px',
                  }}
                  onClick={() => null}
                  size="large"
                />
              </DivAtom>
            </DivAtom>
            <QuotationsTable
              columns={['QUOTES', 'EARNINGS', 'COMMISION', '', '']}
              rowdata={QUOTATIONS_DATA}
            />
          </DivAtom>
        </DivAtom>
      </Route>
    </>
  );
}

export default Quotations;
