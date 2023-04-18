import React, { useEffect, useState, createContext, Fragment } from "react";
import { Controller,useFormContext,useForm,useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup"
import { useRouter } from "next/router";
import { nanoid } from "nanoid";

import DayTrip from "./dayTrip";
import Header from "./header"
import { FormData, validationSchema, formDatatoProgramInterface} from "./createTripSchema"
import { ProgramInterface } from "@/interfaces/ProgramInterface";
import { UserInterface } from "@/interfaces/UserInterface";
import { AttractionInterface } from "@/interfaces/AttractionInterface";
import { createProgram,getAllProgramsFromGuide,getProgramById,updateProgramById} from "@/services/programService"
import { getUserById, updateUserById } from "@/services/userService";
import { useAuth } from "@/components/AuthProvider"
import { AuthContextInterface } from "@/interfaces/AuthContextInterface"

import { COLOR } from "@/theme/globalTheme";
import { FormInputText } from "@/components/formInput/FormInputText";
import { FormInputDate } from "@/components/formInput/FormInputDate";
import { FormInputTime } from "@/components/formInput/FormInputTime";
import { PrimaryButton, RequireFormLabel } from "@/css/styling";
import { Form, FieldName, Field } from "@/css/layout";
import { Button, CircularProgress } from "@mui/material";
import TextField from "@mui/material/TextField";
import FormHelperText from '@mui/material/FormHelperText';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { isHttpStatusOk } from "@/utils/Utils";
import { FormInputMultilineText } from "@/components/formInput/FormInputMultilineText";
import { Timeline } from "@mui/lab";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineDot from "@mui/lab/TimelineDot";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import { AssignmentOutlined, LocationOnOutlined, MapOutlined } from "@mui/icons-material";
import _ from "lodash";

export const StageContext = createContext(0)

const CreateTrip = () => {
  const [stage, setStage ] = useState<number>(0); // 0:start 1:next clicked 2:page 2 3:submit clicked
  // const [user, setUser] = useState<UserInterface>()
  const [draft, setDraft] = useState<ProgramInterface>()
  const [days,setDays] =  useState<string[]>([]);
  const [dayTrips,setDayTrips] = useState<{
    date:  string,
    attractions : AttractionInterface[]
  }[]>();
  const [unmatchedStartAndEndDate,setUnmatchedStartAndEndDate] = useState(false)
  const [overlap,setOverlap] = useState(false)
  const [loading,setLoading] = useState(false)
  const [languageCheck,setLanguageCheck] = useState([false,false,false,false,false,false,false,false])
  const router = useRouter();
  const languageMap : {[key:string]:number} = {'Thai':0,'English':1,'Chinese':2,'Japanese':3,'Korean':4,'Spanish':5,'Russian':6,'German':7}
  
  let defaultValues = { _id : nanoid(24),num_pending : 0,};
  // let defaultValues = { num_pending : 0,};
  const authUserData: AuthContextInterface = useAuth();
  useEffect(()=>{
    // setUser(JSON.parse(localStorage.getItem("user")||`{}`))
    // setUser(authUserData.user)
    if(localStorage.getItem("editing")!==null){
      const fetch = async () => {
        const res = await getProgramById(localStorage.getItem("editing")||``)
        if(res.data){setDraft(res.data)}
      }
      fetch();
  }}
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
  const HandleNext = async () => {
    setLoading(true)
    setUnmatchedStartAndEndDate(false)
    setOverlap(false)
    setDays([])
    let date = new Date(getValues("startDate"))
    let end = new Date(getValues("endDate"))
    console.log(date.toString())
    console.log(end.toString())
    let errExist = false;
    setStage(1)
    console.log("test")
    if(date > end ||(getValues("name")===undefined || getValues("name")==="")
     || getValues("description")===undefined || getValues("description")==="" || getValues("price")===undefined || getValues("price").toString()===""
     || getValues("province")===undefined || getValues("province")==="" ||getValues("startDate")===undefined || getValues("startTime")===undefined
     || getValues("startTime")==="" || getValues("endDate")===undefined || getValues("endTime")===undefined || getValues("endTime")===""
     || getValues("max_participant")===undefined || getValues("max_participant").toString()==="" || languageCheck.every((e)=>!e)
     || Number.isNaN(Number(getValues("price"))) || Number.isNaN(Number(getValues("max_participant")))){console.log("invalid input");errExist=true;}
    // if(languageCheck.every((e)=>!e)){errExist=true}
    console.log("test4")
    if(date > end){console.log("case1");setUnmatchedStartAndEndDate(true)}
    if(getValues("startTime")!==undefined && getValues("endTime")!==undefined &&
      getValues("startTime")!=="" && getValues("endTime")!==""){
      // console.log("time check")
      if(date.toString()===end.toString()){
        const sTime = getValues("startTime").split(":")
        const eTime = getValues("endTime").split(":")
        if(Number(sTime[0]) > Number(eTime[0]) || (Number(sTime[0])===Number(eTime[0]) && Number(sTime[1])>Number(eTime[1]))){
          console.log("error unmatch startdateenddate")
          setUnmatchedStartAndEndDate(true);errExist=true;}
      }
      console.log("test3")
      if(getValues("startDate")!==undefined && getValues("endDate")!==undefined){
        const checkOverlap = async () => {
          if(authUserData.user?._id){
            console.log("fetching")
            const res = await getAllProgramsFromGuide(authUserData.user._id)
            console.log("fetching done")
            if(res.data){
              console.log(res.data)
              const check = (program: ProgramInterface) => {
                //------get info
                const thisStartDate = new Date(getValues("startDate"))
                const thisEndDate = new Date(getValues("endDate"))
                const thisStartTime = getValues("startTime").split(":").map((t)=>Number(t))
                const thisEndTime = getValues("endTime").split(":").map((t)=>Number(t))
                thisStartDate.setHours(thisStartTime[0],thisStartTime[1])
                thisEndDate.setHours(thisEndTime[0],thisEndTime[1])
                const otherStartDate = new Date(program.startDate)
                const otherEndDate = new Date(program.endDate)
                console.log(thisStartDate,thisEndDate)
                console.log(otherStartDate,otherEndDate)
                if(thisStartDate.getTime() >= otherEndDate.getTime()){return false}
                if(thisEndDate.getTime() <= otherStartDate.getTime()){return false}
                return true
                // const thisStartDate = new Date(getValues("startDate"))
                // const thisEndDate = new Date(getValues("endDate"))
                // const thisStartTime = getValues("startTime").split(":").map((t)=>Number(t))
                // const thisEndTime = getValues("endTime").split(":").map((t)=>Number(t))
                // const otherStartDate = new Date(program.startDate)
                // const otherEndDate = new Date(program.endDate)
                // const otherStartTime = program.startTime.split(":").map((t)=>Number(t))
                // const otherEndTime = program.endTime.split(":").map((t)=>Number(t))
                // // console.log("thisStartDate > otherStartDate:",thisStartDate > otherStartDate)
                // if(thisStartDate > otherStartDate || (thisStartDate.toString()===otherStartDate.toString() && (thisStartTime[0]*60+thisStartTime[1]>otherStartTime[0]*60+otherStartTime[1]))){
                //   if((otherEndDate > thisStartDate || (otherEndDate.toString()===thisStartDate.toString() && (otherEndTime[0]*60+otherEndTime[1]>thisStartTime[0]*60+thisStartTime[1])))){
                //     return true /*------this.start , other.start , this.end*/}
                // }else if((thisStartDate < otherStartDate || (thisStartDate.toString()===otherStartDate.toString() && (thisStartTime[0]*60+thisStartTime[1]<otherStartTime[0]*60+otherStartTime[1])))){
                //   if((thisEndDate > otherStartDate || (thisEndDate.toString()===otherStartDate.toString() && (thisEndTime[0]*60+thisEndTime[1]>otherStartTime[0]*60+otherStartTime[1])))){
                //     return true
                // //------this.start === other.start
                // }}else {
                //   if((thisEndDate.toString()===thisStartDate.toString() && thisStartTime===thisEndTime) || (otherEndDate.toString()===otherStartDate.toString() && otherEndTime===otherStartTime)){
                //     return false;
                //   }else return true;
                // }
                // return false
              }
              for(let i=0;i<res.data?.length;i++){
                console.log("-------------------------------")
                console.log("checking overlap with",res.data[i])
                if(check(res.data[i])){return true;}
            }}
          }return false
        }
        if(await checkOverlap()){
          console.log("overlap")
          setOverlap(true)
          errExist = true
        }
      }
    }
    console.log("test2")
    trigger(["name","description","price","province","startDate","startTime","endDate","endTime","max_participant"])
    // errExist= true;console.log("force error line 160")
    if(errExist){console.log("draft not ok");setLoading(false);return;}
    console.log("draft ok")
    setUnmatchedStartAndEndDate(false)
    setOverlap(false)
    end.setDate(end.getDate() + 1)
    let k = 0
    while(date.toString()!==end.toString()){
      const i = date.toString()
      console.log("trip day i is",i)
      setDays(days => [...days,i])
      date.setDate(date.getDate() + 1);
      k = k+1
      if(k>100){break}
    }
    // console.log(days)
    HandleSaveDraft()
    setStage(2)
    setLoading(false)
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
      let programData : ProgramInterface = {...data,language:lang,guide:authUserData.user,published:false};
      if(dayTrips&&authUserData.user?._id){
        programData = {...programData,dayTrips:dayTrips}
      }
      // console.log(programData)
      const saveDraft = async ()=>{
        // const res = await getProgramById(data._id)
        // console.log(draft)
        if(draft?._id && programData._id){
          console.log("has draft")
          const response = await updateProgramById(programData._id,programData);
          if(isHttpStatusOk(response.code) && response.data?._id){setValue("_id",response.data?._id)}
          console.log(response)
        }else{
          console.log("no draft")
          const data = _.omit(programData,'_id');
          const response = await createProgram({...data,guide:authUserData.user});
          console.log(response)
          if(isHttpStatusOk(response.code) && response.data?._id){setValue("_id",response.data?._id)}
          if(response.data)setDraft(response.data)
        }
      }
      saveDraft();
    } catch (error) {
      console.log(error)
    }
  }
  const onSubmit = async (data : FormData) => {
    setStage(3)
    try {
        if(dayTrips&&authUserData.user){
          if(days.some((day)=>{
            return !dayTrips.some((d)=>{
              const dayI = new Date(d.date)
              return dayI.toString()===day
            })
          })){return;}
        const filterDayTrips = dayTrips.filter(function(daytrip){
          const dayI = new Date(daytrip["date"])
          // console.log(dayI.toString())
          if(days.some(day => day.toString()==dayI.toString()))return true
          return false
        })
        let programData : ProgramInterface = formDatatoProgramInterface(data,authUserData.user,filterDayTrips)
        // console.log(data._id)
        // console.log(programData)
        if(data._id){
          const response = await updateProgramById(data._id,programData)
          console.log(response)
          if(response.code===204){
            router.push("/trips")
          }
        }
      }
    } catch (error) {
      console.log(error)
    }
    }
  const onError = () => {setStage(3)}
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
      const datei = new Date(dayTrips[i].date)
      if(datei.toString()===d)return dayTrips[i].attractions
    }
    return [{
      "id": nanoid(),
      "time": "",
      "location": "",
      "province": "",
      "option": "Admission not needed",
      "file": null
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
  return (
    // <form style={{display:'flex', alignItems: 'center',flexDirection:'column'}}onSubmit={handleSubmit(onSubmit)}>
    // <form style={{display:'flex', alignItems: 'left',flexDirection:'column', padding:"0% 10%"}}onSubmit={handleSubmit(onSubmit)}>
    <Form style={{paddingLeft:"2.5rem",paddingRight:"2.5rem"}}onSubmit={handleSubmit(onSubmit,onError)}>
      <div> {/*draft button*/}
      <button style={{display:"flex",width:"5rem",height:"2rem",fontWeight:"600",color:COLOR.primary,alignItems:"center",justifyContent:"center",background:"none",borderColor:COLOR.primary,borderRadius:"12px",float:"right"}} type="button" onClick={()=>{router.push("/trips/createTrip/chooseDraft");}}><AssignmentOutlined style={{ width: "1.1rem", height: "1.1rem" }}/>&nbsp;Drafts</button>
      </div>
        {stage<2?(
          <Fragment>
            <Header name="Create Trip" handle={()=>{router.push("/trips");}}></Header>
            <div style={{display:"flex",alignSelf:"center"}}>
              <div>
                <label style={{color:COLOR.primary}}>&nbsp;&nbsp;&nbsp;Information&nbsp;&nbsp;&nbsp;</label>
                <div style={{border:`1px solid ${COLOR.primary}`,background:COLOR.primary}}/>
              </div><div>
                <label style={{color:COLOR.paleblue}}>&nbsp;&nbsp;&nbsp;Schedule&nbsp;&nbsp;&nbsp;</label>
                <div style={{border:`1px solid ${COLOR.paleblue}`,background:COLOR.paleblue}}/>
              </div>
            </div>
            <Field> {/* Trip Name */}
              <RequireFormLabel className="AsteriskRequired">Trip Name</RequireFormLabel>
              <FormInputText name="name" control={control} label="Name"/>
            </Field><Field> {/* Description */}
              <RequireFormLabel className="AsteriskRequired">Trip Description</RequireFormLabel>
              <FormInputMultilineText name="description" control={control} label="More Information..."/>
            </Field><Field> {/* Price */}
              <RequireFormLabel className="AsteriskRequired">Price(THB)</RequireFormLabel>
              <FormInputText name="price" control={control} label="Price in THB"/>
            </Field><Field> {/* Province */}
              <RequireFormLabel className="AsteriskRequired">Pick a province</RequireFormLabel>
              <FormInputText name="province" control={control} label="Pick a province for showing"/>
            </Field><Field> {/* Duration */}
              <RequireFormLabel className="AsteriskRequired">Duration</RequireFormLabel>
              <div style={{margin:"0 1rem", fontSize:"12px", color:COLOR.error}}>
                {unmatchedStartAndEndDate? <label>Please add a matching start and end Date Time<br/></label> : <Fragment/>}
                {overlap? <label>You already have another trip at this time<br/></label> : <Fragment/>}
              </div>
              <label style={{marginLeft:"0.5rem"}}>{"Start"}</label>
              <div style={{display:"flex",alignSelf:"center", gap:"0.6rem"}}>
                <FormInputDate name="startDate" control={control} label="Start Date"/>
                <FormInputTime name="startTime" control={control} label="Start Time"/>
              </div>
              <label style={{marginLeft:".5rem"}}>{"End"}</label>
              <div style={{display:"flex",alignSelf:"center", gap:"0.6rem"}}>
                <FormInputDate name="endDate" control={control} label="End Date"/>
                <FormInputTime name="endTime" control={control} label="End Time"/>
              </div>
            </Field><Field>{/* Group Size */}
              <RequireFormLabel className="AsteriskRequired">Group size</RequireFormLabel>
              <FormInputText name="max_participant" control={control} label="Number of participant(s)"/>
            </Field><Field> {/* language */}
              <RequireFormLabel className="AsteriskRequired">Language(s)</RequireFormLabel>
              {languageCheck.every((e)=>!e) && stage===1?(
                <label style={{margin:"0 1rem", fontSize:"12px", color:COLOR.error}}>Please select at least one language<br/></label>
              ) : <Fragment/>}
              <FormGroup style={{gap:"0px"}}>
                {Object.keys(languageMap).map((lang:string,i)=>(
                  <FormControlLabel
                    key={i}
                    control={
                      <Checkbox checked={languageCheck[i]} onChange={toggleLanguage} name={lang} />
                    }
                    label={lang}
                  />)
                )}
              </FormGroup>
            </Field>
            {/* <button type="button" onClick={()=>{HandleNext()}}>Next</button> */}
            <PrimaryButton style={{alignSelf:"center"}} type="button" onClick={()=>{HandleNext()}} variant="contained" >Next</PrimaryButton>
            {loading? <div style={{display:"flex", justifyContent:"center"}}>
              <CircularProgress/>
            </div> : <Fragment/>}
          </Fragment>
        ):(
          <Fragment>
            <Header name="Create Trip" handle={()=>HandleBack()}></Header>
            <div style={{display:"flex",alignSelf:"center"}}>
              <div>
                <label style={{color:COLOR.paleblue}}>&nbsp;&nbsp;&nbsp;information&nbsp;&nbsp;&nbsp;</label>
                <div style={{border:`1px solid ${COLOR.paleblue}`,background:COLOR.paleblue}}/>
              </div><div>
                <label style={{color:COLOR.primary}}>&nbsp;&nbsp;&nbsp;Schedule&nbsp;&nbsp;&nbsp;</label>
                <div style={{border:`1px solid ${COLOR.primary}`,background:COLOR.primary}}/>
              </div>
            </div>
            <RequireFormLabel style={{margin:"0 0 0 13px"}} className="AsteriskRequired">Schedule</RequireFormLabel>
              {/* <FormInputTime name="startTime" control={control} label="" readonly={true}/> */}
              {/* <label style={{padding:"20px 10px"}}>Departure</label> */}
              {/* <label>Meeting point</label> */}
            <Timeline
              style={{margin:"0", padding:"0"}}
              sx={{
                "& .MuiTimelineItem-root:before": {
                  padding: 0,
                  margin: 0,
                  flex: 0
                }
              }}
            >
              <TimelineItem>
                <TimelineSeparator>
                  <TimelineDot color="primary" style={{marginTop: "0"}}>
                    <LocationOnOutlined style={{ width: "1.5rem", height: "1.5rem" }}/>
                  </TimelineDot>
                  <TimelineConnector/>
                </TimelineSeparator>
                <TimelineContent style={{paddingRight: "0"}}>
                  <Field>
                    <label style={{fontSize:"1rem", fontWeight:"900", textShadow:"0.1px 0 black", letterSpacing:"1px"}}>
                      {getValues("startTime")} &nbsp;&nbsp;•&nbsp;&nbsp; Meeting point
                    </label>
                    <div style={{fontSize:"14px", display:"flex",alignSelf:"center", gap:"0.4rem"}}>
                      <label style={{marginTop:".6rem"}}>Location&nbsp;:</label>
                      <FormInputText name="meetLocation" control={control} label="Name of location"/>
                    </div>
                    <div style={{fontSize:"14px", display:"flex",alignSelf:"center", gap:"0.4rem"}}>
                      <label style={{marginTop:".6rem"}}>Province&nbsp;:</label>
                      <FormInputText name="meetProvince" control={control} label="Name of province"/>
                    </div>
                    <FormInputText name="descriptionOfMeetLocation" control={control} label="Information"/>
                  </Field>
                </TimelineContent>
              </TimelineItem>
              <TimelineItem>
                <TimelineSeparator>
                  <TimelineDot style={{backgroundColor: COLOR.mint, color: "grey"}}>
                    <MapOutlined style={{ width: "1.5rem", height: "1.5rem" }}/>
                  </TimelineDot>
                  <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent style={{padding: "17px 0 6px 5px"}}>
                  <label style={{paddingLeft: "11px", fontSize:"1rem",fontWeight:"900", textShadow:"0.1px 0 black", letterSpacing:"1px"}}>Attraction / Activities</label>
                  <StageContext.Provider value={stage}>
                    {days.map((d,order)=>(
                      <DayTrip key={d.toString()} date={d} order={order} savedAttraction={getAttractionsByDate(d)} handleCB={handleCallback}/>
                    ))}
                  </StageContext.Provider>
                </TimelineContent>
              </TimelineItem>
              <TimelineItem>
                <TimelineSeparator>
                  <TimelineDot color="primary">
                    <LocationOnOutlined style={{ width: "1.5rem", height: "1.5rem" }}/>
                  </TimelineDot>
                </TimelineSeparator>
                <TimelineContent style={{paddingRight: "0"}}>
                  <Field>
                    <label style={{marginTop:"11.5px", fontSize:"1rem", fontWeight:"900", textShadow:"0.1px 0 black", letterSpacing:"1px"}}>
                      {getValues("endTime")} &nbsp;&nbsp;•&nbsp;&nbsp; Drop off
                    </label>
                    <div style={{fontSize:"14px", display:"flex",alignSelf:"center", gap:"0.4rem"}}>
                      <label style={{marginTop:".6rem"}}>Location&nbsp;:</label>
                      <FormInputText name="endLocation" control={control} label="Name of location"/>
                    </div>
                    <div style={{fontSize:"14px", display:"flex",alignSelf:"center", gap:"0.4rem"}}>
                      <label style={{marginTop:".6rem"}}>Province&nbsp;:</label>
                      <FormInputText name="endProvince" control={control} label="Name of province"/>
                    </div>
                    <FormInputText name="descriptionOfEndLocation" control={control} label="Information"/>
                  </Field>
                </TimelineContent>
              </TimelineItem>
            </Timeline>
            {/* <Field>
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
            </Field> */}
            {/* <label style={{fontSize:"1.2rem",fontWeight:"900", textShadow:"1px 0 black", letterSpacing:"1px"}}>{`Attraction / Activities`}</label>
            <StageContext.Provider value={stage}>
            {days.map((d,order)=>(
              <DayTrip key={d.toString()} date={d} order={order} savedAttraction={getAttractionsByDate(d)} handleCB={handleCallback}/>
            ))}
            </StageContext.Provider> */}
              {/* <FormInputTime name="endTime" control={control} label="" readonly={true}/> */}
              {/* <label style={{padding:"20px 10px"}}>Return</label> */}
              {/* <label>Drop off</label> */}
            {/* <Field>
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
            </Field> */}
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

export default CreateTrip;