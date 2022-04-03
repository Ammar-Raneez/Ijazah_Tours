import { useSelector } from 'react-redux';

import DivAtom from '../../../atoms/DivAtom';
import { selectHeight } from '../../../redux/containerSizeSlice';
import { settingsStyles } from '../../../styles';

function General() {
  const height = useSelector(selectHeight);

  return (
    <DivAtom style={settingsStyles.container}>
      <DivAtom
        style={{
          ...settingsStyles.innerContainer,
          height: `${height}px`,
        }}
      >
        Settings General
      </DivAtom>
    </DivAtom>
  );
}

export default General;
