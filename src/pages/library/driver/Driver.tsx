import { useEffect, useState } from 'react';
import { Route, useHistory } from 'react-router-dom';
import {
  collection,
  deleteDoc,
  doc,
  DocumentData,
  getDocs,
} from 'firebase/firestore';

import CreateDriver from './CreateDriver';
import EditDriver from './EditDriver';
import DriverTable from '../../../organisms/library/driver/DriverTable';
import DivAtom from '../../../atoms/DivAtom';
import { db } from '../../../firebase';
import { libraryStyles } from '../../../styles';
import { LibraryDriver } from '../../../utils/types';
import { searchData } from '../../../utils/helpers';

function Driver() {
  const [height, setHeight] = useState(0);
  const [driverData, setDriverData] = useState<DocumentData[]>([]);
  const [initialDriverSearchData, setInitialDriverSearchData] = useState<DocumentData[]>([]);
  const [search, setSearch] = useState('');

  const [editDriverData, setEditDriverData] = useState<LibraryDriver>();
  const [isCreating, setIsCreating] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const history = useHistory();

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

  useEffect(() => {
    searchData(search, initialDriverSearchData, setDriverData);
  }, [initialDriverSearchData, search]);

  useEffect(() => {
    const getIntialData = async () => {
      const data = (await getDocs(collection(db, 'Library Drivers'))).docs;
      const drivers = data.map((dc) => dc.data());
      const ids = data.map((dc) => dc.id);
      ids.forEach((id, i) => {
        drivers[i].id = id;
      });

      setDriverData(drivers);
      setInitialDriverSearchData(drivers);
    };

    getIntialData();
  }, [isDeleting, isCreating, isUpdating]);

  const deleteDriver = async (row: LibraryDriver) => {
    // eslint-disable-next-line no-alert, no-restricted-globals
    const confirmDelete = confirm('Are you sure you want to delete this driver?');
    if (confirmDelete) {
      setIsDeleting(false);
      await deleteDoc(doc(db, 'Library Drivers', row.id));
      setIsDeleting(true);
    }
  };

  const onEditDriverClick = (row: LibraryDriver) => {
    setEditDriverData(row);
    history.replace(`/library/driver/edit/${row.id}`);
  };

  return (
    <DivAtom style={libraryStyles.container}>
      <DivAtom
        style={{
          ...libraryStyles.innerContainer,
          height: `${height}px`,
        }}
      >
        <DivAtom>
          <Route path="/library/driver/create">
            <CreateDriver isCreating={isCreating} setIsCreating={setIsCreating} />
          </Route>
          <Route path="/library/driver/edit/:id">
            <EditDriver
              isUpdating={isUpdating}
              setIsUpdating={setIsUpdating}
              row={editDriverData as LibraryDriver}
            />
          </Route>
          <Route exact path="/library/driver">
            <DriverTable
              search={search}
              setSearch={setSearch}
              onEditDriverClick={onEditDriverClick}
              deleteDriver={deleteDriver}
              data={driverData as LibraryDriver[]}
            />
          </Route>
        </DivAtom>
      </DivAtom>
    </DivAtom>
  );
}

export default Driver;
