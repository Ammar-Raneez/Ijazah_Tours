/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { CircularProgress } from '@material-ui/core';
import { doc, setDoc } from 'firebase/firestore';

import VoucherSummary from './specific-voucher/VoucherSummary';
import VoucherGuestTable from './specific-voucher/VoucherGuestTable';
import Banner from '../quotation/create-quotation/approval/Banner';
import FormControlInput from '../../../molecules/FormControlInput';
import DivAtom from '../../../atoms/DivAtom';
import H2Atom from '../../../atoms/H2Atom';
import SpanAtom from '../../../atoms/SpanAtom';
import ButtonAtom from '../../../atoms/ButtonAtom';
import { selectWithNavbarWidth } from '../../../redux/containerSizeSlice';
import { widthHeightDynamicStyle } from '../../../utils/helpers';
import { db } from '../../../firebase';
import { voucherStyles } from '../../../styles';

interface ItineraryVoucherProps {
  voucherData: any;
  setIsVoucherApproved: any;
}

function ItineraryVoucher({ voucherData, setIsVoucherApproved }: ItineraryVoucherProps) {
  const width = useSelector(selectWithNavbarWidth);

  const { id } = useParams<{ id: string }>();
  const [quoteNo] = useState(id.split('+')[1]);
  const [vData, setVData] = useState(voucherData[quoteNo].find((voucher: { id: string }) => (
    voucher.id === id.split('+')[0]
  )));

  const [director, setDirector] = useState('');

  const [isSavingVoucher, setIsSavingVoucher] = useState(false);

  const history = useHistory();

  const saveVoucher = async () => {
    setIsSavingVoucher(true);
    setIsVoucherApproved(false);
    const vDataCopy = { ...vData };
    vDataCopy.director = director;
    await updateDB(vDataCopy);
    setVData(vDataCopy);
    setIsSavingVoucher(false);
    setIsVoucherApproved(true);
    history.replace('/quote/voucher');
  };

  const updateDB = async (vDataCopy: any) => {
    const { id: updatedVDataId, ...updatedVData } = vDataCopy;
    await setDoc(doc(db, 'Vouchers', quoteNo, 'Vouchers', updatedVDataId), updatedVData);
  };

  return (
    <>
      <H2Atom style={voucherStyles.title} text="Itinerary Voucher" />
      <DivAtom style={{ padding: '2rem' }}>
        <Banner />
        <VoucherSummary vData={vData} type="itinerary" />
        <VoucherGuestTable
          accColumns={['NIGHTS', 'CITY', 'ACCOMODATION']}
          guestColumns={['ADULTS', 'CHILDREN', 'AGE']}
          data={vData}
        />
        <DivAtom
          style={{
            ...voucherStyles.voucherTemplate.summaryDetails.mainContainer,
            justifyContent: 'flex-end',
          }}
        >
          <p style={voucherStyles.voucherTemplate.summaryDetails.detailContainer}>
            <SpanAtom
              text="Payment"
              style={voucherStyles.voucherTemplate.summaryDetails.label}
            />
            <SpanAtom
              text={vData.guestDetails.netPrice}
              style={voucherStyles.voucherTemplate.summaryDetails.detail}
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
        <DivAtom style={{ padding: '2rem' }}>
          <ButtonAtom
            size="large"
            text="Confirm"
            endIcon={isSavingVoucher && <CircularProgress size={20} color="inherit" />}
            disabled={isSavingVoucher || director === ''}
            onClick={saveVoucher}
            style={{
              ...voucherStyles.addBtn,
              width: widthHeightDynamicStyle(width, 768, '100%', '15%'),
              margin: widthHeightDynamicStyle(width, 768, '100%', '18%') ? '0 1rem 1rem 0' : '0 0 1rem 2rem',
            }}
          />
        </DivAtom>
      </DivAtom>
    </>
  );
}

export default ItineraryVoucher;
