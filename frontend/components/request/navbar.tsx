"use client";

import React from "react";
import { useState, useEffect } from "react";
import Accepted from "./accepted/page";
import { ProgramInterface } from "@/interfaces/ProgramInterface";
import { UserCardInterface } from "@/interfaces/UserCardInterface";
import { getUserById } from "@/services/userService";
import axios from "axios";
import Link from "next/link";
import { Button, AppBar } from "@mui/material";

const API_URL = `http://localhost:2000/api/program`;
var data: any = [];

export default function Navbar({ value, setValue }: any) {
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
    // console.log(cardstatus);
    handleChange();
  };
  console.log(cardstatus);
  // console.log(data);

  var cards: UserCardInterface[] = [];
  if (cardstatus === "accepted") {
    // console.log(data);
    for (let program of data) {
      // console.log(program);
      var card: UserCardInterface = {};
      for (let userid of program.accepted_participant) {
        card.tripname = program.name;
        card.description = program.description;
        card.startdate = program.startDate;
        card.num_participant = program.num_participant;
        card.max_participant = program.max_participant;

        const res = axios.get(`http://localhost:2000/api/user/${userid}`);
        console.log(res.data);
        card.username = res.data.name;
        card.surname = res.data.surname;
        card.email = res.data.email;

        // fillUser(userid);
        // console.log(userInfo.name);

        // card.username = userInfo.name;
        // console.log(card.username);
        // card.surname = userInfo.surname;
        // console.log(card.surname);
        // card.email = userInfo.email;
        // console.log(card.email);

        cards.push(card);
      }
    }
    // console.log(cards);
    var allCards = [];
    for (let card of cards) {
      allCards.push(
        <div className="card">
          <div id="card__username">
            {card.username} {card.surname}
          </div>
          <div id="card__email">Contact: {card.email}</div>
          <div id="card__description">Request: {card.description}</div>
          <div id="card__tripname">{card.tripname}</div>
          <div id="card__date">{card.startdate}</div>
          <div id="card__date">
            {card.num_participant}/{card.max_participant}
          </div>
        </div>
      );
    }
  } else if (cardstatus === "pending") {
    // console.log(data);
    for (let program of data) {
      // console.log(program);
      for (let user of program.pending_participant) {
        var card: UserCardInterface = {};
        card.tripname = program.name;
        card.description = program.description;
        card.startdate = program.startDate;
        card.num_participant = program.num_participant;
        card.max_participant = program.max_participant;

        // let res = await getUserById(user);
        // const resPromise = res.then((res) => res);
        // console.log(res.data);
        // card.username = resPromise.name;
        // console.log(card.username);
        // card.surname = res.surname;
        // card.email = res.email;
        // card.userID = res._id;
        // cards.push(card);
      }
    }
    // console.log(cards);
    var allCards = [];
    for (let card of cards) {
      allCards.push(
        <div className="card">
          <div id="card__username">
            {card.username} {card.surname}
          </div>
          <div id="card__email">Contact: {card.email}</div>
          <div id="card__description">Request: {card.description}</div>
          <div id="card__tripname">{card.tripname}</div>
          <div id="card__date">{card.startdate}</div>
          <div id="card__date">
            {card.num_participant}/{card.max_participant}
          </div>
        </div>
      );
    }
  }
  if (cardstatus === "declined") {
    // console.log(data);
    for (let program of data) {
      // console.log(program);
      for (let user of program.declined_participant) {
        var card: UserCardInterface = {};
        card.tripname = program.name;
        card.description = program.description;
        card.startdate = program.startDate;
        card.num_participant = program.num_participant;
        card.max_participant = program.max_participant;

        // let res = getUserById(user);
        // const resPromise = res.then((res) => res);
        // console.log(resPromise);
        // card.username = resPromise.name;
        // console.log(card.username);
        // card.surname = res.surname;
        // card.email = res.email;
        // card.userID = res._id;
        // cards.push(card);
      }
    }
    // console.log(cards);
    var allCards = [];
    for (let card of cards) {
      allCards.push(
        <div className="card">
          <div id="card__username">
            {card.username} {card.surname}
          </div>
          <div id="card__email">Contact: {card.email}</div>
          <div id="card__description">Request: {card.description}</div>
          <div id="card__tripname">{card.tripname}</div>
          <div id="card__date">{card.startdate}</div>
          <div id="card__date">
            {card.num_participant}/{card.max_participant}
          </div>
        </div>
      );
    }
  }

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
      <div>{allCards}</div>
    </div>
  );
}
