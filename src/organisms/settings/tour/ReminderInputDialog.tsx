import { MouseEventHandler } from 'react';
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from '@material-ui/core';
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';

import ButtonAtom from '../../../atoms/ButtonAtom';
import {
  formCreateMemberStyles,
  libraryTableToolbarStyles,
} from '../../../styles';
import FormControlInput from '../../../molecules/FormControlInput';
import CheckboxGroup from '../../../molecules/CheckboxGroup';

interface ReminderInputDialogProps {
  title: string;
  newTitle: string;
  newDesc: string;
  reminderTypes: boolean[];
  openDialog: boolean;
  onCreate: MouseEventHandler<HTMLButtonElement>;
  onChangeReminderType: (i: number) => void;
  setNewTitle: any;
  setNewDesc: any;
  setOpenDialog: any;
}

function ReminderInputDialog({
  title,
  newTitle,
  newDesc,
  reminderTypes,
  openDialog,
  setOpenDialog,
  setNewTitle,
  setNewDesc,
  onCreate,
  onChangeReminderType,
}: ReminderInputDialogProps) {
  return (
    <>
      <Dialog open={openDialog} onClose={setOpenDialog}>
        <DialogTitle style={formCreateMemberStyles.title}>{title}</DialogTitle>
        <DialogContent style={formCreateMemberStyles.multiFieldDialogContainer}>
          <CheckboxGroup
            grouptitle="Reminder Type"
            labels={['Creation of Customer', 'Creation of Quote']}
            names={['customer', 'quote']}
            checked={reminderTypes}
            onChange={(_, i: number) => onChangeReminderType(i)}
            style={{ flexDirection: 'column', margin: '0' }}
          />
          <FormControlInput
            label="Reminder Title"
            fullWidth
            multiline={false}
            rows={1}
            value={newTitle}
            placeholder="Enter Reminder Title"
            setValue={setNewTitle}
            margin="0 0 1rem 0"
            flex={1}
          />
          <FormControlInput
            label="Reminder Description"
            fullWidth
            multiline={false}
            rows={1}
            value={newDesc}
            placeholder="Enter Reminder Description"
            setValue={setNewDesc}
            margin="0 0 1rem 0"
            flex={1}
          />
          <ButtonAtom
            starticon={<AddCircleOutlineOutlinedIcon />}
            text={title}
            disabled={newTitle === '' || newDesc === ''}
            onClick={onCreate}
            style={{
              ...libraryTableToolbarStyles.addBtn,
              marginTop: '1rem',
            }}
            size="large"
          />
        </DialogContent>
      </Dialog>
    </>
  );
}

export default ReminderInputDialog;
