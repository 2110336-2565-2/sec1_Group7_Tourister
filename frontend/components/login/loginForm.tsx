"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "@mui/material";
import Link from "next/link";
import { COLOR } from "@/theme/globalTheme";
import { userLogin } from "@/services/userService";
import { validationSchema, FormData, defaultValues } from "./loginSchema";
import { FormInputMail } from "@/components/formInput/FormInputMail";
import { FormInputPassword } from "@/components/formInput/FormInputPassword";
import { FormInputRadio } from "@/components/formInput/FormInputRadio";
import styled from "styled-components";

const Title = styled.h3`
  font-size: 1.2em;
  text-align: center;
  font-weight: bold;
`;

const FieldName = styled.label`
  font-size: 0.8em;
`

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
    <form
      style={{
        display: "flex",
        flexDirection: "column",
        margin: "0.0rem",
        paddingLeft: "60px",
        paddingRight: "60px",
        gap: "0.3rem",
        backgroundColor: "white",
        borderTopLeftRadius: "2.5rem",
        borderTopRightRadius: "2.5rem"
      }}
      onSubmit={handleSubmit(onSubmit)}
    >
      <Title style={{alignSelf: "center"}}>LOG IN</Title>
      <FieldName>Choose Account Type</FieldName>
      <FormInputRadio
        name="accountType"
        control={control}
        label=""
        options={[
          { label: "tourist", value: "tourist" },
          { label: "guide", value: "guide" },
        ]}
      />
      <FieldName>Email</FieldName>
      <FormInputMail name="email" control={control} label="Email" />
      <FieldName>Password</FieldName>
      <FormInputPassword
        name="password"
        control={control}
        label="Password"
        showPassword={showPassword}
        handleClickShowPassword={handleClickShowPassword}
        handleMouseDownPassword={handleMouseDownPassword}
      />
      <Button style={{ alignSelf: "center" }} type="submit" variant="contained">
        Login
      </Button>
      <div
        style={{ alignSelf: "center", fontSize: "0.8rem", marginTop: "0.5rem" }}
      >
        <label>Don&apos;t have an account? </label>
        <Link
          href="/register"
          style={{ textDecoration: "none", color: COLOR.primary }}
        >
          Create Now
        </Link>
      </div>
    </form>
  );
};

export default LoginForm;
