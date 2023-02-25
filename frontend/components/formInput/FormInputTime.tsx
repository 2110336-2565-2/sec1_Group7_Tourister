import React from "react";
import { Controller, useFormContext } from "react-hook-form";
// import { makeStyles } from '@material-ui/core/styles';
import TextField from "@mui/material/TextField";
import { FormInputProps } from "./formInputProps";

// const useStyles = makeStyles((theme) => ({
//   container: {
//     display: 'flex',
//     flexWrap: 'wrap',
//   },
//   textField: {
//     marginLeft: theme.spacing(1),
//     marginRight: theme.spacing(1),
//     width: 120,
//   },
// }));

export const FormInputTime = ({ name, control, label, readonly }: FormInputProps) => {
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
          onChange={onChange}
          label={label}
          value={value}
          size="small"
          type="time"
          defaultValue="00:00"      
          InputLabelProps={{
            shrink: true,
          }}
          InputProps={{
            readOnly: readonly
          }}
          helperText={error ? error.message : null}
          error={Boolean(error)}
        />
      )}
    />
  );
};