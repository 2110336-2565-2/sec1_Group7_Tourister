import { ChangeEvent, useState, MouseEvent, Fragment } from "react";
import { Controller,useFormContext,useForm,useFieldArray } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup"
// import * as yup from "yup";
import { FormInputText } from "@/components/formInput/FormInputText";
import TextField from "@mui/material/TextField";
import { PrimaryButtonwithoutShadow,SecondaryButton } from "@/css/styling";
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import { AddCircleOutlineOutlined, BorderColorOutlined, LabelOffOutlined, LocationOnOutlined, LoyaltyOutlined } from "@mui/icons-material";
import { Chip, FormControl, MenuItem, Select } from "@mui/material";
import { COLOR } from "@/theme/globalTheme";
import { TimePicker } from "@mui/x-date-pickers";

const Attraction = ({id,t,l,p,o,f=null,handleDelete,handleCallback}:{id:string,t:string,l:string,p:string,o:string,f:string | null,handleDelete:Function,handleCallback:Function}) => {
  const [time,setTime] = useState(t)
  const [location,setLocation] = useState(l);
  const [province,setProvince] = useState(p)
  const [option,setOption] = useState(o)
  const [file,setFile] = useState<string | null>(f);
  const [image,setImage] = useState<File | null>(null);
  //----------------------------------------------------------
  const [editing, setEditing] = useState(l==="");
  const [errorInvalidTime,setErrorInvalidTime] = useState(false);
  const [errorTime,setErrorTime] = useState(false);
  const [errorName,setErrorName] = useState(false);
  const [errorProvince,setErrorProvince] = useState(false);
  const [errorFile,setErrorFile] = useState(false);
  // const [place_imageUrl,setFile] = useState("");

  function uploadCompressedImage(imgToCompress: string, maxWidth: number, maxHeight: number, quality: number) {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");

    const img = new Image();
    img.src = imgToCompress;

    img.addEventListener('load', function() {
      const originalWidth = img.width;
      const originalHeight = img.height;

      const resizingFactor = Math.min(1, Math.min(maxWidth / originalWidth, maxHeight / originalHeight))

      canvas.width = originalWidth * resizingFactor
      canvas.height = originalHeight * resizingFactor

      context!.drawImage(
        img,
        0,
        0,
        originalWidth * resizingFactor,
        originalHeight * resizingFactor
      );

      // Reducing the quality of the image
      canvas.toBlob(
        (blob) => {
          if (blob) {
            const reader = new FileReader();
            reader.onload = () => {
              const contents = reader.result;
              if (typeof contents === 'string') {
                setFile(btoa(contents)); // Set image here
              }
            };
            reader.readAsBinaryString(blob);
          }
        },
        "image/jpeg",
        quality
      );
    });
  }

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
        //console.log(btoa(result))
        // setFile(btoa(result));
        uploadCompressedImage(result, 400, 300, 0.5);
      }
    };
    // reader.readAsBinaryString(file);
    reader.readAsDataURL(file);
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
            <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/2.0.0/jquery.min.js" async></script>
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
                      // id="upload-button"
                      style={{ 
                        opacity: 0,
                        position: "absolute",
                        width: "74px",
                        height: "74px"
                      }}
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
                        <label>Upload</label>
                      </div>
                    ):(
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
                    <MenuItem value={"Admission not needed"}><div style={{display:"flex", alignItems:"center", gap:"5px", fontSize:"12px"}}><LabelOffOutlined color="disabled" style={{width:"15px", height:"15px"}}/><label>Admission not needed</label></div></MenuItem>
                    <MenuItem value={"Admission included"}><div style={{display:"flex", alignItems:"center", gap:"5px", fontSize:"12px"}}><LoyaltyOutlined color="primary" style={{width:"15px", height:"15px"}}/><label>Admission included</label></div></MenuItem>
                    <MenuItem value={"Admission not included"}><div style={{display:"flex", alignItems:"center", gap:"5px", fontSize:"12px"}}><LoyaltyOutlined color="disabled" style={{width:"15px", height:"15px"}}/><label>Admission not included</label></div></MenuItem>
                    {/* sx={{
                      '& -MuiMenuItem-root': {
                        padding:"0",
                        margin:"0",
                      }
                    }} */}
                  </Select>
                </FormControl>
                <div style={{display:"flex",alignSelf:"center", justifyContent: "flex-end", gap:"10px", height:"25px", margin:"10px 0"}}>
              <SecondaryButton style={{borderWidth:"1px", borderRadius:"5px", fontSize:"12px", width:"70px"}} type="button" onClick={()=>{handleDelete(id)}}>DELETE</SecondaryButton>
              <PrimaryButtonwithoutShadow style={{borderWidth:"1px", borderRadius:"5px", fontSize:"12px", width:"70px"}} type="button" onClick={()=>{
                if(valid()) {
                  if(handleCallback(id,time,location,province,option,file)){
                    // console.log("true")
                    setErrorInvalidTime(false)
                    setEditing(false);
                  }else{
                    setErrorInvalidTime(true)
                    // console.log("false")
                  }
                }
              }}>DONE</PrimaryButtonwithoutShadow>
                </div>
              </div>
            </div>
            <div style={{margin:"0 1rem", fontSize:"12px", color:COLOR.error}}>
              {errorName? <label>Please add a name for the location<br/></label> : <Fragment/>}
              {errorTime? <label>Please add a time for the location<br/></label> : <Fragment/>}
              {errorInvalidTime? <label>Please add a time which matches other location<br/></label> : <Fragment/>}
              {errorProvince? <label>Please add a province for the location<br/></label> : <Fragment/>}
              {errorFile? <label>Please add an image for the location<br/></label> : <Fragment/>}
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
export default Attraction;