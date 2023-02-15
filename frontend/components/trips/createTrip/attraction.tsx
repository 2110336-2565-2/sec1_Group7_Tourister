"use client";

import { useState, MouseEvent, Fragment } from "react";
// import { useForm,useFieldArray } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup"
// import * as yup from "yup";
import { FormInputText } from "@/components/formInput/FormInputText";


// type FormData = {
//   name:string;
//   option:string;
//   place_imageUrl:string;
// }
// const validationSchema = yup.object().shape({
//   name: yup.string().required("Please enter your trip name"),
// });
// const defaultValues = {
//   option:"Admission not needed",
// }
const attraction = ({id,handleDelete,handleCallback}:{id:string,handleDelete:Function,handleCallback:Function}) => {
  const [name,setName] = useState("");
  const [editing, setEditing] = useState(true);
  const [option,setOption] = useState("Admission not needed")
  const [error,setError] = useState(false);
  const [file,setFile] = useState<File | string>();
  // const [place_imageUrl,setFile] = useState("");
  
  // const onSubmit = async (data : FormData) => {
  //   handleCallback(id,data.name,data.option,data.place_imageUrl)
  // }
  // const {
  //   register,
  //   watch,
  //   control,
  //   getValues,
  //   handleSubmit,
  //   formState: { errors }
  // } = useForm<FormData>({
  //   resolver: yupResolver(validationSchema),
  //   defaultValues: defaultValues
  // });
  return (
    // <form style={{display:'flex', alignItems: 'center',flexDirection:'column'}}onSubmit={handleSubmit(onSubmit)}>
    <div>
      {/* <a>{id}</a> */}
      {editing===true ? (
        <Fragment>
        <input type="text" placeholder="Name" value={name} onChange={(e)=>setName(e.target.value)}/>
      {/* <FormInputText name="name" control={control} label="Name"/> */}
        {error===true&&editing===true ? <p>Please add a name for the location</p> : <Fragment/>}
        <select onChange={(e)=>setOption(e.target.value)}>
          <option value={option}>{option}</option>
          {option==="Admission not needed" ? <Fragment></Fragment> : <option value="Admission not needed">Admission not needed</option>}
          {option==="Admission included" ? <Fragment></Fragment> : <option value="Admission included">Admission included</option>}
          {option==="Admission not included" ? <Fragment></Fragment> : <option value="Admission not included">Admission not included</option>}
        </select>
        <input type="file" onChange={(e)=>{if(!e.target.files)return;setFile(e.target.files[0])}}></input>
        {/* <input type="text" placeholder="Image URL" value={name} onChange={(e)=>setName(e.target.value)}/> */}
        {/* <FormInputText name="file" control={control} label="Enter Image URL"/> */}
        <button type="button" onClick={()=>{handleDelete(id)}}>delete</button>
        <button type="button" onClick={()=>{
          handleCallback(id,name,option,file)
          if(name==="") {(setError(true))} else {setEditing(false);setError(false)}
        }}>done</button>
        </Fragment>
        ) : (
        <Fragment>
          <a>{name}</a>
          <button type="button" onClick={()=>{setEditing(true)}}>edit</button>
          <a>{option}</a>
        </Fragment>
        )
      }
      {/* </form> */}
    </div>
  );
};

// attraction.defualtProps = {
//   name: ''
// }
export default attraction;