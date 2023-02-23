import * as React from 'react';
import Box from '@mui/joy/Box';
import FormLabel from '@mui/joy/FormLabel';
import Radio from '@mui/joy/Radio';
import RadioGroup from '@mui/joy/RadioGroup';
import Sheet from '@mui/joy/Sheet';
import { FormInputProps } from '../formInput/formInputProps';
import { Controller } from "react-hook-form";

export const IconlessRadio = ({name,control,label,options,style}:FormInputProps) => {
  const generateRadioOptions = () => {
    return (
      options &&
      options.map((singleOption, index) => (
      <Sheet
        key={singleOption.value}
        // sx={{
        //   p: 2,
        //   borderRadius: 'md',
        //   boxShadow: 'sm',
        //   bgcolor: 'background.body',
        // }}
      >
        <Radio
          label={singleOption.label}
          overlay
          disableIcon
          value={singleOption.value}
          // slotProps={{
          //   label: ({ checked }:{checked:Boolean}) => ({
          //     sx: {
          //       fontWeight: 'lg',
          //       fontSize: 'md',
          //       color: checked ? 'text.primary' : 'text.secondary',
          //     },
          //   }),
            // action: ({ checked }) => ({
            //   sx: (theme) => ({
            //     ...(checked && {
            //       '--variant-borderWidth': '2px',
            //       '&&': {
            //         // && to increase the specificity to win the base :hover styles
            //         borderColor: theme.vars.palette.primary[500],
            //       },
            //     }),
            //   }),
            // }),
          // }}
        />
      </Sheet>
      ))
    );
  };
  return (
    <Controller
        name={name}
        control={control}
        render={({
          field: { onChange, value },
        }) => (
          <RadioGroup
            // aria-labelledby="storage-label"
            defaultValue="any"
            // size="lg"
            // sx={{ gap: 1.5 }}
            value={value}
            onChange={onChange}
          >
            {generateRadioOptions()}
          </RadioGroup>
        )}
      />
  );
}