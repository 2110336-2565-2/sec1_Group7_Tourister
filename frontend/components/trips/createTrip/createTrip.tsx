"use client";

import { useState, MouseEvent } from "react";
import Link from 'next/link';
import { useForm,useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup";
import { nanoid } from "nanoid";
import Attraction from "./attraction";
import axios from 'axios';
import { FormInputText } from "@/components/formInput/FormInputText";
import { FormInputDate} from "@/components/formInput/FormInputDate";
import { FormInputTime} from "@/components/formInput/FormInputTime";
import { createProgram,updateProgramById} from "@/services/programService"
import { ProgramInterface } from "@/interfaces/ProgramInterface";
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
  startDate: Date;
  startTime: string;
  endDate: Date;
  endTime: string;
  price: string;
  max_participant: string;
  language: string;
  meetLocation: string;
  descriptionOfMeetLocation: string;
  endLocation: string;
  descriptionOfEndLocation: string;
  description: string;
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
  price: yup.string().required('Please enter your price')
  .matches(/^[0-9]+$/, "Price must be only digits"),
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
  const [locationNumber, setLocationNumber] = useState(0);
  const [attractions,setAttractions] = useState([{
    "id": nanoid(),
    "name": "",
    "option": "Addmission not needed",
  }]);

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
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>({
    resolver: yupResolver(validationSchema),
    defaultValues: defaultValues
  });

  const handleAdd = ()=>{
    const newAttraction = {
      id: nanoid(),
      name: "",
      option: "Admission not needed",
      editing: true,
      error: false
    }
    const newAttractions = [...attractions, newAttraction]
    setAttractions(newAttractions)
  }
  const handleDelete = (id:string)=>{
    const newAttractions = [...attractions]
    const index = attractions.findIndex((attraction)=>attraction.id===id)
    newAttractions.splice(index,1)
    setAttractions(newAttractions)
  }
  const handleCallback = (id:string, name:string, option:string, file:File|undefined) => {
    const updatedAttractions = attractions.map((att) => {
      if(att.id===id){
        const updatedAtt = {...att,id,name,option,file}
        return updatedAtt
      }
      return att
    })
    setAttractions(updatedAttractions)
  }
  return (
    <form style={{display:'flex', alignItems: 'center',flexDirection:'column'}}onSubmit={handleSubmit(onSubmit)}>
      {/* <Link href="../register" passHref><button type="button" onClick={handleBackButton}>Back</button></Link> */}
        <Link href="/trips" passHref><button type="button">Back</button></Link>
        <label>Profile</label>
        <label>Trip Name</label>
        <FormInputText name="name" control={control} label="Name"/>
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
        <label>Price:Baht</label>
        <FormInputText name="price" control={control} label="Price in Baht Unit"/>
        <label>Group Size</label>
        <FormInputText name="max_participant" control={control} label="Number of participant(s)"/>
        <label>Language</label>
        <FormInputText name="language" control={control} label="Thai/English/Spanish"/>
        <div>
          <FormInputTime name="startTime" control={control} label="" readonly={true}/>
          <label style={{padding:"20px 10px"}}>Departure</label>
        </div>
        <div>
          <label>Location :</label>
          <FormInputText name="meetLocation" control={control} label="Name of Location"/>
          <FormInputText name="descriptionOfMeetLocation" control={control} label="information"/>
        </div>
        {attractions.map((att)=>(<Attraction id={att.id} handleDelete={handleDelete} handleCallback={handleCallback}/>))}
          <button type="button" onClick= {() => handleAdd()}>Add</button>
        <div>
          <FormInputTime name="endTime" control={control} label="" readonly={true}/>
          <label style={{padding:"20px 10px"}}>Return</label>
        </div>
        <div>
          <label>Location :</label>
          <FormInputText name="endLocation" control={control} label="Name of Location"/>
          <FormInputText name="descriptionOfEndLocation" control={control} label="information"/>
        </div>
        <label>Additional Information</label>
        <FormInputText name="description" control={control} label="More Information..."/>
        <button type="submit">Publish</button>
      </form>
  );
};

export default createTrip;