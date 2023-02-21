"use client";

import { useState, MouseEvent, Fragment } from "react";
import { Controller,useFormContext,useForm,useFieldArray } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup"
// import * as yup from "yup";
import { FormInputText } from "@/components/formInput/FormInputText";
import TextField from "@mui/material/TextField";

const attraction = ({id,handleDelete,handleCallback}:{id:string,handleDelete:Function,handleCallback:Function}) => {
  const [time,setTime] = useState("")
  const [name,setName] = useState("");
  const [province,setProvince] = useState("")
  const [option,setOption] = useState("Admission not needed")
  const [file,setFile] = useState<File | string>();
  //----------------------------------------------------------
  const [editing, setEditing] = useState(true);
  const [error,setError] = useState(false);
  // const [place_imageUrl,setFile] = useState("");
  
  return (
    <div>
      {editing===true ? (
        <Fragment>
        
        <TextField value={name} onChange={(e)=>setName(e.target.value)} label="Name" variant="outlined" size="small"
          // helperText={error ? error.message : null}
          // error={Boolean(error)}
        />
        <TextField value={time} onChange={(e)=>setTime(e.target.value)} type="time" variant="outlined" size="small"
          // helperText={error ? error.message : null}
          // error={Boolean(error)}
        />
        <TextField value={province} onChange={(e)=>setProvince(e.target.value)} label="Province" variant="outlined" size="small"
          // helperText={error ? error.message : null}
          // error={Boolean(error)}
        />
        {error===true&&editing===true ? <p>Please add a name for the location</p> : <Fragment/>}
        <select onChange={(e)=>setOption(e.target.value)}>
          <option value={option}>{option}</option>
          {option==="Admission not needed" ? <Fragment></Fragment> : <option value="Admission not needed">Admission not needed</option>}
          {option==="Admission included" ? <Fragment></Fragment> : <option value="Admission included">Admission included</option>}
          {option==="Admission not included" ? <Fragment></Fragment> : <option value="Admission not included">Admission not included</option>}
        </select>
        <input type="file" onChange={(e)=>{if(!e.target.files)return;setFile(e.target.files[0])}}></input>
        <button type="button" onClick={()=>{handleDelete(id)}}>delete</button>
        <button type="button" onClick={()=>{
          handleCallback(id,name,option,file)
          if(name==="") {(setError(true))} else {setEditing(false);setError(false)}
        }}>done</button>
        </Fragment>
        ) : (
        <Fragment>
          <button type="button" onClick={()=>{setEditing(true)}}>edit</button>
          <h4>{time}</h4>
          <h3>{name}</h3>
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