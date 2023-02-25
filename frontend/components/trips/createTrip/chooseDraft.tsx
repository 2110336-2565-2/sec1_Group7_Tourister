"use client";

import React, { useEffect, useState, MouseEvent, Fragment } from "react";
import { Controller,useFormContext,useForm,useFieldArray } from "react-hook-form";
import { FormInputText } from "@/components/formInput/FormInputText";
import { FormInputRadio } from "@/components/formInput/FormInputRadio";
import { FormInputDate} from "@/components/formInput/FormInputDate";
import { FormInputTime} from "@/components/formInput/FormInputTime";
import TextField from "@mui/material/TextField";
import { useRouter } from "next/router";
import { UserInterface } from "@/interfaces/UserInterface";
import { FieldName } from "@/css/layout";

const chooseDraft = () => {
  const router = useRouter();
  const [user, setUser] = useState<UserInterface>()
  useEffect(()=>setUser(JSON.parse(localStorage.getItem("user")||`{}`)),[])
  const onSubmit = async (data : FormData) => {
  }
  const handleEdit = async (keyName: string) => {
    localStorage.setItem("editing", JSON.stringify(draft[keyName]));
    router.push("/trips/createTrip")
  }
  const {
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>({});
  // console.log(user)
  if(!user){
    return <Fragment></Fragment>
  }
  if(!(user.draft)){
    return <Fragment></Fragment>
  }
  const draft : {[key:string]:any}= user.draft;
  console.log(draft)
  return (
    <form style={{display:'flex', alignItems: 'center',flexDirection:'column'}}onSubmit={handleSubmit(onSubmit)}>
        <button type="button" onClick={()=>{router.push("/trips");}}>Back</button>
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