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
  // let user:JSON
  // let user:UserInterface
  // if (typeof window !== 'undefined') {
  //   // console.log('we are running on the client');
  //   user = JSON.parse(localStorage.getItem("user")||`{}`)
  // } else {
  //   // console.log('we are running on the server');
  //   user = JSON.parse(`{}`)
  // }
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
  // console.log(user)
  if(!user || !(user.draft)){
    return <Fragment></Fragment>
  }
  const draft : {[key:string]:any}= user.draft;
  // console.log(draft)
  return (
    <form style={{display:'flex', alignItems: 'center',flexDirection:'column'}}>
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