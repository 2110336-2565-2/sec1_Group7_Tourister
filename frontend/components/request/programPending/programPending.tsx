"use client";

import { useEffect, ChangeEvent } from "react";
import { useState } from "react";
import Link from "next/link";
import {
  getAllProgramsFromGuide,
  getProgramById,
} from "@/services/programService";
import { getAllBookings } from "@/services/bookingService";
import { UserInterface } from "@/interfaces/UserInterface";
import { ProgramInterface } from "@/interfaces/ProgramInterface";
import { ProgramCardForGuide } from "@/components/program/ProgramCardForGuide";
import { CalendarMonth, LocationOnOutlined } from "@mui/icons-material";
import { COLOR } from "@/theme/globalTheme";
// import { Chip } from "@mui/material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Chip,
  colors,
  autocompleteClasses,
  Button,
  CircularProgress,
  Stack,
} from "@mui/material";

export default function programPending() {
  // const [guideId, setGuideid] = useState<String>("0");
  let guide: UserInterface;
  if (typeof window !== "undefined") {
    guide = JSON.parse(localStorage.getItem("user") || "{}");
  } else {
    guide = JSON.parse(
      `{"name":"Name","surname":"Surname","remainingAmount":0,"isGuide":"true"}`
    );
  }
  const guideId = guide._id!;
  const [programs, setPrograms] = useState<ProgramInterface[]>([]);
  const [loading, setLoading] = useState(true);

  var programArr: any = [];
  const programPendingDict: { [key: string]: [string] } = {};

  async function fetchData() {
    setLoading(true);
    const response = await getAllBookings();
    const programOfGuide = await getAllProgramsFromGuide(
      guideId.toString().trim()
    );
    console.log(response);
    console.log("eeeee");
    let programOfGuideArr: any = [];
    for (let i = 0; i < programOfGuide.data.length; i++) {
      programOfGuideArr.push(programOfGuide.data[i]._id);
    }
    console.log(programOfGuideArr);
    console.log(response.data.length);
    for (let i = 0; i < response.data.length; i++) {
      // console.log(i);
      // console.log(
      //   response.data[i].program._id.toString().trim(),
      //   programOfGuideArr
      // );
      // console.log(
      //   programOfGuideArr.includes(
      //     response.data[i].program._id.toString().trim()
      //   )
      // );
      if (
        response.data[i].status === "pending" &&
        programOfGuideArr.includes(
          response.data[i].program._id.toString().trim()
        )
      ) {
        console.log("yes");
        if (response.data[i].program._id in programPendingDict) {
          programPendingDict[response.data[i].program._id].push(
            response.data[i].user._id
          );
        } else {
          programPendingDict[response.data[i].program._id] = [
            response.data[i].user._id,
          ];
        }
      }
    }
    // console.log("jjjj");
    // console.log(programPendingDict);
    for (const [key, value] of Object.entries(programPendingDict)) {
      // console.log(`${key}: ${value}`);
      const response = await getProgramById(key);
      // console.log(response.data);
      response.data.num_pending = value.length;
      programArr.push(response.data);
      // console.log(programArr);
    }
    setPrograms(programArr);
    console.log(programs);
    setLoading(false);
    // console.log(response.data);
  }
  useEffect(() => {
    fetchData();
  }, []);

  console.log(programs);

  const startDateTime = new Date(programs.startDate);
  const endDateTime = new Date(programs.endDate);
  const formattedStartDate = startDateTime.toLocaleDateString("en-GB", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
  const formattedEndDate = endDateTime.toLocaleDateString("en-GB", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  if (loading) {
    return (
      <>
        <Stack alignItems="center">
          <CircularProgress />
        </Stack>
      </>
    );
  }
  return (
    <div
      style={{
        // borderBottom: `2px solid ${COLOR.paleblue}`,
        padding: "1em 0em 0.25em 0em ",
        // padding: "2em 1em 0.25em 2em ",
      }}
    >
      <div
        style={{
          textAlign: "center",
          color: "black",
          margin: "0",
          paddingTop: "35px",
          paddingBottom: "20px",
          fontFamily: "sans-serif",
          fontSize: "30px",
          fontWeight: "900",
          textTransform: "uppercase",
        }}
      >
        Request
      </div>
      {programs.length > 0 ? (
        <div>
          {programs.map((program) => (
            <Link
              href={`/request/userPending/${program._id}`}
              key={program._id}
              style={{ textDecoration: "none" }}
            >
              <div style={{ display: "inline-block", float: "left" }}>
                {program.dayTrips && program.dayTrips[0] ? (
                  <img
                    src={`data:image/jpeg;base64,${program.dayTrips[0].attractions[0].file}`}
                    alt="first-img-of-trip"
                    style={{
                      width: "75px",
                      height: "75px",
                      padding: "0px 10px",
                      paddingTop: "20px",
                      borderRadius: 12,
                      transform: "translateX(20px)",
                    }}
                  />
                ) : (
                  <img
                    src={
                      "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/15/33/fb/5c/pattaya.jpg?w=700&h=500&s=1"
                    }
                    alt="first-img-of-trip"
                    style={{
                      width: "75px",
                      height: "75px",
                      padding: "0px 10px",
                      paddingTop: "20px",
                      borderRadius: 12,
                      transform: "translateX(20px)",
                    }}
                  />
                )}
              </div>
              <div
                key={program._id}
                style={{
                  height: "220px",
                  width: "100%",
                  // border: `10px solid ${COLOR.paleblue}`,
                  borderBottom: `2px solid ${COLOR.paleblue}`,
                  paddingTop: "10px",
                }}
              >
                <ul>
                  <div
                    style={{
                      color: "black",
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
                              transform: "translateY(-15px) translateX(30px)",
                            }}
                          >
                            {program.name}
                          </td>
                        </tr>
                        <tr>
                          <td
                            style={{
                              transform: "translateY(-10px) translateX(20px)",
                            }}
                          >
                            <Chip
                              icon={<LocationOnOutlined />}
                              size="small"
                              sx={{
                                backgroundColor: COLOR.paleblue,
                                color: COLOR.text,
                                borderRadius: 10,
                                margin: "2px 8px",
                                padding: "2px 8px",

                                "& .MuiChip-icon": {
                                  width: "15px",
                                  height: "15px",
                                },
                              }}
                              label={program.province}
                            />
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <br></br>
                  <br></br>
                  <br></br>
                  <br></br>

                  <div
                    style={{
                      display: "inline-block",
                      color: "black",
                      transform: "translateX(-20px)",
                    }}
                  >
                    <>
                      <CalendarMonth
                        style={{
                          color: COLOR.primary,
                          padding: "0px 10px",
                          transform: "translateY(5px)",
                        }}
                        fontSize="medium"
                      />
                      {new Date(program.startDate).toLocaleDateString("en-GB", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}{" "}
                      , {program.startTime} to
                    </>
                  </div>

                  <div
                    style={{
                      display: "inline-block",
                      color: "black",
                      transform: "translateX(-20px)",
                    }}
                  >
                    <>
                      <CalendarMonth
                        style={{
                          color: COLOR.background,
                          padding: "0px 10px",
                          transform: "translateY(5px)",
                        }}
                        fontSize="medium"
                      />
                      {new Date(program.endDate).toLocaleDateString("en-GB", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                      , {program.endTime}
                    </>
                  </div>
                  <div
                    style={{
                      // color: COLOR.primary,
                      transform: "translateY(-50px) translateX(-5px)",
                      margin: "0 16em",
                      display: "flex",
                      // textDecoration: "none",
                      // textDecorationLine: "none",
                    }}
                  >
                    <div
                      style={{
                        color: COLOR.primary,
                        backgroundColor: "transparent",
                        padding: "10px 24px 10px",
                        fontWeight: "bold",
                        border: "1px solid grey",
                        borderRadius: 10,
                        textAlign: "center",
                        // textDecoration: "none",
                        // textDecorationLine: "none",
                        letterSpacing: "1.5px",
                      }}
                    >
                      {program.num_participant}/{program.max_participant}
                    </div>
                  </div>
                  <div
                    style={{
                      width: "150px",
                      margin: "0 10em",
                      color: "black",
                      padding: "7px 24px 7px",
                      backgroundColor: COLOR.yellow,
                      borderRadius: "10px 0 0 0",
                      textAlign: "right",
                      fontWeight: "bold",
                      transform: "translateY(-35px) translateX(17px)",
                      // textDecoration: "none",
                      // textDecorationLine: "none",
                    }}
                  >
                    {program.num_pending} more request(s)
                  </div>
                </ul>
              </div>
            </Link>
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
          No requests yet! Keep checking back for new opportunities, or create
          new trip to attract interested tourists.
        </div>
      )}
    </div>
  );
}
