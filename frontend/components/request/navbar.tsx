"use client";

import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { Button, AppBar } from "@mui/material";

const API_URL = `http://localhost:2000/api/program`;

export default function Navbar({ value, setValue }: any) {
  const [isClicked, setIsClicked] = useState(false);
  const [cardstatus, setcardStatus] = useState<string>();

  const statusChange = async (status: string) => {
    setcardStatus(status);
    setIsClicked(!isClicked);
  };
  console.log(cardstatus);

  const [programs, setPrograms] = useState([
    {
      _id: "",
      programId: "",
      name: "",
      description: "",
      startDate: Date,
      endDate: Date,
      startTime: Date,
      endTime: Date,
      max_participant: 0,
      num_participant: 0,
      meetLocation: "",
      descriptionOfMeetLocation: "",
      attractions: [],
      imageUrl: "",
      language: "",
      endLocation: "",
      descriptionOfEndLocation: "",
      pending_participant: [],
      accepted_participant: [],
      declined_participant: [],
      user: [],
    },
  ]);
  if (isClicked && cardstatus === "accepted") {
    setIsClicked(false);
    axios.get(`http://localhost:2000/api/program`).then((response: any) => {
      // console.log(response.data);
      const programsWithUsers = response.data.data.map((program: any) => {
        const userPromises = program.accepted_participant.map((userId: any) =>
          axios.get(`http://localhost:2000/api/user/${userId}`)
        );
        return Promise.all(userPromises).then((user) => ({
          ...program,
          user,
        }));
      });
      Promise.all(programsWithUsers).then((programsWithUsers) => {
        setPrograms(programsWithUsers);
      });
    });
  }
  if (isClicked && cardstatus === "pending") {
    setIsClicked(false);
    axios.get(`http://localhost:2000/api/program`).then((response: any) => {
      // console.log(response.data);
      const programsWithUsers = response.data.data.map((program: any) => {
        const userPromises = program.pending_participant.map((userId: any) =>
          axios.get(`http://localhost:2000/api/user/${userId}`)
        );
        return Promise.all(userPromises).then((user) => ({
          ...program,
          user,
        }));
      });
      Promise.all(programsWithUsers).then((programsWithUsers) => {
        setPrograms(programsWithUsers);
      });
    });
  }
  if (isClicked && cardstatus === "declined") {
    setIsClicked(false);
    axios.get(`http://localhost:2000/api/program`).then((response: any) => {
      // console.log(response.data);
      const programsWithUsers = response.data.data.map((program: any) => {
        const userPromises = program.declined_participant.map((userId: any) =>
          axios.get(`http://localhost:2000/api/user/${userId}`)
        );
        return Promise.all(userPromises).then((user) => ({
          ...program,
          user,
        }));
      });
      Promise.all(programsWithUsers).then((programsWithUsers) => {
        setPrograms(programsWithUsers);
      });
    });
  }
  // }, []);
  console.log(programs);
  console.log(programs[0].user);

  return (
    <div>
      <nav
        style={{
          display: "flex",
        }}
      >
        <div
          style={{
            alignItems: "center",
            textAlign: "center",
            margin: "auto",
            alignSelf: "center",
          }}
        >
          <Button type="button" onClick={() => statusChange("pending")}>
            Pending
          </Button>

          <Button type="button" onClick={() => statusChange("accepted")}>
            Accepted
          </Button>

          <Button type="button" onClick={() => statusChange("declined")}>
            Declined
          </Button>
        </div>
      </nav>
      <div>
        {programs.map((program) => (
          <div key={program._id}>
            <ul>
              {program.user.map((user: any) => (
                <div key={user.data.data._id}>
                  {user.data.data.name} {user.data.data.surname}
                  <div>Contact: {user.data.data.email}</div>
                  <h2>{program.name}</h2>
                  <p>{program.description}</p>
                  <p>{program.startDate}</p>
                  <p>
                    {program.num_participant}/{program.max_participant}
                  </p>
                  <p>
                    ---------------------------------------------------------
                  </p>
                </div>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
