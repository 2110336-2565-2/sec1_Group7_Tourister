"use client";

import { Fragment, useEffect } from "react";
import { useState } from "react";
import { Button, CircularProgress, Stack } from "@mui/material";
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
export default function userPending() {
  const [userCards, setuserCards] = useState<[UserCardInterface]>([
    // {
    //   bookingId: "",
    //   userId: "",
    //   name: "",
    //   surname: "",
    //   request: "",
    //   phoneNumber: "",
    // },
  ]);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const router = useRouter();
  const { programId } = router.query;
  // console.log(programId);
  var isDraft = false;
  async function fetchData() {
    var userArr: any = [];
    var requestArr: any = [];
    var bookingIdArr: any = [];
    var usercards: any = [];
    const response = await getAllBookings();
    const bookings = response.data || [];
    console.log("eeee");
    console.log(response.data);
    const pending = bookings.filter((booking) => {
      const status = booking.status;
      return status == "pending";
    });
    console.log(pending);

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
      console.log(res.data);
    } else if (status === "declined") {
      const res = declineBookingById(bookingId);
      // console.log(res);
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
        // borderBottom: `2px solid ${COLOR.paleblue}`,
        padding: "1em 1em 0.25em 0.25em ",
      }}
    >
      {/* {userCards.length > 0 ? ( */}
      <div>
        <nav
          style={{
            display: "flex",
          }}
        >
          <Link
            href="/request"
            passHref
            style={{ transform: "translateX(60px) translateY(43px)" }}
          >
            {/* <button type="button">Back</button> */}
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
              // transform: "translateX(20px)"
            }}
          >
            {programName}
          </h2>

          <div
            style={{
              transform: "translateX(-50px) translateY(50px)",
            }}
          >
            All({userCards.length})
          </div>
        </nav>
      </div>
      <hr
        style={{
          border: "1px solid",
          borderColor: COLOR.paleblue,
          width: "100%",
        }}
      />
      <div>
        {userCards.length > 0 ? (
          <div>
            {userCards.map((user: any) => (
              <div key={user.userId}>
                {isDraft ? (
                  <button type="button">
                    <DriveFileRenameOutlineIcon />
                  </button>
                ) : (
                  <Fragment />
                )}
                <div style={{ display: "inline-block", float: "left" }}>
                  <Image
                    style={{ marginLeft: "auto", marginRight: "auto" }}
                    // alt={singleOption.label}
                    src={tourist}
                    width={50}
                    height={50}
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
                    <table>
                      <tbody>
                        <tr>
                          <td
                            style={{
                              fontWeight: "bold",
                              transform: "translateY(-15px) translateX(10px)",
                            }}
                          >
                            {user.name} {user.surname}
                          </td>
                        </tr>
                        <tr>
                          <td
                            style={{
                              fontWeight: "lighter",
                              transform: "translateY(-15px) translateX(10px)",
                            }}
                          >
                            Tel: {user.phoneNumber}
                          </td>
                        </tr>
                        {/* <div>Request</div> */}
                        <div>{user.request}</div>
                        <Button
                          type="button"
                          variant="outlined"
                          onClick={() =>
                            statusChange(user.bookingId, "declined")
                          }
                          style={{
                            // alignSelf: "center",
                            transform: "translateX(-10px)",
                            borderRadius: "10px",
                            borderColor: COLOR.background,
                            margin: "4px 10px",
                            color: COLOR.background,
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
                            // alignSelf: "center",
                            transform: "translateX(-10px)",
                            borderRadius: "10px",
                            margin: "4px 10px",
                          }}
                        >
                          ACCEPT
                        </Button>
                      </tbody>
                    </table>
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
          // </div>
        )}
      </div>
      {/* ); */}
    </div>
  );
}
