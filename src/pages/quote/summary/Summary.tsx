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

  // Other expenses
  const [otherExpenseData, setOtherExpenseData] = useState<any>();
  const [newOTTitle, setNewOTTitle] = useState('');
  const [newOTRemark, setNewOTRemark] = useState('');
  const [newOTPrice, setNewOTPrice] = useState('');

  // Earnings
  const [earningsData, setEarningsData] = useState<any>();
  const [newERTitle, setNewERTitle] = useState('');
  const [newERRemark, setNewERRemark] = useState('');
  const [newERPrice, setNewERPrice] = useState('');

  // Extras
  const [extrasData, setExtrasData] = useState<any>();
  const [newEXTitle, setNewEXTitle] = useState('');
  const [newEXRemark, setNewEXRemark] = useState('');
  const [newEXPrice, setNewEXPrice] = useState('');

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
    };

    getInitialData();
  }, [id]);

  const onCreateOtherExpense = () => {
    setOtherExpenseData([
      ...otherExpenseData,
      {
        id: uuid(),
        title: newOTTitle,
        remark: newOTRemark,
        price: `$${newOTPrice}`,
      },
    ]);

    setNewOTTitle('');
    setNewOTRemark('');
    setNewOTPrice('');
  };

  const onCreateEarning = () => {
    setEarningsData([
      ...earningsData,
      {
        id: uuid(),
        title: newERTitle,
        remark: newERRemark,
        price: `$${newERPrice}`,
      },
    ]);

    setNewERTitle('');
    setNewERRemark('');
    setNewERPrice('');
  };

  const onCreateExtra = () => {
    setExtrasData([
      ...extrasData,
      {
        id: uuid(),
        title: newEXTitle,
        remark: newEXRemark,
        price: `$${newEXPrice}`,
      },
    ]);

    setNewEXTitle('');
    setNewEXRemark('');
    setNewEXPrice('');
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
            <DivAtom style={summaryStyles.voucherTemplate.summaryDetails.mainContainer}>
              <DivAtom>
                <p style={summaryStyles.voucherTemplate.summaryDetails.detailContainer}>
                  <SpanAtom
                    text="Guest"
                    style={summaryStyles.voucherTemplate.summaryDetails.label}
                  />
                  <SpanAtom
                    text={quotation.name}
                    style={summaryStyles.voucherTemplate.summaryDetails.detail}
                  />
                </p>
                <p style={summaryStyles.voucherTemplate.summaryDetails.detailContainer}>
                  <SpanAtom
                    text="Nationality"
                    style={summaryStyles.voucherTemplate.summaryDetails.label}
                  />
                  <SpanAtom
                    text={quotation.nationality}
                    style={summaryStyles.voucherTemplate.summaryDetails.detail}
                  />
                </p>
                <p style={summaryStyles.voucherTemplate.summaryDetails.detailContainer}>
                  <SpanAtom
                    text="Reference No"
                    style={summaryStyles.voucherTemplate.summaryDetails.label}
                  />
                  <SpanAtom
                    text={quotation.refNum}
                    style={summaryStyles.voucherTemplate.summaryDetails.detail}
                  />
                </p>
                <p style={summaryStyles.voucherTemplate.summaryDetails.detailContainer}>
                  <SpanAtom
                    text="Adults"
                    style={summaryStyles.voucherTemplate.summaryDetails.label}
                  />
                  <SpanAtom
                    text={quotation.adults}
                    style={summaryStyles.voucherTemplate.summaryDetails.detail}
                  />
                </p>
                <p style={summaryStyles.voucherTemplate.summaryDetails.detailContainer}>
                  <SpanAtom
                    text="Children"
                    style={summaryStyles.voucherTemplate.summaryDetails.label}
                  />
                  <SpanAtom
                    text={quotation.children.join(', ')}
                    style={summaryStyles.voucherTemplate.summaryDetails.detail}
                  />
                </p>
              </DivAtom>
              <DivAtom>
                <p style={summaryStyles.voucherTemplate.summaryDetails.detailContainer}>
                  <SpanAtom
                    text="Driver"
                    style={summaryStyles.voucherTemplate.summaryDetails.label}
                  />
                  <SpanAtom
                    text={vouchers[0].driverDetails.name}
                    style={summaryStyles.voucherTemplate.summaryDetails.detail}
                  />
                </p>
                <p style={summaryStyles.voucherTemplate.summaryDetails.detailContainer}>
                  <SpanAtom
                    text="Arrival"
                    style={summaryStyles.voucherTemplate.summaryDetails.label}
                  />
                  <SpanAtom
                    text={quotation.arrival}
                    style={summaryStyles.voucherTemplate.summaryDetails.detail}
                  />
                </p>
                <p style={summaryStyles.voucherTemplate.summaryDetails.detailContainer}>
                  <SpanAtom
                    text="Departure"
                    style={summaryStyles.voucherTemplate.summaryDetails.label}
                  />
                  <SpanAtom
                    text={quotation.departure}
                    style={summaryStyles.voucherTemplate.summaryDetails.detail}
                  />
                </p>
                <p style={summaryStyles.voucherTemplate.summaryDetails.detailContainer}>
                  <SpanAtom
                    text="Days & Nights"
                    style={summaryStyles.voucherTemplate.summaryDetails.label}
                  />
                  <SpanAtom
                    text={quotation.daysAndNights}
                    style={summaryStyles.voucherTemplate.summaryDetails.detail}
                  />
                </p>
              </DivAtom>
            </DivAtom>

            <DivAtom style={summaryStyles.tableContainer}>
              <ParagraphAtom text="Accomodation" />
              <SummaryAccomodationTable
                columns={[
                  'NIGHTS',
                  'ACCOMODATION',
                  'ROOM TYPE',
                  'EXTRA',
                  'MEAL PLAN',
                  'TOTAL',
                  'AMOUNT PAID',
                  'EX RATE',
                ]}
                data={vouchers[0].accomodationDetails}
              />
            </DivAtom>

            <DivAtom style={summaryStyles.tableContainer}>
              <ParagraphAtom text="Transport" />
              <SummaryTransportTable
                columns={[
                  'RATE',
                  'DAYS',
                  'TOTAL ($)',
                  'TOTAL (LKR)',
                  'EX RATE',
                ]}
                data={quotation.costings}
              />
            </DivAtom>

            <DivAtom style={summaryStyles.tableContainer}>
              <SummaryOtherExpenses
                width={width}
                otherExpenseData={otherExpenseData}
                newOTTitle={newOTTitle}
                setNewOTTitle={setNewOTTitle}
                newOTRemark={newOTRemark}
                setNewOTRemark={setNewOTRemark}
                newOTPrice={newOTPrice}
                setNewOTPrice={setNewOTPrice}
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
                newERPrice={newERPrice}
                setNewERPrice={setNewERPrice}
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
                newEXPrice={newEXPrice}
                setNewEXPrice={setNewEXPrice}
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
