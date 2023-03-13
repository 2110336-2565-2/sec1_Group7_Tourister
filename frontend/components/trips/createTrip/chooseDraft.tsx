"use client";

import React, { useEffect, useState, MouseEvent, Fragment } from "react";
import { Controller,useFormContext,useForm,useFieldArray } from "react-hook-form";
import TextField from "@mui/material/TextField";
import { useRouter } from "next/router";
import { UserInterface } from "@/interfaces/UserInterface";
import { FieldName } from "@/css/layout";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { ProgramCardForGuide } from "@/components/program/ProgramCardForGuide";
import { getAllDarftProgramsFromGuide, getAllProgramsFromGuide } from "@/services/programService";
import { ProgramInterface } from "@/interfaces/ProgramInterface";

const chooseDraft = () => {
  const router = useRouter();
  const [user, setUser] = useState<UserInterface>()
  const [drafts, setDrafts] = useState<ProgramInterface[]>([])
  useEffect(()=>{
    if (typeof window !== 'undefined') {
      setUser(JSON.parse(localStorage.getItem("user")||`{}`))
    } else {
      setUser(JSON.parse(`{}`))
    }
  },[])

  useEffect(()=>{
    if(user){
      const fetch = async () => {
      const response = await getAllDarftProgramsFromGuide(user._id?user._id:"");
      setDrafts(response.data || [])
      }
      fetch();
    }
  },[user])
  const handleEdit = async (draft : ProgramInterface) => {
    if(draft._id){localStorage.setItem("editing", draft._id);}
    router.push("/trips/createTrip")
  }
  const {
    formState: { errors }
  } = useForm<FormData>({});
  if(!user || !(user.draft)){
    return <Fragment></Fragment>
  }
  console.log(drafts)
  // const draft : {[key:string]:any}= user.draft;
  return (
    <form style={{display:'flex', alignItems: 'center',flexDirection:'column'}}>
    <div style={{margin:"5rem 0px 2rem 0px"}}>
      <button style={{margin:".3rem 0px 0px 0px",background:"white",border:"0px",transform:"translate(-2.3rem,.3rem)"}} type="button" onClick={()=>{router.push("/trips");}}><ChevronLeftIcon/></button>
      <h2 style={{textAlign:"center", fontWeight:"900", textShadow:"1px 0 black", letterSpacing:"1px",margin:"-2rem 0px 0px 0px"}}>Choose Draft</h2>
    </div>
    {drafts.map((draft)=>(
      <div key={draft._id} style={{width:"100%", display:'flex', alignItems: 'center',flexDirection:'column'}}>
        <ProgramCardForGuide program={draft} isComplete={false} isDraft={true} handleFunction={()=>{handleEdit(draft)}}/>
      </div>
    ))}
    </form>
  );
};

export default chooseDraft;