import { useSelector } from 'react-redux';

import DivAtom from '../../../atoms/DivAtom';
import { selectHeight } from '../../../redux/containerSizeSlice';
import { summaryStyles } from '../../../styles';

function Summary() {
  const height = useSelector(selectHeight);

  return (
    <DivAtom style={summaryStyles.container}>
      <DivAtom
        style={{
          ...summaryStyles.innerContainer,
          height: `${height}px`,
        }}
      >
        Summary
      </DivAtom>
    </DivAtom>
  );
}

export default Summary;
