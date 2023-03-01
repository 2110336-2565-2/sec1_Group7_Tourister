import { ProgramInterface } from "@/interfaces/ProgramInterface";
import { FC } from "react";
import { getProgramById } from "@/services/programService";
import * as React from "react";
import { useState } from "react";
import { UserCardInterface } from "@/interfaces/UserCardInterface";
import { BookingInterface } from "@/interfaces/BookingInterface";

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
      <>
        <h2>{program.name}</h2>
        <p>Province: {program.province}</p>
        <p>Number of Participants: {program.num_participant}</p>
        <p>Max Participants: {program.max_participant}</p>
        <h3>Members</h3>
        {bookings &&
          Array.isArray(bookings) &&
          bookings.map((booking) => {
            const user = booking.user;
            return (
              <div style={{borderBottom:"0.5px solid gray"}}>
                {typeof user !== "string" && (
                  <>
                    <div>{user.name} {user.surname}</div>
                  </>
                )}
                <div>Information: {booking.request}</div>

              </div>
            );
          })}
      </>
      <button onClick={onGoBack}>Go Back</button>
    </>
  );
};

export default ProgramDetail;
