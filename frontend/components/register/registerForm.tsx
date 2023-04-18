import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup"
import Link from 'next/link';

import { validationSchema, FormData, defaultValues} from "./registerSchema";
import { registerUser } from "@/services/userService";
import { UserInterface } from "@/interfaces/UserInterface";
import { FormInputText } from "@/components/formInput/FormInputText";
import { FormInputHiddenText } from "@/components/formInput/FormInputHiddenText";
import { COLOR } from "@/theme/globalTheme";
import { PrimaryButton, RequireFormLabel } from "@/css/styling";
import { FormInputAccountType } from "../formInput/FormInputAccountType";
import { Form, FieldName, Field } from "@/css/layout";


const RegisterForm = () => {
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
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Field>
      <FieldName>Choose Account Type</FieldName>
      <FormInputAccountType name="accountType" control={control} label="" options={[{label: "tourist", value: "tourist"}, { label:"guide", value: "guide" }]}/>
      </Field>
      <Field>
      <RequireFormLabel className="AsteriskRequired">Name</RequireFormLabel>
      <FormInputText name="name" control={control} label="Name"/>
      </Field>
      <Field>
      <RequireFormLabel className="AsteriskRequired">Surname</RequireFormLabel>
      <FormInputText name="surname" control={control} label="Surname"/>
      </Field>
      <Field>
      <RequireFormLabel className="AsteriskRequired">Citizen ID</RequireFormLabel>
      <FormInputText name="citizenId" control={control} label="Citizen ID"/>
      </Field>
      {watchAccountType==="guide" && 
        <>
          <Field>
          <RequireFormLabel className="AsteriskRequired">Guide License ID</RequireFormLabel>
          <FormInputText name="guideLicenseId" control={control} label="License ID"/>
          </Field>
        </>
      }
      <Field>
      <RequireFormLabel className="AsteriskRequired">Phone number</RequireFormLabel>
      <FormInputText name="phoneNumber" control={control} label="Phone number"/>
      </Field>
      <Field>
      <RequireFormLabel className="AsteriskRequired">Email</RequireFormLabel>
      <FormInputText name="email" control={control} label="Email"/>
      </Field>
      <Field>
      <RequireFormLabel className="AsteriskRequired">Password</RequireFormLabel>
      <FormInputHiddenText name="password" control={control} label="Password" showPassword={showPassword} handleClickShowPassword={handleClickShowPassword} handleMouseDownPassword={handleMouseDownPassword} />
      </Field>
      <Field>
      <RequireFormLabel className="AsteriskRequired">Confirm Password</RequireFormLabel>
      <FormInputHiddenText name="confirmPassword" control={control} label="Confirm Password" showPassword={showConfirmPassword} handleClickShowPassword={handleClickShowConfirmPassword} handleMouseDownPassword={handleMouseDownPassword} />
      </Field>
      <PrimaryButton style={{ alignSelf: "center", width: "100%", margin: "0" }}
        type="submit"
        variant="contained"
      >
        Sign Up 
      </PrimaryButton>
      <div style={{alignSelf:"center", fontSize:"0.8rem", marginTop:"0.5rem"}}>
        <label>Already have an account? </label>
        <Link href="/login" style={{textDecoration:"none", color:COLOR.primary}}>Log in</Link>
      </div>
    </Form>
  );
};

export default RegisterForm;