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

import SectionContainer from '../../../organisms/settings/SectionContainer';
import ReminderTable from '../../../organisms/settings/tour/ReminderTable';
import UnorderedListAtom from '../../../atoms/UnorderedListAtom';
import SingleInputDialog from '../../../organisms/settings/SingleInputDialog';
import ReminderInputDialog from '../../../organisms/settings/tour/ReminderInputDialog';
import DivAtom from '../../../atoms/DivAtom';
import { db } from '../../../firebase';
import { settingsStyles } from '../../../styles';
import { SettingsReminder, SettingsSingleInput } from '../../../utils/types';

const INPUT_TYPES = [
  {
    h2Text: 'Holiday Types',
    btnNewText: 'Add Holiday Type',
    btnEditText: 'Edit Holiday Type',
  },
  {
    h2Text: 'Status',
    btnNewText: 'Add status',
    btnEditText: 'Edit status',
  },
  {
    h2Text: 'Comments',
    btnNewText: 'Add Comment',
    btnEditText: 'Edit Comment',
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

function Tour() {
  const [containerHeight, setContainerHeight] = useState(0);
  const [containerWidth, setContainerWidth] = useState(0);

  const [newSingleInputs, setNewSingleInputs] = useState<string[]>(new Array(3).fill(''));
  const [singleInputsData, setSingleInputsData] = useState<DocumentData[][]>([]);
  const [editInput, setEditInput] = useState('');
  const [editId, setEditId] = useState('');

  const [newReminderTitle, setNewReminderTitle] = useState('');
  const [newReminderDesc, setNewReminderDesc] = useState('');
  const [reminderTypes, setReminderTypes] = useState<boolean[]>(new Array(2).fill(false));
  const [reminderData, setReminderData] = useState<DocumentData[]>([]);

  const [openNewDialogs, setOpenNewDialogs] = useState<boolean[]>(new Array(3).fill(false));
  const [openEditDialogs, setOpenEditDialogs] = useState<boolean[]>(new Array(3).fill(false));
  const [openReminderDialog, setOpenReminderDialog] = useState(false);

  const [isDeleting, setIsDeleting] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [creating, setCreating] = useState(false);

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

      const rData = (await getDocs(collection(db, `Settings Reminders`))).docs;
      const reminders = rData.map((dc) => dc.data());
      const reminderIds = rData.map((dc) => dc.id);
      reminderIds.forEach((id, i) => {
        reminders[i].id = id;
      });
      setReminderData(reminders);
      setSingleInputsData(singleData);
    };

    getInitialData();
  }, [creating, isEditing, isDeleting]);

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
    onOpenNewDialog(i);
  };

  const clearSingleInputs = () => {
    setNewSingleInputs(new Array(3).fill(''));
  };

  const onCreateReminder = async () => {
    setCreating(true);
    const type = reminderTypes[0] ? 'Creation of Customer' : 'Creation of Quotation';
    await setDoc(doc(db, `Settings Reminders`, uuid()), {
      title: newReminderTitle,
      description: newReminderDesc,
      type,
      createdAt: serverTimestamp(),
    });

    clearReminderInputs();
    setCreating(false);
    setOpenReminderDialog(false);
  };

  const onEditSingleInput = async (type: string, id: string, i: number) => {
    setIsEditing(true);
    await updateDoc(doc(db, `Settings ${type}`, id), {
      val: editInput,
      updatedAt: serverTimestamp(),
    });
    setIsEditing(false);
    onOpenEditDialog(i);
  };

  const onEditItem = (i: number, id: string) => {
    const input = singleInputsData[i].find((inp) => inp.id === id);
    setEditInput((input as { val: string }).val);
    setEditId((input as { id: string }).id);
    onOpenEditDialog(i);
  };

  const onDeleteItem = async (type: string, id: string) => {
    // eslint-disable-next-line no-alert, no-restricted-globals
    const confirmDelete = confirm('Are you sure you want to delete this item?');
    if (confirmDelete) {
      setIsDeleting(false);
      await deleteDoc(doc(db, `Settings ${type}`, id));
      setIsDeleting(true);
    }
  };

  const clearReminderInputs = () => {
    setNewReminderTitle('');
    setNewReminderDesc('');
  };

  const onOpenNewDialog = (i: number) => {
    const updatedOpenDialogs = openNewDialogs.map((open, index) => (index === i ? !open : open));
    setOpenNewDialogs(updatedOpenDialogs);
  };

  const onOpenEditDialog = (i: number) => {
    const updatedOpenDialogs = openEditDialogs.map((open, index) => (index === i ? !open : open));
    setOpenEditDialogs(updatedOpenDialogs);
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
        {singleInputsData[0] !== undefined && INPUT_TYPES.map((type, index) => (
          <DivAtom key={index} style={{ marginBottom: '3rem' }}>
            <SectionContainer
              containerWidth={containerWidth}
              h2Text={type.h2Text}
              btnText={type.btnNewText}
              setOpenDialog={() => onOpenNewDialog(index)}
            />
            {/* Create New Dialog */}
            <SingleInputDialog
              title={type.btnNewText}
              newInput={newSingleInputs[index]}
              onChange={(val: string) => onSetNewSingleInputs(index, val)}
              openDialog={openNewDialogs[index]}
              setOpenDialog={() => onOpenNewDialog(index)}
              onEditCreate={() => onCreateSingleInput(type.h2Text, index)}
            />
            {/* Edit Item Dialog */}
            <SingleInputDialog
              title={type.btnEditText}
              newInput={editInput}
              onChange={(val: string) => setEditInput(val)}
              openDialog={openEditDialogs[index]}
              setOpenDialog={() => onOpenEditDialog(index)}
              onEditCreate={() => onEditSingleInput(type.h2Text, editId, index)}
            />
            <UnorderedListAtom
              type={type.h2Text}
              onEditItem={(_, _id) => onEditItem(index, _id)}
              onDeleteItem={(tp, _id) => onDeleteItem(tp, _id)}
              allChildren={listRender(singleInputsData, index)}
            />
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
            {reminderData[0] && (
              <ReminderTable
                columns={['TITLE', 'DESCRIPTION', 'TYPE']}
                data={reminderData as SettingsReminder[]}
              />
            )}
          </DivAtom>
        </DivAtom>
      </DivAtom>
    </DivAtom>
  );
}

export default Tour;
