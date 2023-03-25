import { ProgramInterface } from "@/interfaces/ProgramInterface";
import { FC } from "react";
import { COLOR } from "@/theme/globalTheme";
import { useQuery } from "@tanstack/react-query";

import * as React from "react";
import { useState } from "react";
import { UserCardInterface } from "@/interfaces/UserCardInterface";
import { BookingInterface, BookingStatusInterface } from "@/interfaces/BookingInterface";
import { getAllBookingsInProgram, createBooking } from "@/services/bookingService";

import {
  ExpandMore,
  ChevronLeft,
  CalendarMonth,
  LocationOnOutlined,
  PeopleAltOutlined,
  LanguageOutlined,
  Padding
} from "@mui/icons-material";

import {Accordion,AccordionDetails,AccordionSummary,Chip,colors,autocompleteClasses,Button, CircularProgress, Stack} from "@mui/material";
import ImageSlider from "@/components/program/ProgramDetails/ImageSlider";

import ScheduleDetail from "@/components/program/ProgramDetails/ScheduleDetail";
import ParticipantsDetail from "@/components/program/ProgramDetails/ParticipantsDetail";
import { format } from "date-fns";

import { useAuth } from "@/components/AuthProvider";
import { AuthContextInterface } from "@/interfaces/AuthContextInterface";

const iconStyle = {
  color: COLOR.disable,
  padding: "0px 10px",
  transform: "translateY(5px)",
};

interface IProgramDetailProps {
  program: ProgramInterface;
  bookings?: BookingInterface[];
  onGoBack: () => void;
}

const ProgramDetail: FC<IProgramDetailProps> = ({
  program,
  bookings = [],
  onGoBack,
}) => {
  const authUserData:AuthContextInterface = useAuth()

  if (!program) {
    return(
    <>
    <Stack alignItems="center">
      <CircularProgress />
    </Stack>
    </>
    ) ;
  }


  const user = authUserData.user
  const isGuide:boolean = user?.isGuide!
  const userId:string = user?._id!
  const programId = program._id!

  const { data:bookingResponse, refetch} = useQuery({
    queryKey: ['pendingTouristForProgram', programId],
    queryFn: ()=>{
      if(!programId)return null;
      return getAllBookingsInProgram(programId, {status:["pending","accepted"]})
    }
  })

  console.log(bookingResponse?.data)

  const touristBookingStatus = (bookingResponse?.data!.find((booking)=>booking.user?._id===userId))?.status
  console.log(touristBookingStatus)

  const startDateTime = new Date(program.startDate);
  const endDateTime = new Date(program.endDate);
  const formattedStartDate = format(startDateTime, "dd MMM yyyy");
  const formattedEndDate = format(endDateTime, "dd MMM yyyy");

  const generateButton = (status:BookingStatusInterface|undefined) => {
    switch(status){
      case "accepted":
        return <Button 
          variant="contained" 
          sx={{
            width:"100%",
            fontSize:"1.3rem",
            backgroundColor:COLOR.success,
            "&.Mui-disabled": {
              backgroundColor: COLOR.success,
              color: "white"
            }
          }} 
          disabled
          >
            Accepted!
          </Button>
      case "pending":
        return <Button variant="contained" sx={{width:"100%",fontSize:"1.3rem",color:COLOR.disable}} disabled>Pending...</Button>;
      default:
        return <Button variant="contained" sx={{width:"100%",fontSize:"1.3rem"}} onClick={handleBookingClick}>Booking</Button>;
    }
  }

  const handleBookingClick = async () => {
    try {
      const res = await createBooking({user:user, program:program}, programId);
      refetch();
    } catch(err) {
      console.log(err)
    }
  }

  return (
    <>
      <button style={{ border: "0px" }} type="button" onClick={onGoBack}>
        <ChevronLeft />
      </button>
      <ImageSlider dayTrips={program.dayTrips!}/>


      {/*----------program description----------- */}
      <div style={{padding: "10px 0px"}}>
      <h2>{program.name}</h2>
      <Chip
        icon={<LocationOnOutlined />}
        size="small"
        sx={{
          backgroundColor: COLOR.paleblue,
          color: COLOR.text,
          borderRadius: 10,
          margin: "2px 8px",
          padding: "2px 8px",

          "& .MuiChip-icon": {
            width: "15px",
            height: "15px"
          },
        }}
        label={program.province}
      />
     
      <div>
        <CalendarMonth style={{...iconStyle, color: COLOR.primary }}fontSize="medium"/>
        {`${formattedStartDate}, ${program.startTime}`} -{" "}
        {`${formattedEndDate}, ${program.endTime}`}{" "}
      </div>

      <div>
          <PeopleAltOutlined  style={{...iconStyle}} fontSize="medium"/> 
          {bookings.length} / {program.max_participant} 
      </div>

      <div>
          <LanguageOutlined  style={{...iconStyle}} fontSize="medium"/> 
        {program.language?.join("/")}
      </div>

      </div>

      <Accordion>
        <AccordionSummary expandIcon={<ExpandMore />}>
          <h3>Description</h3>
        </AccordionSummary>
        <AccordionDetails>
          <p>{program.description}</p>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary expandIcon={<ExpandMore />}>
          <h3>Schedule</h3>
        </AccordionSummary>
        <AccordionDetails>
          {/* render schedule component */}
          <ScheduleDetail program={program} dayTrips={program.dayTrips!} />
        </AccordionDetails>
      </Accordion>
      {
        isGuide &&
        <Accordion>
        <AccordionSummary expandIcon={<ExpandMore />}>
          <h3>Participants</h3>
        </AccordionSummary>
        <AccordionDetails>
          <ParticipantsDetail bookings={bookings} />
        </AccordionDetails>
        </Accordion>
      }
      {
        !isGuide && 
        <div style={{display:"flex", justifyContent:"center", alignItems:"center",margin:"1em"}}>
          {
            generateButton(touristBookingStatus)
          }
        </div>
      }
    </>
  );
};

export default ProgramDetail;
