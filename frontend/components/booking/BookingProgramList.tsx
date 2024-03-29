import { useQuery } from "@tanstack/react-query"

import { CircularProgress } from "@mui/material"

import { ProgramCardForTourist } from "../program/ProgramCardForTourist"

import { useAuth } from "@/components/AuthProvider"
import { AuthContextInterface } from "@/interfaces/AuthContextInterface"

import { getAllBookingsFromTourist } from "@/services/bookingService"
import { BookingFilterInterface } from "@/interfaces/filter/BookingFilterInterface"
import { isDateTimeInThePass } from "@/utils/Utils"

export const BookingProgramList = ({bookingFilter,history=false}:{bookingFilter:BookingFilterInterface,history?:boolean}) => {
  const authUserData:AuthContextInterface = useAuth()
  const userId:string = authUserData.user?._id!

  const { data:programResponse, refetch, isLoading, isError, error } = useQuery({
    queryKey: ['bookingPrograms', userId, bookingFilter],
    queryFn: ()=>{
      if(!userId)return null;
      return getAllBookingsFromTourist(userId, bookingFilter)
    }
  })
  
  if(isLoading) return (
    <div style={{display:"flex", justifyContent:"center"}}>
      <CircularProgress/>
    </div>
  )

  const bookings = programResponse?.data;
  console.log(bookings);


  const today = new Date();
  const upcomingBookings = bookings?.filter(({program,status})=>{
    const isInThePass = isDateTimeInThePass(program?.endDate!, program?.endTime!);
    if(history) return status==='declined' || isInThePass;
    return !isInThePass;
  })

  if((upcomingBookings?.length)===0){
    return <>
    <br />
    <div style={{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",height:"max-content"}}>
    <h3>Sorry, There aren&apos;t any trips</h3>
    <p>Join new program now!</p>
    </div>
    </>
  }

  return <>
    <br />
    {upcomingBookings?.map(({program, status})=>{
      return program && <ProgramCardForTourist key={program._id} program={program} bookingStatus={status}/>
    })}
  </>
}