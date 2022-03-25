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

interface LocationInputDialogProps {
  title: string;
  newTitle: string;
  newCity: string;
  openDialog: boolean;
  onCreate: MouseEventHandler<HTMLButtonElement>;
  setNewTitle: any;
  setNewCity: any;
  setOpenDialog: any;
}

function LocationInputDialog({
  title,
  newTitle,
  newCity,
  openDialog,
  setOpenDialog,
  setNewTitle,
  setNewCity,
  onCreate,
}: LocationInputDialogProps) {
  return (
    <>
      <Dialog open={openDialog} onClose={setOpenDialog}>
        <DialogTitle style={formCreateMemberStyles.title}>{title}</DialogTitle>
        <DialogContent style={formCreateMemberStyles.multiFieldDialogContainer}>
          <FormControlInput
            label="Location"
            fullWidth
            multiline={false}
            rows={1}
            value={newTitle}
            placeholder="Enter Location"
            setValue={setNewTitle}
            margin="0 0 1rem 0"
            flex={1}
          />
          <FormControlInput
            label="City"
            fullWidth
            multiline={false}
            rows={1}
            value={newCity}
            placeholder="Enter City"
            setValue={setNewCity}
            margin="0 0 1rem 0"
            flex={1}
          />
          <ButtonAtom
            starticon={<AddCircleOutlineOutlinedIcon />}
            text={title}
            disabled={newTitle === '' || newCity === ''}
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

export default LocationInputDialog;
