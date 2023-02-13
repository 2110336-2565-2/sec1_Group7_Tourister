"use client";

import { useState, MouseEvent } from "react";
import Link from 'next/link';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup";
import { nanoid } from "nanoid";
import Attraction from "./attraction";
import axios from 'axios';

var ReactDOM = require('react-dom');
const API_URL = 'http://localhost:2000/api/program'

type FormData = {
  programId:string
  name: string;
  startDate: Date;
  startTime: string;
  endDate: Date;
  endTime: string;
  price: string;
  max_participant: string;
  language: string;
  meetLocation: string;
  descriptionOfMeetLocation: string;
  endLocation: string;
  descriptionOfEndLocation: string;
  description: string;
}
// type accountType = 'tourist' | 'guide';
const validationSchema = yup.object().shape({
  name: yup.string().required("Please enter your trip name"),
  startDate: yup.date().required('Please enter your start date'),
  startTime: yup.string().required('Please enter your start time'),
  endDate: yup.date().required('Please enter your end date'),
  endTime: yup.string().required('Please enter your end time'),
  price: yup.string().required('Please enter your price')
  .matches(/^[0-9]+$/, "Price must be only digits"),
  max_participant: yup.string().required('Please enter your group size')
  .matches(/^[0-9]+$/, "Group size must be only digits"),
  language: yup.string().required('Please enter your trip language'),
  description: yup.string(),
  meetLocation: yup.string().required('Please enter your trip start location'),
  descriptionOfMeetLocation: yup.string(),
  endLocation: yup.string().required('Please enter your trip end location'),
  descriptionOfEndLocation: yup.string()
});

const createTrip = () => {
  const [locationNumber, setLocationNumber] = useState(0);
  const [attractions,setAttractions] = useState([{
    "id": nanoid(),
    "name": "",
    "option": "Addmission not needed",
    "editing": true,
    "error": false
  }]);

  const onSubmit = async (data : FormData) => {
    console.log(data);
    try {
      const response = await axios.post(API_URL,data)
      console.log(response)
    } catch (error) {
      console.log(error)
    }
  }
  const {
    register,
    watch,
    setValue,
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
          {...register("startDate")}
        />
        {errors.startDate && <p className="errorMsg">{errors.startDate.message}</p>}
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
          {...register("endDate")}
        />
        {errors.endDate && <p className="errorMsg">{errors.endDate.message}</p>}
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
          {...register("max_participant")}
        />
        {errors.max_participant && <p className="errorMsg">{errors.max_participant.message}</p>}
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
            {...register("meetLocation")}
          />
          {errors.meetLocation && <p className="errorMsg">{errors.meetLocation.message}</p>}
          <input
            type="text"
            placeholder="information"
            {...register("descriptionOfMeetLocation")}
          />
          {errors.descriptionOfMeetLocation && <p className="errorMsg">{errors.descriptionOfMeetLocation.message}</p>}
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
          {...register("endLocation")}
        />
        {errors.endLocation && <p className="errorMsg">{errors.endLocation.message}</p>}
        <input
          type="text"
          placeholder="information"
          {...register("descriptionOfEndLocation")}
        />
        {errors.descriptionOfEndLocation && <p className="errorMsg">{errors.descriptionOfEndLocation.message}</p>}
      </div>
      <label>Additional Information</label>
      <input
        type="text"
        placeholder="More Information..."
        {...register("description")}
      />
      {errors.description && <p className="errorMsg">{errors.description.message}</p>}
      <button type="submit">Publish</button>
    </form>
  );
};

export default createTrip;