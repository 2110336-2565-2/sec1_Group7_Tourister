"use client";

import { ChangeEvent, useState, MouseEvent, Fragment } from "react";
import { Controller,useFormContext,useForm,useFieldArray } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup"
// import * as yup from "yup";
import { FormInputText } from "@/components/formInput/FormInputText";
import TextField from "@mui/material/TextField";
import { PrimaryButtonwithoutShadow,SecondaryButton, SmallTextField } from "@/css/styling";
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import { AddCircleOutlineOutlined, BorderColorOutlined, LabelOffOutlined, LocationOnOutlined, LoyaltyOutlined } from "@mui/icons-material";
import { Chip, FormControl, MenuItem, Select } from "@mui/material";
import { COLOR } from "@/theme/globalTheme";
import { TimePicker } from "@mui/x-date-pickers";

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
            <div style={{display:"flex", margin: "0"}}>
              <div style={{width:"70px", marginRight:'10px'}}>
                <TextField 
                  value={time} 
                  onChange={(e)=>setTime(e.target.value)} 
                  type="time" variant="outlined" size="small"
                  style={{width:"74px"}}
                  inputProps={{
                    style: {
                      textAlign:"center",
                      fontSize: "12px",
                      height: "26px",
                      padding: '0 5px'
                    }
                  }}
                  sx={{
                    '& input[type="time"]::-webkit-calendar-picker-indicator': {
                      width:"0",
                      padding:"0",
                      margin:"0",
                      visibility: "hidden"
                    },
                  }}
                />
                <div>
                    {/* <input type="file" onChange={handleFileUpload} /> */}
                    <input
                      type="file"
                      id="upload-button"
                      style={{ display: "none" }}
                      onChange={handleFileUpload}
                    />
                    {image===null?(
                      <div 
                        style={{
                          width: "70px",
                          height: "70px",
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "center",
                          alignItems: "center",
                          textAlign: "center",
                          border: "2px dashed silver",
                          borderRadius: "5px",
                          backgroundColor: "whitesmoke",
                          color: "silver",
                          fontSize: "12px",
                          marginTop: "5px"
                        }}
                      >
                        <AddCircleOutlineOutlined
                          style={{
                            width: "20px",
                            height: "20px",
                            borderRadius: "0.75rem",
                            padding: "0"
                          }}
                        />
                        <label htmlFor="upload-button">Upload</label>
                      </div>
                    ):(
                      <label htmlFor="upload-button">
                        <img
                          src={`data:image/png;base64,${file}`}
                          alt="img"
                          style={{
                            width: "74px",
                            height: "74px",
                            marginTop: "5px",
                            borderRadius: 5,
                          }}
                        />
                      </label>
                    )}
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
              <div style={{width:"100%", marginLeft:'5px'}}>
                <div style={{display:"flex",alignSelf:"center", gap:"5px", margin:"2px 0 10px 0"}}>
                  <label style={{marginTop:"3px", fontSize:"14px"}}>Location&nbsp;:</label>
                <TextField
                  value={location}
                  onChange={(e)=>setLocation(e.target.value)}
                  placeholder="Name"
                  variant="outlined"
                  size="small"
                  fullWidth
                  inputProps={{
                    style: {
                      fontSize: "14px",
                      height: "26px",
                      padding: '0 10px'
                    }
                  }}
                />
                </div>
                <div style={{display:"flex",alignSelf:"center", gap:"5px", margin:"10px 0"}}>
                  <label style={{marginTop:"3px", fontSize:"14px"}}>Province&nbsp;:</label>
                <TextField
                  value={province}
                  onChange={(e)=>setProvince(e.target.value)}
                  placeholder="Province"
                  variant="outlined"
                  size="small"
                  fullWidth
                  inputProps={{
                    style: {
                      fontSize: "14px",
                      height: "26px",
                      padding: '0 10px'
                    }
                  }}
                />
                </div>
                <FormControl size= "small" fullWidth>
                  <Select
                    value={option}
                    onChange={(e)=>setOption(e.target.value)}
                    fullWidth
                    style={{fontSize:"12px", height:"30px"}}
                  >
                    <MenuItem value={"Admission not needed"}><div style={{display:"flex", alignItems:"center", gap:"5px"}}><LabelOffOutlined color="disabled" style={{width:"15px", height:"15px"}}/><label>Admission not needed</label></div></MenuItem>
                    <MenuItem value={"Admission included"}><div style={{display:"flex", alignItems:"center", gap:"5px"}}><LoyaltyOutlined color="primary" style={{width:"15px", height:"15px"}}/><label>Admission included</label></div></MenuItem>
                    <MenuItem value={"Admission not included"}><div style={{display:"flex", alignItems:"center", gap:"5px"}}><LoyaltyOutlined color="disabled" style={{width:"15px", height:"15px"}}/><label>Admission not included</label></div></MenuItem>
                  </Select>
                </FormControl>
                <div style={{display:"flex",alignSelf:"center", justifyContent: "flex-end", gap:"10px", height:"25px", margin:"10px 0"}}>
              <SecondaryButton style={{borderWidth:"1px", borderRadius:"5px", fontSize:"12px", width:"70px"}} type="button" onClick={()=>{handleDelete(id)}}>DELETE</SecondaryButton>
              <PrimaryButtonwithoutShadow style={{borderWidth:"1px", borderRadius:"5px", fontSize:"12px", width:"70px"}} type="button" onClick={()=>{
                if(valid()) {setEditing(false);handleCallback(id,time,location,province,option,file)}
              }}>DONE</PrimaryButtonwithoutShadow>
                </div>
              </div>
            </div>
            <div style={{fontSize:"14px"}}>
              {errorName? <label>* Please add a name for the location<br/></label> : <Fragment/>}
              {errorTime? <label>* Please add a time for the location<br/></label> : <Fragment/>}
              {errorProvince? <label>* Please add a province for the location<br/></label> : <Fragment/>}
              {errorFile? <label>* Please add an image for the location<br/></label> : <Fragment/>}
            </div>
          </div>
        ) : (
          <div style={{display:"grid", margin: "0"}}>
            <button 
              style={{
                width:"25px", height:"25px", margin:"0 0 5px auto",
                borderWidth:"1px", borderColor:"lightgrey", borderRadius:"50%", 
                color:"grey", display:"flex", justifyContent:"center", alignItems:"center"
              }}
              type="button" onClick={()=>{setEditing(true)}}>
                <BorderColorOutlined style={{width:"15px", height:"15px"}}/>
            </button>
            <div style={{display:"flex", margin: "0"}}>
              <div style={{width:"70px", marginRight:'10px'}}>
                <img
                  src={`data:image/png;base64,${file}`}
                  alt="mock-img"
                  style={{
                    width: "74px",
                    height: "74px",
                    padding: "0px 0px",
                    alignSelf:"flex-start",
                    borderRadius: 5,
                  }}
                />
              </div>
              <div style={{width:"100%", marginLeft:'20px'}}>
                <div style={{display:"flex", margin: "0"}}>
                  <div style={{width:"66px"}}>
                    <label>{time}</label>
                  </div>
                  <div style={{width:"100%"}}>
                    <label>{location}</label>
                  </div>
                </div>
                <Chip
                  icon={<LocationOnOutlined />}
                  size="small"
                  sx={{
                    backgroundColor: COLOR.paleblue,
                    color: COLOR.text,
                    fontSize: "12px",
                    borderRadius: 10,
                    margin: "1px 0",
                    padding: "2px 8px",

                    "& .MuiChip-icon": {
                      width: "15px",
                      height: "15px",
                    },
                  }}
                  label={province}
                />
                <Chip
                  icon={option==="Admission not needed"?<LabelOffOutlined color="disabled"/>:(option==="Admission included"?<LoyaltyOutlined color="primary"/>:<LoyaltyOutlined color="disabled"/>)}
                  size="small"
                  sx={{
                    backgroundColor: "transparent",
                    color: "black",
                    fontSize: "12px",
                    margin: "1px 0",
                    padding: "2px 1px",

                    "& .MuiChip-icon": {
                      width: "15px",
                      height: "15px",
                    },
                  }}
                  label={option}
                />
                {/* <table>
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
                </table> */}
              </div>
            </div>
          </div>
        )
      }
      <hr style={{margin:"10px", border: "none"}}/>
    </Fragment>
  );
};

// attraction.defualtProps = {
//   name: ''
// }
export default attraction;