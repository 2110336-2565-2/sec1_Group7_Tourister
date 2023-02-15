"use client";

import * as React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Slider } from "@mui/material";

import { validationSchema, FormData, defaultValues} from "./searchSchema";
import { FormInputText } from "@/components/formInput/FormInputText";
import { FormInputDate} from "@/components/formInput/FormInputDate";
import { FormInputTime} from "@/components/formInput/FormInputTime";
import { Box } from "@mui/system";
import MuiInput from '@mui/material/Input';

function valuetext(value: number) {
    return `${value}THB`;
  }
  
  const minDistance = 50;

//   const MaxPriceInput = styled(MuiInput)`
//     width: 42px;
// `;
const SearchForm = () => {
    //slider bar
    const [value, setValue] = React.useState<number[]>([500, 10000]);
    //try to use slider with input
    // const [value, setValue] = React.useState<number | string | Array<number | string>>(
    //     30,
    //   );

    const handleChange = (event: Event, newValue: number | number[], activeThumb: number,) => {
      setValue(newValue as number[]);
      if (!Array.isArray(newValue)) {
        return;
      }
  
      if (activeThumb === 0) {
        setValue([Math.min(newValue[0], value[1] - minDistance), value[1]]);
      } else {
        setValue([value[0], Math.max(newValue[1], value[0] + minDistance)]);
      }
    };
  
    const {
      handleSubmit,
      control,
      formState: { errors },
    } = useForm<FormData>({
      resolver: yupResolver(validationSchema),
      defaultValues: defaultValues,
    });
  
    const onSubmit = (data: FormData) => {
      console.log(data);
    };
  
    return (
      <form
        style={{ display: "flex", alignItems: "center", flexDirection: "column" }}
        onSubmit={handleSubmit(onSubmit)}
      >
        <label>Location</label>
        <FormInputText name="Location" control={control} label="Location" />

        <label>Start Date</label>
        <div>
          <FormInputDate name="startDate" control={control} label=""/>
          {errors.startDate && <p className="errorMsg">{errors.startDate.message}</p>}
          <FormInputTime name="startTime" control={control} label="" readonly={false}/>
          {errors.startTime && <p className="errorMsg">{errors.startTime.message}</p>}
        </div>
        <label>End Date</label>
        <div>
          <FormInputDate name="endDate" control={control} label=""/>
          {errors.endDate && <p className="errorMsg">{errors.endDate.message}</p>}
          <FormInputTime name="endTime" control={control} label="" readonly={false}/>
          {errors.endTime && <p className="errorMsg">{errors.endTime.message}</p>}
        </div>
        <label>Price</label>
        <Box sx={{ width: 300 }}>
            <Slider 
                getAriaLabel={() => 'Price range'}
                value={value}
                min={100} max={50000} step={100}
                onChange={handleChange}
                valueLabelDisplay="auto"
                getAriaValueText={valuetext}>
            </Slider>

        </Box>
        
        <Button type="submit" variant="contained">
          Search
        </Button>
      </form>
    );
  };
  
  export default SearchForm;
  
  