import { ChangeEvent } from 'react';
import {
  Checkbox,
  CheckboxProps,
  FormControlLabel,
  withStyles,
} from '@material-ui/core';
import { green } from '@material-ui/core/colors';
import styled from 'styled-components';

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
    <StyledFormControlLabel
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

const StyledFormControlLabel = styled(FormControlLabel)`
  color: rgba(0, 0, 0, 0.54) !important;
`;
