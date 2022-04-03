import { useEffect, useState } from 'react';

import DivAtom from '../../../atoms/DivAtom';
import { settingsStyles } from '../../../styles';

function General() {
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
