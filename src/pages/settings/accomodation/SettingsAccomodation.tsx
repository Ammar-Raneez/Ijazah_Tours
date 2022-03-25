import { useEffect, useState } from 'react';

import DivAtom from '../../../atoms/DivAtom';
import UnorderedListAtom from '../../../atoms/UnorderedListAtom';
import {
  SETTINGS_ACCOMODATION_TYPE_DATA,
  SETTINGS_LOCATION_DATA,
  SETTINGS_ROOM_TYPE_DATA,
  SETTINGS_ROOM_VIEWS_DATA,
} from '../../../data';
import LocationInputDialog from '../../../organisms/settings/accomodation/LocationInputDialog';
import LocationTable from '../../../organisms/settings/accomodation/Locationtable';
import SectionContainer from '../../../organisms/settings/SectionContainer';
import SingleInputDialog from '../../../organisms/settings/SingleInputDialog';
import { settingsStyles } from '../../../styles';

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

function listRender(index: number) {
  if (index === 0) {
    return SETTINGS_ROOM_TYPE_DATA;
  }

  if (index === 1) {
    return SETTINGS_ACCOMODATION_TYPE_DATA;
  }

  return SETTINGS_ROOM_VIEWS_DATA;
}

function SettingsAccomodation() {
  const [containerHeight, setContainerHeight] = useState(0);
  const [containerWidth, setContainerWidth] = useState(0);

  const [newSingleInputs, setNewSingleInputs] = useState<string[]>(new Array(3).fill(''));

  const [newLocationTitle, setNewLocationTitle] = useState('');
  const [newLocationCity, setNewLocationCity] = useState('');

  const [openDialogs, setOpenDialogs] = useState<boolean[]>(new Array(3).fill(false));
  const [openLocationDialog, setOpenLocationDialog] = useState(false);

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

  const onCreateSingleInput = (type: string, i: number) => {
    const val = newSingleInputs[i];
    // eslint-disable-next-line no-console
    console.log(type, i, val);
  };

  const onCreateLocation = () => {
    // eslint-disable-next-line no-console
    console.log(newLocationTitle, newLocationCity);
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
        {INPUT_TYPES.map((type, index) => (
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
              onCreate={() => onCreateSingleInput(type.h2Text, index)}
            />
            <UnorderedListAtom allChildren={listRender(index)} />
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
            {SETTINGS_LOCATION_DATA.length > 0 && (
              <LocationTable
                columns={['LOCATION', 'CITY']}
                data={SETTINGS_LOCATION_DATA}
              />
            )}
          </DivAtom>
        </DivAtom>
      </DivAtom>
    </DivAtom>
  );
}

export default SettingsAccomodation;
