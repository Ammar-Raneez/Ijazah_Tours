import {
  createStyles,
  FormControl,
  FormGroup,
  FormLabel,
  makeStyles,
  Theme,
} from '@material-ui/core';
import CheckboxAtom from '../atoms/CheckboxAtom';

const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    display: 'flex',
    flexDirection: 'row' as const,
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
}

function CheckboxGroup({
  grouptitle,
  labels,
  names,
  checked,
  setChecked,
}: CheckboxGroupProps) {
  const classes = useStyles();

  return (
    <FormControl component="fieldset" className={classes.formControl}>
      <FormLabel component="legend">{grouptitle}</FormLabel>

      <FormGroup className={classes.root}>
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
