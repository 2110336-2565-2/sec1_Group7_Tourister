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
  //console.log(bookings.length);

  if (!program) {
    return <div>Loading...</div>;
  }

  return (
      <>
        <button style={{border:"0px"}} type="button" onClick={onGoBack}><ChevronLeft/></button>

        <h2>{program.name}</h2>
        <p>Province: {program.province}</p>
        <p>Number of Participants: {program.num_participant}</p>
        <p>Max Participants: {program.max_participant}</p>
        <p>Start: {program.startDate.toString()}</p>
        <p>End: {program.endDate.toString()}</p>
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
          <ScheduleDetail />
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
