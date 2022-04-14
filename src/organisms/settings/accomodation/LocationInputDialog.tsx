import { ChangeEvent, MouseEventHandler } from 'react';

import {
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  Input,
  MenuItem,
  Select,
} from '@material-ui/core';
import { Country, City } from 'country-state-city';
import { v4 as uuid } from 'uuid';

import ButtonAtom from '../../../atoms/ButtonAtom';
import ParagraphAtom from '../../../atoms/ParagraphAtom';
import TextFieldAtom from '../../../atoms/TextFieldAtom';
import {
  libraryStyles,
  settingsStyles,
  TableToolbarStyles,
} from '../../../styles';
import { MenuProps } from '../../../utils/helpers';
import { LocationDropdown, CityDropdown } from '../../../utils/types';

interface LocationInputDialogProps {
  title: string;
  newLocation: LocationDropdown;
  newCities: CityDropdown[];
  openDialog: boolean;
  showValidationErrorMessage: boolean;
  isCreating: boolean;
  onCreate: MouseEventHandler<HTMLButtonElement>;
  setNewLocation: any;
  setNewCities: any;
  setOpenDialog: any;
}

function LocationInputDialog({
  title,
  newLocation,
  newCities,
  openDialog,
  showValidationErrorMessage,
  isCreating,
  setOpenDialog,
  setNewLocation,
  setNewCities,
  onCreate,
}: LocationInputDialogProps) {
  const countries = Country.getAllCountries();

  const updatedCountries = countries?.map((country) => ({
    label: country.name,
    value: country.name,
    id: country.isoCode,
  }));

  const updatedStates = (id: string) => (
    City.getCitiesOfCountry(id)
      ?.map((state) => ({ label: state.name, value: state.name }))
  );

  const onCountryChange = (val: string) => {
    const countryCode = countries.find((c) => c.name === val)?.isoCode;
    setNewLocation({ id: countryCode, label: val, value: val });
    setNewCities([]);
  };

  const handleCitiesChange = (event: ChangeEvent<{ value: unknown }>) => {
    const val = event.target.value as string[];
    const toSet = val.map((v) => ({
      countryId: newLocation.id,
      countryName: newLocation.value,
      label: v,
      value: v,
    }));

    setNewCities(toSet);
  };

  return (
    <>
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle style={settingsStyles.title}>{title}</DialogTitle>
        <DialogContent style={settingsStyles.multiFieldDialogContainer}>
          {updatedCountries && (
            <>
              <TextFieldAtom
                variant="standard"
                size="medium"
                label="Location"
                value={newLocation.value}
                onChange={(e: ChangeEvent<HTMLTextAreaElement>) => onCountryChange(e.target.value)}
                options={updatedCountries}
                adornmentPosition="end"
                style={{
                  ...libraryStyles.textField,
                  width: '100%',
                }}
                disableUnderline={false}
                select
              />

              <Select
                labelId="cities-label"
                id="cities"
                multiple
                placeholder="Cities"
                value={newCities.map((city) => city.value)}
                onChange={handleCitiesChange}
                input={<Input />}
                MenuProps={MenuProps}
              >
                {updatedStates(newLocation.id)?.map((city) => (
                  <MenuItem key={uuid()} value={city.value}>
                    {city.label}
                  </MenuItem>
                ))}
              </Select>
            </>
          )}
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
