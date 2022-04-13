import Banner from '../quotation/create-quotation/approval/Banner';
import DivAtom from '../../../atoms/DivAtom';
import H2Atom from '../../../atoms/H2Atom';
import { voucherStyles } from '../../../styles';

interface CashReceiptProps {
  voucherData: any;
}

function CashReceipt({ voucherData }: CashReceiptProps) {
  console.log(voucherData);

  return (
    <>
      <H2Atom style={voucherStyles.title} text="Cash Receipt" />
      <DivAtom style={{ padding: '2rem' }}>
        <Banner />
      </DivAtom>
    </>
  );
}

export default CashReceipt;
