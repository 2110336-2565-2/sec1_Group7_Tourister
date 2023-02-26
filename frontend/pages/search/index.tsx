import { TextField } from "@mui/material";
import { useEffect, useState, useReducer } from "react";
import { useQuery } from "@tanstack/react-query";
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

import Searching from "@/components/search/searchForm";
import NavBar from "@/components/layout/navBar";
import { AuthProvider } from "@/components/AuthProvider";
import UserNavBar from "@/components/layout/userNavBar";
import { ProgramCardForUser } from "@/components/program/ProgramCardForTourist";

import { getAllPrograms } from "@/services/programService";

import { ProgramInterface } from "@/interfaces/ProgramInterface"
import { ProgramFilterInterface } from "@/interfaces/filter/ProgramFilterInterface";

export default function Page() {
  const [programFilter, setProgramFilter] = useState<ProgramFilterInterface>({})
  const { data:programResponse, refetch, isLoading, isError, error } = useQuery({
    queryKey: ['searchPrograms', programFilter],
    queryFn: ()=>getAllPrograms(programFilter)
  })
  const programs = programResponse?.data;
  console.log(programs);

  return (
    <AuthProvider role="tourist">
      <LocalizationProvider dateAdapter={AdapterMoment}>
        <NavBar/>
        <Searching setProgramFilter={setProgramFilter}/>
        {programs?.map((program:ProgramInterface)=>{
          return <ProgramCardForUser program={program}/>
        })}
      </LocalizationProvider>
    </AuthProvider>
  );
} 
  