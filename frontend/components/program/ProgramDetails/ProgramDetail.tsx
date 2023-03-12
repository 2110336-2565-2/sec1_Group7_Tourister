import { ProgramInterface } from "@/interfaces/ProgramInterface";
import { FC } from "react";
import * as React from "react";
import { useState } from "react";
import { UserCardInterface } from "@/interfaces/UserCardInterface";
import { BookingInterface } from "@/interfaces/BookingInterface";
import {ExpandMore,ChevronLeft} from '@mui/icons-material';
import { Accordion, AccordionDetails, AccordionSummary, List, ListItem, ListItemText, ListItemAvatar,Avatar } from "@mui/material";
import ScheduleDetail from "@/components/program/ProgramDetails/ScheduleDetail";
import ParticipantsDetail from "@/components/program/ProgramDetails/ParticipantsDetail";
// import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { format } from "date-fns";


interface IProgramDetailProps {
  program: ProgramInterface;
  bookings?: BookingInterface[];
  onGoBack: () => void;
}

const ProgramDetail: FC<IProgramDetailProps> = ({
  program,
  bookings=[],
  onGoBack,
}) => {

  console.log("count user");
  console.log(bookings.length);
  console.log(program.num_participant);

  if (!program) {
    return <div>Loading...</div>;
  }

    const startDateTime = new Date(program.startDate);
    const endDateTime = new Date(program.endDate);
    const formattedStartDate = format(startDateTime, "dd MMM yyyy");
    const formattedEndDate = format(endDateTime, "dd MMM yyyy");


  return (
      <>
        <button style={{border:"0px"}} type="button" onClick={onGoBack}><ChevronLeft/></button>

        <h2>{program.name}</h2>
        <p>Province: {program.province}</p>
        <p>Number of Participants: {bookings.length}</p>
        <p>Max Participants: {program.max_participant}</p>
        <p>{`Start ${formattedStartDate}, ${program.startTime}`}</p>
        <p>{`End ${formattedEndDate}, ${program.endTime}`}</p>

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
