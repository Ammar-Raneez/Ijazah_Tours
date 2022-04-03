import { useEffect, useState } from 'react';

import DivAtom from '../../../atoms/DivAtom';
import { voucherStyles } from '../../../styles';

function Voucher() {
  const [height, setHeight] = useState(0);

  useEffect(() => {
    setHeight(window.innerHeight - 180);
    const heightListener = window.addEventListener('resize', () => {
      setHeight(window.innerHeight - 180);
    });

    const removeEventListeners = () => {
      window.removeEventListener('resize', heightListener as any);
    };

    return removeEventListeners();
  }, [height]);

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
