/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from 'react';
import { useParams } from 'react-router-dom';

import VoucherSummary from './specific-voucher/VoucherSummary';
import VoucherGuestTable from './specific-voucher/VoucherGuestTable';
import Banner from '../quotation/create-quotation/approval/Banner';
import DivAtom from '../../../atoms/DivAtom';
import H2Atom from '../../../atoms/H2Atom';
import { voucherStyles } from '../../../styles';

interface TourConfirmationVoucherProps {
  voucherData: any;
}

function TourConfirmationVoucher({ voucherData }: TourConfirmationVoucherProps) {
  const { id } = useParams<{ id: string }>();
  const [quoteNo] = useState(id.split('+')[1]);
  const [vData, setVData] = useState(voucherData[quoteNo].find((voucher: { id: string }) => (
    voucher.id === id.split('+')[0]
  )));

  console.log(vData);

  return (
    <>
      <H2Atom style={voucherStyles.title} text="Tour Confirmation Voucher" />
      <DivAtom style={{ padding: '2rem' }}>
        <Banner />
        <VoucherSummary vData={vData} type="tour-confirmation" />
        <VoucherGuestTable
          accColumns={['NIGHTS', 'CITY', 'ACCOMODATION']}
          guestColumns={['ADULTS', 'CHILDREN', 'AGE']}
          data={vData}
        />
      </DivAtom>
    </>
  );
}

export default TourConfirmationVoucher;
