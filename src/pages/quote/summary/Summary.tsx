import { useEffect, useState } from 'react';

import DivAtom from '../../../atoms/DivAtom';
import { summaryStyles } from '../../../styles';

function Summary() {
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
