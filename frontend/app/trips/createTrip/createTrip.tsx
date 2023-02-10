"use client";

import { useState, MouseEvent } from "react";
import Link from 'next/link';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup";
import { nanoid } from "nanoid";
import Attraction from "./attraction";
var ReactDOM = require('react-dom');

type FormData = {
  accountType: accountType;
  name: string;
  start: Date;
  startTime: string;
  end: Date;
  endTime: string;
  price: string;
  groupSize: string;
  language: string;
  attractionsList: any[];
  nameOfStartLocation: string;
  informationOfStartLocation: string;
  nameOfEndLocation: string;
  informationOfEndLocation: string;
  information: string;
}
type accountType = 'tourist' | 'guide';
const validationSchema = yup.object().shape({
  name: yup.string().required("Please enter your trip name"),
  start: yup.date().required('Please enter your start date'),
  startTime: yup.string().required('Please enter your start time'),
  end: yup.date().required('Please enter your end date'),
  endTime: yup.string().required('Please enter your end time'),
  price: yup.string().required('Please enter your price')
  .matches(/^[0-9]+$/, "Price must be only digits"),
  groupSize: yup.string().required('Please enter your group size')
  .matches(/^[0-9]+$/, "Group size must be only digits"),
  language: yup.string().required('Please enter your trip language'),
  information: yup.string(),
  nameOfStartLocation: yup.string().required('Please enter your trip start location'),
  informationOfStartLocation: yup.string(),
  nameOfEndLocation: yup.string().required('Please enter your trip end location'),
  informationOfEndLocation: yup.string()
});

const createTrip = () => {
  const [locationNumber, setLocationNumber] = useState(0);
  const [attractions,setAttractions] = useState([{
    "id": "01",
    "name": "",
    "option": "Addmission not needed",
    "editing": true,
    "error": false
  }]);

  const onSubmit = (data : FormData) => {
    console.log(data);
  }
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>({
    resolver: yupResolver(validationSchema),
  });

  const handleAdd = ()=>{
    const newAttraction = {
      id: nanoid(),
      name: "",
      option: "Admission not needed",
      editing: true,
      error: false
    }
    const newAttractions = [...attractions, newAttraction]
    setAttractions(newAttractions)
  }
  const handleDelete = (id:string)=>{
    const newAttractions = [...attractions]
    const index = attractions.findIndex((attraction)=>attraction.id===id)
    newAttractions.splice(index,1)
    setAttractions(newAttractions)
  }

  return (
    <form style={{display:'flex', alignItems: 'center',flexDirection:'column'}}onSubmit={handleSubmit(onSubmit)}>
      {/* <Link href="../register" passHref><button type="button" onClick={handleBackButton}>Back</button></Link> */}
        <Link href="./manage_account" passHref><button type="button">Back</button></Link>
        <label>Profile</label>
        <label>Trip Name</label>
        <input
          type="text"
          placeholder="Name"
          {...register("name")}
        />
        {errors.name && <p className="errorMsg">{errors.name.message}</p>}
        <label>Duration</label>
        <label>Start</label>
        <div>
        <input
          type="Date"
          {...register("start")}
        />
        {errors.start && <p className="errorMsg">{errors.start.message}</p>}
        <input
          type="Time"
          {...register("startTime")}
        />
        {errors.startTime && <p className="errorMsg">{errors.startTime.message}</p>}
        </div>
        <label>End</label>
        <div>
        <input
          type="Date"
          {...register("end")}
        />
        {errors.end && <p className="errorMsg">{errors.end.message}</p>}
        <input
          type="Time"
          {...register("endTime")}
        />
        {errors.endTime && <p className="errorMsg">{errors.endTime.message}</p>}
        </div>
        <label>Price:Baht</label>
        <input
          type="guideLicenseID"
          placeholder="Price in Baht Unit"
          {...register("price")}
        />
        {errors.price && <p className="errorMsg">{errors.price.message}</p>}
        <label>Group Size</label>
        <input
          type="text"
          placeholder="Number of participant(s)"
          {...register("groupSize")}
        />
        {errors.groupSize && <p className="errorMsg">{errors.groupSize.message}</p>}
        <label>Language</label>
        <input
          type="text"
          placeholder="Thai/English/Spanish"
          {...register("language")}
        />
        {errors.language && <p className="errorMsg">{errors.language.message}</p>}
        <div>
          <input
            type="Time"
            readOnly = {true}
            value = {watch('startTime')}
          />
          <label>Departure</label>
        </div>
        <div>
          <label>Location :</label>
          <input
            type="text"
            placeholder="Name of Location"
            {...register("nameOfStartLocation")}
          />
          {errors.nameOfStartLocation && <p className="errorMsg">{errors.nameOfStartLocation.message}</p>}
          <input
            type="text"
            placeholder="information"
            {...register("informationOfStartLocation")}
          />
          {errors.informationOfStartLocation && <p className="errorMsg">{errors.informationOfStartLocation.message}</p>}
        </div>
      {attractions.map((att)=>(<Attraction id={att.id} handleDelete={handleDelete}/>))}
        <button type="button" onClick= {() => handleAdd()}>Add</button>
      <div>
        <input
          type="Time"
          readOnly = {true}
          value = {watch('endTime')}
        />
        <label>Return</label>
      </div>
      
      <div>
        <label>Location :</label>
        <input
          type="text"
          placeholder="Name of Location"
          {...register("nameOfEndLocation")}
        />
        {errors.nameOfEndLocation && <p className="errorMsg">{errors.nameOfEndLocation.message}</p>}
        <input
          type="text"
          placeholder="information"
          {...register("informationOfEndLocation")}
        />
        {errors.informationOfEndLocation && <p className="errorMsg">{errors.informationOfEndLocation.message}</p>}
      </div>
      <label>Additional Information</label>
      <input
        type="text"
        placeholder="More Information..."
        {...register("information")}
      />
      {errors.information && <p className="errorMsg">{errors.information.message}</p>}
      <button type="submit">Publish</button>
    </form>
  );
};

export default createTrip;