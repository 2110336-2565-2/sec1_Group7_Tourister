"use client";

import React, { useEffect, useState, MouseEvent, Fragment } from "react";
import { Controller,useFormContext,useForm,useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup";
import { useRouter } from "next/router";
import { nanoid } from "nanoid";

import DayTrip from "./dayTrip";

import { FormInputText } from "@/components/formInput/FormInputText";
import { FormInputDate} from "@/components/formInput/FormInputDate";
import { FormInputTime} from "@/components/formInput/FormInputTime";
import TextField from "@mui/material/TextField";
import { createProgram,updateProgramById} from "@/services/programService"
import { getUserById, updateUserById } from "@/services/userService";
import { ProgramInterface } from "@/interfaces/ProgramInterface";
import { UserInterface } from "@/interfaces/UserInterface";
import { AttractionInterface } from "@/interfaces/AttractionInterface";
import { FormInputDateWithMUIX } from "@/components/formInput/FormInputDateWithMUIX";

type FormData = {
  _id:string
  name: string;
  description: string;
  price: number;
  province: string;
  startDate: Date;
  startTime: string;
  endDate: Date;
  endTime: string;
  max_participant: number;
  language: string[];
  meetLocation: string;
  meetProvince: string;
  descriptionOfMeetLocation: string;
  endLocation: string;
  endProvince: string;
  descriptionOfEndLocation: string;
  num_pending: number;
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
  // language: yup.string().required('Please enter your trip language'),
  description: yup.string(),
  meetLocation: yup.string().required('Please enter your trip start location'),
  descriptionOfMeetLocation: yup.string(),
  endLocation: yup.string().required('Please enter your trip end location'),
  descriptionOfEndLocation: yup.string()
});

const createTrip = () => {
  // let user:JSON
  // let user:UserInterface
  // if (typeof window !== 'undefined') {
  //   // console.log('we are running on the client');
  //   user = JSON.parse(localStorage.getItem("user")||`{}`)
  // } else {
  //   // console.log('we are running on the server');
  //   user = JSON.parse(`{}`)
  // }
  const [stage, setStage ] = useState(0);
  const [user, setUser] = useState<UserInterface>()
  const [draft, setDraft] = useState<ProgramInterface>()
  const [days,setDays] =  useState<string[]>([]);
  const [dayTrips,setDayTrips] = useState<{
    date:  string,
    // attractions : {
    //   "id": string,
    //   "time": string,
    //   "location": string,
    //   "province": string,
    //   "option": string,
    //   "file": File | undefined
    // }[]
    attractions : AttractionInterface[]
  }[]>();
  const router = useRouter();
  
  let defaultValues;
  useEffect(()=>{
    setUser(JSON.parse(localStorage.getItem("user")||`{}`))
    if(localStorage.getItem("editing")!==null){
    console.log("cannot find draft in local storatge")
    setDraft(JSON.parse(localStorage.getItem("editing")||`{}`))}}
  ,[])

  
  useEffect(()=>{
    reset(draft)
  // if(draft){
  //   console.log("draft found")
  //   defaultValues = {
  //     _id: draft._id? draft._id : nanoid(),
  //     name: draft.name? draft.name : "" ,
  //     description: draft.description? draft.description : "" ,
  //     price: draft.price? draft.price : 0 ,
  //     province: draft.province? draft.province : "" ,
  //     startDate: draft.startDate? draft.startDate : new Date() ,
  //     startTime: draft.startTime? draft.startTime : "00.00" ,
  //     endDate: draft.endDate? draft.endDate : new Date() ,
  //     endTime: draft.endTime? draft.endTime : "00.00" ,
  //     max_participant: draft.max_participant? draft.max_participant : 1 ,
  //     language: draft.language? draft.language : [] ,
  //     meetLocation: draft.meetLocation? draft.meetLocation : "" ,
  //     meetProvince: draft.meetProvince? draft.meetProvince : "" ,
  //     descriptionOfMeetLocation: draft.descriptionOfMeetLocation? draft.descriptionOfMeetLocation : "" ,
  //     endLocation: draft.endLocation? draft.endLocation : "" ,
  //     endProvince: draft.endProvince? draft.endProvince : "" ,
  //     descriptionOfEndLocation: draft.descriptionOfEndLocation? draft.descriptionOfEndLocation : "" ,
  //     num_pending: draft.num_pending? draft.num_pending : 0 ,
  //   }
    if(draft && draft.dayTrips){setDayTrips(draft.dayTrips)}
  // }else {
  //   console.log("cannot find draft")
  //   defaultValues = {
  //     _id: nanoid(),
  //     num_pending: 0,
  //   }
  // }
  },[draft])
  const HandleNext = () => {
    setDays([])
    let date = new Date(getValues("startDate"))
    let end = new Date(getValues("endDate"))
    if(date > end){
      return;
    }
    setStage(1)
    end.setDate(end.getDate() + 1)
    let k = 0
    while(date.toString()!==end.toString()){
      const i = date.toString()
      setDays(days => [...days,i])
      date.setDate(date.getDate() + 1);
      k = k+1
      if(k>100){break}
    }
  }
  const HandleSaveDraft = async () => {
    const data = getValues();
    try {
      if(dayTrips&&user?._id){
        console.log({...data,dayTrips:dayTrips})
        const response = await updateUserById(user._id,{draft:{...user.draft,[data._id]:{...data,dayTrips:dayTrips}}})
        // const response = await axios.post(API_URL,{...data,dayTrips:dayTrips})
        console.log(response)
        
        const res = await getUserById(user._id);
        localStorage.setItem("user", JSON.stringify(res.data));
      }
    } catch (error) {
      console.log(error)
    }
  }
  const onSubmit = async (data : FormData) => {
    // console.log({...data,dayTrips:dayTrips})
    try {
      if(dayTrips&&user){
        console.log({...data,dayTrips:dayTrips})
        const response = await createProgram({...data,dayTrips:dayTrips,guide:user})
        // const response = await axios.post(API_URL,{...data,dayTrips:dayTrips})
        console.log(response)
      }
    } catch (error) {
      console.log(error)
    }
    }
  const {
    register,
    watch,
    getValues,
    control,
    reset,
    clearErrors,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>({
    resolver: yupResolver(validationSchema),
    defaultValues: defaultValues
  });

  // const handleCallback = (day:string,attractions:{
  //   "id": string,
  //   "time": string,
  //   "location": string,
  //   "province": string,
  //   "option": string,
  //   "file": File | undefined
  // }[]) => {
  // let updatedDayTrips : {
  //   date:  string,
  //   attractions : {
  //     "id": string,
  //     "time": string,
  //     "location": string,
  //     "province": string,
  //     "option": string,
  //     "file": File | undefined
  //   }[]
  // }[];
  const handleCallback = (day:string,attractions:AttractionInterface[]) => {
  let updatedDayTrips : {
    date:  string,
    attractions : AttractionInterface[]
  }[];
  let found = false
  if(dayTrips){
    updatedDayTrips = dayTrips.map((daytrip)=>{
      if(daytrip.date===day){
        found = true;
        const updateDT = {...daytrip,day:day,attractions:attractions}
        return updateDT
      }
      return daytrip
    })
    if(!found){
      updatedDayTrips = [...updatedDayTrips,{date:day,attractions:attractions}]
    }
    setDayTrips(updatedDayTrips)
  } else {
    updatedDayTrips = [{date:day,attractions:attractions}]
    setDayTrips([{date:day,attractions:attractions}])
  }
  }
  const checkDayExisted = (d:string) => {return dayTrips?.some((day)=>{return day.date===d})}
  const getAttractionsByDate = (d:string) => {
    if(dayTrips){
    for(let i=0;i<dayTrips.length;i=i+1){
      if(dayTrips[i].date===d)return dayTrips[i].attractions
    }
    return [{
      "id": nanoid(),
      "time": "",
      "location": "",
      "province": "",
      "option": "Addmission not needed",
      "file": undefined
    }]
  }}
  // console.log("-------------------------------------------")
  // console.log("user")
  // console.log(user)
  // console.log("draft")
  // console.log(draft)
  // console.log("getValues()")
  // console.log(getValues())
  return (
    <form style={{display:'flex', alignItems: 'center',flexDirection:'column'}}onSubmit={handleSubmit(onSubmit)}>
      <button type="button" onClick={()=>{router.push("/trips/createTrip/chooseDraft");}}>Draft</button>
      {/* <Link href="../register" passHref><button type="button" onClick={handleBackButton}>Back</button></Link> */}
        {stage===0?(
          <Fragment>
            <label>Trip Name</label>
            <button type="button" onClick={()=>{router.push("/trips");}}>Back</button>
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
              <FormInputDate name="startDate" control={control} label="Start Date"/>
              {/* <FormInputDateWithMUIX name="startDate" control={control} label="Start Date"/> */}
              <FormInputTime name="startTime" control={control} label="Start Time"/>
            </div>
            <label>End</label>
            <div>
              <FormInputDate name="endDate" control={control} label="End Date"/>
              {/* <FormInputDateWithMUIX name="endDate" control={control} label="End Date"/> */}
              <FormInputTime name="endTime" control={control} label="End Time"/>
            </div>
            <label>Group Size</label>
            <FormInputText name="max_participant" control={control} label="Number of participant(s)"/>
            <label>Language</label>
            <button type="button" onClick={()=>{HandleNext()}}>Next</button>
          </Fragment>
        ):(
          <Fragment>
            <button type="button" onClick={()=>{setStage(0)}}>Back</button>
            <div>
              {/* <FormInputTime name="startTime" control={control} label="" readonly={true}/> */}
              {/* <label style={{padding:"20px 10px"}}>Departure</label> */}
              <label>Meeting point</label>
              <label>Location :</label>
              <FormInputText name="meetLocation" control={control} label="Name of location"/>
              <label>Province :</label>
              <FormInputText name="meetProvince" control={control} label="Name of province"/>
              <FormInputText name="descriptionOfMeetLocation" control={control} label="information"/>
            </div>
            {days.map((d)=>(
              <DayTrip key={d.toString()} date={d} savedAttraction={getAttractionsByDate(d)} handleCB={handleCallback}/>
            ))}
            <div>
              {/* <FormInputTime name="endTime" control={control} label="" readonly={true}/> */}
              {/* <label style={{padding:"20px 10px"}}>Return</label> */}
              <label>Drop off</label>
              <label>Location :</label>
              <FormInputText name="endLocation" control={control} label="Name of location"/>
              <label>Province :</label>
              <FormInputText name="endProvince" control={control} label="Name of province"/>
              <FormInputText name="descriptionOfEndLocation" control={control} label="information"/>
            </div>
            <button type="button" onClick={()=>{HandleSaveDraft()}}>Save Draft</button> 
            <button type="submit">Publish</button>
          </Fragment>
        )}
      </form>
  );
};

export default createTrip;