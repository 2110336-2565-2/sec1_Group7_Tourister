import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import ProgramDetail from '@/components/program/ProgramDetails/ProgramDetail';
import NavBar from "@/components/layout/navBar";
import { AuthProvider } from "@/components/AuthProvider";
import { getProgramById } from "@/services/programService";
import { getAllBookingsAcceptedInProgram } from "@/services/bookingService";
import { ProgramInterface } from '@/interfaces/ProgramInterface';
import { BookingInterface } from '@/interfaces/BookingInterface';
import { CircularProgress, Stack } from '@mui/material';


export default function ProgramDetailPage() {
  const router = useRouter();
  const { programId } = router.query;

  const [program, setProgram] = useState<ProgramInterface | undefined>(undefined);
  const [bookings, setBookings] = useState<BookingInterface[] | undefined>(undefined);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProgramDetailData = async () => {
      setLoading(true);
      try {
        const response = await getProgramById(programId as string);
        const program = response.data ;
        if(program!=null){
          setProgram(program);
        }else{

        }
      } catch (error) {
        console.log(error);
    } finally {
        setLoading(false);
      }
    };

    const fetchTouristData = async () => {
      const response = await getAllBookingsAcceptedInProgram(programId as string);
      const bookings = response.data || [];
      //console.log("booking");
      //console.log(bookings);
      setBookings(bookings);
    };
     
    if (programId) {
      fetchProgramDetailData();
      fetchTouristData();

    }
  }, [programId]);

  


  return (
    <AuthProvider>
      <>
        <NavBar />
        {loading ? (
          <>
          <div style={{ alignItems: "center", display: "flex", justifyContent: "center", height: "90vh", width: "100vw" }}><CircularProgress/></div>
          </>
        ) : program ? (
          <ProgramDetail
            program={program}
            bookings = {bookings}
            onGoBack={() => router.back()}
          />
        ) : (
          <div>No program found</div>
        )}
      </>
    </AuthProvider>
  );
}
