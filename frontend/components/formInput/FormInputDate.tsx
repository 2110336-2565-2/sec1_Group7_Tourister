import React from "react";
import { Controller, useFormContext } from "react-hook-form";
// import { makeStyles } from '@mui/core/styles';
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
//     width: 180,
//   },
// }));

export const FormInputDate = ({ name, control, label }: FormInputProps) => {
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
          id="date"
          onChange={onChange}
          size="small"
          type="date"
          defaultValue="2023-01-01"
          // className={useStyles().textField}
          InputLabelProps={{
            shrink: true,
          }}
          helperText={error ? error.message : null}
          error={Boolean(error)}
        />
      )}
    />
  );
};