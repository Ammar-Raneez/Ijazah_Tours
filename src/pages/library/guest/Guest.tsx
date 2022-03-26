import { useEffect, useState } from 'react';
import { Route, useHistory } from 'react-router-dom';
import {
  collection,
  deleteDoc,
  doc,
  DocumentData,
  getDocs,
} from 'firebase/firestore';

import CreateGuest from './CreateGuest';
import EditGuest from './EditGuest';
import GuestTable from '../../../organisms/library/guest/GuestTable';
import DivAtom from '../../../atoms/DivAtom';
import { db } from '../../../firebase';
import { LibraryGuest } from '../../../utils/types';
import { libraryStyles } from '../../../styles';
import { searchData } from '../../../utils/helpers';

function Guest() {
  const [containerHeight, setContainerHeight] = useState(0);
  const [guestData, setGuestData] = useState<DocumentData[]>([]);
  const [initialGuestSearchData, setInitialGuestSearchData] = useState<DocumentData[]>([]);
  const [search, setSearch] = useState('');

  const [editGuestData, setEditGuestData] = useState<LibraryGuest>();
  const [isCreating, setIsCreating] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const history = useHistory();

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
    searchData(search, initialGuestSearchData, setGuestData);
  }, [initialGuestSearchData, search]);

  useEffect(() => {
    const getIntialData = async () => {
      const data = (await getDocs(collection(db, 'Library Guests'))).docs;
      const guests = data.map((dc) => dc.data());
      const ids = data.map((dc) => dc.id);
      ids.forEach((id, i) => {
        guests[i].id = id;
      });

      setGuestData(guests);
      setInitialGuestSearchData(guests);
    };

    getIntialData();
  }, [isDeleting, isCreating, isUpdating]);

  const deleteGuest = async (row: LibraryGuest) => {
    // eslint-disable-next-line no-alert, no-restricted-globals
    const confirmDelete = confirm('Are you sure you want to delete this guest?');
    if (confirmDelete) {
      setIsDeleting(false);
      await deleteDoc(doc(db, 'Library Guests', row.id));
      setIsDeleting(true);
    }
  };

  const onEditGuestClick = (row: LibraryGuest) => {
    setEditGuestData(row);
    history.replace(`/library/guest/edit/${row.id}`);
  };

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
            <CreateGuest isCreating={isCreating} setIsCreating={setIsCreating} />
          </Route>
          <Route path="/library/guest/edit/:id">
            <EditGuest
              isUpdating={isUpdating}
              setIsUpdating={setIsUpdating}
              row={editGuestData as LibraryGuest}
            />
          </Route>
          <Route exact path="/library/guest">
            <GuestTable
              search={search}
              setSearch={setSearch}
              onEditGuestClick={onEditGuestClick}
              deleteGuest={deleteGuest}
              data={guestData as LibraryGuest[]}
            />
          </Route>
        </DivAtom>
      </DivAtom>
    </DivAtom>
  );
}

export default Guest;
