"use client";

import { useState, MouseEvent, Fragment } from "react";
import Link from 'next/link';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup";
import { FormInputText } from "@/components/formInput/FormInputText";
import {getUserById, updateUserById} from "@/services/userService";
import { UserInterface } from "@/interfaces/UserInterface";
import axios from 'axios';

import { PrimaryButton } from "@/css/styling";
import { COLOR } from "@/theme/globalTheme";
import styled from "styled-components";
import NavigateBeforeOutlinedIcon from '@mui/icons-material/NavigateBeforeOutlined';
import { FieldName } from "@/css/layout";

const API_URL = 'http://localhost:2000/api/program'
type FormData = {
  // accountType: accountType;
  name: string;
  surname: string;
  email: string;
  phoneNumber: string;
  licenseId?: string;
}
type accountType = 'tourist' | 'guide';
const validationSchema = yup.object().shape({
  // accountType: yup
  //   .string()
  //   .required("Please choose your account type"),
  name: yup.string().required("Please enter your name"),
  surname: yup.string().required("Please enter your surname"),
  phoneNumber: yup
    .string()
    .required("Please enter the phone number")
    .matches(/^[0-9]+$/, "Phone number must be only digits")
    .min(9, 'Please enter the valid phone number')
    .max(10, 'Please enter the valid phone number')
});

const editProfile = () => {
  let user:UserInterface
  if (typeof window !== 'undefined') {
    // console.log('we are running on the client');
    user = JSON.parse(localStorage.getItem("user")||`{}`)
  } else {
    // console.log('we are running on the server');
    user = JSON.parse(`{}`)
  }
  const defaultValues = {
    name: user.name,
    surname: user.surname,
    phoneNumber: user.phoneNumber,
    licenseId: user.licenseId,
    email: user.email,
  }
  const onSubmit = async (data : FormData) => {
    console.log(data);
    if(user._id != null)console.log( await updateUserById(user._id,data))

    
    const response = await getUserById(user._id);
    console.log(response.data);
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  const {
    register,
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>({
    resolver: yupResolver(validationSchema),
    defaultValues: defaultValues
  });
  
  return (
    <form style={{display:'flex', alignItems: 'center',flexDirection:'column'}}onSubmit={handleSubmit(onSubmit)}>
      {/* <Link href="../register" passHref><button type="button" onClick={handleBackButton}>Back</button></Link> */}
      {/* <Link href="/manage_account" passHref><button type="button">Back</button></Link> */}

      <div style={{marginTop:"6rem",width:"100%",height:"4rem",display:"flex",flexDirection:"row",justifyContent:"flex-start",alignItems:"center"}}>
        <Link href="/manage_account" style={{width:"20%"}} passHref>
          <button type="button" style={{width:"100%",height:"4rem",background:"none",border:"none",padding:0}}>
            <NavigateBeforeOutlinedIcon style={{fontSize:"2.5rem",color:"gray"}}/>
          </button>
        </Link>
        <h3 style={{width:"60%",textAlign:"center",fontSize:"1.5rem"}}>Profile</h3>
      </div>
      <div style={{width:"6rem",height:"6rem",backgroundColor:COLOR.primary,marginBottom:"2rem"}}>
        {/* TODO: ICON */}
      </div>
      <div style={{display:"grid",width:"80%",justifyContent:"center"}}>
        <FieldName style={{alignSelf:"flex-start",marginTop:"1rem",marginBottom:"0.5rem"}}>Name</FieldName>
        <FormInputText name="name" control={control} label="Name"/>
        <FieldName style={{alignSelf:"flex-start",marginTop:"1rem",marginBottom:"0.5rem"}}>Surname</FieldName>
        <FormInputText name="surname" control={control} label="Surname"/>
        {user.isGuide? (
        <Fragment>
          <FieldName style={{color:"rgba(0,0,0,1)",alignSelf:"flex-start",marginTop:"1rem",marginBottom:"0.5rem"}}>Guide License ID</FieldName>
          <div style={{backgroundColor:"rgba(0,0,0,0.15)"}}><FormInputText name="licenseId" control={control} label="License ID" readonly={true}/></div>
        </Fragment>
        ):(
          <Fragment></Fragment>
        )}
        <FieldName style={{alignSelf:"flex-start",marginTop:"1rem",marginBottom:"0.5rem"}}>Phone number</FieldName>
        <FormInputText name="phoneNumber" control={control} label="Phone number"/>
        <FieldName style={{color:"rgba(0,0,0,1)",alignSelf:"flex-start",marginTop:"1rem",marginBottom:"0.5rem"}}>Email</FieldName>
        <div style={{backgroundColor:"rgba(0,0,0,0.15)"}}><FormInputText name="email" control={control} label="Email" readonly={true}/></div>
        <PrimaryButton style={{alignSelf:"center",marginTop:"2rem"}} type="submit" variant="contained">UPDATE</PrimaryButton>
      </div>
      {/* <button type="submit">Update</button> */}
    </form>
  );
};

export default editProfile;