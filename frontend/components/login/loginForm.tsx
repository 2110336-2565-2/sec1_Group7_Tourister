"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";

import { COLOR } from "@/theme/globalTheme";
import { userLogin } from "@/services/userService";
import { validationSchema, FormData, defaultValues } from "./loginSchema";
import { FormInputText } from "@/components/formInput/FormInputText";
import { FormInputPassword } from "@/components/formInput/FormInputPassword";
import { FormInputRadio } from "@/components/formInput/FormInputRadio";

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
  const router = useRouter();
  const onSubmit = async (data: FormData) => {
    try {
      const response = await userLogin(data.email, data.password);
      console.log(response.data);
      localStorage.setItem("user", JSON.stringify(response.data));
      console.log(localStorage.getItem("user"));
      if (data.accountType === "guide") {
        router.push("/trips");
      } else {
        router.push("/search");
      }
    } catch (error) {
      console.log(error);
      window.alert(error);
    }
  };

  return (
<<<<<<< HEAD
<<<<<<< Updated upstream
    <form
=======
    <Form
>>>>>>> Stashed changes
      style={{
=======
    <Form style={{
>>>>>>> dev
        display: "flex",
        alignItems: "flex-start",
        flexDirection: "column",
        margin: "0.8rem",
        gap: "0.3rem",
      }}
<<<<<<< HEAD
      onSubmit={handleSubmit(onSubmit)}
    >
      <h2>LOG IN</h2>
      <h4>Choose Account Type</h4>
      <FormInputRadio
        name="accountType"
        control={control}
        label=""
        options={[
          { label: "tourist", value: "tourist" },
          { label: "guide", value: "guide" },
        ]}
      />
      <label>Email</label>
      <FormInputText name="email" control={control} label="Email" />
      <label>Password</label>
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
=======
      onSubmit={handleSubmit(onSubmit)}>
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
>>>>>>> dev
      <div
        style={{ alignSelf: "center", fontSize: "0.8rem", marginTop: "0.5rem" }}
      >
        <label>Don't have an account? </label>
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
