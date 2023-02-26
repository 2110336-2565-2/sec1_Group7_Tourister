import { Controller } from "react-hook-form";
import { FormInputProps } from "./formInputProps";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export const FormInputSelect = ({ name, control, label, readonly, options }: FormInputProps) => {
  const generateOptions = () => {
    return (
      options && options.map(({value, label})=> (
        <MenuItem key={value} id={value} value={value}>{label}</MenuItem>
      ))
    )
  }
  return (
    <FormControl size="small">
      <InputLabel id={name}>{label}</InputLabel>
      <Controller
        name={name}
        control={control}
        render={({
          field: { onChange, value },
          fieldState: { error },
          formState,
        }) => (
          <Select
            // id={value}
            value={value}
            label={label}
            onChange={onChange}
          >
            {generateOptions()}
          </Select>
        )}
      />
    </FormControl>
  );
};