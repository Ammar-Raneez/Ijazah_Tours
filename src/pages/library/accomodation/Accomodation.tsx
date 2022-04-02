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
import { DropdownOption, LibraryAccomodation, SettingsRoomProperties } from '../../../utils/types';
import EditAccomodation from './EditAccomodation';
import { searchData } from '../../../utils/helpers';

function Accomodation() {
  const [containerHeight, setContainerHeight] = useState(0);
  const [accomodationData, setAccomodationData] = useState<DocumentData[]>([]);
  const [roomViewData, setRoomViewData] = useState<SettingsRoomProperties[]>([]);
  const [roomCategoriesData, setRoomCategoriesData] = useState<SettingsRoomProperties[]>([]);
  const [roomGradingsData, setRoomGradingsData] = useState<SettingsRoomProperties[]>([]);
  const [accomodationTypeData, setAccomodationTypeData] = useState<DropdownOption[]>([]);
  const [initialAccomodationSearchData, setInitialAccomodationSearchData] = useState<DocumentData[]>([]);
  const [search, setSearch] = useState('');

  const [editAccomodationData, setEditAccomodationData] = useState<LibraryAccomodation>();
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
    searchData(search, initialAccomodationSearchData, setAccomodationData);
  }, [initialAccomodationSearchData, search]);

  useEffect(() => {
    const getIntialAccomodationData = async () => {
      const data = (await getDocs(collection(db, 'Library Accomodation'))).docs;
      const accomodation = data.map((dc) => dc.data());
      const ids = data.map((dc) => dc.id);
      ids.forEach((id, i) => {
        accomodation[i].id = id;
      });

      setAccomodationData(accomodation);
      setInitialAccomodationSearchData(accomodation);
    };

    getIntialAccomodationData();
  }, [isDeleting, isCreating, isUpdating]);

  useEffect(() => {
    const getIntialRoomData = async () => {
      const vData = (await getDocs(collection(db, 'Settings Room Views'))).docs;
      const tData = (await getDocs(collection(db, 'Settings Room Types'))).docs;
      const gData = (await getDocs(collection(db, 'Settings Room Gradings'))).docs;
      const aData = (await getDocs(collection(db, `Settings Accomodation Types`))).docs;
      const views = vData.map((dc) => dc.data());
      const types = tData.map((dc) => dc.data());
      const gradings = gData.map((dc) => dc.data());
      const accomodationTypes = aData.map((dc) => dc.data());
      const viewIds = vData.map((dc) => dc.id);
      const typeIds = tData.map((dc) => dc.id);
      const gradingIds = gData.map((dc) => dc.id);
      const accomodationTypeIds = aData.map((dc) => dc.id);
      viewIds.forEach((id, i) => {
        views[i].id = id;
      });
      typeIds.forEach((id, i) => {
        types[i].id = id;
      });
      gradingIds.forEach((id, i) => {
        gradings[i].id = id;
      });
      accomodationTypeIds.forEach((id, i) => {
        accomodationTypes[i].id = id;
      });

      setRoomGradingsData(gradings as SettingsRoomProperties[]);
      setRoomViewData(views as SettingsRoomProperties[]);
      setRoomCategoriesData(types as SettingsRoomProperties[]);
      setAccomodationTypeData(accomodationTypes.map((acc) => ({
        value: acc.val,
        label: acc.val,
      })));
    };

    getIntialRoomData();
  }, []);

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
          <CreateAccomodation
            roomViewData={roomViewData}
            roomCategoriesData={roomCategoriesData}
            roomGradingsData={roomGradingsData}
            isCreating={isCreating}
            setIsCreating={setIsCreating}
          />
        </Route>
        <Route path="/library/accomodation/edit/:id">
          <EditAccomodation
            accomodationTypeData={accomodationTypeData}
            roomViewData={roomViewData}
            roomCategoriesData={roomCategoriesData}
            roomGradingsData={roomGradingsData}
            isUpdating={isUpdating}
            setIsUpdating={setIsUpdating}
            row={editAccomodationData as LibraryAccomodation}
          />
        </Route>
        <Route exact path="/library/accomodation">
          <DivAtom>
            <AccomodationTable
              search={search}
              setSearch={setSearch}
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
