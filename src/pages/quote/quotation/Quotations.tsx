/* eslint-disable @typescript-eslint/no-unused-vars */
import { ChangeEvent, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, Route } from 'react-router-dom';
import { CircularProgress } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import { collection, getDocs } from 'firebase/firestore';

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
import { selectWithNavbarHeight, selectWithNavbarWidth } from '../../../redux/containerSizeSlice';
import { db } from '../../../firebase';
import { CustomerQuotation, FlexDirection, JustifyContent } from '../../../utils/types';
import { searchData, widthHeightDynamicStyle } from '../../../utils/helpers';
import { fetchingDataIndicatorStyles, quotationsStyles } from '../../../styles';

function Quotations() {
  const height = useSelector(selectWithNavbarHeight);
  const width = useSelector(selectWithNavbarWidth);

  const [quotationsData, setQuotationsData] = useState<CustomerQuotation[]>();
  const [initialQuotationSearchData, setInitialQuotationSearchData] = useState<CustomerQuotation[]>([]);

  const [search, setSearch] = useState('');

  useEffect(() => {
    searchData(search, initialQuotationSearchData, setQuotationsData);
  }, [initialQuotationSearchData, search]);

  useEffect(() => {
    const getIntialQuotationsData = async () => {
      const data = (await getDocs(collection(db, 'Approval Quotations'))).docs;
      const quotations = data.map((dc) => dc.data());
      const ids = data.map((dc) => dc.id);
      ids.forEach((id, i) => {
        quotations[i].id = id;
      });

      setQuotationsData(quotations as CustomerQuotation[]);
      setInitialQuotationSearchData(quotations as CustomerQuotation[]);
    };

    getIntialQuotationsData();
  }, []);

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
              height: `${height}px`,
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
              height: `${height}px`,
            }}
          >
            {quotationsData ? (
              <>
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
                  rowdata={quotationsData}
                />
              </>
            ) : (
              <DivAtom style={fetchingDataIndicatorStyles.container}>
                <CircularProgress size={20} color="primary" />
              </DivAtom>
            )}
          </DivAtom>
        </DivAtom>
      </Route>
    </>
  );
}

export default Quotations;
