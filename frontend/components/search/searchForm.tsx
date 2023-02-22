import * as React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Slider } from "@mui/material";

import { validationSchema, defaultValues} from "./searchSchema";
import { ProgramFilterInterface } from "@/interfaces/filter/ProgramFilterInterface";

import { FormInputText } from "@/components/formInput/FormInputText";
import { FormInputDate} from "@/components/formInput/FormInputDate";
import { FormInputTime} from "@/components/formInput/FormInputTime";
import { FormInputNumber } from "@/components/formInput/FormInputNumber";
import { SearchPopup } from "./SearchPopup";
import { Box } from "@mui/system";
import MuiInput from '@mui/material/Input';

const SearchForm = () => {
  const [advanceSearchPopup, setAdvanceSearchPopup] = useState(false);
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ProgramFilterInterface>({
    resolver: yupResolver(validationSchema),
    defaultValues: defaultValues,
  });

  const onSubmit = (data: ProgramFilterInterface) => {
    console.log(data);
  };

  const showAdvanceSearchPopup = () => {
    setAdvanceSearchPopup(true);
    document.body.style.overflow = 'hidden';
  }

  return (
    <>
      <h1 style=
      {{textAlign: "center"}}> Searching</h1>
    <form
      style={{ display: "flex", alignItems: "center", flexDirection: "column" }}
      onSubmit={handleSubmit(onSubmit)}
    >
      <label>Location</label>
      <FormInputText name="location" control={control} label="Ready to find your perfect trips?" />

      <Button onClick={showAdvanceSearchPopup} variant="outlined">Advance</Button>
      <SearchPopup trigger={advanceSearchPopup} setTrigger={setAdvanceSearchPopup}>
        <Box sx={{ width: 'sm' ,padding:'5%'}}>
            <h4>Sort by</h4>
            <h4>Date Range</h4>
            <label>Start</label>
            <div>
              <FormInputDate name="startDate" control={control} label="Start Date"/>
            </div>
            <label>End</label>
            <div>
              <FormInputDate name="endDate" control={control} label="End Date"/>
            </div>
            <h4>Price Range</h4>
            <div style={{display:"flex", alignItems:"center"}}>
              <FormInputNumber name="minPrice" control={control} label="minimum"/>
              -
              <FormInputNumber name="maxPrice" control={control} label="maximum"/>
            </div>
        </Box>
      </SearchPopup>
      
      <Button type="submit" variant="contained">
        Search
      </Button>
    </form>
    </>
  );
  };
  
  export default SearchForm;
  
  