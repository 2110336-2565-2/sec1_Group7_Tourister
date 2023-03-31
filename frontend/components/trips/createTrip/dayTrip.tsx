"use client";

import { useState, useContext, Fragment } from "react";
import { nanoid } from "nanoid";
import Attraction from "./attraction";
import { StageContext } from "./createTrip"
import TextField from "@mui/material/TextField";
import { AttractionInterface } from "@/interfaces/AttractionInterface";
import { COLOR } from "@/theme/globalTheme";

const dayTrip = ({date,order,savedAttraction,handleCB}:{date:string,order:number,savedAttraction:AttractionInterface[],handleCB:Function}) => {
  const stage = useContext(StageContext)
  const [attractions,setAttractions] = useState<AttractionInterface[]>(savedAttraction);

  const handleAdd = ()=>{
    const newAttraction = {
      "id": nanoid(),
      "time": "",
      "location": "",
      "option": "Admission not needed",
      "province": "",
      "file": null
    }
    const newAttractions = [...attractions, newAttraction]
    // setAttractions(attractions => [...attractions, newAttraction])
    setAttractions(newAttractions)
  }
  const handleDelete = (id:string)=>{
    const newAttractions = [...attractions]
    const index = attractions.findIndex((attraction)=>attraction.id===id)
    newAttractions.splice(index,1)
    setAttractions(newAttractions)
    handleCB(date,newAttractions)
  }
  const handleCallback = (id:string, time:string, location:string, province:string, option:string, file:string|null) => {
    const updatedAttractions = attractions.map((att) => {
      if(att.id===id){
        const updatedAtt = {...att,id,time,location,province,option,file}
        return updatedAtt
      }
      return att
    })
    setAttractions(updatedAttractions)
    handleCB(date,updatedAttractions)
  }
  const d = new Date(date)
  const months = [ "January", "February", "March", "April", "May", "June", 
  "July", "August", "September", "October", "November", "December" ];
  return (
          <Fragment>
            <div style={{borderTop:"11px solid white", margin:"7px 0 18px 0", width:"100%", transform: "translateX(-42px)"}}>
            <div style={{display:"flex", width:"fit-content", borderRadius:"8px", WebkitBoxShadow: `inset 0px 0px 0px 1px ${COLOR.primary}`}}>
              <div style={{display:"flex", padding:"4px 14px", borderRadius:"8px", background:COLOR.primary}}>
                <label style={{fontSize:"13px", color:"white"}}>{`Day ${order+1}`}</label>
              </div>
              <label style={{fontSize:"13px", padding:"4px 14px"}}>
                {d.toLocaleDateString('en-GB', { year:"numeric", month:"short", day:"numeric" })}
              </label>
            </div>
            </div>
        {attractions.map((att)=>(<Attraction key={att.id} id={att.id} t={att.time} l={att.location} p={att.province} o={att.option} f={att.file} handleDelete={handleDelete} handleCallback={handleCallback}/>))}
          <div style={{display:"flex", justifyContent:"center", alignItems:"center"}}>
            <button style={{border:"none", borderRadius:"5px", backgroundColor:COLOR.paleblue, fontSize:"12px", fontWeight:"600", width:"120px", height:"26px"}} type="button" onClick= {() => handleAdd()}>ADD</button>
          </div>
          {stage===3 && attractions.length===1 && attractions[0].location===""?(
                  <p style={{color:"red",fontSize:"0.8rem"}}>Please add at least one location for each date</p>
                ):(
                  <Fragment/>
                )}
          </Fragment>
  );
};

dayTrip.defaultProps = {
  savedAttraction : [{
    "id": nanoid(),
    "time": "",
    "location": "",
    "province": "",
    "option": "Addmission not needed",
    "file": undefined
  }]
}
export default dayTrip;