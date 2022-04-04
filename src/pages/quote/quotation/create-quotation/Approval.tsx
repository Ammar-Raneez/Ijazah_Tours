import { useSelector } from 'react-redux';

import DivAtom from '../../../../atoms/DivAtom';
import { selectWithNavbarHeight } from '../../../../redux/containerSizeSlice';

function Approval() {
  const height = useSelector(selectWithNavbarHeight);

  return (
    <DivAtom style={{ height: `${height}px` }}>
      Approval
    </DivAtom>
  );
}

export default Approval;
