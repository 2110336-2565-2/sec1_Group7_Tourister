import { TextField } from "@mui/material";
import { useEffect, useState, useReducer } from "react";
import { useQuery } from "@tanstack/react-query";

import Searching from "@/components/search/searchForm";
import NavBar from "@/components/layout/navBar";
import { AuthProvider } from "@/components/AuthProvider";
import UserNavBar from "@/components/layout/userNavBar";
import { ProgramCardForUser } from "@/components/program/ProgramCardForTourist";

import { getAllPrograms } from "@/services/programService";

import { ProgramInterface } from "@/interfaces/ProgramInterface"

export default function Page() {
  const { data:programResponse, refetch, isLoading, isError, error } = useQuery({
    queryKey: ['searchPrograms'], 
    queryFn: ()=>getAllPrograms()
  })
  const programs = programResponse?.data;
  console.log(programs);

  return (
    <AuthProvider role="tourist">
    <>
    <NavBar/>
    {/* <h1>Searching</h1> */}
    <Searching/>
    {programs?.map((program:ProgramInterface)=>{
      return <ProgramCardForUser program={program}/>
    })}
    </>
    </AuthProvider>
  );
} 
  