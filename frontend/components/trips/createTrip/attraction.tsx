"use client";

import { ChangeEvent, useState, MouseEvent, Fragment } from "react";
import { Controller,useFormContext,useForm,useFieldArray } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup"
// import * as yup from "yup";
import { FormInputText } from "@/components/formInput/FormInputText";
import TextField from "@mui/material/TextField";
import { PrimaryButtonwithoutShadow,SecondaryButton } from "@/css/styling";
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import { LocationOnOutlined } from "@mui/icons-material";
import { Chip } from "@mui/material";
import { COLOR } from "@/theme/globalTheme";
import ControlPointIcon from '@mui/icons-material/ControlPoint';

const attraction = ({id,t,l,p,o,f=null,handleDelete,handleCallback}:{id:string,t:string,l:string,p:string,o:string,f:string | null,handleDelete:Function,handleCallback:Function}) => {
  const [time,setTime] = useState(t)
  const [location,setLocation] = useState(l);
  const [province,setProvince] = useState(p)
  const [option,setOption] = useState(o)
  const [file,setFile] = useState<string | null>(f);
  const [image,setImage] = useState<File | null>(null);
  //----------------------------------------------------------
  const [editing, setEditing] = useState(l==="");
  const [errorTime,setErrorTime] = useState(false);
  const [errorName,setErrorName] = useState(false);
  const [errorProvince,setErrorProvince] = useState(false);
  const [errorFile,setErrorFile] = useState(false);
  // const [place_imageUrl,setFile] = useState("");

  function handleFileUpload(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }
    setImage(file)
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
    setErrorFile(file===null)
    return time!=="" && location!=="" && province!=="" && file!==null
  }
  return (
    <Fragment>
      {editing===true ? (
        <div>
          <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/2.0.0/jquery.min.js"></script>
        <div style={{display:"flex",justifyContent:"center"}}>
          <div style={{width:"40%",marginRight:'0%'}}>
            <TextField value={time} onChange={(e)=>setTime(e.target.value)} type="time" variant="outlined" size="small"/>
            <div>
                <input type="file" onChange={handleFileUpload} />
                {/* {image===null?( */}
                {/* // ):(
                //       <div className={"img_preview_wrap"}>
                //     <img src="" id="imagePreview" alt="Preview Image" style={{width:"80%",height:"100%",alignSelf:"center "}} className={"hide"} /> 
                //     </div> 
                    // <div>
                    //   <img src={image} style={{width:"80%",height:"100%",alignSelf:"center "}} className={"hide"}/>
                    // </div>
                  // )} */}
              {/* <div style={{}} className={"file_input_wrap"}>
                <input type="file" style={{display:"none"}} name={"imageUpload"} id={"imageUpload"} onChange={handleFileUpload} />
                {/* {image===null?( */}
                {/* <label htmlFor={"imageUpload"} style={{width:"80%",height:"100%",display:"inline-block",paddingTop:"1rem",color:"#555555",paddingBottom:"1rem",marginTop:"1rem",border:"1px dashed #555555",fontSize:"0.8rem",textAlign:"center",verticalAlign:"middle",cursor:"pointer",boxShadow:"2px 2px 10px #eee",borderRadius:"4px"}}>
                  <ControlPointIcon style={{color:"#555555"}}/><br/>Upload</label> */}
                {/* // ):(
                //       <div className={"img_preview_wrap"}>
                //     <img src="" id="imagePreview" alt="Preview Image" style={{width:"80%",height:"100%",alignSelf:"center "}} className={"hide"} /> 
                //     </div> 
                    // <div>
                    //   <img src={image} style={{width:"80%",height:"100%",alignSelf:"center "}} className={"hide"}/>
                    // </div>
                  // )} */}
              {/* </div> */} 
              {/* <label>{image?image.name:"No Image Selected"}</label> */}
            </div>
          </div>
          <div style={{width:"60%",marginLeft:'0%'}}>
            <div style={{display:"flex",alignSelf:"center", gap:"1rem"}}>
              <label style={{marginTop:".5rem"}}>Location&nbsp;:</label>
            <TextField style={{width:"5rem",}} value={location} onChange={(e)=>setLocation(e.target.value)} label="Name" variant="outlined" size="small"/>
            </div><div style={{display:"flex",alignSelf:"center", gap:"1rem"}}>
              <label style={{marginTop:".5rem"}}>Province&nbsp;:</label>
            <TextField style={{width:"5rem",}} value={province} onChange={(e)=>setProvince(e.target.value)} label="Province" variant="outlined" size="small"/>
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
            {errorFile? <p>Please add an image for the location</p> : <Fragment/>}
          </div>
          </div>
        </div>
        ) : (
      <div style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center", borderBottom: `2px solid ${COLOR.paleblue}`, padding: "1em 1em 0.25em 0.25em " }}>
      <button style={{alignSelf:"flex-end",marginBottom:"-1rem"}}type="button" onClick={()=>{setEditing(true)}}><DriveFileRenameOutlineIcon/></button>
        <div style={{ display: "inline-block", float: "left" }}>
          <img
            src={`data:image/png;base64,${file}`}
            alt="mock-img"
            style={{
              width: "75px",
              height: "75px",
              padding: "0px 0px",
              marginLeft:"-1rem",
              alignSelf:"flex-start",
              borderRadius: 12,
            }}
          />
        </div>
        <div
          style={{ display: "inline-block", float: "left", padding: "10px" }}
        >
          <table>
            <tbody>
              <tr>
                <td style={{ fontWeight: "bold", transform: "translateY(-15px) translateX(10px)",}}>
                <div style={{display:"flex",justifyContent:"center",gap:"1rem"}}>
                  <label>{time}</label>
                  <label>{location}</label>
                </div>
                </td>
              </tr>
              <tr>
                <td style={{ transform: "translateY(-10px)" }}>
                  <Chip
                    icon={<LocationOnOutlined />}
                    size="small"
                    sx={{
                      backgroundColor: COLOR.paleblue,
                      color: COLOR.text,
                      borderRadius: 10,
                      margin: "2px 8px",
                      padding: "2px 8px",

                      "& .MuiChip-icon": {
                        width: "15px",
                        height: "15px",
                      },
                    }}
                    label={province}
                  />
                </td>
              </tr>
              <tr>
                <td style={{ transform: "translateY(-10px)" }}>
                  <Chip
                    icon={<LocalOfferIcon />}
                    size="small"
                    sx={{
                      backgroundColor: COLOR.paleblue,
                      color: COLOR.text,
                      borderRadius: 10,
                      margin: "2px 8px",
                      padding: "2px 8px",

                      "& .MuiChip-icon": {
                        width: "15px",
                        height: "15px",
                      },
                    }}
                    label={option}
                  />
                </td>
              </tr>
            </tbody>
          </table>
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