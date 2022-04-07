import { useSelector } from 'react-redux';

import Banner from '../../../../organisms/quote/quotation/create-quotation/approval/Banner';
import DivAtom from '../../../../atoms/DivAtom';
import { selectWithNavbarHeight } from '../../../../redux/containerSizeSlice';

function Approval() {
  const height = useSelector(selectWithNavbarHeight);

  return (
    <DivAtom style={{ height: `${height}px` }}>
      <Banner />
    </DivAtom>
  );
}

export default Approval;
