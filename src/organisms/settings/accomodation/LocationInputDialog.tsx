import { MouseEventHandler } from 'react';
import {
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
} from '@material-ui/core';

import ButtonAtom from '../../../atoms/ButtonAtom';
import {
  settingsStyles,
  TableToolbarStyles,
} from '../../../styles';
import FormControlInput from '../../../molecules/FormControlInput';
import ParagraphAtom from '../../../atoms/ParagraphAtom';

interface LocationInputDialogProps {
  title: string;
  newTitle: string;
  newCity: string;
  openDialog: boolean;
  showValidationErrorMessage: boolean;
  isCreating: boolean;
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
  showValidationErrorMessage,
  isCreating,
  setOpenDialog,
  setNewTitle,
  setNewCity,
  onCreate,
}: LocationInputDialogProps) {
  return (
    <>
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle style={settingsStyles.title}>{title}</DialogTitle>
        <DialogContent style={settingsStyles.multiFieldDialogContainer}>
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
          {showValidationErrorMessage && (
            <ParagraphAtom
              text="Please fill in all the fields"
              style={{ color: 'red', textAlign: 'center' }}
            />
          )}
          <ButtonAtom
            text={title}
            endIcon={isCreating && <CircularProgress size={20} color="inherit" />}
            size="large"
            disabled={isCreating}
            onClick={onCreate}
            style={{
              ...TableToolbarStyles.addBtn,
              marginTop: '1rem',
            }}
          />
        </DialogContent>
      </Dialog>
    </>
  );
}

export default LocationInputDialog;
