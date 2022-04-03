import { useEffect, useState } from 'react';
import {
  collection,
  deleteDoc,
  doc,
  DocumentData,
  getDocs,
  serverTimestamp,
  setDoc,
  updateDoc,
} from 'firebase/firestore';
import { v4 as uuid } from 'uuid';

import LocationInputDialog from '../../../organisms/settings/accomodation/LocationInputDialog';
import LocationTable from '../../../organisms/settings/accomodation/LocationTable';
import SectionContainer from '../../../organisms/settings/SectionContainer';
import SingleInputDialog from '../../../organisms/settings/SingleInputDialog';
import DivAtom from '../../../atoms/DivAtom';
import UnorderedListAtom from '../../../atoms/UnorderedListAtom';
import { db } from '../../../firebase';
import { SettingsLocation, SettingsSingleInput } from '../../../utils/types';
import { settingsStyles } from '../../../styles';

const INPUT_TYPES = [
  {
    h2Text: 'Room Types',
    btnText: 'Add Room Type',
    btnEditText: 'Edit Room Type',
  },
  {
    h2Text: 'Accomodation Types',
    btnText: 'Add Accomodation Type',
    btnEditText: 'Edit Accomodation Type',
  },
  {
    h2Text: 'Room Views',
    btnText: 'Add Room View',
    btnEditText: 'Edit Room View',
  },
];

function listRender(data: DocumentData[][], index: number) {
  if (index === 0) {
    return data[0] as SettingsSingleInput[];
  }

  if (index === 1) {
    return data[1] as SettingsSingleInput[];
  }

  return data[2] as SettingsSingleInput[];
}

function SettingsAccomodation() {
  const [containerHeight, setContainerHeight] = useState(0);
  const [containerWidth, setContainerWidth] = useState(0);

  const [singleInputsData, setSingleInputsData] = useState<DocumentData[][]>([]);
  const [newSingleInput, setNewSingleInput] = useState('');
  const [editSingleInput, setEditSingleInput] = useState('');

  const [locationData, setLocationData] = useState<DocumentData[]>([]);
  const [newLocationTitle, setNewLocationTitle] = useState('');
  const [newLocationCity, setNewLocationCity] = useState('');
  const [editLocationTitle, setEditLocationTitle] = useState('');
  const [editLocationCity, setEditLocationCity] = useState('');

  const [editId, setEditId] = useState('');

  const [openNewDialogs, setOpenNewDialogs] = useState<boolean[]>(new Array(3).fill(false));
  const [openEditDialogs, setOpenEditDialogs] = useState<boolean[]>(new Array(3).fill(false));
  const [openNewLocationDialog, setOpenNewLocationDialog] = useState(false);
  const [openEditLocationDialog, setOpenEditLocationDialog] = useState(false);

  const [showValidationErrorMessage, setShowValidationErrorMessage] = useState(false);

  const [isDeleting, setIsDeleting] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isCreating, setIsCreating] = useState(false);

  useEffect(() => {
    const getInitialData = async () => {
      const singleData = await Promise.all(
        INPUT_TYPES.map(async (type) => {
          const sData = (await getDocs(collection(db, `Settings ${type.h2Text}`))).docs;
          const data = sData.map((dc) => dc.data());
          const ids = sData.map((dc) => dc.id);
          ids.forEach((id, i) => {
            data[i].id = id;
          });
          return data;
        }),
      );

      const lData = (await getDocs(collection(db, `Settings Locations`))).docs;
      const locations = lData.map((dc) => dc.data());
      const locationIds = lData.map((dc) => dc.id);
      locationIds.forEach((id, i) => {
        locations[i].id = id;
      });
      setLocationData(locations);
      setSingleInputsData(singleData);
    };

    getInitialData();
  }, [isCreating, isDeleting, isUpdating]);

  useEffect(() => {
    setContainerHeight(window.innerHeight - 180);
    setContainerWidth(window.innerWidth);

    const widthListener = window.addEventListener('resize', () => {
      setContainerWidth(window.innerWidth);
    });
    const heightListener = window.addEventListener('resize', () => {
      setContainerHeight(window.innerHeight - 180);
    });

    const removeEventListeners = () => {
      window.removeEventListener('resize', heightListener as any);
      window.removeEventListener('resize', widthListener as any);
    };

    return removeEventListeners();
  }, [containerWidth, containerHeight]);

  const onCreateSingleInput = async (type: string, i: number) => {
    setShowValidationErrorMessage(false);
    if (newSingleInput.trim() === '') {
      setShowValidationErrorMessage(true);
      return;
    }

    setIsCreating(true);
    await setDoc(doc(db, `Settings ${type}`, uuid()), {
      val: newSingleInput,
      createdAt: serverTimestamp(),
    });

    setNewSingleInput('');
    setIsCreating(false);
    onOpenNewDialog(i);
  };

  const onEditSingleInput = async (type: string, i: number) => {
    setShowValidationErrorMessage(false);
    if (editSingleInput.trim() === '') {
      setShowValidationErrorMessage(true);
      return;
    }

    setIsUpdating(true);
    await updateDoc(doc(db, `Settings ${type}`, editId), {
      val: editSingleInput,
      updatedAt: serverTimestamp(),
    });
    setIsUpdating(false);
    onOpenEditDialog(i);
  };

  const onDeleteSingleInput = async (type: string, id: string) => {
    // eslint-disable-next-line no-alert, no-restricted-globals
    const confirmDelete = confirm('Are you sure you want to delete this item?');
    if (confirmDelete) {
      setIsDeleting(false);
      await deleteDoc(doc(db, `Settings ${type}`, id));
      setIsDeleting(true);
    }
  };

  const onCreateLocation = async () => {
    setShowValidationErrorMessage(false);
    if (newLocationTitle.trim() === '' || newLocationCity.trim() === '') {
      setShowValidationErrorMessage(true);
      return;
    }

    setIsCreating(true);
    await setDoc(doc(db, `Settings Locations`, uuid()), {
      title: newLocationTitle,
      city: newLocationCity,
      createdAt: serverTimestamp(),
    });

    clearLocationInputs();
    setIsCreating(false);
    setOpenNewLocationDialog(false);
  };

  const clearLocationInputs = () => {
    setNewLocationTitle('');
    setNewLocationCity('');
  };

  const onEditLocation = async () => {
    setShowValidationErrorMessage(false);
    if (editLocationTitle.trim() === '' || editLocationCity.trim() === '') {
      setShowValidationErrorMessage(true);
      return;
    }

    setIsUpdating(true);
    await updateDoc(doc(db, `Settings Locations`, editId), {
      title: editLocationTitle,
      city: editLocationCity,
      updatedAt: serverTimestamp(),
    });
    setIsUpdating(false);
    setOpenEditLocationDialog(false);
  };

  const deleteLocation = async (row: SettingsLocation) => {
    // eslint-disable-next-line no-alert, no-restricted-globals
    const confirmDelete = confirm('Are you sure you want to delete this item?');
    if (confirmDelete) {
      setIsDeleting(false);
      await deleteDoc(doc(db, `Settings Locations`, row.id));
      setIsDeleting(true);
    }
  };

  const onEditItemClick = (i: number, id: string) => {
    const input = singleInputsData[i].find((inp) => inp.id === id);
    setEditSingleInput((input as { val: string }).val);
    setEditId((input as { id: string }).id);
    onOpenEditDialog(i);
    setShowValidationErrorMessage(false);
  };

  const onEditLocationClick = (row: SettingsLocation) => {
    setOpenEditLocationDialog(true);
    setEditLocationTitle(row.title);
    setEditLocationCity(row.city);
    setEditId(row.id);
    setShowValidationErrorMessage(false);
  };

  const onOpenNewDialog = (i: number) => {
    const updatedOpenDialogs = openNewDialogs.map((open, index) => (index === i ? !open : open));
    setOpenNewDialogs(updatedOpenDialogs);
    setShowValidationErrorMessage(false);
  };

  const onOpenEditDialog = (i: number) => {
    const updatedOpenDialogs = openEditDialogs.map((open, index) => (index === i ? !open : open));
    setOpenEditDialogs(updatedOpenDialogs);
    setShowValidationErrorMessage(false);
  };

  return (
    <DivAtom style={settingsStyles.container}>
      <DivAtom
        style={{
          ...settingsStyles.innerContainer,
          height: `${containerHeight}px`,
        }}
      >
        {singleInputsData[0] !== undefined && INPUT_TYPES.map((type, index) => (
          <DivAtom key={index} style={{ marginBottom: '3rem' }}>
            <SectionContainer
              containerWidth={containerWidth}
              h2Text={type.h2Text}
              btnText={type.btnText}
              setOpenDialog={() => onOpenNewDialog(index)}
            />
            {/* Create Item Dialog */}
            <SingleInputDialog
              title={type.btnText}
              showValidationErrorMessage={showValidationErrorMessage}
              isCreating={isCreating}
              newInput={newSingleInput}
              onChange={(val: string) => setNewSingleInput(val)}
              openDialog={openNewDialogs[index]}
              setOpenDialog={() => onOpenNewDialog(index)}
              onEditCreate={() => onCreateSingleInput(type.h2Text, index)}
            />
            {/* Edit Item Dialog */}
            <SingleInputDialog
              title={type.btnEditText}
              showValidationErrorMessage={showValidationErrorMessage}
              isCreating={isUpdating}
              newInput={editSingleInput}
              onChange={(val: string) => setEditSingleInput(val)}
              openDialog={openEditDialogs[index]}
              setOpenDialog={() => onOpenEditDialog(index)}
              onEditCreate={() => onEditSingleInput(type.h2Text, index)}
            />
            <UnorderedListAtom
              allChildren={listRender(singleInputsData, index)}
              type={type.h2Text}
              onEditItem={(_, _id) => onEditItemClick(index, _id)}
              onDeleteItem={(tp, _id) => onDeleteSingleInput(tp, _id)}
            />
          </DivAtom>
        ))}

        <DivAtom style={{ marginBottom: '3rem' }}>
          <SectionContainer
            containerWidth={containerWidth}
            h2Text="Locations"
            btnText="Add Location"
            setOpenDialog={() => setOpenNewLocationDialog(true)}
          />
          {/* Add Location */}
          <LocationInputDialog
            title="Add Location"
            showValidationErrorMessage={showValidationErrorMessage}
            isCreating={isCreating}
            newTitle={newLocationTitle}
            newCity={newLocationCity}
            setNewTitle={setNewLocationTitle}
            setNewCity={setNewLocationCity}
            openDialog={openNewLocationDialog}
            setOpenDialog={() => setOpenNewLocationDialog(false)}
            onCreate={onCreateLocation}
          />
          {/* Edit Location */}
          <LocationInputDialog
            title="Edit Location"
            showValidationErrorMessage={showValidationErrorMessage}
            isCreating={isUpdating}
            newTitle={editLocationTitle}
            newCity={editLocationCity}
            setNewTitle={setEditLocationTitle}
            setNewCity={setEditLocationCity}
            openDialog={openEditLocationDialog}
            setOpenDialog={() => setOpenEditLocationDialog(false)}
            onCreate={onEditLocation}
          />
          <DivAtom style={{ marginTop: '1rem' }}>
            {locationData[0] && (
              <LocationTable
                columns={['LOCATION', 'CITY', '', '']}
                data={locationData as SettingsLocation[]}
                deleteLocation={deleteLocation}
                onEditLocationClick={onEditLocationClick}
              />
            )}
          </DivAtom>
        </DivAtom>
      </DivAtom>
    </DivAtom>
  );
}

export default SettingsAccomodation;
