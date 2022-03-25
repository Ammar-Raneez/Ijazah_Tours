import { ChangeEvent, MouseEventHandler } from 'react';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
} from '@material-ui/core';
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';

import ButtonAtom from '../../atoms/ButtonAtom';
import {
  formCreateMemberStyles,
  libraryTableToolbarStyles,
} from '../../styles';
import InputAtom from '../../atoms/InputAtom';

interface SingleInputDialogProps {
  title: string;
  inputLabel: string;
  newInput: string;
  openDialog: boolean;
  onCreate: MouseEventHandler<HTMLButtonElement>;
  onChange: (val: string) => void;
  setOpenDialog: any;
}

function SingleInputDialog({
  title,
  inputLabel,
  newInput,
  openDialog,
  onChange,
  setOpenDialog,
  onCreate,
}: SingleInputDialogProps) {
  return (
    <>
      <Dialog open={openDialog} onClose={setOpenDialog}>
        <DialogTitle style={formCreateMemberStyles.title}>{title}</DialogTitle>
        <DialogContent style={formCreateMemberStyles.multiFieldDialogContainer}>
          <FormControl>
            <InputLabel>{inputLabel}</InputLabel>
            <InputAtom
              plain="true"
              fullWidth
              multiline={false}
              rows={1}
              value={newInput}
              onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(e.target.value)}
              placeholder={`Enter ${inputLabel}`}
            />
          </FormControl>
          <ButtonAtom
            starticon={<AddCircleOutlineOutlinedIcon />}
            text={title}
            disabled={newInput === ''}
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

export default SingleInputDialog;
