import { ProgramInterface } from "@/interfaces/ProgramInterface";
import { FC } from "react";
import { COLOR } from "@/theme/globalTheme";

import * as React from "react";
import { useState } from "react";
import { UserCardInterface } from "@/interfaces/UserCardInterface";
import { BookingInterface } from "@/interfaces/BookingInterface";
import {
  ExpandMore,
  ChevronLeft,
  CalendarMonth,
  LocationOnOutlined,
  PeopleAltOutlined,
  LanguageOutlined,
  Padding
} from "@mui/icons-material";

import {Accordion,AccordionDetails,AccordionSummary,Chip,colors,autocompleteClasses,} from "@mui/material";
import ImageSlider from "@/components/program/ProgramDetails/ImageSlider";
import ScheduleDetail from "@/components/program/ProgramDetails/ScheduleDetail";
import ParticipantsDetail from "@/components/program/ProgramDetails/ParticipantsDetail";
import { format } from "date-fns";

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
  //console.log(bookings.length);
  console.log("count user by num participant: ", program.num_participant);
  console.log("program");
  console.log(program);

  if (!program) {
    return <div>Loading...</div>;
  }

  const startDateTime = new Date(program.startDate);
  const endDateTime = new Date(program.endDate);
  const formattedStartDate = format(startDateTime, "dd MMM yyyy");
  const formattedEndDate = format(endDateTime, "dd MMM yyyy");

  return (
    <>
      <button style={{ border: "0px" }} type="button" onClick={onGoBack}>
        <ChevronLeft />
      </button>
    <ImageSlider dayTrips={program.dayTrips}/>

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
          <ScheduleDetail program={program} dayTrips={program.dayTrips} />
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary expandIcon={<ExpandMore />}>
          <h3>Participants</h3>
        </AccordionSummary>
        <AccordionDetails>
          <ParticipantsDetail bookings={bookings} />
        </AccordionDetails>
      </Accordion>
    </>
  );
};

export default ProgramDetail;
