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
const API_URL = 'http://localhost:2000/api/program'
type FormData = {
  // accountType: accountType;
  name: string;
  surname: string;
  citizenId: string;
  phoneNumber: string;
  guideLicenseId?: string;
}
type accountType = 'tourist' | 'guide';
const validationSchema = yup.object().shape({
  // accountType: yup
  //   .string()
  //   .required("Please choose your account type"),
  // name: yup.string().required("Please enter your name"),
  // surname: yup.string().required("Please enter your surname"),
  // guideLicenseId: yup
  //   .string()
  //   // .matches(/^[0-9]+$/, "License Number must be only digits")
  //   .test('number only', 'License Number must be only digits', val => yup.number().isValidSync(val) || val =='')
  //   .test('len', 'License Number must have 7 numbers', val => val?.length===7 || val === ''),
  // phoneNumber: yup
  //   .string()
  //   .required("Please enter the phone number")
  //   .matches(/^[0-9]+$/, "Phone number must be only digits")
  //   .min(9, 'Please enter the valid phone number')
  //   .max(10, 'Please enter the valid phone number')
});
const initName="Admin"
const initSurname="Tester"
const initCitizenID="1101111111111"
const initLicenseID="9999999"
const initPhoneNumber="0999999999"

const editProfile = (user : UserInterface) => {
  const defaultValues = {
    name: user.name,
    surname: user.surname,
    citizenId: user.citizenId,
    phoneNumber: user.phoneNumber,
    guideLicenseId: user.licenseId
  }
  const onSubmit = async (data : FormData) => {
    console.log(data);
    console.log(user._id)
    if(user._id != null)  await updateUserById(user._id,data)
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
      <Link href="/manage_account" passHref><button type="button">Back</button></Link>
      <label>Profile</label>
      <label>Name</label>
      <FormInputText name="name" control={control} label={initName}/>
      {errors.name && <p className="errorMsg">{errors.name.message}</p>}
      <label>Surname</label>
      <FormInputText name="surname" control={control} label={initSurname}/>
      {errors.surname && <p className="errorMsg">{errors.surname.message}</p>}
      <label>Citizen ID</label>
      <FormInputText name="citizenId" control={control} label={initCitizenID} readonly={true}/>
      {errors.citizenId && <p className="errorMsg">{errors.citizenId.message}</p>}
      {user.isGuide? (
        <Fragment>
          <label>Guide License ID</label>
          <FormInputText name="guideLicenseID" control={control} label={initLicenseID}/>
          {errors.guideLicenseId && <p className="errorMsg">{errors.guideLicenseId.message}</p>}
        </Fragment>
      ):(
        <Fragment></Fragment>
      )}
      <label>Phone number</label>
      <FormInputText name="phoneNumber" control={control} label={initPhoneNumber}/>
      {errors.phoneNumber && <p className="errorMsg">{errors.phoneNumber.message}</p>}
      <button type="submit">Update</button>
    </form>
  );
};

editProfile.defaultProps = {
  _id:"63eb4a40b2be37de33f126ec",
  citizenId:"1111111111111",
  name:"TestForManageAccount",
  surname:"DontDelete",
  email:"realprasrodo@gmail.com",
  password:"$2b$10$4Mq3/MqcL36n7fNCsK7POewcN3BWlDJ3oh0rP41bC8vgOopT/m5oq",
  phoneNumber:"111111111",
  isGuide:true,
  remainingAmount:{"$numberInt":"0"},
  __v:{"$numberInt":"0"}
}
export default editProfile;