"use client";
import { Button, Tab, Tabs } from "@mui/material";
// import Button from '@mui/material-next/Button';
import * as React from "react";
import Box from "@mui/material/Box";
import { COLOR } from "@/theme/globalTheme";
import {
  getAllProgramsFromGuide,
  getAllPrograms,
} from "@/services/programService";
import { ProgramCardForGuide } from "@/components/program/ProgramCardForGuide";
import { useContext, useEffect } from "react";
import { ProgramInterface } from "../../interfaces/ProgramInterface";
import Link from "next/link";
import { SecondaryButtonWhite } from "@/css/styling";
import styled from "styled-components";

import { useAuth } from "@/components/AuthProvider";
import { AuthContextInterface } from "@/interfaces/AuthContextInterface";


interface LinkTabProps {
  label?: string;
  href?: string;
}

const ProgramPending = () => {
  const [programs, setprograms] = React.useState<ProgramInterface[]>([]);

  React.useEffect(() => {
    const guide = JSON.parse(localStorage.getItem("user") || "{}");
    const guideId = guide._id;
    //console.log(guideId);

    const fetchTripsData = async () => {
      //const response = await getAllPrograms();
      const response = await getAllProgramsFromGuide(guideId);
      const programs = response.data || [];
      console.log(response);
      // filter the programs based on their start and end dates
      const Trips = programs.filter((program) => {
        const status = program.status;
        return status == "pending";
      });
      console.log(Trips);
      //console.log(ongoingTrips);
      //console.log("completeTrips");
      //console.log(completeTrips);

      // set the filtered programs to the appropriate state
      setprograms(Trips);
    };

    fetchTripsData();
  }, []);

  return (
    <div>
      <h1>Request</h1>
      {programs.length > 0 ? (
        <div>
          {programs.map((program) => (
            <Link
              href={`/request/userPending/${program._id}`}
              key={program._id}
            >
              <div key={program._id}>
                <ul>
                  <li>{program.name}</li>
                  <li>
                    {program.startDate} to {program.endDate}
                  </li>
                  <li>
                    {program.num_participant} / {program.max_participant}
                  </li>
                  <h4>{program.num_pending} more request(s)</h4>
                </ul>
                <div>---------------------------</div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div>
          No requests yet! Keep checking back for new opportunities, or create
          new trip to attract interested tourists.
        </div>
      )}
    </div>
  );
};

export default ProgramPending;
