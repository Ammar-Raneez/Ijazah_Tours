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
  newInput: string;
  openDialog: boolean;
  onEditCreate: MouseEventHandler<HTMLButtonElement>;
  onChange: (val: string) => void;
  setOpenDialog: any;
}

function SingleInputDialog({
  title,
  newInput,
  openDialog,
  onChange,
  setOpenDialog,
  onEditCreate,
}: SingleInputDialogProps) {
  return (
    <>
      <Dialog open={openDialog} onClose={setOpenDialog}>
        <DialogTitle style={formCreateMemberStyles.title}>{title}</DialogTitle>
        <DialogContent style={formCreateMemberStyles.multiFieldDialogContainer}>
          <FormControl>
            <InputLabel>{title.substring(4, title.length)}</InputLabel>
            <InputAtom
              plain="true"
              fullWidth
              multiline={false}
              rows={1}
              value={newInput}
              onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(e.target.value)}
              placeholder={`${title.substring(4, title.length)}`}
            />
          </FormControl>
          <ButtonAtom
            starticon={<AddCircleOutlineOutlinedIcon />}
            text={title}
            disabled={newInput === ''}
            onClick={onEditCreate}
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
