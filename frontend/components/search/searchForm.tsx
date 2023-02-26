import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "@mui/material";

import { validationSchema, defaultValues, FormData, formDataToProgramFilter} from "./searchSchema";
import { ProgramFilterInterface } from "@/interfaces/filter/ProgramFilterInterface";

import { FormInputText } from "@/components/formInput/FormInputText";
import { FormInputDateWithMUIX } from "@/components/formInput/FormInputDateWithMUIX"
import { FormInputNumber } from "@/components/formInput/FormInputNumber";
import { SearchPopup } from "./SearchPopup";
import { Box } from "@mui/system";
import { FormInputRadio } from "../formInput/FormInputRadio"
import styled from "styled-components";
import { IconlessRadio } from "./IconlessRadio";
import { FormInputSelect } from "../formInput/FormInputSelect";

const HeaderInPopup = styled.h4`
  margin:0.7rem 0 0.5rem 0;
`

const SearchForm = ({setProgramFilter}:{setProgramFilter:any}) => {
  const [advanceSearchPopup, setAdvanceSearchPopup] = useState(false);
  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: yupResolver(validationSchema),
    defaultValues: defaultValues,
  });

  const onSubmit = (data: FormData) => {
    const programFilter:ProgramFilterInterface = formDataToProgramFilter(data);
    console.log(programFilter);
    setProgramFilter(programFilter);
  };

  const showAdvanceSearchPopup = () => {
    setAdvanceSearchPopup(true);
    document.body.style.overflow = 'hidden';
  }

  const resetForm = () => {
    reset(defaultValues);
  }

  return (
    <>
    <h1 style={{textAlign: "center"}}> Searching</h1>
    <form
      style={{ display: "flex", alignItems: "center", flexDirection: "column" }}
      onSubmit={handleSubmit(onSubmit)}
    >
      <label>Location</label>
      <FormInputText name="province" control={control} label="Ready to find your perfect trips?" />

      <Button onClick={showAdvanceSearchPopup} variant="outlined">Advance</Button>
      <SearchPopup trigger={advanceSearchPopup} setTrigger={setAdvanceSearchPopup}>
        <HeaderInPopup>Sort by</HeaderInPopup>
        <FormInputRadio 
        name="sortBy" 
        control={control} 
        label="" 
        options={[
          {value:"date",label:"Start Date"},
          {value:"price",label:"Price"}
        ]}
        />

        <HeaderInPopup>Date Range</HeaderInPopup>
        <div style={{width:"100%", display:"flex", gap:"1rem"}}>
          <FormInputDateWithMUIX name="startDate" control={control} label="Start Date"/>
          <FormInputDateWithMUIX name="endDate" control={control} label="End Date"/>
        </div>

        <HeaderInPopup>Price Range</HeaderInPopup>
        <div style={{display:"flex", alignItems:"center", gap:"0.3rem"}}>
          <FormInputNumber name="minPrice" control={control} label="minimum"/>
          -
          <FormInputNumber name="maxPrice" control={control} label="maximum"/>
        </div>

        <HeaderInPopup>Participants</HeaderInPopup>
        <FormInputSelect 
          name="participant" 
          control={control} 
          label="" 
          options={[
            {value:"",label:"Any"},
            {value:"1-5",label:"1-5"},
            {value:"6-15",label:"6-15"},
            {value:"16-40",label:"16-40"},
            {value:"41+",label:"41+"}
          ]}
        />

        <HeaderInPopup>Language</HeaderInPopup>
        <FormInputSelect 
          name="language" 
          control={control} 
          label=""
          options={[
            {value: "",label:"Any"},
            {value:"Thai",label:"Thai"},
            {value:"English",label:"English"},
            {value:"Chinese",label:"Chinese"},
            {value:"Japanese",label:"Japanese"},
            {value:"Korean",label:"Korean"},
            {value:"Spanish",label:"Spanish"},
            {value:"Russian",label:"Russian"}
          ]}
        />
        
        <div style={{display:"flex",alignSelf:"center", gap:"1rem"}}>
          <Button style={{width:"10rem"}} onClick={resetForm} variant="outlined">Reset</Button>
          <Button style={{width:"10rem"}} type="submit" variant="contained">Apply</Button>
        </div>
      </SearchPopup>
      
      <Button type="submit" variant="contained">
        Search
      </Button>
    </form>
    </>
  );
  };
  
  export default SearchForm;
  
  