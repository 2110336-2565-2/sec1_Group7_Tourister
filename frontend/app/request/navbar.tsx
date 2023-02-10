"use client";

import React from "react";
import { useState } from "react";

import Link from "next/link";
import { Button, AppBar } from "@mui/material";

export default function Navbar() {
  const [cardstatus, setcardStatus] = useState("Pending");

  const handleCardStatusChange = (newStatus: any) => {
    setcardStatus(newStatus);
  };

  return (
    <nav style={{
      display: "flex"}}>
      <div
        style={{
          alignItems: "center",
          textAlign: "center",
          margin: "auto",
          alignSelf: "center",
        }}
      >
        <Link href="./request/pending" passHref>
          <Button
            variant="text"
            onClick={() => handleCardStatusChange("pending")}
          >
            Pending
          </Button>
        </Link>
        <Link href="./request/accepted" passHref>
          <Button
            variant="text"
            onClick={() => handleCardStatusChange("accepted")}
          >
            Accepted
          </Button>
        </Link>
        <Link href="./request/declined" passHref>
          <Button
            variant="text"
            onClick={() => handleCardStatusChange("declined")}
          >
            Declined
          </Button>
        </Link>
      </div>
    </nav>
  );
}
