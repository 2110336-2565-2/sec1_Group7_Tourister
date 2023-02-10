"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@mui/material";

export default function Navbar() {
  return (
    <nav>
      <Link href="./request/pending" passHref>
        <Button variant="text">Pending</Button>
      </Link>
      <Link href="./request/accepted" passHref>
        <Button variant="text">Accepted</Button>
      </Link>
      <Link href="./request/declined" passHref>
        <Button variant="text">Declined</Button>
      </Link>
    </nav>
  );
}
