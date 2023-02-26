import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import TextField from "@mui/material/TextField";
import { FormInputProps } from "./formInputProps";
import * as React from 'react';
import Box from '@mui/material/Box';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import Checkbox from '@mui/material/Checkbox';

export const FormInputCheckBox = ({ name, control, label, item }: FormInputProps) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({
        field: { onChange, value },
        fieldState: { error },
        formState,
      }) => (
        <Box sx={{ display: 'flex' }}>
        <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
          <FormLabel component="legend">Assign responsibility</FormLabel>
          <FormGroup>
            {item?.map((i)=>{
              <FormControlLabel
                control={
                  <Checkbox checked={i} onChange={onChange} name="gilad" />
                }
                label="Gilad Gray"
              />
            })}
            <FormControlLabel
              control={
                <Checkbox checked={jason} onChange={handleChange} name="jason" />
              }
              label="Jason Killian"
            />
            <FormControlLabel
              control={
                <Checkbox checked={antoine} onChange={handleChange} name="antoine" />
              }
              label="Antoine Llorca"
            />
          </FormGroup>
          <FormHelperText>Be careful</FormHelperText>
        </FormControl>
        <FormControl
          required
          error={error}
          component="fieldset"
          sx={{ m: 3 }}
          variant="standard"
        >
          <FormLabel component="legend">Pick two</FormLabel>
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox checked={gilad} onChange={handleChange} name="gilad" />
              }
              label="Gilad Gray"
            />
            <FormControlLabel
              control={
                <Checkbox checked={jason} onChange={handleChange} name="jason" />
              }
              label="Jason Killian"
            />
            <FormControlLabel
              control={
                <Checkbox checked={antoine} onChange={handleChange} name="antoine" />
              }
              label="Antoine Llorca"
            />
          </FormGroup>
          <FormHelperText>You can display an error</FormHelperText>
        </FormControl>
      </Box>
      )}
    />
  );
};