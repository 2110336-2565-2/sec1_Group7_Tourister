"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "@mui/material";
import Link from "next/link";
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

  const onSubmit = (data: FormData) => {
    // console.log(data);
    userLogin(data.email, data.password);
  };
  return (
    <form
      style={{
        display: "flex",
        alignItems: "flex-start",
        flexDirection: "column",
        margin: "0.8rem",
        gap: "0.3rem",
      }}
      onSubmit={handleSubmit(onSubmit)}
    >
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
