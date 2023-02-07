"use client";

import { useState, MouseEvent } from "react";
import Link from 'next/link';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup";

type FormData = {
  name: string;
  // editing: boolean;
}
// type accountType = 'tourist' | 'guide';
const validationSchema = yup.object().shape({
  name: yup.string(),
});


const attraction = () => {
  const [editing, setEditing] = useState(true);

  const {
    register,
    watch,
    formState: { errors }
  } = useForm<FormData>({
    resolver: yupResolver(validationSchema),
  });

  return (
    <div>
        <input
          type="text"
          placeholder="Name"
          {...register("name")}
        />
        
        {editing===false && 
          <>
            <button type="button" onClick={()=>{setEditing(true)}}>edit</button>
          </>
        }
        {errors.name && <p className="errorMsg">{errors.name.message}</p>}
        <select>
          <option value="Admission not needed"></option>
          <option value="Admission included"></option>
          <option value="Admission not included"></option>
        </select>
        
        {editing===true && 
          <>
          <button type="button" onClick={()=>{(e) => e.stopPropagation()}}>delete</button>
          <button type="button" onClick={()=>{setEditing(false)}}>done</button>
          </>
        }
    </div>
  );
};

// attraction.defualtProps = {
//   name: ''
// }
export default attraction;