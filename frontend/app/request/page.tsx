"use client";

import React from "react";
import { useState, useEffect } from "react";

import Cards from "./card";
import data from "./data";
import Navbar from "./navbar";
import axios from "axios";

const API_URL = "http://localhost:2000/api/program";
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

interface User {
  name: string;
  surname: string;
  email: string;
}
interface Card {
  username?: string;
  surname?: string;
  email?: string;
  userID?: Object[];
  tripname?: string;
  description?: string;
  startdate?: Date;
  num_participant?: number;
  max_participant?: number;
}

export default function requestPage() {
  const [cardstatus, setcardStatus] = useState("Pending");

  const [data, setData] = useState<Program | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get(API_URL);
      setData(result.data);
    };

    fetchData();
  }, []);
  console.log(data);

  var cards: Card[] = [];
  var statusArr: Object[] = [];
  var card: Card = {};

  if (data != null && cardstatus == "Pending") {
    card.userID = data.pending_participant;
    card.tripname = data.name;
    card.description = data.description;
    card.startdate = data.startdate;
    card.num_participant = data.num_participant;
    card.max_participant = data.max_participant;
    for (let i = 0; i < card.userID.length; i++) {
      useEffect(() => {
        const fetchData = async () => {
          const result = await axios.get(
            `https://api.example.com/users/${card.userID[i]}`
          );
          setUser(result.data);
          card.username = result.data.name;
          card.surname = result.data.surname;
          card.email = result.data.email;
        };
        fetchData();
      }, []);
    }
    cards.push(card);
  } else if (data != null && cardstatus == "Accepted") {
    statusArr = data.accepted_participant;
  } else if (data != null && cardstatus == "Declined") {
    statusArr = data.declined_participant;
  }

  return (
    <>
      <h1>REQUEST</h1>
      <Navbar value={cardstatus} setValue={setcardStatus} />
      {cards.map((card) => (
        <div key={card.username}>
          <h2>
            {card.username} {card.surname}
          </h2>
          <p></p>
        </div>
      ))}
    </>
  );
}
