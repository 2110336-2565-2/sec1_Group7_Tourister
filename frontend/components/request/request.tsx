"use client";

import React from "react";
import { useState } from "react";
import axios from "axios";
import { Button } from "@mui/material";
import { getProgramById, updateProgramById } from "@/services/programService";

export default function Navbar() {
  const [isClicked, setIsClicked] = useState(false);
  const [cardstatus, setcardStatus] = useState<string>();
  const [moved, setMoved] = useState(false);
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
      user: [],
    },
  ]);

  const statusChange = async (status: string) => {
    setcardStatus(status);
    setIsClicked(!isClicked);
  };
  console.log(cardstatus);

  const moveUsers = async (userid: any, programid: any, status: string) => {
    setMoved(!moved);
    if (status === "accepted") {
      const res = await getProgramById(programid);
      const acceptedarr = res.data.accepted_participant;
      acceptedarr.push(userid);
      const pendingarr = res.data.pending_participant.filter(
        (user: any) => user !== userid
      );

      const update = {
        pending_participant: pendingarr,
        accepted_participant: acceptedarr,
      };

      const response = await updateProgramById(programid, update);
    }
    if (status === "declined") {
      const res = await getProgramById(programid);

      const declineddarr = res.data.declined_participant;
      declineddarr.push(userid);
      const pendingarr = res.data.pending_participant.filter(
        (user: any) => user !== userid
      );

      const update = {
        pending_participant: pendingarr,
        declined_participant: declineddarr,
      };

      const response = await updateProgramById(programid, update);
    }
    axios.get(`http://localhost:2000/api/program`).then((response: any) => {
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
  };

  if (isClicked && cardstatus === "accepted") {
    setIsClicked(false);
    axios.get(`http://localhost:2000/api/program`).then((response: any) => {
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
      const programsWithUsers = response.data.data.map((program: any) => {
        const userPromises = program.pending_participant.map((userId: string) =>
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
      const programsWithUsers = response.data.data.map((program: any) => {
        const userPromises = program.declined_participant.map(
          (userId: string) =>
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
  console.log(programs);

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
      {cardstatus === "pending" && (
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
                    <Button
                      type="button"
                      variant="outlined"
                      onClick={() =>
                        moveUsers(user.data.data._id, program._id, "declined")
                      }
                    >
                      DECLINED
                    </Button>
                    <Button
                      type="button"
                      variant="contained"
                      onClick={() =>
                        moveUsers(user.data.data._id, program._id, "accepted")
                      }
                    >
                      ACCEPT
                    </Button>
                    <p>
                      ---------------------------------------------------------
                    </p>
                  </div>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
      {(cardstatus === "accepted" || cardstatus === "declined") && (
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
      )}
    </div>
  );
}
