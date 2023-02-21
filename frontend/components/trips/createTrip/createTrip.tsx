"use client";

import React from "react";
import { useState, MouseEvent, Fragment } from "react";
import Link from 'next/link';
import { Controller,useFormContext,useForm,useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup";
import { nanoid } from "nanoid";
import Attraction from "./attraction";
import DayTrip from "./dayTrip";
import axios from 'axios';
import { FormInputText } from "@/components/formInput/FormInputText";
import { FormInputRadio } from "@/components/formInput/FormInputRadio";
import { FormInputDate} from "@/components/formInput/FormInputDate";
import { FormInputTime} from "@/components/formInput/FormInputTime";
import TextField from "@mui/material/TextField";
import { createProgram,updateProgramById} from "@/services/programService"
import { ProgramInterface } from "@/interfaces/ProgramInterface";
import { set } from "react-hook-form/dist/utils";
var ReactDOM = require('react-dom');
const API_URL = 'http://localhost:2000/api/program'

type att = [{
  "id": string,
  "name": string,
  "option": string,
  "editing": boolean,
  "error": boolean
}]
type FormData = {
  programId:string
  name: string;
  description: string;
  price: number;
  province: string;
  startDate: Date;
  startTime: string;
  endDate: Date;
  endTime: string;
  max_participant: string;
  language: [string];
  meetLocation: string;
  meetProvince: string;
  descriptionOfMeetLocation: string;
  endLocation: string;
  endProvince: string;
  descriptionOfEndLocation: string;
  // attractions: att
}
// type accountType = 'tourist' | 'guide';
const defaultValues = {
  programId: nanoid(),
  // attractions: [{
  //   "id": nanoid(),
  //   "name": "",
  //   "option": "Addmission not needed",
  //   "editing": true,
  //   "error": false
  // }],
}

const validationSchema = yup.object().shape({
  name: yup.string().required("Please enter your trip name"),
  startDate: yup.date().required('Please enter your start date'),
  startTime: yup.string().required('Please enter your start time'),
  endDate: yup.date().required('Please enter your end date'),
  endTime: yup.string().required('Please enter your end time'),
  // price: yup.string().required('Please enter your price')
  // .matches(/^[0-9]+$/, "Price must be only digits"),
  price: yup.number().required('Please enter your price'),
  max_participant: yup.string().required('Please enter your group size')
  .matches(/^[0-9]+$/, "Group size must be only digits"),
  language: yup.string().required('Please enter your trip language'),
  description: yup.string(),
  meetLocation: yup.string().required('Please enter your trip start location'),
  descriptionOfMeetLocation: yup.string(),
  endLocation: yup.string().required('Please enter your trip end location'),
  descriptionOfEndLocation: yup.string()
});

const createTrip = () => {
  const [stage, setStage ] = useState(0);
  const [attractions,setAttractions] = useState([{"Tue Jan 03 2023 07:00:00 GMT+0700 (เวลาอินโดจีน)":[{
    "id": nanoid(),
    "name": "",
    "option": "Addmission not needed",
  }]}]);
  const [day,setDay] =  useState<string[]>([]);
  const [dayTrips,setDayTrips] = useState<[{
    day:  string,
    attractions : [{
      "id": string,
      "time": string,
      "name": string,
      "province": string,
      "option": string,
      "file": File | undefined
    }]
  }]>();
  // const [attractions,setAttractions] = useState();

  const HandleNext = () => {
    let date = new Date(getValues("startDate"))
    let end = new Date(getValues("endDate"))
    if(date > end){
      return;
    }
    setStage(1)
    console.log(attractions)
    console.log(date)
    end.setDate(end.getDate() + 1)
    let k = 0
    while(date.toString()!==end.toString()){
      const i = date.toString()
      setDay(day => [...day,i])
      // if(!(date.toString() in attractions)){
      //   const D = date.toString()
      //   const newDate = {
      //     D : [{
      //       id: nanoid(),
      //       name: "",
      //       option: "Admission not needed",
      //       editing: true,
      //       error: false
      //     }]
      //   }
      //   setAttractions({...attractions,...newDate})
      // }
      date.setDate(date.getDate() + 1);
      k = k+1
      if(k>100){break}
    }
    console.log(day)
    // console.log(attractions)
  }
  const HandleSaveDraft = () => {
    setStage(0)
  }
  const onSubmit = async (data : FormData) => {
    try {
      // const response = await createProgram({...data,attractions:attractions})
      const response = await axios.post(API_URL,{...data,attractions:attractions})
      console.log(response)
    } catch (error) {
      console.log(error)
    }
  }
  const {
    register,
    watch,
    getValues,
    control,
    clearErrors,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>({
    resolver: yupResolver(validationSchema),
    defaultValues: defaultValues
  });

  const handleCallback = (day:string,attractions:{
    id: string;
    name: string;
    option: string;
}[]) => {
  const updatedDayTrips = dayTrips?.map((daytrip)=>{
    if(daytrip.day===day){
      const updateDT = {...daytrip,day,attractions}
      return updateDT
    }
    return daytrip
  })
  updatedDayTrips?setDayTrips(updatedDayTrips?updatedDayTrips:[{day,attractions}])
    // const updatedAttractions = attractions.map((att) => {
      // if(att.id===id){
      //   const updatedAtt = {...att,id,name,option,file}
      //   return updatedAtt
      // }
      // return att
    // })
    // setAttractions(updatedAttractions)
  }
  return (
    <form style={{display:'flex', alignItems: 'center',flexDirection:'column'}}onSubmit={handleSubmit(onSubmit)}>
      {/* <Link href="../register" passHref><button type="button" onClick={handleBackButton}>Back</button></Link> */}
        <Link href="/trips" passHref><button type="button">Back</button></Link>
        {stage===0?(
          <Fragment>
            <label>Trip Name</label>
            <FormInputText name="name" control={control} label="Name"/>
            <label>Trip Description</label>
            <FormInputText name="description" control={control} label="More Information..."/>
            <label>Price(THB)</label>
            <FormInputText name="price" control={control} label="Price in THB"/>
            <label>Pick a province</label>
            <FormInputText name="province" control={control} label="Pick a province for showing"/>
            <label>Duration</label>
            <label>Start</label>
            <div>
              <FormInputDate name="startDate" control={control} label=""/>
              <FormInputTime name="startTime" control={control} label="" readonly={false}/>
            </div>
            <label>End</label>
            <div>
              <FormInputDate name="endDate" control={control} label=""/>
              <FormInputTime name="endTime" control={control} label="" readonly={false}/>
            </div>
            <label>Group Size</label>
            <FormInputText name="max_participant" control={control} label="Number of participant(s)"/>
            <label>Language</label>
            <FormInputRadio name="language" control={control} label="" 
              options={[
                {label: "Thai", value: "Thai"}, 
                {label: "English", value: "English" },
                {label: "Chinese", value: "Chinese"}, 
                {label: "Japanese", value: "Japanese" },
                {label: "Korean", value: "Korean"}, 
                {label: "Spanish", value: "Spanish" },
                {label: "Russian", value: "Russian"}, 
                {label: "German", value: "German" },
              ]}/>
              <FormInputRadio name="thai" control={control} label="" 
                options={[
                  {label: "Thai", value: "Thai"}, 
                ]}/>
            <button type="button" onClick={()=>{HandleNext()}}>Next</button>
          </Fragment>
        ):(
          <Fragment>
            {/* {attractions.map((day)=>(
              <Fragment>
              <label>{Object.keys(day)[0]}</label>
              {
                Object.values(day)[0].map((att)=>(<Attraction id={att.id} 
                  handleDelete={handleDelete} handleCallback={handleCallback}/>))
              }
              </Fragment>
            ))}
            <Attraction id={nanoid()} handleDelete={handleDelete} handleCallback={handleCallback}/> */}
            
        {day.map((d)=>(<DayTrip key={nanoid()} date={d} handleCB={handleCallback}/>))}
            {/* <div>
              <FormInputTime name="startTime" control={control} label="" readonly={true}/>
              <label style={{padding:"20px 10px"}}>Departure</label>
              <label>Meeting point</label>
              <label>Location :</label>
              <FormInputText name="meetLocation" control={control} label="Name of location"/>
              <label>Province :</label>
              <FormInputText name="meetProvince" control={control} label="Name of province"/>
              <FormInputText name="descriptionOfMeetLocation" control={control} label="information"/>
            </div>
            <div>
              <FormInputTime name="endTime" control={control} label="" readonly={true}/>
              <label style={{padding:"20px 10px"}}>Return</label>
              <label>Drop off</label>
              <label>Location :</label>
              <FormInputText name="endLocation" control={control} label="Name of location"/>
              <label>Province :</label>
              <FormInputText name="endProvince" control={control} label="Name of province"/>
              <FormInputText name="descriptionOfEndLocation" control={control} label="information"/>
            </div>*/}
            <button type="button" onClick={()=>{HandleSaveDraft()}}>Save Draft</button> 
            <button type="submit">Publish</button>
          </Fragment>
        )}
      </form>
  );
};

export default createTrip;