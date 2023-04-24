import { useState, useEffect, MouseEvent, Fragment, ChangeEvent } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { FormInputText } from "@/components/formInput/FormInputText";
import { getUserById, updateUserById, uploadProfilePic } from "@/services/userService";
import { UserInterface } from "@/interfaces/UserInterface";
import axios from "axios";

import { PrimaryButton } from "@/css/styling";
import { COLOR } from "@/theme/globalTheme";
import styled from "styled-components";
import NavigateBeforeOutlinedIcon from "@mui/icons-material/NavigateBeforeOutlined";
import { FieldName } from "@/css/layout";

import AddPhotoAlternateRoundedIcon from "@mui/icons-material/AddPhotoAlternateRounded";
import { Avatar } from "@mui/material";
import { flushSync } from "react-dom";

import Swal from "sweetalert2";

const API_URL = "http://localhost:2000/api/program";
type FormData = {
  // accountType: accountType;
  name: string;
  surname: string;
  email: string;
  phoneNumber: string;
  licenseId?: string;
  profilePic?: string;
};
type accountType = "tourist" | "guide";
const validationSchema = yup.object().shape({
  // accountType: yup
  //   .string()
  //   .required("Please choose your account type"),
  name: yup.string().required("Please enter your name"),
  surname: yup.string().required("Please enter your surname"),
  phoneNumber: yup
    .string()
    .required("Please enter the phone number")
    .matches(/^[0-9]+$/, "Phone number must be only digits")
    .min(9, "Please enter the valid phone number")
    .max(10, "Please enter the valid phone number"),
  });
  
const defaultValues = {
  name: "",
  surname: "",
  phoneNumber: "",
  licenseId: "",
  email: "",
  profilePic: ""
};

const EditProfile = () => {
  const [user, setUser] = useState<UserInterface | null>(null)
  const [previewImg, setPreviewImg] = useState<string>();
  
  const {
    register,
    control,
    setValue,
    getValues,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<FormData>({
    resolver: yupResolver(validationSchema),
    defaultValues: defaultValues
  });

  useEffect(()=>{
    setUser(JSON.parse(localStorage.getItem('user')||""));
  },[])

  useEffect(()=>{
    if(user){
      reset({
        name: user.name,
        surname: user.surname,
        phoneNumber: user.phoneNumber,
        licenseId: user.licenseId,
        email: user.email,
        profilePic: user.profilePic,
      });
    }
  },[user])


  // function uploadCompressedImage(imgToCompress: string, maxWidth: number, maxHeight: number, quality: number) {
  //   const canvas = document.createElement("canvas");
  //   const context = canvas.getContext("2d");

  //   const img = new Image();
  //   img.src = imgToCompress;

  //   img.addEventListener('load', function() {
  //     const originalWidth = img.width;
  //     const originalHeight = img.height;

  //     const resizingFactor = Math.min(1, Math.min(maxWidth / originalWidth, maxHeight / originalHeight))

  //     canvas.width = originalWidth * resizingFactor
  //     canvas.height = originalHeight * resizingFactor

  //     context!.drawImage(
  //       img,
  //       0,
  //       0,
  //       originalWidth * resizingFactor,
  //       originalHeight * resizingFactor
  //     );

  //     // Reducing the quality of the image
  //     canvas.toBlob(
  //       (blob) => {
  //         if (blob) {
  //           const reader = new FileReader();
  //           reader.onload = async () => {
  //             const contents = reader.result;
  //             if (typeof contents === 'string') {
  //               // setFile(btoa(contents)); // Set image here
                
  //               setValue("image", btoa(contents));
  //               setPreviewImg(btoa(contents));
  //               if (user?._id != null)
  //                 console.log(await updateUserById(user._id, { image: btoa(contents) }));

  //               if (user?._id) {
  //                 const response = await getUserById(user._id);
  //                 console.log(response.data);
  //                 localStorage.setItem("user", JSON.stringify(response.data));
  //               }
  //             }
  //           };
  //           reader.readAsBinaryString(blob);
  //         }
  //       },
  //       "image/jpeg",
  //       quality
  //     );
  //   });
  // }
  function handleFileUpload(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    uploadProfilePic(user?._id ?? '', file)
    .then((res) => {
      console.log(res);
      localStorage.setItem("user", JSON.stringify(res.data));
      setUser(res.data!);
    })

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result;
      if (typeof result === "string") {
        console.log('upload profilleee')
        //uploadCompressedImage(result,150,150,0.5)
      }
    };
    reader.readAsDataURL(file);
  }

  const onSubmit = async (data: FormData) => {
    console.log(data);
    try{
      if (user?._id != null) console.log(await updateUserById(user._id, data));
  
      if (user?._id) {
        const response = await getUserById(user._id);
        console.log(response.data);
        localStorage.setItem("user", JSON.stringify(response.data));
      }
      Swal.fire({
        text: "Profile edited!",
        icon: "success",
        timer: 2000,
      });
    } catch(err:any){
      console.log(err)
      Swal.fire({
        text: err.message,
        icon: "error",
        timer: 2000,
      });
    }
  };

  return (
    <form
      style={{ display: "flex", alignItems: "center", flexDirection: "column" }}
      onSubmit={handleSubmit(onSubmit)}
    >
      {/* <Link href="../register" passHref><button type="button" onClick={handleBackButton}>Back</button></Link> */}
      {/* <Link href="/manage_account" passHref><button type="button">Back</button></Link> */}

      <div
        style={{
          marginTop: "5rem",
          marginBottom: "1rem",
          width: "100%",
          height: "4rem",
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-start",
          alignItems: "center",
        }}
      >
        <Link href="/manage_account" style={{ width: "20%" }} passHref>
          <button
            type="button"
            style={{
              width: "100%",
              height: "4rem",
              background: "none",
              border: "none",
              padding: 0,
            }}
          >
            <NavigateBeforeOutlinedIcon
              style={{ fontSize: "2.5rem", color: "gray" }}
            />
          </button>
        </Link>
        <h3 style={{ width: "60%", textAlign: "center", fontSize: "1.5rem" }}>
          Profile
        </h3>
      </div>

      <div
        style={{
          width: "8rem",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Avatar
          style={{
            width: "7rem",
            height: "7rem",
            borderRadius: "50%",
            zIndex: 1,
            boxShadow: `0.1rem 0.1rem 1rem 0.2rem rgba(0,0,0,0.25)`,
          }}
          src={user?.profilePic}
          alt="mock-img"
        />
        {/* <img
          src={`data:image/png;base64,${getValues("image")}`}
          alt="mock-img"
          style={{
            width: "7rem",
            height: "7rem",
            padding: "0px 0px",
            borderRadius: "50%",
          }}
        /> */}
        {/* <input type="file" onChange={handleFileUpload} /> */}
        <input
          type="file"
          id="upload-button"
          style={{ display: "none" }}
          onChange={handleFileUpload}
        />
        <label
          style={{
            alignSelf: "flex-end",
            textAlign: "end",
            width: "3rem",
            height: "3rem",
            background: "transparent",
            borderRadius: "50%",
            marginTop: "-1.75rem",
            zIndex: 10,
          }}
          htmlFor="upload-button"
        >
          <AddPhotoAlternateRoundedIcon
            style={{
              width: "2.5rem",
              height: "2.55rem",
              borderRadius: "0.75rem",
              background: "white",
              color: COLOR.primary,
              fontSize: "2.5rem",
            }}
          />
        </label>
      </div>

      {/* <div style={{width:"6rem",height:"6rem",marginBottom:"2rem"}}>
          <img
            src={`data:image/png;base64,${getValues("image")}`}
            alt="mock-img"
            style={{
              width: "100px",
              height: "100px",
              padding: "0px 0px",
              alignSelf:"center",
              borderRadius: "50%",
            }}
          />

        <input type="file" id="upload-button"style={{display:"none"}} onChange={handleFileUpload}/>
        <label htmlFor="upload-button">
          <AddPhotoAlternateIcon style={{color:COLOR.primary,fontSize:"2rem"}}/>
        </label>
      </div> */}

      <div style={{ display: "grid", width: "80%", justifyContent: "center" }}>
        <FieldName
          style={{
            alignSelf: "flex-start",
            marginTop: "1rem",
            marginBottom: "0.5rem",
          }}
        >
          Name
        </FieldName>
        <FormInputText name="name" control={control} label="Name" />
        <FieldName
          style={{
            alignSelf: "flex-start",
            marginTop: "1rem",
            marginBottom: "0.5rem",
          }}
        >
          Surname
        </FieldName>
        <FormInputText name="surname" control={control} label="Surname" />
        {user?.isGuide ? (
          <Fragment>
            <FieldName
              style={{
                color: "rgba(0,0,0,1)",
                alignSelf: "flex-start",
                marginTop: "1rem",
                marginBottom: "0.5rem",
              }}
            >
              Guide License ID
            </FieldName>
            <div style={{ backgroundColor: "rgba(0,0,0,0.15)" }}>
              <FormInputText
                name="licenseId"
                control={control}
                label="License ID"
                readonly={true}
              />
            </div>
          </Fragment>
        ) : (
          <Fragment></Fragment>
        )}
        <FieldName
          style={{
            alignSelf: "flex-start",
            marginTop: "1rem",
            marginBottom: "0.5rem",
          }}
        >
          Phone number
        </FieldName>
        <FormInputText
          name="phoneNumber"
          control={control}
          label="Phone number"
        />
        <FieldName
          style={{
            color: "rgba(0,0,0,1)",
            alignSelf: "flex-start",
            marginTop: "1rem",
            marginBottom: "0.5rem",
          }}
        >
          Email
        </FieldName>
        <div style={{ backgroundColor: "rgba(0,0,0,0.15)" }}>
          <FormInputText
            name="email"
            control={control}
            label="Email"
            readonly={true}
          />
        </div>
        <PrimaryButton
          style={{ alignSelf: "center", marginTop: "3rem" }}
          type="submit"
          variant="contained"
        >
          UPDATE
        </PrimaryButton>
      </div>
      {/* <button type="submit">Update</button> */}
    </form>
  );
};

export default EditProfile;
