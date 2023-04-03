import { Avatar, TextField, CircularProgress } from "@mui/material";
import { useEffect, useState, useReducer } from "react";
import { useQuery } from "@tanstack/react-query";
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import styled from "styled-components";
import Image from 'next/image';

import { COLOR } from "@/theme/globalTheme"

import tourist from "@/images/tourist.png";

import Searching from "@/components/search/searchForm";
import NavBar from "@/components/layout/navBar";
import { AuthProvider } from "@/components/AuthProvider";
import UserNavBar from "@/components/layout/userNavBar";
import { ProgramCardForTourist } from "@/components/program/ProgramCardForTourist";

import { getAllPrograms } from "@/services/programService";

import { ProgramInterface } from "@/interfaces/ProgramInterface"
import { ProgramFilterInterface } from "@/interfaces/filter/ProgramFilterInterface";
import { UserInterface } from "@/interfaces/UserInterface";
import { isDateTimeInThePass } from "@/utils/Utils";

const Heading = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 5rem 2.5rem;
  background-color: ${COLOR.background};
  border-radius: 0 0 2rem 2rem;
  color: white;
`

export default function Page() {
  const [programFilter, setProgramFilter] = useState<ProgramFilterInterface|undefined>(undefined)
  const [user, setUser] = useState<UserInterface | null>(null)

  useEffect(()=>{
    setUser(JSON.parse(localStorage.getItem('user')||""));
  },[])

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
        <Heading>
          <Avatar 
            style={{ marginRight: "1rem" ,width:"70px",height:"70px"}}
            src={`data:image/png;base64,${user?.image}`}
          />
          {/* <Image 
            style={{ marginRight: "1rem" }}
            alt = "tourist" 
            src={tourist} 
            width={70} 
            height={70} 
          /> */}
          <div style={{margin: "auto 0"}}>
            <div style={{marginBottom:"0.2rem", fontSize:"0.8rem"}}>Welcome,</div>
            <h3 style={{margin:"0", overflowWrap:"break-word", fontSize:"1.4rem"}}>{user?.name} {user?.surname}</h3>
          </div>
        </Heading>
        <Searching setProgramFilter={setProgramFilter}/>
        {
          isLoading 
          ? <div style={{display:"flex", justifyContent:"center"}}>
              <CircularProgress/>
            </div>
          : programs?.map((program:ProgramInterface)=>{
            if(isDateTimeInThePass(program.startDate, program.startTime))return;
            return <ProgramCardForTourist key={program._id} program={program}/>
            })
        }
      </LocalizationProvider>
    </AuthProvider>
  );
} 
  