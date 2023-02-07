"use client";

import React from "react";
import Card from "./card";
import data from "./data";
import Navbar from "./navbar";

export default function Cards() {
  const cards = data.map((item) => {
    return <Card key={item.id} item={item} />;
  });

  return (
    <>
      <h1>REQUEST</h1>
      <Navbar />
      <section className="cards-list">{cards}</section>
    </>
  );
}
