import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup"
// import { Button } from "@mui/material"
// import styled from 'styled-components'
import Link from 'next/link';

import { validationSchema, FormData, defaultValues} from "./registerSchema";
import { registerUser } from "@/services/userService";
import { UserInterface } from "@/interfaces/UserInterface";
import { FormInputText } from "@/components/formInput/FormInputText";
import { FormInputPassword } from "@/components/formInput/FormInputPassword";
import { FormInputRadio } from "@/components/formInput/FormInputRadio";
import { COLOR } from "@/theme/globalTheme";
import { PrimaryButton, RequireLabel } from "@/css/styling";


const registerForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleClickShowPassword = () =>{
    setShowPassword((password) => !password);
  }

  const handleClickShowConfirmPassword = () =>{
    setShowConfirmPassword((password) => !password)
  }

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const {
    watch,
    handleSubmit,
    control,
    formState: { errors }
  } = useForm<FormData>({
    resolver: yupResolver(validationSchema),
    defaultValues: defaultValues
  });
  const watchAccountType = watch("accountType");

  const onSubmit = async (data : FormData) => {
    const userData: UserInterface = {
      name: data.name,
      surname: data.surname,
      email: data.email,
      password: data.password,
      phoneNumber: data.phoneNumber,
      isGuide: data.accountType === "guide",
      licenseId: data?.guideLicenseId
    }

    console.log(userData);
    try {
      const response = await registerUser(userData)
      console.log(response)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <form style={{display:'flex', alignItems:'flex-start',flexDirection:'column', margin:'0.8rem',gap:'0.3rem'}} onSubmit={handleSubmit(onSubmit)}>
      <FormInputRadio name="accountType" control={control} label="" options={[{label: "tourist", value: "tourist"}, { label:"guide", value: "guide" }]}/>
      <RequireLabel required>Name</RequireLabel>
      <FormInputText name="name" control={control} label="Name"/>
      <RequireLabel required>Surname</RequireLabel>
      <FormInputText name="surname" control={control} label="Surname"/>
      <RequireLabel required>Citizen ID</RequireLabel>
      <FormInputText name="citizenId" control={control} label="Citizen ID"/>
      {watchAccountType==="guide" && 
        <>
          <RequireLabel required>Guide License ID</RequireLabel>
          <FormInputText name="guideLicenseId" control={control} label="License ID"/>
        </>
      }
      <RequireLabel required>Phone number</RequireLabel>
      <FormInputText name="phoneNumber" control={control} label="Phone number"/>
      <RequireLabel required>Email</RequireLabel>
      <FormInputText name="email" control={control} label="Email"/>
      <RequireLabel required>Password</RequireLabel>
      <FormInputPassword name="password" control={control} label="Password" showPassword={showPassword} handleClickShowPassword={handleClickShowPassword} handleMouseDownPassword={handleMouseDownPassword} />
      <RequireLabel required>Confirm Password</RequireLabel>
      <FormInputPassword name="confirmPassword" control={control} label="Password" showPassword={showConfirmPassword} handleClickShowPassword={handleClickShowConfirmPassword} handleMouseDownPassword={handleMouseDownPassword} />
      <PrimaryButton style={{alignSelf:"center"}} type="submit" variant="contained" >Sign Up </PrimaryButton>
      <div style={{alignSelf:"center", fontSize:"0.8rem", marginTop:"0.5rem"}}>
        <label>Already have an account? </label>
        <Link href="/login" style={{textDecoration:"none", color:COLOR.primary}}>Log in</Link>
      </div>
    </form>
  );
};

export default registerForm;