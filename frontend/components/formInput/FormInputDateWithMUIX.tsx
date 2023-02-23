import { Controller, useFormContext } from "react-hook-form";
import TextField from "@mui/material/TextField";
import { FormInputProps } from "./formInputProps";
import { DesktopDatePicker } from "@mui/x-date-pickers";

export const FormInputDateWithMUIX = ({ name, control, label }: FormInputProps) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({
        field: { onChange, value },
      }) => (
        <DesktopDatePicker
          label={label}
          value={value}
          onChange={onChange}
          renderInput={(params) => <TextField {...params} />}
        />
      )}
    />
  );
};