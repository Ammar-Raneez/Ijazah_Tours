import { useEffect, useState } from 'react';

import { CircularProgress } from '@material-ui/core';
import {
  collection,
  collectionGroup,
  doc,
  getDocs,
  serverTimestamp,
  setDoc,
} from 'firebase/firestore';
import { useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { v4 as uuid } from 'uuid';

import ButtonAtom from '../../../atoms/ButtonAtom';
import DivAtom from '../../../atoms/DivAtom';
import ParagraphAtom from '../../../atoms/ParagraphAtom';
import SpanAtom from '../../../atoms/SpanAtom';
import { db } from '../../../firebase';
import SummaryAccomodationTable from '../../../organisms/quote/summary/SummaryAccomodationTable';
import SummaryEarnings from '../../../organisms/quote/summary/SummaryEarnings';
import SummaryExtras from '../../../organisms/quote/summary/SummaryExtras';
import SummaryGuestDetails from '../../../organisms/quote/summary/SummaryGuestDetails';
import SummaryOtherExpenses from '../../../organisms/quote/summary/SummaryOtherExpenses';
import SummaryTransportTable from '../../../organisms/quote/summary/SummaryTransportTable';
import { selectWithNavbarWidth, selectWithNavbarHeight } from '../../../redux/containerSizeSlice';
import { fetchingDataIndicatorStyles, summaryStyles } from '../../../styles';
import { widthHeightDynamicStyle } from '../../../utils/helpers';

function Summary() {
  const height = useSelector(selectWithNavbarHeight);
  const width = useSelector(selectWithNavbarWidth);
  const { id } = useParams<{ id: string }>();

  const [quotation, setQuotation] = useState<any>();
  const [vouchers, setVouchers] = useState<any>();

  // Accomodations
  const [accAmountPaid, setAccAmountPaid] = useState<string[]>([]);
  const [accEXRate, setAccEXRate] = useState<string[]>([]);
  const [lrkAccTotal, setLkrAccTotal] = useState('LKR 0');
  const [usdAccTotal, setUsdAccTotal] = useState('$0');

  // Transportation
  const [lkrTransportTotal, setLkrTransportTotal] = useState('LKR 0');
  const [usdTransportTotal, setUsdTransportTotal] = useState('$0');

  // Other expenses
  const [otherExpenseData, setOtherExpenseData] = useState<any>();
  const [newOTTitle, setNewOTTitle] = useState('');
  const [newOTRemark, setNewOTRemark] = useState('');
  const [newOTUSDPrice, setNewOTUSDPrice] = useState('');
  const [newOTLKRPrice, setNewOTLKRPrice] = useState('');
  const [newOTEXRate, setNewOTEXRate] = useState('');

  // Earnings
  const [earningsData, setEarningsData] = useState<any>();
  const [newERTitle, setNewERTitle] = useState('');
  const [newERRemark, setNewERRemark] = useState('');
  const [newERUSDPrice, setNewERUSDPrice] = useState('');
  const [newERLKRPrice, setNewERLKRPrice] = useState('');
  const [newEREXRate, setNewEREXRate] = useState('');

  // Extras
  const [extrasData, setExtrasData] = useState<any>();
  const [newEXTitle, setNewEXTitle] = useState('');
  const [newEXRemark, setNewEXRemark] = useState('');
  const [newEXUSDPrice, setNewEXUSDPrice] = useState('');
  const [newEXLKRPrice, setNewEXLKRPrice] = useState('');
  const [newEXEXRate, setNewEXEXRate] = useState('');

  const [savingSummary, setSavingSummary] = useState(false);

  const history = useHistory();

  useEffect(() => {
    const getInitialData = async () => {
      const qData = (await getDocs(collection(db, 'Approval Quotations'))).docs;
      const vData = (await getDocs(collectionGroup(db, 'Vouchers'))).docs;
      const sumData = (await getDocs(collection(db, 'User Summary'))).docs;
      const qots = qData.map((dc) => dc.data());
      const vocs = vData.map((dc) => dc.data());
      const summs = sumData.map((dc) => dc.data());
      const qotIds = qData.map((dc) => dc.id);
      const vocIds = vData.map((dc) => dc.id);
      const sumIds = sumData.map((dc) => dc.id);

      qotIds.forEach((i, ind) => {
        qots[ind].id = i;
      });
      vocIds.forEach((i, ind) => {
        vocs[ind].id = i;
      });
      sumIds.forEach((i, ind) => {
        summs[ind].id = i;
      });

      const quote = qots.find((q) => q.id === id);
      const userSummary = summs.find((s) => s.userId === id);
      const vcs = vocs.filter((v) => v.quoteNo === String(quote!.quoteNo));

      setQuotation(quote);
      setVouchers(vcs);
      setOtherExpenseData(userSummary ? (userSummary as any).otherExpenseData : []);
      setEarningsData(userSummary ? (userSummary as any).earningsData : []);
      setExtrasData(userSummary ? (userSummary as any).extrasData : []);

      setAccAmountPaid(new Array(vcs[0].accomodationDetails).fill(''));
      setAccEXRate(new Array(vcs[0].accomodationDetails).fill(''));

      let tempUsdAccTotal = 0;
      vcs[0].accomodationDetails.forEach((acc: any) => {
        tempUsdAccTotal += Number(acc.total.slice(1));
      });

      setUsdAccTotal(`$${tempUsdAccTotal}`);
    };

    getInitialData();
  }, [id]);

  useEffect(() => {
    let tempLrkAccTotal = 0;
    accAmountPaid.forEach((acc) => {
      tempLrkAccTotal += Number(acc);
    });

    setLkrAccTotal(`LKR ${tempLrkAccTotal}`);
  }, [accAmountPaid, accEXRate]);

  const onCreateOtherExpense = () => {
    setOtherExpenseData([
      ...otherExpenseData,
      {
        id: uuid(),
        title: newOTTitle,
        remark: newOTRemark,
        exRate: newOTEXRate,
        usdPrice: `$${newOTUSDPrice}`,
        lkrPrice: `LKR ${newOTLKRPrice}`,
      },
    ]);

    setNewOTTitle('');
    setNewOTRemark('');
    setNewOTUSDPrice('');
    setNewOTLKRPrice('');
    setNewOTEXRate('');
  };

  const onCreateEarning = () => {
    setEarningsData([
      ...earningsData,
      {
        id: uuid(),
        title: newERTitle,
        remark: newERRemark,
        exRate: newEREXRate,
        usdPrice: `$${newERUSDPrice}`,
        lkrPrice: `LKR ${newERLKRPrice}`,
      },
    ]);

    setNewERTitle('');
    setNewERRemark('');
    setNewERUSDPrice('');
    setNewERLKRPrice('');
    setNewEREXRate('');
  };

  const onCreateExtra = () => {
    setExtrasData([
      ...extrasData,
      {
        id: uuid(),
        title: newEXTitle,
        remark: newEXRemark,
        exRate: newEXEXRate,
        usdPrice: `$${newEXUSDPrice}`,
        lkrPrice: `LKR ${newEXLKRPrice}`,
      },
    ]);

    setNewEXTitle('');
    setNewEXRemark('');
    setNewEXUSDPrice('');
    setNewEXLKRPrice('');
    setNewEXEXRate('');
  };

  const onDeleteOtherExpense = (i: string) => {
    const temp = [...otherExpenseData];
    temp.splice(otherExpenseData.findIndex((val: any) => val.id === i), 1);
    setOtherExpenseData(temp);
  };

  const onDeleteEarning = (i: string) => {
    const temp = [...earningsData];
    temp.splice(earningsData.findIndex((val: any) => val.id === i), 1);
    setEarningsData(temp);
  };

  const onDeleteExtra = (i: string) => {
    const temp = [...extrasData];
    temp.splice(extrasData.findIndex((val: any) => val.id === i), 1);
    setExtrasData(temp);
  };

  const saveSummary = async () => {
    setSavingSummary(true);
    await setDoc(doc(db, 'User Summary', uuid()), {
      userId: id,
      otherExpenseData,
      earningsData,
      extrasData,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });

    setSavingSummary(false);
    history.replace('/quote/quotations');
  };

  return (
    <DivAtom style={summaryStyles.container}>
      <DivAtom
        style={{
          ...summaryStyles.innerContainer,
          height: `${height}px`,
        }}
      >
        {quotation && vouchers && otherExpenseData && earningsData && extrasData ? (
          <>
            <SummaryGuestDetails vouchers={vouchers} quotation={quotation} />

            {vouchers.length > 4 && (
              <DivAtom style={summaryStyles.tableContainer}>
                <ParagraphAtom text="Accomodation" />
                <SummaryAccomodationTable
                  columns={[
                    'NIGHTS',
                    'ACCOMODATION',
                    'ROOM TYPE',
                    'EXTRA',
                    'ROOM RATE',
                    'MEAL PLAN',
                    'TOTAL',
                    'AMOUNT PAID',
                    'EX RATE',
                  ]}
                  data={vouchers[0].accomodationDetails}
                  accAmountPaid={accAmountPaid}
                  accEXRate={accEXRate}
                  setAccAmountPaid={setAccAmountPaid}
                  setAccEXRate={setAccEXRate}
                />
                <p style={summaryStyles.tableOverallRates.detailContainer}>
                  <SpanAtom
                    text="Accomodation"
                    style={summaryStyles.tableOverallRates.label}
                  />
                  <SpanAtom
                    text={usdAccTotal}
                    style={summaryStyles.tableOverallRates.usdValue}
                  />
                  <SpanAtom
                    text={lrkAccTotal}
                    style={summaryStyles.tableOverallRates.lkrValue}
                  />
                </p>
              </DivAtom>
            )}

            <DivAtom style={summaryStyles.tableContainer}>
              <ParagraphAtom text="Transport" />
              <SummaryTransportTable
                columns={[
                  'RATE',
                  'DAYS',
                  'TOTAL ($)',
                  'AMOUNT PAID',
                  'EX RATE',
                ]}
                data={quotation.costings}
              />
              <p style={summaryStyles.tableOverallRates.detailContainer}>
                <SpanAtom
                  text="Tour Expense"
                  style={summaryStyles.tableOverallRates.label}
                />
                <SpanAtom
                  text="$380"
                  style={summaryStyles.tableOverallRates.usdValue}
                />
                <SpanAtom
                  text="LKR 106,400"
                  style={summaryStyles.tableOverallRates.lkrValue}
                />
              </p>
            </DivAtom>

            <DivAtom style={summaryStyles.tableContainer}>
              <SummaryOtherExpenses
                width={width}
                otherExpenseData={otherExpenseData}
                newOTTitle={newOTTitle}
                setNewOTTitle={setNewOTTitle}
                newOTRemark={newOTRemark}
                setNewOTRemark={setNewOTRemark}
                newOTUSDPrice={newOTUSDPrice}
                newOTLKRPrice={newOTLKRPrice}
                newOTEXRate={newOTEXRate}
                setNewOTEXRate={setNewOTEXRate}
                setNewOTUSDPrice={setNewOTUSDPrice}
                setNewOTLKRPrice={setNewOTLKRPrice}
                onCreate={onCreateOtherExpense}
                onDelete={onDeleteOtherExpense}
              />
            </DivAtom>

            <DivAtom style={summaryStyles.tableContainer}>
              <SummaryEarnings
                width={width}
                earningsData={earningsData}
                newERTitle={newERTitle}
                setNewERTitle={setNewERTitle}
                newERRemark={newERRemark}
                setNewERRemark={setNewERRemark}
                newERUSDPrice={newERUSDPrice}
                newERLKRPrice={newERLKRPrice}
                newEREXRate={newEREXRate}
                setNewEREXRate={setNewEREXRate}
                setNewERUSDPrice={setNewERUSDPrice}
                setNewERLKRPrice={setNewERLKRPrice}
                onCreate={onCreateEarning}
                onDelete={onDeleteEarning}
              />
            </DivAtom>

            <DivAtom style={summaryStyles.tableContainer}>
              <SummaryExtras
                width={width}
                extrasData={extrasData}
                newEXTitle={newEXTitle}
                setNewEXTitle={setNewEXTitle}
                newEXRemark={newEXRemark}
                setNewEXRemark={setNewEXRemark}
                newEXUSDPrice={newEXUSDPrice}
                newEXLKRPrice={newEXLKRPrice}
                newEXEXRate={newEXEXRate}
                setNewEXEXRate={setNewEXEXRate}
                setNewEXUSDPrice={setNewEXUSDPrice}
                setNewEXLKRPrice={setNewEXLKRPrice}
                onCreate={onCreateExtra}
                onDelete={onDeleteExtra}
              />
            </DivAtom>

            <DivAtom
              style={{
                ...summaryStyles.addBtnContainer,
                padding: widthHeightDynamicStyle(width, 768, '1rem', 0),
                margin: widthHeightDynamicStyle(
                  width,
                  768,
                  0,
                  summaryStyles.addBtnContainer.margin,
                ),
              }}
            >
              <ButtonAtom
                endIcon={savingSummary && <CircularProgress size={20} color="inherit" />}
                size="large"
                text="Save"
                disabled={savingSummary}
                onClick={saveSummary}
                style={{
                  ...summaryStyles.addBtn,
                  width: widthHeightDynamicStyle(width, 768, '100%', '12%'),
                  margin: '0 0 1rem 0',
                }}
              />
            </DivAtom>
          </>
        ) : (
          <DivAtom style={fetchingDataIndicatorStyles.container}>
            <CircularProgress size={50} color="primary" />
          </DivAtom>
        )}
      </DivAtom>
    </DivAtom>
  );
}

export default Summary;
