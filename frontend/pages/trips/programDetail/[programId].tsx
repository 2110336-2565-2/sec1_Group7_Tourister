import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import ProgramDetail from '@/components/program/ProgramDetails/ProgramDetail';
import NavBar from "@/components/layout/navBar";
import { AuthProvider } from "@/components/AuthProvider";
import { getProgramById } from "@/services/programService";

import { useQuery } from '@tanstack/react-query';
import { getAllBookingsInProgram, getAllBookingsAcceptedInProgram } from "@/services/bookingService";


import { ProgramInterface } from '@/interfaces/ProgramInterface';
import { BookingInterface } from '@/interfaces/BookingInterface';
import { CircularProgress, Stack } from '@mui/material';


export default function ProgramDetailPage() {
  const router = useRouter();
  const { programId } = router.query;

  // const [program, setProgram] = useState<ProgramInterface | undefined>(undefined);
  // const [bookings, setBookings] = useState<BookingInterface[] | undefined>(undefined);

  // const [loading, setLoading] = useState(false);

  const { data: bookingResponse, refetch:refetchBooking, isLoading: isLoadingBooking} = useQuery({
    queryKey: ["pendingTouristForProgram", programId],
    queryFn: () => {
      if (!programId) return null;
      return getAllBookingsInProgram(programId as string, {
        status: ["pending", "accepted", "declined"],
      });
    },
  });
  const bookings = bookingResponse?.data;

  const { data: programResponse, refetch:refetchProgram, isLoading: isLoadingProgram} = useQuery({
    queryKey: ["pendingProgramDetailData", programId],
    queryFn: () => {
      if (!programId) return null;
      return getProgramById(programId as string);
    },
  });
  const program = programResponse?.data;

  return (
    <AuthProvider>
      <>
        <NavBar />
        {isLoadingBooking || isLoadingProgram ? (
          <>
          <div style={{ alignItems: "center", display: "flex", justifyContent: "center", height: "90vh", width: "100vw" }}><CircularProgress/></div>
          </>
        ) : program ? (
          <ProgramDetail
            program={program}
            bookings = {bookings}
            onGoBack={() => router.back()}
            refetchBooking={refetchBooking}
          />
        ) : (
          <div>No program found</div>
        )}
      </>
    </AuthProvider>
  );
}
