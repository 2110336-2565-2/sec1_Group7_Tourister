"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup"

import { validationSchema, FormData } from "./registerSchema";

const registerForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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
      <label>Name</label>
      <input
        type="text"
        placeholder="Name"
        {...register("name")}
      />
      {errors.name && <p className="errorMsg">{errors.name.message}</p>}
      <label>Surname</label>
      <input
        type="text"
        placeholder="Surname"
        {...register("surname")}
      />
      {errors.surname && <p className="errorMsg">{errors.surname.message}</p>}
      <label>Citizen ID</label>
      <input
        type="text"
        placeholder="Citizen Number"
        {...register("citizenId")}
      />
      {errors.citizenId && <p className="errorMsg">{errors.citizenId.message}</p>}
      {watchAccountType==="guide" && 
        <>
          <label>Guide License ID</label>
          <input
            type="text"
            placeholder="License Number"
            {...register("guideLicenseId")}
          />
          <p>*optional</p>
        </>
      }
      <label>Phone number</label>
      <input
        type="text"
        placeholder="Phone Number"
        {...register("phoneNumber")}
      />
      {errors.phoneNumber && <p className="errorMsg">{errors.phoneNumber.message}</p>}
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
      <label>Confirm Password</label>
      <div>
        <input
          type={showConfirmPassword ? 'text' : 'password'}
          placeholder="Password"
          {...register("confirmPassword")}
        />
        <button
          type="button"
          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
        >
          {showConfirmPassword ? 'Hide' : 'Show'} Password
        </button>
      </div>
      {errors.confirmPassword && <p className="errorMsg">{errors.confirmPassword.message}</p>}
      <button type="submit">Sign Up</button>
    </form>
  );
};

export default registerForm;