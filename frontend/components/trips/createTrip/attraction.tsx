"use client";

import { useState, MouseEvent, Fragment } from "react";
import { Controller,useFormContext,useForm,useFieldArray } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup"
// import * as yup from "yup";
import { FormInputText } from "@/components/formInput/FormInputText";
import TextField from "@mui/material/TextField";

const attraction = ({id,t,l,p,o,handleDelete,handleCallback}:{id:string,t:string,l:string,p:string,o:string,handleDelete:Function,handleCallback:Function}) => {
  const [time,setTime] = useState(t)
  const [location,setLocation] = useState(l);
  const [province,setProvince] = useState(p)
  const [option,setOption] = useState(o)
  const [file,setFile] = useState<File | string>();
  //----------------------------------------------------------
  const [editing, setEditing] = useState(l==="");
  const [errorTime,setErrorTime] = useState(false);
  const [errorName,setErrorName] = useState(false);
  const [errorProvince,setErrorProvince] = useState(false);
  // const [place_imageUrl,setFile] = useState("");
  
  const valid= ()=>{
    setErrorTime(time==="")
    setErrorName(location==="")
    setErrorProvince(province==="")
    return time!=="" && location!=="" && province!==""
  }
  return (
    <div>
      {editing===true ? (
        <Fragment>
        {/* <input value={name} onChange={(e)=>setName(e.target.value)}/> */}
        <TextField value={location} onChange={(e)=>setLocation(e.target.value)} label="Name" variant="outlined" size="small"
          // helperText={error ? error.message : null}
          // error={Boolean(error)}
        />
        {errorName? <p>Please add a name for the location</p> : <Fragment/>}
        <TextField value={time} onChange={(e)=>setTime(e.target.value)} type="time" variant="outlined" size="small"
          // helperText={error ? error.message : null}
          // error={Boolean(error)}
        />
        {errorTime? <p>Please add a time for the location</p> : <Fragment/>}
        <TextField value={province} onChange={(e)=>setProvince(e.target.value)} label="Province" variant="outlined" size="small"
          // helperText={error ? error.message : null}
          // error={Boolean(error)}
        />
        {errorProvince? <p>Please add a province for the location</p> : <Fragment/>}
        <select onChange={(e)=>setOption(e.target.value)}>
          <option value={option}>{option}</option>
          {option==="Admission not needed" ? <Fragment></Fragment> : <option value="Admission not needed">Admission not needed</option>}
          {option==="Admission included" ? <Fragment></Fragment> : <option value="Admission included">Admission included</option>}
          {option==="Admission not included" ? <Fragment></Fragment> : <option value="Admission not included">Admission not included</option>}
        </select>
        <input type="file" onChange={(e)=>{if(!e.target.files)return;setFile(e.target.files[0])}}></input>
        <button type="button" onClick={()=>{handleDelete(id)}}>delete</button>
        <button type="button" onClick={()=>{
          if(valid()) {setEditing(false);handleCallback(id,time,location,province,option,file)}
        }}>done</button>
        </Fragment>
        ) : (
        <Fragment>
          <button type="button" onClick={()=>{setEditing(true)}}>edit</button>
          <h4>{time}</h4>
          <h3>{location}</h3>
          <h4>{province}</h4>
          <h4>{option}</h4>
        </Fragment>
        )
      }
    </div>
  );
};

// attraction.defualtProps = {
//   name: ''
// }
export default attraction;