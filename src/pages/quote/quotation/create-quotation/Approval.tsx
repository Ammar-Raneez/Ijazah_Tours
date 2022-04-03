import { useSelector } from 'react-redux';

import DivAtom from '../../../../atoms/DivAtom';
import { selectHeight } from '../../../../redux/containerSizeSlice';

function Approval() {
  const height = useSelector(selectHeight);

  return (
    <DivAtom style={{ height: `${height}px` }}>
      Approval
    </DivAtom>
  );
}

export default Approval;
