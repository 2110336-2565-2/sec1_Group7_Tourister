"use client";

import React, { useEffect, useState, MouseEvent, Fragment } from "react";
import { Controller,useFormContext,useForm,useFieldArray } from "react-hook-form";
import TextField from "@mui/material/TextField";
import { useRouter } from "next/router";
import { UserInterface } from "@/interfaces/UserInterface";
import { FieldName } from "@/css/layout";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

const chooseDraft = () => {
  const router = useRouter();
  const [user, setUser] = useState<UserInterface>()
  useEffect(()=>{
    if (typeof window !== 'undefined') {
      // console.log('we are running on the client');
      // user = JSON.parse(localStorage.getItem("user")||`{}`)
      setUser(JSON.parse(localStorage.getItem("user")||`{}`))
    } else {
      // console.log('we are running on the server');
      // user = JSON.parse(`{}`)
      setUser(JSON.parse(`{}`))
    }
  },[])
  const handleEdit = async (keyName: string) => {
    localStorage.setItem("editing", JSON.stringify(draft[keyName]));
    router.push("/trips/createTrip")
  }
  const {
    formState: { errors }
  } = useForm<FormData>({});
  if(!user || !(user.draft)){
    return <Fragment></Fragment>
  }
  const draft : {[key:string]:any}= user.draft;
  return (
    <form style={{display:'flex', alignItems: 'center',flexDirection:'column'}}>
    <div style={{margin:"5rem 0px 2rem 0px"}}>
        <button style={{margin:".3rem 0px 0px 0px",background:"white",border:"0px",transform:"translate(-2.3rem,.3rem)"}} type="button" onClick={()=>{router.push("/trips");}}><ChevronLeftIcon/></button>
        <h2 style={{textAlign:"center", fontWeight:"900", textShadow:"1px 0 black", letterSpacing:"1px",margin:"-2rem 0px 0px 0px"}}>Choose Draft</h2>
    </div>
            <Fragment>
                {Object.keys(draft).map((keyName, i)=>(
                  <div key={draft[keyName]._id}>
                  <button type="button" onClick={()=>{handleEdit(keyName)}}>Edit</button>
                    <ul>
                      <li>{draft[keyName].name}</li>
                      <li>
                        {draft[keyName].startDate} to {draft[keyName].endDate}
                      </li>
                    </ul>
                    <div>---------------------------</div>
                  </div>
                ))}
            </Fragment>
    </form>
  );
};

export default chooseDraft;