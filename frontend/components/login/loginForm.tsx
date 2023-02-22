"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Link from "next/link";
import { COLOR } from "@/theme/globalTheme";
import { userLogin } from "@/services/userService";
import { validationSchema, FormData, defaultValues } from "./loginSchema";
import { FormInputMail } from "@/components/formInput/FormInputMail";
import { FormInputPassword } from "@/components/formInput/FormInputPassword";
import { PrimaryButton } from "@/css/styling";
import { FormInputAccountType } from "../formInput/FormInputAccountType";
import { Form, Title, Field, FieldName } from "@/css/layout";


const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword((password) => !password);
  };
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(validationSchema),
    defaultValues: defaultValues,
  });

  const onSubmit = (data: FormData) => {
    // console.log(data);
    userLogin(data.email, data.password);
  };
  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Title style={{alignSelf: "center"}}>LOG IN</Title>
      <Field>
        <FieldName>Choose Account Type</FieldName>
        <FormInputAccountType
          name="accountType"
          control={control}
          label=""
          options={[
            { label: "tourist", value: "tourist" },
            { label: "guide", value: "guide" },
          ]}
        />
      </Field>
      <Field>
        <FieldName>Email</FieldName>
        <FormInputMail name="email" control={control} label="Email" />
      </Field>
      <Field>
        <FieldName>Password</FieldName>
        <FormInputPassword
          name="password"
          control={control}
          label="Password"
          showPassword={showPassword}
          handleClickShowPassword={handleClickShowPassword}
          handleMouseDownPassword={handleMouseDownPassword}
        />
      </Field>
      <PrimaryButton style={{ alignSelf: "center", width: "100%", margin: "0" }} type="submit" variant="contained">
        Log in
      </PrimaryButton>
      <div
        style={{ alignSelf: "center", fontSize: "0.8rem", marginTop: "0.5rem" }}
      >
        <label style={{ color: "gray"}}>Don&apos;t have an account? </label>
        <Link
          href="/register"
          style={{ textDecoration: "none", color: COLOR.primary }}
        >
          Create Now
        </Link>
      </div>
    </Form>
  );
};

export default LoginForm;