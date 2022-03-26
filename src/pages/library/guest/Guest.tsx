import { useEffect, useState } from 'react';
import { Route } from 'react-router-dom';
import { collection, getDocs } from 'firebase/firestore';

import CreateGuest from './CreateGuest';
import GuestTable from '../../../organisms/library/guest/GuestTable';
import DivAtom from '../../../atoms/DivAtom';
import { db } from '../../../firebase';
import { libraryStyles } from '../../../styles';

function Guest() {
  const [containerHeight, setContainerHeight] = useState(0);
  const [guestData, setGuestData] = useState<any[]>([]);

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

  useEffect(() => {
    const getIntialData = async () => {
      const data = (await getDocs(collection(db, 'Library Guests'))).docs.map((dc) => dc.data());
      setGuestData(data);
    };

    getIntialData();
  }, []);

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
            <GuestTable data={guestData} />
          </Route>
        </DivAtom>
      </DivAtom>
    </DivAtom>
  );
}

export default Guest;
