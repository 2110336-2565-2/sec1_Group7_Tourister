"use client";

import { useState, MouseEvent, Fragment } from "react";
import { nanoid } from "nanoid";
import Attraction from "./attraction";
import TextField from "@mui/material/TextField";
import { AttractionInterface } from "@/interfaces/AttractionInterface";

const dayTrip = ({date,savedAttraction,handleCB}:{date:string,savedAttraction:AttractionInterface[],handleCB:Function}) => {
  const [stage, setStage ] = useState(0);
  const [attractions,setAttractions] = useState<AttractionInterface[]>(savedAttraction);

  const handleAdd = ()=>{
    const newAttraction = {
      "id": nanoid(),
      "time": "",
      "location": "",
      "option": "Admission not needed",
      "province": "",
      "file": undefined
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
  }
  const handleCallback = (id:string, time:string, location:string, province:string, option:string, file:File|undefined) => {
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
  return (
          <Fragment>
        <h2>{date.toString()}</h2>
        {attractions.map((att)=>(<Attraction key={att.id} id={att.id} t={att.time} l={att.location} p={att.province} o={att.option} handleDelete={handleDelete} handleCallback={handleCallback}/>))}
          <button type="button" onClick= {() => handleAdd()}>Add</button>
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