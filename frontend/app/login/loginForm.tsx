"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup";
import {Typography} from '@mui/material';

type FormData = {
  accountType: accountType;
  email: string;
  password: string;
}

type accountType = 'tourist' | 'guide';

const validationSchema = yup.object().shape({
  accountType: yup
    .string()
    .required("Please choose your account type"),
  email: yup
    .string()
    .required("Please enter email"),
  password: yup
    .string()
    .required("Please enter password")
});


const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>({
    resolver: yupResolver(validationSchema),
  });
  const watchAccountType = watch("accountType");

  const onSubmit = (data : FormData) => {
    console.log(data);
  }

  return (
    <form style={{display:'flex', alignItems: 'center',flexDirection:'column'}} onSubmit={handleSubmit(onSubmit)}>
      <div>
         <label>
          <input 
            type="radio"
            value="tourist"
            {...register('accountType')}
          />
          Tourist
        </label>
        <label>
          <input
            type="radio"
            value="guide"
            {...register('accountType')}
          />
          Guide
        </label>
      </div>
      <label>Email</label>
      <input
        type="email"
        placeholder="Email"
        {...register("email")}
      />
      {errors.email && <p className="errorMsg">{errors.email.message}</p>}
      <label>Password</label>
      <div>
        <input
          type={showPassword ? 'text' : 'password'}
          placeholder="Password"
          {...register("password")}
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? 'Hide' : 'Show'} Password
        </button>
      </div>
      {errors.password && <p className="errorMsg">{errors.password.message}</p>}
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginForm;