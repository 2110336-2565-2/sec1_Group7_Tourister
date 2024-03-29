import React from "react";
import { Controller, useFormContext } from "react-hook-form";
// import { makeStyles } from '@mui/core/styles';
import TextField from "@mui/material/TextField";
import { FormInputProps } from "./formInputProps";
import { DesktopDatePicker } from "@mui/x-date-pickers";
// import { Dayjs } from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import Stack from '@mui/material/Stack';
// import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
// import { LocalizationProvider } from '@mui/x-date-pickers-pro'; 

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
        // <LocalizationProvider dateAdapter={AdapterDayjs}>
          // <Stack spacing={3}>
    // {/* <LocalizationProvider dateAdapter={AdapterDateFns} localeText={locale}> */}
        // <DesktopDatePicker
        //   label={label}
        //   value={value}
        //   onChange={onChange}
        //   renderInput={(params) => <TextField {...params} />}
        // />
        // {/* </LocalizationProvider>  */}
        // </Stack>
      // </LocalizationProvider>
        <TextField
          onChange={onChange}
          label={label}
          value={value}
          size="small"
          type="date"
          defaultValue={null}
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