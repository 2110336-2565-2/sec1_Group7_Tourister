import { TextField } from "@mui/material";
import { useEffect, useState, useReducer } from "react";
import { useQuery } from "@tanstack/react-query";

import Searching from "@/components/search/searchForm";
import UserNavBar from "@/components/layout/userNavBar";
import { ProgramCardForUser } from "@/components/program/ProgramCardForTourist";

import { getAllPrograms } from "@/services/programService";

import { ProgramInterface } from "@/interfaces/ProgramInterface"
import { ProgramFilterInterface } from "@/interfaces/filter/ProgramFilterInterface"

export default function Page() {
  const { data:programResponse, refetch, isLoading, isError, error } = useQuery({
    queryKey: ['searchPrograms'], 
    queryFn: ()=>getAllPrograms()
  })
  const programs = programResponse?.data;
  console.log(programs);

  return (
    <>
    <UserNavBar/>
    {/* <h1>Searching</h1> */}
    <Searching/>
    {/* <button onClick={()=>{
      dispatch({type:"set", payload:{
        field:"minPrice",
        value:"999"
      }})
    }}>set</button>
    <button onClick={()=>{
      dispatch({type:"unset", payload:{
        field:"minPrice",
        value:""
      }})
    }}>unset</button> */}
    {/* <TextField
      size="small"
      onChange={(e)=>setSearchValue(e.target.value)}
      value={searchValue}
      fullWidth
      label="Ready to find your perfect trips?"
      variant="outlined"
    /> */}
    {programs?.map((program:ProgramInterface)=>{
      return <ProgramCardForUser program={program}/>
    })}
    </>
  );
} 
  