import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import TextField from "@mui/material/TextField";
import { FormInputProps } from "./formInputProps";

export const FormInputMultilineText = ({ name, control, label, readonly }: FormInputProps) => {
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
          helperText={error ? error.message : null}
          size="small"
          error={Boolean(error)}
          onChange={onChange}
          value={value}
          fullWidth
          multiline
          minRows={5}
          placeholder={label}
          variant="outlined"
          InputProps={{
            readOnly: readonly
          }}
        />
      )}
    />
  );
};