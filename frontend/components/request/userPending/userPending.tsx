"use client";

import { Fragment, useEffect } from "react";
import { useState } from "react";
import { Avatar, Button, CircularProgress, Stack } from "@mui/material";
import { useRouter } from "next/router";
import {
  acceptBookingById,
  declineBookingById,
  getAllBookings,
} from "@/services/bookingService";
import Image from "next/image";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import { UserCardInterface } from "@/interfaces/UserCardInterface";
import { getUserById } from "@/services/userService";
import Link from "next/link";
import { getProgramById, updateProgramById } from "@/services/programService";
import { UserInterface } from "@/interfaces/UserInterface";
import { COLOR } from "@/theme/globalTheme";
import { UserPendingCardForGuide } from "@/components/program/UserPendingCardForGuide";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import tourist from "../../../images/tourist.png";

var programName = "";
export default function UserPending() {
  const [userCards, setuserCards] = useState<UserCardInterface[]>([]);
  const router = useRouter();
  const { programId } = router.query;
  var isDraft = false;
  async function fetchData() {
    var userArr: any = [];
    var requestArr: any = [];
    var bookingIdArr: any = [];
    var usercards: any = [];
    const response = await getAllBookings();
    const bookings = response.data || [];

    const pending = bookings.filter((booking) => {
      const status = booking.status;
      return status == "pending";
    });

    for (let i = 0; i < response.data!.length; i++) {
      if (
        response.data![i].program!._id!.toString().trim() === programId &&
        response.data![i].status === "pending"
      ) {
        programName = response.data![i].program!.name;
        userArr.push(response.data![i].user!._id);
        requestArr.push(response.data![i].request);
        bookingIdArr.push(response.data![i]._id);
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
        image: ""
      };
      const response = await getUserById(userArr[i]);

      usercard.bookingId = bookingIdArr[i];
      usercard.userId = response.data!._id!;
      usercard.name = response.data!.name;
      usercard.surname = response.data!.surname;
      usercard.request = requestArr[i];
      usercard.phoneNumber = response.data!.phoneNumber;
      usercard.image = response.data!.image!;

      usercards.push(usercard);
    }
    setuserCards(usercards);
  }

  const statusChange = async (bookingId: string, status: string) => {
    if (status === "accepted") {
      const res = await acceptBookingById(bookingId);
      console.log(res.data);
    } else if (status === "declined") {
      const res = declineBookingById(bookingId);
    }
    await fetchData();
  };

  useEffect(() => {
    fetchData();
  }, []);
  console.log(userCards);

  // if (userCards.length <= 0) {
  //   return (
  //     <>
  //       <Stack alignItems="center">
  //         <CircularProgress />
  //       </Stack>
  //     </>
  //   );
  // }

  return (
    <div
      style={{
        padding: "1em 0em 0.25em 0em",
        // border: "2px solid"
      }}
    >
      <nav
        style={{
          display: "flex",
        }}
      >
        <Link
          href="/request"
          passHref
          style={{ transform: "translateX(70px) translateY(40px)" }}
        >
          <button
            style={{
              margin: ".3rem 0px 0px 0px",
              background: "white",
              border: "0px",
              transform: "translate(-2.3rem,.3rem)",
            }}
            type="button"
          >
            <ChevronLeftIcon />
          </button>
        </Link>
        <h2
          style={{
            alignItems: "center",
            textAlign: "center",
            margin: "auto",
            alignSelf: "center",
            paddingBottom: "45px",
            paddingTop: "45px",
            fontWeight: "bold",
          }}
        >
          {programName}
        </h2>

        <div
          style={{
            transform: "translateX(-50px) translateY(90px)",
          }}
        >
          All({userCards.length})
        </div>
      </nav>

        <hr 
          style={{
            margin: 0,
            borderTop: `2px solid ${COLOR.paleblue}`,
          }}
        />

        {userCards.length > 0 ? (
          <div>
            {userCards.map((user: any) => (
              <div 
                key={user.userId}
                style={{
                  display: "block",
                  overflow: "auto",
                  width: "100%",
                  borderBottom: `1px solid grey`,

                  // padding: "2em 1em 0.25em 2em ",
                  padding: "2em 0em 0.25em 0em ",
                }}
              >
                {isDraft ? (
                  <button type="button">
                    <DriveFileRenameOutlineIcon />
                  </button>
                ) : (
                  <Fragment />
                )}
                <div style={{ display: "inline-block", float: "left", transform: "translateX(25px)" }}>
                  {/* <Image
                    style={{ marginLeft: "auto", marginRight: "auto" }}
                    // alt={singleOption.label}
                    src={tourist}
                    width={50}
                    height={50}
                  /> */}
                  <Avatar
                    style={{ marginLeft: "auto", marginRight: "auto", width:"50",height:"50" }}
                    src={user.image?(`data:image/png;base64,${user.image}`):("https://cdn-icons-png.flaticon.com/512/3061/3061221.png")}
                  />
                </div>
                <div>
                  <div
                    style={{
                      display: "inline-block",
                      float: "left",
                      padding: "10px",
                    }}
                  >
                    <tr>
                      <td
                        style={{
                          fontWeight: "bold",
                          transform: "translateY(-15px) translateX(35px)",
                        }}
                      >
                        {user.name} {user.surname}
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          fontWeight: "lighter",
                          transform: "translateY(-15px) translateX(35px)",
                        }}
                      >
                        Tel: {user.phoneNumber}
                      </td>
                    </tr>
                    
                    <div 
                      style={{
                        overflow: "auto",
                        margin: "10px 0px 2px 0px",
                        paddingLeft: "10px",
                        transform: "translateY(-10px) translateX(-40px)",
                      }}
                    >
                      {user.request}
                    </div>
                    
                    <Button
                      type="button"
                      variant="outlined"
                      onClick={() =>
                        statusChange(user.bookingId, "declined")
                      }
                      style={{
                        display: "inline-block",
                        height: 35,
                        width: 100,
                        fontSize: "15px",
                        fontWeight: "bold",
                        borderRadius: "10px",
                        borderColor: COLOR.background,
                        margin: "4px 10px",
                        marginBottom: "10px",
                        color: COLOR.background,
                        transform: "translateX(25px)"
                      }}
                    >
                      DECLINED
                    </Button>
                    <Button
                      type="button"
                      variant="contained"
                      onClick={() =>
                        statusChange(user.bookingId, "accepted")
                      }
                      style={{
                        display: "inline-block",
                        height: 35,
                        width: 100,
                        fontSize: "15px",
                        borderRadius: "10px",
                        margin: "4px 10px",
                        marginBottom: "10px",
                        transform: "translateX(25px)"
                      }}
                    >
                      ACCEPT
                    </Button>
                  </div>
                </div>

                <br></br>
                <br></br>
                <br></br>
                <br></br>
              </div>
            ))}
          </div>
        ) : (
          <div
            style={{
              margin: "auto",
              color: "grey",
              textAlign: "center",
            }}
          >
            Looks like there are no more requests for this trip. Please return
            to the Request page
          </div>
        )}
    </div>
  );
}
