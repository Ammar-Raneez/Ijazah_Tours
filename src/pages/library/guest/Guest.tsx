import { useEffect, useState } from 'react';
import { Route } from 'react-router-dom';
import DivAtom from '../../../atoms/DivAtom';
import CreateGuest from './CreateGuest';
import { LIBRARY_GUEST_DATA } from '../../../data';
import GuestTable from '../../../organisms/library/guest/GuestTable';
import { libraryStyles } from '../../../styles';

function Guest() {
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
    <DivAtom style={libraryStyles.container}>
      <DivAtom
        style={{
          ...libraryStyles.innerContainer,
          height: `${containerHeight}px`,
        }}
      >
        <DivAtom>
          <Route path="/library/guest/create">
            <CreateGuest />
          </Route>
          <Route exact path="/library/guest">
            <GuestTable data={LIBRARY_GUEST_DATA} />
          </Route>
        </DivAtom>
      </DivAtom>
    </DivAtom>
  );
}

export default Guest;
