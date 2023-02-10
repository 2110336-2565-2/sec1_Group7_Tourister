"use client";

import React from "react";
import { useState } from "react";

import data from "./data";
import Navbar from "./navbar";

export default function requestPage() {
  // const cards = data.map((item) => {
  //   return <Card key={item.id} item={item} />;
  // });

  const [cardstatus, setcardStatus] = useState("Pending");

  const handleCardStatusChange = (newStatus: any) => {
    setcardStatus(newStatus);
  };

  return (
    <>
      <h1>REQUEST</h1>
      <Navbar />
      {data
        .filter((card) => card.status === cardstatus)
        .map((card) => (
          <div key={card.id}></div>
        ))}
      {/* <section className="cards-list">{cards}</section> */}
    </>
  );
}
