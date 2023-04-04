import { useQuery } from "@tanstack/react-query";
import Link from "next/link";

import styled from "styled-components";
import { COLOR } from "@/theme/globalTheme";

import { Button } from "@mui/material";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

import { AuthProvider } from "@/components/AuthProvider";

import { BookingProgramList } from "@/components/booking/BookingProgramList";
import { NotificationProvider } from "@/components/notification/NotificationProvider";

const BackButton = styled(Button)`
  display:"flex";
  flex-direction:"row";
  justify-content:"center";
  align-items:"center";
`

export default function Page(){
  return (
    <AuthProvider role="tourist">
      <NotificationProvider>
      <>
        <div style={{display:"flex", flexDirection:"row", alignItems:"center",justifyContent:"space-between"}}>
          <div style={{marginLeft:"1rem"}}>
            <Link href="/booking" passHref>
            <BackButton
              startIcon={
                <ArrowBackIosNewIcon sx={{color:COLOR.text}}/>
              }
              />
            </Link>
          </div>
          <h1 style={{textAlign:"center"}}>Booking History</h1>
          <div style={{marginRight:"3rem"}}></div>
        </div>
        <BookingProgramList bookingFilter={{status:["accepted","declined"]}} history={true}/>
      </>
      </NotificationProvider>
    </AuthProvider>
  )
}