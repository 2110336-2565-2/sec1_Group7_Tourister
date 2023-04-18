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
import { Chip, CircularProgress, Stack } from "@mui/material";

export default function ProgramPending() {
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
    // console.log(response);
    // console.log("eeeee");
    let programOfGuideArr: any = [];
    for (let i = 0; i < programOfGuide.data!.length; i++) {
      programOfGuideArr.push(programOfGuide.data![i]._id);
    }
    console.log(programOfGuideArr);
    console.log(response.data!.length);
    for (let i = 0; i < response.data!.length; i++) {
      if (
        response.data![i].status === "pending" &&
        programOfGuideArr.includes(
          response.data![i].program!._id!.toString().trim()
        )
      ) {
        console.log("yes");
        if (response.data![i].program!._id! in programPendingDict) {
          programPendingDict[response.data![i].program!._id!].push(
            response.data![i].user!._id!
          );
        } else {
          programPendingDict[response.data![i].program!._id!] = [
            response.data![i].user!._id!,
          ];
        }
      }
    }
    for (const [key, value] of Object.entries(programPendingDict)) {
      const response = await getProgramById(key);
      response.data!.num_pending = value.length;
      programArr.push(response.data);
    }
    setPrograms(programArr);
    console.log(programs);
    setLoading(false);
  }
  useEffect(() => {
    fetchData();
  }, []);

  console.log(programs);

  // const startDateTime = new Date(programs[0].startDate);
  // const endDateTime = new Date(programs[0].endDate);
  // const formattedStartDate = startDateTime.toLocaleDateString("en-GB", {
  //   year: "numeric",
  //   month: "short",
  //   day: "numeric",
  // });
  // const formattedEndDate = endDateTime.toLocaleDateString("en-GB", {
  //   year: "numeric",
  //   month: "short",
  //   day: "numeric",
  // });

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
    <div>
      <div
        style={{
          textAlign: "center",
          color: "black",
          paddingTop: "35px",
          paddingBottom: "20px",
          fontFamily: "sans-serif",
          fontSize: "30px",
          fontWeight: "900",
          textTransform: "uppercase",
          // border: "2px solid black"
        }}
      >
        Request
      </div>
      {programs.length > 0 ? (
        <div style={{
          // border: "10px solid grey",
          borderBottom: "1px solid",
          borderColor: COLOR.paleblue,
        }}>
          <div 
            style={{
              display: "flex", 
              flexDirection: "column",
              paddingLeft: "2em",
              paddingTop: "0.2em"
            }}
          >
          {programs.map((program) => (
            <Link
              href={`/request/userPending/${program._id}`}
              key={program._id}
              style={{ textDecoration: "none" }}
            >
              <div style={{ 
                display: "flex",
                flexDirection: "row",
              }}>
                {program.dayTrips && program.dayTrips[0] ? (
                  <img
                    src={`data:image/jpeg;base64,${program.dayTrips[0].attractions[0].file}`}
                    alt="first-img-of-trip"
                    style={{
                      width: "75px",
                      height: "75px",
                      margin: "20px 10px 0px 0px",
                      borderRadius: 12,
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
                      margin: "20px 10px 0px 0px",
                      borderRadius: 12,
                    }}
                  />
                )}

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  marginLeft: "1em",
                  marginTop: "1em"
                }}
              >
                <div
                  key={program._id}
                >
                  <div
                    style={{
                      color: "black",
                      display: "flex",
                      flexDirection: "column",
                      padding: "10px",
                    }}
                  >
                    {program.name}
                    <Chip
                      icon={<LocationOnOutlined />}
                      size="small"
                      sx={{
                        backgroundColor: COLOR.paleblue,
                        color: COLOR.text,
                        borderRadius: 10,
                        padding: "2px 8px",
                        marginTop: "8px",
                        transform: "translateX(-5px)",

                        "& .MuiChip-icon": {
                          width: "15px",
                          height: "15px",
                        },
                      }}
                      label={program.province}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div
              style={{
                color: "black",
                display: "flex",
                flexDirection: "row",
                marginTop: "2em"
              }}
            >
              <>
                <CalendarMonth
                  style={{
                    color: COLOR.primary,
                    // padding: "0px 10px",
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

              {/* participants */}
              <div
                style={{
                  color: COLOR.primary,
                  backgroundColor: "transparent",
                  padding: "10px 24px 10px",
                  fontWeight: "bold",
                  border: "1px solid grey",
                  borderRadius: 10,
                  textAlign: "center",
                  letterSpacing: "1.5px",
                  marginRight: "2em", 
                  marginLeft: "auto",
                  transform: "translateY(10px)"
              }}
                >
                {program.num_participant}/{program.max_participant}
              </div>
            </div>

            <div
              style={{
                color: "black",
                display: "flex",
                flexDirection: "row",
                transform: "translateY(-10px)"
              }}
            >
              <>
                <CalendarMonth
                  style={{
                    color: COLOR.background,
                    // padding: "0px 10px",
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

            {/* requests left */}
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
                marginTop: "0.5em",
                marginRight: "0em",
                marginLeft: "auto",
              }}
            >
              {program.num_pending} more request(s)
            </div>

            </Link>
          ))}
          </div>
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
