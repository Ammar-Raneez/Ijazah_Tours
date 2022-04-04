import { useSelector } from 'react-redux';

import DivAtom from '../../../atoms/DivAtom';
import { selectWithNavbarHeight } from '../../../redux/containerSizeSlice';
import { voucherStyles } from '../../../styles';

function Voucher() {
  const height = useSelector(selectWithNavbarHeight);

  return (
    <DivAtom style={voucherStyles.container}>
      <DivAtom
        style={{
          ...voucherStyles.innerContainer,
          height: `${height}px`,
        }}
      >
        Voucher
      </DivAtom>
    </DivAtom>
  );
}

export default Voucher;
