import { useEffect, useState } from 'react';
import { Route, useHistory } from 'react-router-dom';
import {
  collection,
  deleteDoc,
  doc,
  DocumentData,
  getDocs,
} from 'firebase/firestore';

import CreateAccomodation from './CreateAccomodation';
import AccomodationTable from '../../../organisms/library/accomodation/AccomodationTable';
import DivAtom from '../../../atoms/DivAtom';
import { db } from '../../../firebase';
import { libraryStyles } from '../../../styles';
import { LibraryAccomodation } from '../../../utils/types';
import EditAccomodation from './EditAccomodation';

function Accomodation() {
  const [containerHeight, setContainerHeight] = useState(0);
  const [accomodationData, setAccomodationData] = useState<DocumentData[]>([]);
  const [editAccomodationData, setEditAccomodationData] = useState<LibraryAccomodation>();
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
    const getIntialData = async () => {
      const data = (await getDocs(collection(db, 'Library Accomodation'))).docs;
      const guests = data.map((dc) => dc.data());
      const ids = data.map((dc) => dc.id);
      ids.forEach((id, i) => {
        guests[i].id = id;
      });

      setAccomodationData(guests);
    };

    getIntialData();
  }, [isDeleting]);

  const deleteAccomodation = async (row: LibraryAccomodation) => {
    // eslint-disable-next-line no-alert, no-restricted-globals
    const confirmDelete = confirm('Are you sure you want to delete this accomodation?');
    if (confirmDelete) {
      setIsDeleting(false);
      await deleteDoc(doc(db, 'Library Accomodation', row.id));
      setIsDeleting(true);
    }
  };

  const onEditAccomodationClick = (row: LibraryAccomodation) => {
    setEditAccomodationData(row);
    history.replace(`/library/accomodation/edit/${row.id}`);
  };

  return (
    <DivAtom style={libraryStyles.container}>
      <DivAtom
        style={{
          ...libraryStyles.innerContainer,
          height: `${containerHeight}px`,
        }}
      >
        <Route path="/library/accomodation/create">
          <CreateAccomodation />
        </Route>
        <Route path="/library/accomodation/edit/:id">
          <EditAccomodation row={editAccomodationData as LibraryAccomodation} />
        </Route>
        <Route exact path="/library/accomodation">
          <DivAtom>
            <AccomodationTable
              deleteAccomodation={deleteAccomodation}
              onEditAccomodationClick={onEditAccomodationClick}
              data={accomodationData as LibraryAccomodation[]}
            />
          </DivAtom>
        </Route>
      </DivAtom>
    </DivAtom>
  );
}

export default Accomodation;
