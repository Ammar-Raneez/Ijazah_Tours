import Banner from '../quotation/create-quotation/approval/Banner';
import DivAtom from '../../../atoms/DivAtom';
import H2Atom from '../../../atoms/H2Atom';
import { voucherStyles } from '../../../styles';

interface DriverVoucherProps {
  voucherData: any;
}

function DriverVoucher({ voucherData }: DriverVoucherProps) {
  console.log(voucherData);

  return (
    <>
      <H2Atom style={voucherStyles.title} text="Driver Voucher" />
      <DivAtom style={{ padding: '2rem' }}>
        <Banner />
      </DivAtom>
    </>
  );
}

export default DriverVoucher;