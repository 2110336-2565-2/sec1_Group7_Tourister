"use client";

import React from "react";
import { useState, useEffect } from "react";
import mongoose from "mongoose";

// import data from "./data";
// import Navbar from "./navbar";
import { boolean } from "yup";

export default function requestPage({ value, setValue }) {
  // const cards = data.map((item) => {
  //   return <Card key={item.id} item={item} />;
  // });

  return (
    <>
      <h1>REQUEST</h1>
      {users.map((user) => (
        <li key={user.status}>
          {user.name} by {user.surname}
        </li>
      ))}
      {/* <section className="cards-list">{cards}</section> */}
    </>
  );
}
