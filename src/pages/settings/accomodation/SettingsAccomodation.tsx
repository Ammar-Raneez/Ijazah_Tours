import { useEffect, useState } from 'react';
import {
  collection,
  doc,
  DocumentData,
  getDocs,
  serverTimestamp,
  setDoc,
} from 'firebase/firestore';
import { v4 as uuid } from 'uuid';

import LocationInputDialog from '../../../organisms/settings/accomodation/LocationInputDialog';
import LocationTable from '../../../organisms/settings/accomodation/Locationtable';
import SectionContainer from '../../../organisms/settings/SectionContainer';
import SingleInputDialog from '../../../organisms/settings/SingleInputDialog';
import DivAtom from '../../../atoms/DivAtom';
// import UnorderedListAtom from '../../../atoms/UnorderedListAtom';
import { db } from '../../../firebase';
import { settingsStyles } from '../../../styles';
import { SettingsLocation } from '../../../utils/types';

const INPUT_TYPES = [
  {
    h2Text: 'Room Types',
    btnText: 'Add Room Type',
  },
  {
    h2Text: 'Accomodation Types',
    btnText: 'Add Accomodation Type',
  },
  {
    h2Text: 'Room Views',
    btnText: 'Add Room View',
  },
];

// function listRender(data: DocumentData[][], index: number) {
//   if (index === 0) {
//     return data[0] as SettingsSingleInput[];
//   }

//   if (index === 1) {
//     return data[1] as SettingsSingleInput[];
//   }

//   return data[2] as SettingsSingleInput[];
// }

function SettingsAccomodation() {
  const [containerHeight, setContainerHeight] = useState(0);
  const [containerWidth, setContainerWidth] = useState(0);

  const [newSingleInputs, setNewSingleInputs] = useState<string[]>(new Array(3).fill(''));
  const [singleInputsData, setSingleInputsData] = useState<DocumentData[][]>([]);

  const [newLocationTitle, setNewLocationTitle] = useState('');
  const [newLocationCity, setNewLocationCity] = useState('');
  const [locationData, setLocationData] = useState<DocumentData[]>([]);

  const [openDialogs, setOpenDialogs] = useState<boolean[]>(new Array(3).fill(false));
  const [openLocationDialog, setOpenLocationDialog] = useState(false);

  const [creating, setCreating] = useState(false);

  useEffect(() => {
    const getInitialData = async () => {
      const singleData = await Promise.all(
        INPUT_TYPES.map(async (type) => (
          await getDocs(collection(db, `Settings ${type.h2Text}`))).docs.map((dc) => dc.data())),
      );
      const locations = (await getDocs(collection(db, `Settings Locations`))).docs.map((dc) => dc.data());
      setLocationData(locations);
      setSingleInputsData(singleData);
    };

    getInitialData();
  }, [creating]);

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
    setCreating(true);
    const val = newSingleInputs[i];
    await setDoc(doc(db, `Settings ${type}`, uuid()), {
      val,
      createdAt: serverTimestamp(),
    });

    clearSingleInputs();
    setCreating(false);
    onOpenDialog(i);
  };

  const clearSingleInputs = () => {
    setNewSingleInputs(new Array(3).fill(''));
  };

  const onCreateLocation = async () => {
    setCreating(true);
    await setDoc(doc(db, `Settings Locations`, uuid()), {
      title: newLocationTitle,
      city: newLocationCity,
      createdAt: serverTimestamp(),
    });

    clearLocationInputs();
    setCreating(false);
    setOpenLocationDialog(false);
  };

  const clearLocationInputs = () => {
    setNewLocationTitle('');
    setNewLocationCity('');
  };

  const onOpenDialog = (i: number) => {
    const updatedOpenDialogs = openDialogs.map((open, index) => (index === i ? !open : open));
    setOpenDialogs(updatedOpenDialogs);
  };

  const onSetNewSingleInputs = (i: number, val: string) => {
    const updatedSingleInputs = newSingleInputs.map((_, index) => (index === i ? val : ''));
    setNewSingleInputs(updatedSingleInputs);
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
              setOpenDialog={() => onOpenDialog(index)}
            />
            <SingleInputDialog
              title={type.btnText}
              newInput={newSingleInputs[index]}
              onChange={(val: string) => onSetNewSingleInputs(index, val)}
              openDialog={openDialogs[index]}
              setOpenDialog={() => onOpenDialog(index)}
              onEditCreate={() => onCreateSingleInput(type.h2Text, index)}
            />
            {/* <UnorderedListAtom allChildren={listRender(singleInputsData, index)} /> */}
          </DivAtom>
        ))}

        <DivAtom style={{ marginBottom: '3rem' }}>
          <SectionContainer
            containerWidth={containerWidth}
            h2Text="Locations"
            btnText="Add Location"
            setOpenDialog={() => setOpenLocationDialog(true)}
          />
          <LocationInputDialog
            title="Add Location"
            newTitle={newLocationTitle}
            newCity={newLocationCity}
            setNewTitle={setNewLocationTitle}
            setNewCity={setNewLocationCity}
            openDialog={openLocationDialog}
            setOpenDialog={() => setOpenLocationDialog(false)}
            onCreate={onCreateLocation}
          />
          <DivAtom style={{ marginTop: '1rem' }}>
            {locationData[0] && (
              <LocationTable
                columns={['LOCATION', 'CITY']}
                data={locationData as SettingsLocation[]}
              />
            )}
          </DivAtom>
        </DivAtom>
      </DivAtom>
    </DivAtom>
  );
}

export default SettingsAccomodation;
