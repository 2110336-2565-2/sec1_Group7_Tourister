"use client";

import React from "react";
import { useState, useEffect } from "react";
import Accepted from "./accepted/page";
import { ProgramInterface } from "@/interfaces/ProgramInterface";
import { UserCardInterface } from "@/interfaces/UserCardInterface";
import { UserInterface } from "@/interfaces/UserInterface";
import { getUserById } from "@/services/userService";
import axios from "axios";
import Link from "next/link";
import { Button, AppBar } from "@mui/material";

const API_URL = `http://localhost:2000/api/program`;
var data: any = [];

export default function Navbar({ value, setValue }: any) {
  const [isClicked, setIsClicked] = useState(false);
  const [cardstatus, setcardStatus] = useState<string>();
  const [userInfo, setuserInfo] = useState([
    {
      citizenId: "",
      name: "",
      surname: "",
      email: "",
      password: "",
      phoneNumber: "",
      isGuide: false,
      bankName: "",
      bankAccount: "",
      remainingAmount: 0,
      imageURL: "",
    },
  ]);
  const [data, setData] = useState([
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
    },
  ]);

  const fillUser = async (userid: string) => {
    // var arr: any = [];
    // const res = await axios.get(`http://localhost:2000/api/user/${userid}`);
    // console.log(res.data);
    // setuserInfo(res.data.data);
    // arr.push(res.data.name);
    // arr.push(res.data.surname);
    // arr.push(res.data.email);
    // return res.data.name;
    // return arr;
  };

  const handleChange = async () => {
    const res = await axios.get(API_URL);
    // console.log(res.data);
    setData(res.data.data);
  };

  const statusChange = async (status: string) => {
    setcardStatus(status);
    setIsClicked(!isClicked);
    // console.log(cardstatus);
    // handleChange();
  };
  console.log(cardstatus);
  // console.log(data);

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
  // useEffect(() => {
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
          {/* <Link href="./request/pending" passHref> */}
          <button type="button" onClick={() => statusChange("pending")}>
            Pending
          </button>
          {/* </Link> */}
          {/* <Link href="./request/accepted" passHref> */}
          <button type="button" onClick={() => statusChange("accepted")}>
            Accepted
          </button>
          {/* </Link> */}
          {/* <Link href="./request/declined" passHref> */}
          <button type="button" onClick={() => statusChange("declined")}>
            Declined
          </button>
          {/* </Link> */}
        </div>
      </nav>
      <div>
        {programs.map((program) => (
          <div key={program._id}>
            <ul>
              {program.user.map((user: any) => (
                <h3 key={user.data.data._id}>
                  {user.data.data.name} {user.data.data.surname}
                  <div>Contact: {user.data.data.email}</div>
                </h3>
              ))}
            </ul>
            <h2>{program.name}</h2>
            <p>{program.description}</p>
            <p>{program.startDate}</p>
            <p>
              {program.num_participant}/{program.max_participant}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
