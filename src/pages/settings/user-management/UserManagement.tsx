import { useEffect, useState } from 'react';
import DivAtom from '../../../atoms/DivAtom';
import { settingsStyles } from '../../../styles';

function UserManagement() {
  const [containerHeight, setContainerHeight] = useState(0);

  useEffect(() => {
    setContainerHeight(window.innerHeight - 180);
    const heightListener = window.addEventListener('resize', () => {
      setContainerHeight(window.innerHeight - 180);
    });

    const removeEventListeners = () => {
      window.removeEventListener('resize', heightListener as any);
    };

    return removeEventListeners();
  }, [containerHeight]);

  return (
    <DivAtom style={settingsStyles.container}>
      <DivAtom
        style={{
          ...settingsStyles.innerContainer,
          height: `${containerHeight}px`,
        }}
      >
        Settings UserManagement
      </DivAtom>
    </DivAtom>
  );
}

export default UserManagement;
