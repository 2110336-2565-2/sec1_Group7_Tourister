import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import TextField from "@mui/material/TextField";
import { FormInputProps } from "./formInputProps";

export const FormInputNumber = ({ name, control, label, readonly }: FormInputProps) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({
        field: { onChange, value },
        fieldState: { error },
        formState,
      }) => (
        <TextField
          // helperText={error ? error.message : null}
          size="small"
          error={Boolean(error)}
          onChange={onChange}
          value={value}
          fullWidth
          label={label}
          variant="outlined"
          inputProps={{ inputMode: 'numeric',pattern: '[0-9]*' }}
        />
      )}
    />
  );
};