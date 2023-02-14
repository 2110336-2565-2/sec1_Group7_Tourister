"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "@mui/material";

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
    console.log(data);
  };

  return (
    <form
      style={{ display: "flex", alignItems: "center", flexDirection: "column" }}
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
      <Button type="submit" variant="contained">
        Login
      </Button>
    </form>
  );
};

export default LoginForm;
