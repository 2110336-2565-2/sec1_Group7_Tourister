import { useQuery } from "@tanstack/react-query"

import { ProgramCardForTourist } from "../program/ProgramCardForTourist"

import { useAuth } from "@/components/AuthProvider"
import { AuthContextInterface } from "@/interfaces/AuthContextInterface"

import { getAllBookingsFromTourist } from "@/services/bookingService"
import { BookingFilterInterface } from "@/interfaces/filter/BookingFilterInterface"

export const BookingProgramList = ({bookingFilter,history=false}:{bookingFilter:BookingFilterInterface,history:boolean}) => {
  const authUserData:AuthContextInterface = useAuth()
  const userId:string = authUserData.user?._id!

  const { data:programResponse, refetch, isLoading, isError, error } = useQuery({
    queryKey: ['bookingPrograms', userId, bookingFilter],
    queryFn: ()=>{
      if(!userId)return null;
      return getAllBookingsFromTourist(userId, bookingFilter)
    }
  })

  const bookings = programResponse?.data;
  console.log(bookings);

  if(isLoading) return <>Loading...</>

  const today = new Date();
  const upcomingBookings = bookings?.filter(({program})=>{
    if(history) return true;
    return new Date(program?.endDate).getTime() >= today.getTime();
  })

  if((upcomingBookings?.length)===0){
    return <>
    <br />
    <div style={{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",height:"max-content"}}>
    <h3>Sorry, There aren't any trips</h3>
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