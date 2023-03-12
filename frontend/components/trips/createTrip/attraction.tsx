"use client";

import { ChangeEvent, useState, MouseEvent, Fragment } from "react";
import { Controller,useFormContext,useForm,useFieldArray } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup"
// import * as yup from "yup";
import { FormInputText } from "@/components/formInput/FormInputText";
import TextField from "@mui/material/TextField";
import { PrimaryButtonwithoutShadow,SecondaryButton } from "@/css/styling";

const attraction = ({id,t,l,p,o,f,handleDelete,handleCallback}:{id:string,t:string,l:string,p:string,o:string,f:string | null,handleDelete:Function,handleCallback:Function}) => {
  const [time,setTime] = useState(t)
  const [location,setLocation] = useState(l);
  const [province,setProvince] = useState(p)
  const [option,setOption] = useState(o)
  const [file,setFile] = useState<string | null>(f);
  //----------------------------------------------------------
  const [editing, setEditing] = useState(l==="");
  const [errorTime,setErrorTime] = useState(false);
  const [errorName,setErrorName] = useState(false);
  const [errorProvince,setErrorProvince] = useState(false);
  // const [place_imageUrl,setFile] = useState("");

  function handleFileUpload(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result;
      if (typeof result === 'string') {
        setFile(btoa(result));
      }
    };
    reader.readAsBinaryString(file);
  }

  const valid= ()=>{
    setErrorTime(time==="")
    setErrorName(location==="")
    setErrorProvince(province==="")
    return time!=="" && location!=="" && province!==""
  }
  return (
    <Fragment>
      {editing===true ? (
        <div>
        <div style={{display:"flex",justifyContent:"center"}}>
          <div style={{width:"24%",marginRight:'1%'}}>
            <TextField value={time} onChange={(e)=>setTime(e.target.value)} type="time" variant="outlined" size="small"/>
            {/* <input type="file" onChange={(e)=>{if(!e.target.files)return;setFile(e.target.files[0])}}></input> */}
            <div>
              <input type="file" onChange={handleFileUpload} />
              {/* {file && (
                <div> */}
                  {/* Base64-encoded file data: */}
                  {/* <pre>{file}</pre>
                </div>
              )} */}
            </div>
          </div>
          <div style={{width:"74%",marginLeft:'1%'}}>
            <div style={{display:"flex",alignSelf:"center", gap:"1rem"}}>
              <label style={{marginTop:".5rem"}}>Location&nbsp;:</label>
            <TextField value={location} onChange={(e)=>setLocation(e.target.value)} label="Name" variant="outlined" size="small"/>
            </div><div style={{display:"flex",alignSelf:"center", gap:"1rem"}}>
              <label style={{marginTop:".5rem"}}>Province&nbsp;:</label>
            <TextField value={province} onChange={(e)=>setProvince(e.target.value)} label="Province" variant="outlined" size="small"/>
            </div>
            <select onChange={(e)=>setOption(e.target.value)}>
              <option value={option}>{option}</option>
              {option==="Admission not needed" ? <Fragment></Fragment> : <option value="Admission not needed">Admission not needed</option>}
              {option==="Admission included" ? <Fragment></Fragment> : <option value="Admission included">Admission included</option>}
              {option==="Admission not included" ? <Fragment></Fragment> : <option value="Admission not included">Admission not included</option>}
            </select>
            <div style={{display:"flex",alignSelf:"center", gap:"1rem"}}>
          <SecondaryButton type="button" onClick={()=>{handleDelete(id)}}>delete</SecondaryButton>
          <PrimaryButtonwithoutShadow type="button" onClick={()=>{
            if(valid()) {setEditing(false);handleCallback(id,time,location,province,option,file)}
          }}>done</PrimaryButtonwithoutShadow>
            </div>
            {errorName? <p>Please add a name for the location</p> : <Fragment/>}
            {errorTime? <p>Please add a time for the location</p> : <Fragment/>}
            {errorProvince? <p>Please add a province for the location</p> : <Fragment/>}
          </div>
          </div>
        </div>
        ) : (
        <div>
          <button type="button" onClick={()=>{setEditing(true)}}>edit</button>
          <div style={{display:"flex",justifyContent:"center"}}>
            <img style={{width:"80px",height:"80px"}} src={`data:image/png;base64,${file}`} alt="Base64 Image" />
            <div style={{display:"flex",justifyContent:"center",gap:"1rem"}}>
              <label>{time}</label>
              <label>{location}</label>
              <h4>{province}</h4>
              <h4>{option}</h4>
            </div>
          </div>
        </div>
        )
      }
    </Fragment>
  );
};

// attraction.defualtProps = {
//   name: ''
// }
export default attraction;