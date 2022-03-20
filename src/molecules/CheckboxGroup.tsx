import {
  createStyles,
  FormControl,
  FormGroup,
  FormLabel,
  makeStyles,
  Theme,
} from '@material-ui/core';
import { CSSProperties } from 'react';
import CheckboxAtom from '../atoms/CheckboxAtom';

const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    display: 'flex',
  },
  formControl: {
    marginLeft: theme.spacing(3),
  },
}));

interface CheckboxGroupProps {
  grouptitle: string;
  labels: string[];
  names: string[];
  checked: boolean[];
  setChecked: any[];
  style: CSSProperties;
}

function CheckboxGroup({
  grouptitle,
  labels,
  names,
  checked,
  setChecked,
  style,
}: CheckboxGroupProps) {
  const classes = useStyles();

  return (
    <FormControl component="fieldset" className={classes.formControl}>
      <FormLabel component="legend">{grouptitle}</FormLabel>

      <FormGroup style={style} className={classes.root}>
        {labels.map((lb, index) => (
          <CheckboxAtom
            label={lb}
            name={names[index]}
            setChecked={setChecked[index]}
            checked={checked[index]}
          />
        ))}
      </FormGroup>
    </FormControl>
  );
}

export default CheckboxGroup;
