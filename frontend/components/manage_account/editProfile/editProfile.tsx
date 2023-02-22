"use client";

import { useState, MouseEvent, Fragment } from "react";
import Link from 'next/link';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup";
import { FormInputText } from "@/components/formInput/FormInputText";
import {updateUserById} from "@/services/userService";
import { UserInterface } from "@/interfaces/UserInterface";
import axios from 'axios';

import { COLOR } from "@/theme/globalTheme";
import { PrimaryButton, RequireFormLabel } from "@/css/styling";
import { Form, FieldName } from "@/css/layout";
import NavigateBeforeOutlinedIcon from '@mui/icons-material/NavigateBeforeOutlined';

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

const editProfile = ({user} : {user:UserInterface}) => {
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
      {/* back + title */}
      <div style={{width:"100%",height:"3.5rem",display:"flex",justifyContent:"center",backgroundColor:"red"}}>

      </div>
      <Link href="/manage_account" passHref><button type="button">Back</button></Link>
      {/* Title */}
      <label>Profile</label>
      {/* Change picture */}

      {/* Change profile detail */}


      {/* old version */}
      <label>Name</label>
      <FormInputText name="name" control={control} label="Name"/>
      <label>Surname</label>
      <FormInputText name="surname" control={control} label="Surname"/>
      {user.isGuide? (
        <Fragment>
          <label>Guide License ID</label>
          <FormInputText name="licenseId" control={control} label="License ID" readonly={true}/>
        </Fragment>
      ):(
        <Fragment></Fragment>
      )}
      <label>Phone number</label>
      <FormInputText name="phoneNumber" control={control} label="Phone number"/>
      <label>Email</label>
      <FormInputText name="email" control={control} label="Email" readonly={true}/>
      <button type="submit">Update</button>
    </form>
  );
};

editProfile.defaultProps = {
  user : {
    _id:"63eb4a40b2be37de33f126ec",
    citizenId:"1111111111111",
    name:"TestForManageAccount",
    surname:"DontDelete",
    email:"realprasrodo@gmail.com",
    password:"$2b$10$4Mq3/MqcL36n7fNCsK7POewcN3BWlDJ3oh0rP41bC8vgOopT/m5oq",
    phoneNumber:"111111111",
    isGuide:true,
    remainingAmount:{"$numberInt":"0"},
    licenseId:"1234567",
    __v:{"$numberInt":"0"}
  }
}
export default editProfile;