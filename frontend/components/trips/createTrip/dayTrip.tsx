"use client";

import { useState, MouseEvent, Fragment } from "react";
import { nanoid } from "nanoid";
import Attraction from "./attraction";
import TextField from "@mui/material/TextField";

const dayTrip = ({date,handleCB}:{date:string,handleCB:Function}) => {
  const [stage, setStage ] = useState(0);
  const [attractions,setAttractions] = useState<[{
      "id": string,
      "time": string,
      "name": string,
      "province": string,
      "option": string,
      "file": File | undefined
    }]>([{
    "id": nanoid(),
    "time": "",
    "name": "",
    "province": "",
    "option": "Addmission not needed",
    "file": undefined
  }]);

  const handleAdd = ()=>{
    const newAttraction = {
      "id": nanoid(),
      "time": "",
      "name": "",
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
  const handleCallback = (id:string, name:string, option:string, file:File|undefined) => {
    const updatedAttractions = attractions.map((att) => {
      if(att.id===id){
        const updatedAtt = {...att,id,name,option,file}
        return updatedAtt
      }
      return att
    })
    setAttractions(updatedAttractions)
    handleCB(date,attractions)
  }
  return (
          <Fragment>
        <h2>{date}</h2>
        {attractions.map((att)=>(<Attraction id={att.id} handleDelete={handleDelete} handleCallback={handleCallback}/>))}
          <button type="button" onClick= {() => handleAdd()}>Add</button>
          </Fragment>
  );
};

export default dayTrip;