import { FormControl, InputLabel } from "@material-ui/core";
import { ChangeEvent } from "react";
import InputAtom from "../atoms/InputAtom";

interface FormControlInputProps {
  label: string;
  value: string;
  placeholder: string;
  margin: string;
  fullWidth: boolean;
  multiline: boolean;
  rows: number;
  setValue: any;
  flex?: number;
}

function FormControlInput({
  label,
  fullWidth,
  multiline,
  rows,
  value,
  placeholder,
  margin,
  setValue,
  flex,
}: FormControlInputProps) {
  return (
    <FormControl style={{ margin, flex }}>
      <InputLabel>{label}</InputLabel>
      <InputAtom
        plain="true"
        fullWidth={fullWidth}
        multiline={multiline}
        rows={rows}
        value={value}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setValue(e.target.value)
        }
        placeholder={placeholder}
      />
    </FormControl>
  );
}

export default FormControlInput;
