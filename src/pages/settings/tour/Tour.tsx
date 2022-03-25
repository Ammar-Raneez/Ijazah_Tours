import { useEffect, useState } from 'react';

import DivAtom from '../../../atoms/DivAtom';
import SingleInputDialog from '../../../organisms/settings/SingleInputDialog';
import ReminderInputDialog from '../../../organisms/settings/tour/ReminderInputDialog';
import {
  SETTINGS_COMMENTS_DATA,
  SETTINGS_HOLIDAY_TYPE_DATA,
  SETTINGS_REMINDER_DATA,
  SETTINGS_STATUS_DATA,
} from '../../../data';
import ReminderTable from '../../../organisms/settings/tour/ReminderTable';
import UnorderedListAtom from '../../../atoms/UnorderedListAtom';
import { settingsStyles } from '../../../styles';
import SectionContainer from '../../../organisms/settings/SectionContainer';

const INPUT_TYPES = [
  {
    h2Text: 'Holiday Types',
    btnText: 'Add Holiday Type',
  },
  {
    h2Text: 'Status',
    btnText: 'Add status',
  },
  {
    h2Text: 'Comments',
    btnText: 'Add Comment',
  },
];

function listRender(index: number) {
  if (index === 0) {
    return SETTINGS_HOLIDAY_TYPE_DATA;
  }

  if (index === 1) {
    return SETTINGS_STATUS_DATA;
  }

  return SETTINGS_COMMENTS_DATA;
}

function Tour() {
  const [containerHeight, setContainerHeight] = useState(0);
  const [containerWidth, setContainerWidth] = useState(0);

  const [newSingleInputs, setNewSingleInputs] = useState<string[]>(new Array(3).fill(''));

  const [newReminderTitle, setNewReminderTitle] = useState('');
  const [newReminderDesc, setNewReminderDesc] = useState('');
  const [reminderTypes, setReminderTypes] = useState<boolean[]>(new Array(2).fill(false));

  const [openDialogs, setOpenDialogs] = useState<boolean[]>(new Array(3).fill(false));
  const [openReminderDialog, setOpenReminderDialog] = useState(false);

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

  const onCreateReminder = () => {
    // eslint-disable-next-line no-console
    console.log(newReminderTitle, newReminderDesc);
  };

  const onOpenDialog = (i: number) => {
    const updatedOpenDialogs = openDialogs.map((open, index) => (index === i ? !open : open));
    setOpenDialogs(updatedOpenDialogs);
  };

  const onSetNewSingleInputs = (i: number, val: string) => {
    const updatedSingleInputs = newSingleInputs.map((_, index) => (index === i ? val : ''));
    setNewSingleInputs(updatedSingleInputs);
  };

  const onChangeReminderType = (i: number) => {
    const updatedCheckedState = reminderTypes.map((type, index) => (index === i ? !type : type));
    setReminderTypes(updatedCheckedState);
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
            h2Text="Auto Generated Reminders"
            btnText="Add Reminder"
            setOpenDialog={() => setOpenReminderDialog(true)}
          />
          <ReminderInputDialog
            title="Add Reminder"
            newTitle={newReminderTitle}
            newDesc={newReminderDesc}
            setNewTitle={setNewReminderTitle}
            setNewDesc={setNewReminderDesc}
            reminderTypes={reminderTypes}
            openDialog={openReminderDialog}
            setOpenDialog={() => setOpenReminderDialog(false)}
            onCreate={onCreateReminder}
            onChangeReminderType={(i: number) => onChangeReminderType(i)}
          />
          <DivAtom style={{ marginTop: '1rem' }}>
            {SETTINGS_REMINDER_DATA.length > 0 && (
              <ReminderTable
                columns={['TITLE', 'DESCRIPTION', 'TYPE']}
                data={SETTINGS_REMINDER_DATA}
              />
            )}
          </DivAtom>
        </DivAtom>
      </DivAtom>
    </DivAtom>
  );
}

export default Tour;
