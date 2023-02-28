"use client";

import React, { useEffect, useState, MouseEvent, Fragment } from "react";
import { Controller,useFormContext,useForm,useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup";
import { useRouter } from "next/router";
import { nanoid } from "nanoid";

import DayTrip from "./dayTrip";
import Header from "./header"

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
import Box from '@mui/material/Box';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import Checkbox from '@mui/material/Checkbox';
import { all } from "axios";
import { PrimaryButton, RequireFormLabel } from "@/css/styling";
import { Button } from "@mui/material";
import { Form, FieldName, Field } from "@/css/layout";
import AssignmentIcon from '@mui/icons-material/Assignment';
import { COLOR } from "@/theme/globalTheme";

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
  price: yup.number().required('Please enter your price'),
  description: yup.string().required("Please enter your trip description"),
  province: yup.string().required("Please enter your trip province"),
  startDate: yup.date().required('Please enter your start date'),
  startTime: yup.string().required('Please enter your start time'),
  endDate: yup.date().required('Please enter your end date'),
  endTime: yup.string().required('Please enter your end time'),
  max_participant: yup.number().required('Please enter max participant(s)'),
  // price: yup.string().required('Please enter your price')
  // .matches(/^[0-9]+$/, "Price must be only digits"),
  // max_participant: yup.string().required('Please enter your group size')
  // .matches(/^[0-9]+$/, "Group size must be only digits"),
  // language: yup.string().required('Please enter your trip language'),
  language: yup.array().required('Please enter your language'),
  meetLocation: yup.string().required('Please enter your trip meeting point'),
  meetProvince: yup.string().required('Please enter your trip meeting point province'),
  descriptionOfMeetLocation: yup.string().required('Please enter your trip meeting point description'),
  endLocation: yup.string().required('Please enter your trip drop off location'),
  endProvince: yup.string().required('Please enter your trip drop off province'),
  descriptionOfEndLocation: yup.string().required('Please enter your trip drop off location description'),
});

const createTrip = () => {
  const [stage, setStage ] = useState(0);
  const [user, setUser] = useState<UserInterface>()
  const [draft, setDraft] = useState<ProgramInterface>()
  const [days,setDays] =  useState<string[]>([]);
  const [dayTrips,setDayTrips] = useState<{
    date:  string,
    attractions : AttractionInterface[]
  }[]>();
  const [error,setError] = useState(false)
  const [next,setNext] = useState(false)
  const [languageCheck,setLanguageCheck] = useState([false,false,false,false,false,false,false,false])
  const router = useRouter();
  const languageMap : {[key:string]:number} = {'Thai':0,'English':1,'Chinese':2,'Japanese':3,'Korean':4,'Spanish':5,'Russian':6,'German':7}
  
  let defaultValues = { _id : nanoid(),num_pending : 0,};
  useEffect(()=>{
    setUser(JSON.parse(localStorage.getItem("user")||`{}`))
    if(localStorage.getItem("editing")!==null){
    setDraft(JSON.parse(localStorage.getItem("editing")||`{}`))}}
  ,[])
  useEffect(()=>{
    reset(draft)
    localStorage.removeItem("editing")
    if(draft && draft.dayTrips){setDayTrips(draft.dayTrips)}
    if(draft){
      const lang = Object.keys(languageMap).map((l,i)=>{
        if(draft.language && draft.language.some(language => language.toString()==l.toString()))return true
        return false
      })
      setLanguageCheck(lang)
    }
  },[draft])
  const HandleNext = () => {
    setDays([])
    let date = new Date(getValues("startDate"))
    let end = new Date(getValues("endDate"))
    let errExist = false;
    setNext(true)
    if(date > end || (date===end && getValues("startTime")>getValues("endTime"))){setError(true)}
    if(date > end || (date===end && getValues("startTime")<getValues("endTime")) ||(getValues("name")===undefined || getValues("name")==="")
     || getValues("description")===undefined || getValues("description")==="" || getValues("price")===undefined || getValues("price").toString()===""
     || getValues("province")===undefined || getValues("province")==="" ||getValues("startDate")===undefined || getValues("startTime")===undefined
     || getValues("startTime")==="" || getValues("endDate")===undefined || getValues("endTime")===undefined || getValues("endTime")===""
     || getValues("max_participant")===undefined || getValues("max_participant").toString()===""){errExist=true;}
    if(languageCheck.every((e)=>!e)){errExist=true}
    trigger(["name","description","price","province","startDate","startTime","endDate","endTime","max_participant"])
    if(errExist){return;}
    setError(false)
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
    HandleSaveDraft()
  }
  const HandleBack = () => {setStage(0)}
  const HandleSaveDraft = async () => {
    const data = getValues();
    const lang = Object.keys(languageMap).map((lang,i)=>{
      if(languageCheck[i])return lang
      return null
    }).filter(function(i): i is string {return i!==null})
    // const lang : string[] = langwithnull.filter(function(i){return i!==null})
    setValue("language",lang)
    try {
      if(dayTrips&&user?._id){
        console.log({...data,dayTrips:dayTrips,language:lang})
        const response = await updateUserById(user._id,{draft:{...user.draft,[data._id]:{...data,dayTrips:dayTrips,language:lang}}})
        console.log(response)
        
        const res = await getUserById(user._id);
        localStorage.setItem("user", JSON.stringify(res.data));
      }else if (user?._id){
        console.log({...data,language:lang})
        const response = await updateUserById(user._id,{draft:{...user.draft,[data._id]:{...data,language:lang}}})
        console.log(response)
        
        const res = await getUserById(user._id);
        localStorage.setItem("user", JSON.stringify(res.data));
      }
    } catch (error) {
      console.log(error)
    }
  }
  const onSubmit = async (data : FormData) => {
    try {
        if(dayTrips&&user){
        const filterDayTrips = dayTrips.filter(function(daytrip){
          if(days.some(day => day.toString()==daytrip["date"].toString()))return true
          return false
        })
        let programData : ProgramInterface = {
          name: data.name,
          price: data.price,
          startDate: data.startDate,
          endDate: data.endDate,
          startTime: data.startTime,
          endTime: data.endTime,
          province: data.province,
          max_participant: data.max_participant,
          num_participant: 0,
          descriptionOfMeetLocation: data.descriptionOfMeetLocation,
          guide: user,
          dayTrips : filterDayTrips,
          language: data.language,
          descriptionOfEndLocation: data.descriptionOfEndLocation,
          num_pending: 0,
        }
        if(data.description){programData = {...programData,description: data.description}}
        if(data.meetLocation){programData = {...programData,meetLocation: data.meetLocation}}
        if(data.meetProvince){programData = {...programData,meetProvince: data.meetProvince}}
        if(data.endLocation){programData = {...programData,endLocation: data.endLocation}}
        if(data.endProvince){programData = {...programData,endProvince: data.endProvince}}
        console.log(programData)
        const response = await createProgram(programData)
        // const response = await axios.post(API_URL,programData)
        // const response = await createProgram({...data,dayTrips:dayTrips,guide:user})
        console.log(response)
        if(response.code===201){
          if(user._id&&draft&&user.draft&&draft._id){
            let Drafts = user.draft
            // const id = draft._id
            // const {[id]: _, ...withoutId} = allDraft
            // let allDraft = (user.draft).map((d)=>{
            //   if(d._id?.toString()===draft._id?.toString())return null
            //   return d
            // }).filter(function(i): i is ProgramInterface {return i!==null})
            // : {[key:string]: ProgramInterface }
            const draftarray = Object.keys(user.draft).map((key:string,i)=>{
              if(draft._id?.toString()===key.toString())return null
              return Drafts[key];
            }).filter(function(i) {return i!==null})
            const allDraft : {[key:string]: ProgramInterface } = {}
            draftarray.forEach((element,i)=>{
              const id = element?._id
              if(id)allDraft[id] = element
            })
            console.log(allDraft)
            const response = await updateUserById(user._id,{draft:allDraft})
            console.log(response)
            
            const res = await getUserById(user._id);
            localStorage.setItem("user", JSON.stringify(res.data));
          }
          // router.push("/trips")
        }
      }
    } catch (error) {
      console.log(error)
    }
    }
  const {
    getValues,
    setValue,
    control,
    reset,
    trigger,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>({
    resolver: yupResolver(validationSchema),
    defaultValues: defaultValues
  });

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
  const toggleLanguage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const toggled = Object.keys(languageMap).map((l:string,i)=>{
      if(l===event.target.name)return event.target.checked
      return languageCheck[i]
    })
    setLanguageCheck(toggled)
    console.log(toggled)
  }
  // console.log("-------------------------------------------")
  // console.log("user")
  // console.log(user)
  // console.log("draft")
  // console.log(draft)
  // console.log("getValues()")
  // console.log(getValues())
  // console.log("languageCheck")
  // console.log(languageCheck)
  return (
    // <form style={{display:'flex', alignItems: 'center',flexDirection:'column'}}onSubmit={handleSubmit(onSubmit)}>
    // <form style={{display:'flex', alignItems: 'left',flexDirection:'column', padding:"0% 10%"}}onSubmit={handleSubmit(onSubmit)}>
    <Form onSubmit={handleSubmit(onSubmit)}>
      <div> {/*draft button*/}
      <button style={{alignItems:"center",justifyContent:"center",background:"none",borderColor:"black",borderRadius:"12px",float:"right"}} type="button" onClick={()=>{router.push("/trips/createTrip/chooseDraft");}}><AssignmentIcon/>Draft</button>
      {/* <button type="button" onClick={async ()=>{
            const response = await updateUserById(user?._id?user?._id:"",{draft:{}})
            console.log(response)
            
            const res = await getUserById(user?._id?user?._id:"")
            localStorage.setItem("user", JSON.stringify(res.data));
            }}>delete draft</button> */}
      </div>
        {stage===0?(
          <Fragment>
            <Header name="Create Trip" handle={()=>{router.push("/trips");}}></Header>
            <div style={{display:"flex",alignSelf:"center"}}>
              <div>
                <label style={{color:COLOR.primary}}>&nbsp;&nbsp;&nbsp;information&nbsp;&nbsp;&nbsp;</label>
                <div style={{border:`1px solid ${COLOR.primary}`,background:COLOR.primary}}/>
              </div><div>
                <label style={{color:COLOR.paleblue}}>&nbsp;&nbsp;&nbsp;Schedule&nbsp;&nbsp;&nbsp;</label>
                <div style={{border:`1px solid ${COLOR.paleblue}`,background:COLOR.primary}}/>
              </div>
            </div>
            <Field> {/* Trip Name */}
              <RequireFormLabel className="AsteriskRequired">Trip Name</RequireFormLabel>
              <FormInputText name="name" control={control} label="Name"/>
            </Field><Field> {/* Description */}
              <RequireFormLabel className="AsteriskRequired">Trip Description</RequireFormLabel>
              <FormInputText name="description" control={control} label="More Information..."/>
            </Field><Field> {/* Price */}
              <RequireFormLabel className="AsteriskRequired">Price(THB)</RequireFormLabel>
              <FormInputText name="price" control={control} label="Price in THB"/>
            </Field><Field> {/* Province */}
              <RequireFormLabel className="AsteriskRequired">Pick a province</RequireFormLabel>
              <FormInputText name="province" control={control} label="Pick a province for showing"/>
            </Field><Field> {/* Duration */}
              <RequireFormLabel className="AsteriskRequired">Duration</RequireFormLabel>
              <label style={{marginLeft:"0.5rem"}}>{"Start"}</label>
              <div style={{display:"flex",alignSelf:"center", gap:"1rem"}}>
                <FormInputDate name="startDate" control={control} label="Start Date"/>
                <FormInputTime name="startTime" control={control} label="Start Time"/>
              </div>
              <label style={{marginLeft:".5rem"}}>{"End"}</label>
              <div style={{display:"flex",alignSelf:"center", gap:"1rem"}}>
                <FormInputDate name="endDate" control={control} label="End Date"/>
                <FormInputTime name="endTime" control={control} label="End Time"/>
              </div>
              {error? <p>Please add a matching start and end Date</p> : <Fragment/>}
            </Field><Field>{/* Group Size */}
              <RequireFormLabel className="AsteriskRequired">Group size</RequireFormLabel>
              <FormInputText name="max_participant" control={control} label="Number of participant(s)"/>
            </Field><Field> {/* language */}
              <RequireFormLabel className="AsteriskRequired">Language(s)</RequireFormLabel>
              <FormGroup style={{gap:"0px"}}>
                {Object.keys(languageMap).map((lang:string,i)=>(
                  <FormControlLabel
                    control={
                      <Checkbox checked={languageCheck[i]} onChange={toggleLanguage} name={lang} />
                    }
                    label={lang}
                  />)
                )}
              </FormGroup>
              {languageCheck.every((e)=>!e) && next?<p>Please select at least one language</p> : <Fragment/>}
            </Field>
            {/* <button type="button" onClick={()=>{HandleNext()}}>Next</button> */}
            <PrimaryButton style={{alignSelf:"center"}} type="button" onClick={()=>{HandleNext()}} variant="contained" >Next</PrimaryButton>
          </Fragment>
        ):(
          <Fragment>
            <Header name="Create Trip" handle={()=>HandleBack()}></Header>
            <div style={{display:"flex",alignSelf:"center"}}>
              <div>
                <label style={{color:COLOR.paleblue}}>&nbsp;&nbsp;&nbsp;information&nbsp;&nbsp;&nbsp;</label>
                <div style={{border:`1px solid ${COLOR.paleblue}`,background:COLOR.primary}}/>
              </div><div>
                <label style={{color:COLOR.primary}}>&nbsp;&nbsp;&nbsp;Schedule&nbsp;&nbsp;&nbsp;</label>
                <div style={{border:`1px solid ${COLOR.primary}`,background:COLOR.primary}}/>
              </div>
            </div>
            <RequireFormLabel style={{margin:"0 0 0px 0"}} className="AsteriskRequired">Schedule</RequireFormLabel>
              {/* <FormInputTime name="startTime" control={control} label="" readonly={true}/> */}
              {/* <label style={{padding:"20px 10px"}}>Departure</label> */}
              {/* <label>Meeting point</label> */}
            <Field>
              <label style={{fontSize:"1.2rem",fontWeight:"900", textShadow:"1px 0 black", letterSpacing:"1px"}}>
                  {`${getValues("startTime")} •  Meeting point`}</label>
              <div style={{display:"flex",alignSelf:"center", gap:"1rem"}}>
              <label style={{marginTop:".5rem"}}>Location&nbsp;:</label>
              <div style={{marginLeft:"0rem"}}><FormInputText name="meetLocation" control={control} label="Name of location"/></div>
              </div>
              <div style={{display:"flex",alignSelf:"center", gap:"1rem"}}>
              <label style={{marginTop:".5rem"}}>Province&nbsp;:</label>
              <FormInputText name="meetProvince" control={control} label="Name of province"/>
              </div>
              <FormInputText name="descriptionOfMeetLocation" control={control} label="information"/>
            </Field>
            <label style={{fontSize:"1.2rem",fontWeight:"900", textShadow:"1px 0 black", letterSpacing:"1px"}}>{`Attraction / Activities`}</label>
            {days.map((d,order)=>(
              <DayTrip key={d.toString()} date={d} order={order} savedAttraction={getAttractionsByDate(d)} handleCB={handleCallback}/>
            ))}
              {/* <FormInputTime name="endTime" control={control} label="" readonly={true}/> */}
              {/* <label style={{padding:"20px 10px"}}>Return</label> */}
              {/* <label>Drop off</label> */}
            <Field>
            <label style={{fontSize:"1.2rem",fontWeight:"900", textShadow:"1px 0 black", letterSpacing:"1px"}}>
              {`${getValues("endTime")} •  Drop off`}</label>
              <div style={{display:"flex",alignSelf:"center", gap:"1rem"}}>
              <label style={{marginTop:".5rem"}}>Location&nbsp;:</label>
              <div style={{marginLeft:"0rem"}}><FormInputText name="endLocation" control={control} label="Name of location"/></div>
              </div><div style={{display:"flex",alignSelf:"center", gap:"1rem"}}>
              <label style={{marginTop:".5rem"}}>Province&nbsp;:</label>
              <FormInputText name="endProvince" control={control} label="Name of province"/>
              </div>
              <FormInputText name="descriptionOfEndLocation" control={control} label="information"/>
            </Field>
            {/* <button type="button" onClick={()=>{HandleSaveDraft()}}>Save Draft</button> 
            <button type="submit">Publish</button> */}
            <div style={{display:"flex",alignSelf:"center", gap:"1rem"}}>
              <Button style={{width:"10rem"}} type="button" onClick={()=>{HandleSaveDraft()}} variant="outlined">Save Draft</Button>
              <Button style={{width:"10rem"}} type="submit" variant="contained">Publish</Button>
            </div>
          </Fragment>
        )}
      {/* </form> */}
      </Form>
  );
};

export default createTrip;