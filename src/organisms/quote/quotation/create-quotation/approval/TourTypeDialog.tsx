import {
  Dialog,
  DialogContent,
  DialogTitle,
  FormControl,
  TextField,
} from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';

import { LibraryDriver } from '../../../../../utils/types';
import { quoteCreateQuoteStyles, TableToolbarStyles } from '../../../../../styles';
import ButtonAtom from '../../../../../atoms/ButtonAtom';
import RadioButtonGroup from '../../../../../molecules/RadioButtonGroup';
import { tourTypeOptions } from '../../../../../utils/helpers';
import ParagraphAtom from '../../../../../atoms/ParagraphAtom';

interface TourTypeDialogProps {
  driverData: LibraryDriver[];
  title: string;
  tourType: string;
  validationErrorMsg: boolean;
  openDialog: boolean;
  onConfirm: () => void;
  setOpenDialog: any;
  setTourType: any;
  setDriverChoice: any;
}

function TourTypeDialog({
  driverData,
  tourType,
  title,
  validationErrorMsg,
  openDialog,
  setOpenDialog,
  setTourType,
  setDriverChoice,
  onConfirm,
}: TourTypeDialogProps) {
  const getSelectedDriver = (value: string | null) => {
    const driver = driverData.find((d) => (
      `${d.name} | ${d.tel} | ${d.vehicleType}` === value
    ));

    setDriverChoice(driver);
  };

  return (
    <>
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle style={quoteCreateQuoteStyles.title}>{title}</DialogTitle>
        <DialogContent style={quoteCreateQuoteStyles.multiFieldDialogContainer}>
          <FormControl>
            <RadioButtonGroup
              title="Tour Type"
              options={tourTypeOptions}
              value={tourType}
              radioGroupStyle={{
                ...quoteCreateQuoteStyles.radioBtnContainer,
              }}
              onChange={(e) => setTourType(e.target.value)}
            />
            <Autocomplete
              id="autocomplete-driver-field"
              freeSolo
              onChange={(_, value) => getSelectedDriver(value)}
              options={driverData.map((driver) => `${driver.name} | ${driver.tel} | ${driver.vehicleType}`)}
              renderInput={(params) => <TextField {...params} label="Choose Driver" />}
            />
          </FormControl>
          {validationErrorMsg && (
            <ParagraphAtom
              text="Please Choose a Tour Type and a Driver"
              style={quoteCreateQuoteStyles.errorMsg}
            />
          )}
          <ButtonAtom
            text="Confirm"
            size="large"
            onClick={onConfirm}
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

export default TourTypeDialog;