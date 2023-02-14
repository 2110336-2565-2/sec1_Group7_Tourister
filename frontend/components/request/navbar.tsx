"use client";

import React from "react";
import { useState, useEffect } from "react";
import Accepted from "./accepted/page";
import { ProgramInterface } from "@/interfaces/ProgramInterface";

import axios from "axios";
import Link from "next/link";
import { Button, AppBar } from "@mui/material";

const API_URL = `http://localhost:2000/api/program`;

export default function Navbar({ value, setValue }: any) {
  const [cardstatus, setcardStatus] = useState<string>();
  const [data, setData] = useState<ProgramInterface | null>(null);

  const handleChange = async () => {
    const res = await axios.get(API_URL);
    // console.log(res.data);
    setData(res.data);
  };
  const statusChange = async (status: string) => {
    setcardStatus(status);
    // console.log(cardstatus);
    handleChange();
  };
  console.log(cardstatus);

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
      <div>{data && <p>Data: {JSON.stringify(data)}</p>}</div>
    </div>
  );
}
