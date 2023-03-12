import { useQuery } from "@tanstack/react-query"

import { ProgramCardForTourist } from "../program/ProgramCardForTourist"

import { useAuth } from "@/components/AuthProvider"
import { AuthContextInterface } from "@/interfaces/AuthContextInterface"

import { getAllBookingsFromTourist } from "@/services/bookingService"
import { BookingFilterInterface } from "@/interfaces/filter/BookingFilterInterface"

export const BookingProgramList = ({bookingFilter}:{bookingFilter:BookingFilterInterface}) => {
  const authUserData:AuthContextInterface = useAuth()
  const userId:string = authUserData.user?._id!

  const { data:programResponse, refetch, isLoading, isError, error } = useQuery({
    queryKey: ['bookingPrograms', userId, bookingFilter],
    queryFn: ()=>getAllBookingsFromTourist(userId, bookingFilter)
  })

  const bookings = programResponse?.data;
  console.log(bookings);

  if(isLoading) return <>Loading...</>

  return <>
    {bookings?.map(({program})=>{
      return <ProgramCardForTourist key={program._id} program={program}/>
    })}
  </>
}