/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { CircularProgress } from '@material-ui/core';
import { doc, setDoc } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import JSPDF from 'jspdf';
import { v4 as uuid } from 'uuid';

import Banner from '../quotation/create-quotation/approval/Banner';
import FormControlInput from '../../../molecules/FormControlInput';
import DivAtom from '../../../atoms/DivAtom';
import H2Atom from '../../../atoms/H2Atom';
import SpanAtom from '../../../atoms/SpanAtom';
import { selectWithNavbarWidth } from '../../../redux/containerSizeSlice';
import { number2words, uploadPDF, widthHeightDynamicStyle } from '../../../utils/helpers';
import { voucherStyles } from '../../../styles';
import ButtonAtom from '../../../atoms/ButtonAtom';
import { db } from '../../../firebase';

const storage = getStorage();

interface CashReceiptProps {
  voucherData: any;
}

function CashReceipt({ voucherData }: CashReceiptProps) {
  const width = useSelector(selectWithNavbarWidth);

  const { id } = useParams<{ id: string }>();
  const [quoteNo] = useState(id.split('+')[1]);
  const [vData, setVData] = useState(voucherData[quoteNo].find((voucher: { id: string }) => (
    voucher.id === id.split('+')[0]
  )));

  const [director, setDirector] = useState('');

  const [isSavingReceipt, setIsSavingReceipt] = useState(false);

  const createPriceText = (netPrice: string) => {
    const numberPrice = netPrice.slice(1);
    const wordPrice = number2words(numberPrice);
    return `${numberPrice} (${wordPrice})`;
  };

  const generatePDF = async () => {
    const report = new JSPDF('landscape', 'pt', [1600, 590]);
    return report.html(document.querySelector('#report') as HTMLElement).then(async () => {
      const filename = `${uuid()}-${vData.guestDetails.name}.pdf`;
      const pdfURL = await uploadPDF(storage, 'voucher-cash-receipt-pdfs', report.output('blob'), filename);
      report.save(filename);
      return pdfURL;
    });
  };

  const saveVoucherReceipt = async () => {
    setIsSavingReceipt(true);
    const pdfURL = await generatePDF();
    const vDataCopy = { ...vData };
    vDataCopy.pdfURL = pdfURL;
    await updateDB(vDataCopy);
    setVData(vDataCopy);
    setIsSavingReceipt(false);
  };

  const updateDB = async (vDataCopy: any) => {
    const { id: updatedVDataId, ...updatedVData } = vDataCopy;
    await setDoc(doc(db, 'Vouchers', quoteNo, 'Vouchers', updatedVDataId), updatedVData);
  };

  return (
    <>
      <H2Atom style={voucherStyles.title} text="Cash Receipt" />
      <div id="report">
        <DivAtom style={{ padding: '2rem' }}>
          <Banner />
          <DivAtom
            style={{
              ...voucherStyles.voucherTemplate.summaryDetails.mainContainer,
              justifyContent: 'flex-end',
              borderBottom: 0,
            }}
          >
            <p style={voucherStyles.voucherTemplate.summaryDetails.detailContainer}>
              <SpanAtom
                text="Date"
                style={voucherStyles.voucherTemplate.summaryDetails.label}
              />
              <SpanAtom
                text={vData.guestDetails.arrival}
                style={voucherStyles.voucherTemplate.summaryDetails.detail}
              />
            </p>
          </DivAtom>

          <DivAtom style={voucherStyles.voucherTemplate.cashReceipt.mainContainer}>
            <p
              style={voucherStyles.voucherTemplate.cashReceipt.detailContainer}
            >
              <SpanAtom
                text="Received with thanks from "
                style={voucherStyles.voucherTemplate.cashReceipt.label}
              />
              <SpanAtom
                text={vData.guestDetails.name}
                style={voucherStyles.voucherTemplate.cashReceipt.detail}
              />
            </p>
            <p
              style={voucherStyles.voucherTemplate.cashReceipt.detailContainer}
            >
              <SpanAtom
                text="Sum of USD / SAR "
                style={voucherStyles.voucherTemplate.cashReceipt.label}
              />
              <SpanAtom
                text={createPriceText(vData.guestDetails.netPrice)}
                style={voucherStyles.voucherTemplate.cashReceipt.detail}
              />
            </p>
            <p
              style={voucherStyles.voucherTemplate.cashReceipt.detailContainer}
            >
              <SpanAtom
                text="Being Advance / Final Balance Payment for the tour relative to the "
                style={voucherStyles.voucherTemplate.cashReceipt.label}
              />
              <SpanAtom
                text={vData.vId}
                style={voucherStyles.voucherTemplate.cashReceipt.detail}
              />
            </p>
          </DivAtom>

          <DivAtom
            style={{
              ...voucherStyles.voucherTemplate.summaryDetails.mainContainer,
              justifyContent: 'flex-end',
              paddingRight: 0,
              borderBottom: 0,
            }}
          >
            <FormControlInput
              width={widthHeightDynamicStyle(width, 1300, '50%', '30%') as string}
              label="Director"
              fullWidth={false}
              multiline={false}
              rows={1}
              value={director}
              setValue={setDirector}
              placeholder=""
            />
          </DivAtom>
        </DivAtom>
      </div>

      <DivAtom style={{ padding: '2rem' }}>
        <ButtonAtom
          size="large"
          text="Confirm"
          endIcon={isSavingReceipt && <CircularProgress size={20} color="inherit" />}
          disabled={isSavingReceipt || director === ''}
          onClick={saveVoucherReceipt}
          style={{
            ...voucherStyles.addBtn,
            width: widthHeightDynamicStyle(width, 768, '100%', '15%'),
            margin: widthHeightDynamicStyle(width, 768, '100%', '18%') ? '0 1rem 1rem 0' : '0 0 1rem 2rem',
          }}
        />
      </DivAtom>
    </>
  );
}

export default CashReceipt;
