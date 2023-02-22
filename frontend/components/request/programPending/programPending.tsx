"use client";

import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { Button } from "@mui/material";
import { getProgramById, updateProgramById } from "@/services/programService";
import { getAllBookings, getBookingByStatus } from "@/services/bookingService";
import { BookingInterface } from "@/interfaces/BookingInterface";
import { ProgramInterface } from "@/interfaces/ProgramInterface";

export default function programPending() {
  const [isClicked, setIsClicked] = useState(false);
  const [cardstatus, setcardStatus] = useState<string>();
  const [programs, setPrograms] = useState<[ProgramInterface]>([
    {
      _id: "",
      name: "",
      description: "",
      price: 0,
      startDate: Date,
      endDate: Date,
      province: "",
      max_participant: 0,
      num_participant: 0,
      meetLocation: "",
      descriptionOfMeetLocation: "",
      attractions: [],
      language: [],
      endLocation: "",
      descriptionOfEndLocation: "",
      published: true,
      status: "",
    },
  ]);

  const statusChange = async (status: string) => {
    setcardStatus(status);
    setIsClicked(!isClicked);
  };

  console.log(cardstatus);
  var programArr: any = [];
  const programPendingDict: { [key: string]: [string] } = {};

  async function fetchData() {
    const response = await getAllBookings();
    // setBookings(response.data);
    for (let i = 0; i < response.data.length; i++) {
      if (response.data[i].status === "pending") {
        // bookingStatusArr.push(response.data[i].user);
        if (response.data[i].program in programPendingDict) {
          programPendingDict[response.data[i].program].push(
            response.data[i].user
          );
        }else{
          programPendingDict[response.data[i].program] = [response.data[i].user];
        }
      }
    }
    for (const [key, value] of Object.entries(programPendingDict)) {
      console.log(`${key}: ${value}`);
      const response = await getProgramById(key);
      console.log(response.data);
      programArr.push(response.data);
    }
    setPrograms(programArr);
    // console.log(response.data);
  }
  useEffect(() => {
    fetchData();
  }, []);

  console.log(programs);

  return (
    <div>
      <h1>Program Pending</h1>
      {programs.map((program) => (
        <div key={program._id}>
          <ul>
            <li>{program.name}</li>
            <li>{program.startDate} to {program.endDate}</li>
            <li>{program.num_participant} / {program.max_participant}</li>
          </ul>
        </div>
      ))}
    </div>
  );
}
