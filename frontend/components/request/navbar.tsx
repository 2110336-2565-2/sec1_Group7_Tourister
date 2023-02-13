"use client";

import React from "react";
import { useState, useEffect } from "react";
import Accepted from "./accepted/page";

import axios from "axios";
import Link from "next/link";
import { Button, AppBar } from "@mui/material";

const API_URL = `http://localhost:2000/api/program`;

interface Program {
  name: string;
  description: string;
  startdate: Date;
  email: string;
  num_participant: number;
  max_participant: number;
  pending_participant: Object[];
  accepted_participant: Object[];
  declined_participant: Object[];
}

export default function Navbar({ value, setValue }: any) {
  // const [cardstatus, setcardStatus] = useState("Pending");
  const [data, setData] = useState<Program | null>(null);

  const handleCardStatusChange = (newStatus: any) => {
    setValue(newStatus);
  };

  const handleChange = async () => {
    // try {
    //   const result = await axios.get(API_URL);
    //   console.log(result);
    //   setData(result.data);
    // } catch (error) {
    //   console.log(error);
    // }
    // useEffect(() => {
    // const fetchData = async () => {
    const res = await axios.get(API_URL);
    console.log(res.data.data);
    setData(res.data);
    // };
    // fetchData().catch(console.error);
    // });
  };
  // console.log(data);

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
          <Link href="./request/pending" passHref>
            <button type="button" onClick={handleChange}>
              Pending
            </button>
          </Link>
          <Link href="./request/accepted" passHref>
            <button type="button" onClick={handleChange}>
              Accepted
            </button>
          </Link>
          <Link href="./request/declined" passHref>
            <button type="button" onClick={handleChange}>
              Declined
            </button>
          </Link>
        </div>
      </nav>
      <div>{data && <p>Data: {JSON.stringify(data)}</p>}</div>
    </div>
  );
}
