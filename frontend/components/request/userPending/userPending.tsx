"use client";

import { useEffect } from "react";
import { useState } from "react";
import { Button } from "@mui/material";
import { useRouter } from "next/router";
import {
  acceptBookingById,
  declineBookingById,
  getAllBookings,
} from "@/services/bookingService";
import { UserCardInterface } from "@/interfaces/UserCardInterface";
import { getUserById } from "@/services/userService";
import Link from "next/link";
import { getProgramById, updateProgramById } from "@/services/programService";
import { UserInterface } from "@/interfaces/UserInterface";

var programName = "";
export default function userPending() {
  const [userCards, setuserCards] = useState<[UserCardInterface]>([
    {
      bookingId: "",
      userId: "",
      name: "",
      surname: "",
      request: "",
      phoneNumber: "",
    },
  ]);
  const router = useRouter();
  const { programId } = router.query;
  // console.log(programId);

  async function fetchData() {
    var userArr: any = [];
    var requestArr: any = [];
    var bookingIdArr: any = [];
    var usercards: any = [];
    const response = await getAllBookings();
    // console.log(response.data);
    for (let i = 0; i < response.data.length; i++) {
      if (
        response.data[i].program._id.toString().trim() === programId &&
        response.data[i].status === "pending"
      ) {
        programName = response.data[i].program.name;
        userArr.push(response.data[i].user._id);
        requestArr.push(response.data[i].request);
        bookingIdArr.push(response.data[i]._id);
      }
    }

    for (let i = 0; i < userArr.length; i++) {
      const usercard: UserCardInterface = {
        bookingId: "",
        userId: "",
        name: "",
        surname: "",
        request: "",
        phoneNumber: "",
      };
      const response = await getUserById(userArr[i]);

      usercard.bookingId = bookingIdArr[i];
      usercard.userId = response.data._id;
      usercard.name = response.data.name;
      usercard.surname = response.data.surname;
      usercard.request = requestArr[i];
      usercard.phoneNumber = response.data.phoneNumber;

      usercards.push(usercard);
    }
    // console.log(usercards);
    setuserCards(usercards);
  }
  // console.log(userCards);

  const statusChange = async (bookingId: string, status: string) => {
    if (status === "accepted") {
      const res = await acceptBookingById(bookingId);
      console.log(res.data)
      const programid = res.data.program._id;

      const program = await getProgramById(programid);
      const num_participant = program.data.num_participant + 1;
      const response = await updateProgramById(programid, {
        num_participant: num_participant,
      });
      console.log("eeee")
      console.log(response);
    } else if (status === "declined") {
      const res = declineBookingById(bookingId);
      // console.log(res);
    }
    await fetchData();
  };

  useEffect(() => {
    fetchData();
  }, []);
  // console.log(programName);

  return (
    <div>
      <nav
        style={{
          display: "flex",
        }}
      >
        <Link href="/request" passHref>
          <button type="button">Back</button>
        </Link>
        <h2
          style={{
            alignItems: "center",
            textAlign: "center",
            margin: "auto",
            alignSelf: "center",
          }}
        >
          {programName}
        </h2>
        <div> All ({userCards.length})</div>
      </nav>
      {userCards.length > 0 ? (
        <div>
          {userCards.map((user: any) => (
            <div key={user.userId}>
              <div>
                {user.name} {user.surname}
              </div>
              <div>Tel: {user.phoneNumber}</div>
              <div>Request: </div>
              <div>{user.request}</div>
              <Button
                type="button"
                variant="outlined"
                onClick={() => statusChange(user.bookingId, "declined")}
              >
                DECLINED
              </Button>
              <Button
                type="button"
                variant="contained"
                onClick={() => statusChange(user.bookingId, "accepted")}
              >
                ACCEPT
              </Button>
              <p>---------------------------------------------------------</p>
            </div>
          ))}
        </div>
      ) : (
        <div>
          Looks like there are no more requests for this trip. Please return to
          the Request page
        </div>
      )}
    </div>
  );
}
