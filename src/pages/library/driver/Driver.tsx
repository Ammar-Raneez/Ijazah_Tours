import { useEffect, useState } from 'react';
import { Route, useHistory } from 'react-router-dom';
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
} from 'firebase/firestore';

import CreateDriver from './CreateDriver';
import EditDriver from './EditDriver';
import DriverTable from '../../../organisms/library/driver/DriverTable';
import DivAtom from '../../../atoms/DivAtom';
import { db } from '../../../firebase';
import { libraryStyles } from '../../../styles';

function Driver() {
  const [containerHeight, setContainerHeight] = useState(0);
  const [driverData, setDriverData] = useState<any[]>([]);
  const [editDriverData, setEditDriverData] = useState<any>();
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
      const data = (await getDocs(collection(db, 'Library Drivers'))).docs;
      const drivers = data.map((dc) => dc.data());
      const ids = data.map((dc) => dc.id);
      ids.forEach((id, i) => {
        drivers[i].id = id;
      });

      setDriverData(drivers);
    };

    getIntialData();
  }, [isDeleting]);

  const deleteDriver = async (row: any) => {
    // eslint-disable-next-line no-alert, no-restricted-globals
    const confirmDelete = confirm('Are you sure you want to delete this driver?');
    if (confirmDelete) {
      setIsDeleting(false);
      await deleteDoc(doc(db, 'Library Drivers', row.id));
      setIsDeleting(true);
    }
  };

  const onEditDriverClick = (row: any) => {
    setEditDriverData(row);
    history.replace(`/library/driver/edit/${row.id}`);
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
          <Route path="/library/driver/create">
            <CreateDriver />
          </Route>
          <Route path="/library/driver/edit/:id">
            <EditDriver row={editDriverData} />
          </Route>
          <Route exact path="/library/driver">
            <DriverTable onEditDriverClick={onEditDriverClick} deleteDriver={deleteDriver} data={driverData} />
          </Route>
        </DivAtom>
      </DivAtom>
    </DivAtom>
  );
}

export default Driver;
