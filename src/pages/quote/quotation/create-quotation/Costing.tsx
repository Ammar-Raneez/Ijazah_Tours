import { useEffect, useState } from 'react';

import DivAtom from '../../../../atoms/DivAtom';

function Costing() {
  const [width, setWidth] = useState(0);
  const [containerHeight, setContainerHeight] = useState(0);

  useEffect(() => {
    setWidth(window.innerWidth);
    setContainerHeight(window.innerHeight - 220);
    const widthListener = window.addEventListener('resize', () => {
      setWidth(window.innerWidth);
    });
    const heightListener = window.addEventListener('resize', () => {
      setContainerHeight(window.innerHeight - 220);
    });

    const removeEventListeners = () => {
      window.removeEventListener('resize', widthListener as any);
      window.removeEventListener('resize', heightListener as any);
    };

    return removeEventListeners();
  }, [width, containerHeight]);

  return (
    <DivAtom style={{ height: `${containerHeight}px` }}>
      Costing
    </DivAtom>
  );
}

export default Costing;
