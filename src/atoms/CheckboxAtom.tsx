import {
  Checkbox,
  CheckboxProps,
  FormControlLabel,
  withStyles,
} from '@material-ui/core';
import { green } from '@material-ui/core/colors';
import { ChangeEvent } from 'react';

const GreenCheckbox = withStyles({
  root: {
    color: green[400],
    '&$checked': {
      color: green[600],
    },
  },
  checked: {},
})((props: CheckboxProps) => <Checkbox color="default" {...props} />);

interface CheckboxAtomProps {
  label: string;
  name: string;
  checked: boolean;
  setChecked: (checked: boolean) => void;
}

function CheckboxAtom({
  label,
  name,
  checked,
  setChecked,
}: CheckboxAtomProps) {
  return (
    <FormControlLabel
      control={
        <GreenCheckbox
          checked={checked}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setChecked(e.target.checked)}
          name={name}
        />
      }
      label={label}
    />
  );
}

export default CheckboxAtom;
