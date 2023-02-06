"use client";

import { useState, MouseEvent } from "react";
import Link from 'next/link';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup";

type FormData = {
  // accountType: accountType;
  name: string;
  surname: string;
  citizenId: string;
  phoneNumber: string;
  guideLicenseId?: string;
}
// type accountType = 'tourist' | 'guide';
const validationSchema = yup.object().shape({
  accountType: yup
    .string()
    .required("Please choose your account type"),
  name: yup.string().required("Please enter your name"),
  surname: yup.string().required("Please enter your surname"),
  guideLicenseId: yup
    .string()
    // .matches(/^[0-9]+$/, "License Number must be only digits")
    .test('number only', 'License Number must be only digits', val => yup.number().isValidSync(val) || val =='')
    .test('len', 'License Number must have 7 numbers', val => val?.length===7 || val === ''),
  phoneNumber: yup
    .string()
    .required("Please enter the phone number")
    .matches(/^[0-9]+$/, "Phone number must be only digits")
    .min(9, 'Please enter the valid phone number')
    .max(10, 'Please enter the valid phone number')
});

const initName="Admin"
const initSurname="Tester"
const initCitizenID="1101111111111"
const initLicenseID="9999999"
const initPhoneNumber="0999999999"

const editProfileGuide = () => {
  const onSubmit = (data : FormData) => {
    console.log(data);
  }
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>({
    resolver: yupResolver(validationSchema),
  });

  return (
    <form style={{display:'flex', alignItems: 'center',flexDirection:'column'}}onSubmit={handleSubmit(onSubmit)}>
      {/* <Link href="../register" passHref><button type="button" onClick={handleBackButton}>Back</button></Link> */}
      <Link href="./manage_account" passHref><button type="button">Back</button></Link>
      <label>Profile</label>
      <label>Name</label>
      <input
        type="text"
        placeholder={initName}
        {...register("name")}
      />
      {errors.name && <p className="errorMsg">{errors.name.message}</p>}
      <label>Surname</label>
      <input
        type="text"
        placeholder={initSurname}
        {...register("surname")}
      />
      {errors.surname && <p className="errorMsg">{errors.surname.message}</p>}
      <label>Citizen ID</label>
      <input
        type="text"
        placeholder={initCitizenID}
        {...register("citizenId")}
        readOnly = {true}
      />
      {errors.citizenId && <p className="errorMsg">{errors.citizenId.message}</p>}
      <label>Guide License ID</label>
      <input
        type="guideLicenseID"
        placeholder={initLicenseID}
        {...register("guideLicenseId")}
      />
      {errors.guideLicenseId && <p className="errorMsg">{errors.guideLicenseId.message}</p>}
      <label>Phone number</label>
      <input
        type="text"
        placeholder={initPhoneNumber}
        {...register("phoneNumber")}
      />
      {errors.phoneNumber && <p className="errorMsg">{errors.phoneNumber.message}</p>}
      <button type="submit">Update</button>
    </form>
  );
};

export default editProfileGuide;