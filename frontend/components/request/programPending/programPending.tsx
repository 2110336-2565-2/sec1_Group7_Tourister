"use client";

import { useEffect } from "react";
import { useState } from "react";
import Link from "next/link";
import {
  getAllProgramsFromGuide,
  getProgramById,
} from "@/services/programService";
import { getAllBookings } from "@/services/bookingService";
import { UserInterface } from "@/interfaces/UserInterface";
import { ProgramInterface } from "@/interfaces/ProgramInterface";

export default function programPending() {
  // const [guideId, setGuideid] = useState<String>("0");
  let guide:UserInterface
  if (typeof window !== 'undefined') {
    guide = JSON.parse(localStorage.getItem("user") || "{}");
  } else {
    guide = JSON.parse(`{"name":"Name","surname":"Surname","remainingAmount":0,"isGuide":"true"}`)
  }
  // console.log("efwefr");
  // console.log(guide._id);
  // setGuideid(guide._id);
  // console.log(guideId)
  const guideId = guide._id;
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
      num_pending: 0,
    },
  ]);

  var programArr: any = [];
  const programPendingDict: { [key: string]: [string] } = {};

  async function fetchData() {
    const response = await getAllBookings();
    const programOfGuide = await getAllProgramsFromGuide(guideId.toString().trim());
    console.log(programOfGuide);
    console.log("eeeee");
    let programOfGuideArr: any = [];
    for (let i = 0; i < programOfGuide.data.length; i++) {
      programOfGuideArr.push(programOfGuide.data[i]._id);
    }
    console.log(programOfGuideArr);
    console.log(response.data.length);
    for (let i = 0; i < response.data.length; i++) {
      console.log(i)
      console.log(response.data[i].program._id.toString().trim() , programOfGuideArr)
      console.log(programOfGuideArr.includes(response.data[i].program._id.toString().trim()))
      if (
        response.data[i].status === "pending" &&
        programOfGuideArr.includes(response.data[i].program._id.toString().trim())
      ) {
        console.log('yes')
        if (response.data[i].program._id in programPendingDict) {
          programPendingDict[response.data[i].program._id].push(
            response.data[i].user._id
          );
        } else {
          programPendingDict[response.data[i].program._id] = [
            response.data[i].user._id
          ];
        }
      }
    }
    console.log("jjjj")
    console.log(programPendingDict)
    for (const [key, value] of Object.entries(programPendingDict)) {
      // console.log(`${key}: ${value}`);
      const response = await getProgramById(key);
      console.log(response.data);
      response.data.num_pending = value.length;
      programArr.push(response.data);
      console.log(programArr);
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
}
