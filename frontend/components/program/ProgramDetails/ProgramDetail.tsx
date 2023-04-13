import { ProgramInterface } from "@/interfaces/ProgramInterface";
import { FC } from "react";
import { COLOR } from "@/theme/globalTheme";
import { useQuery } from "@tanstack/react-query";
import {
  RefetchOptions,
  RefetchQueryFilters,
  QueryObserverResult,
} from "@tanstack/react-query";

import { useState } from "react";
import { UserCardInterface } from "@/interfaces/UserCardInterface";
import { ApiResponseInterface } from "@/interfaces/ApiResponsetInterface";
import {
  BookingInterface,
  BookingStatusInterface,
} from "@/interfaces/BookingInterface";
import {
  getAllBookingsInProgram,
  createBooking,
  deleteBookingById,
} from "@/services/bookingService";

import {
  ExpandMore,
  ChevronLeft,
  CalendarMonth,
  LocationOnOutlined,
  PeopleAltOutlined,
  LanguageOutlined,
  Padding,
} from "@mui/icons-material";
import MapOutlinedIcon from "@mui/icons-material/MapOutlined";

import { Timeline } from "@mui/lab";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineDot from "@mui/lab/TimelineDot";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import Typography from "@mui/material/Typography";

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
import ImageSlider from "@/components/program/ProgramDetails/ImageSlider";

import ScheduleDetail from "@/components/program/ProgramDetails/ScheduleDetail";
import ParticipantsDetail from "@/components/program/ProgramDetails/ParticipantsDetail";
import { format } from "date-fns";

import { useAuth } from "@/components/AuthProvider";
import { AuthContextInterface } from "@/interfaces/AuthContextInterface";

import Swal from "sweetalert2";

import React, { createContext } from "react";

export const StageContext = createContext(0);

const iconStyle = {
  color: COLOR.disable,
  padding: "0px 10px",
  transform: "translateY(5px)",
};

interface IProgramDetailProps {
  program: ProgramInterface;
  bookings?: BookingInterface[];
  onGoBack: () => void;
  refetchBooking: <TPageData>(
    options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined
  ) => Promise<
    QueryObserverResult<
      ApiResponseInterface<BookingInterface[]> | null,
      unknown
    >
  >;
}

const ProgramDetail: FC<IProgramDetailProps> = ({
  program,
  bookings = [],
  onGoBack,
  refetchBooking,
}) => {
  const authUserData: AuthContextInterface = useAuth();

  if (!program) {
    return (
      <>
        <Stack alignItems="center">
          <CircularProgress />
        </Stack>
      </>
    );
  }

  const user = authUserData.user;
  const isGuide: boolean = user?.isGuide!;
  const userId: string = user?._id!;
  const programId = program._id!;

  console.log("program",program);
  // console.log(program);

  const touristBookingStatus = bookings.find(
    (booking) => booking.user?._id === userId
  )?.status!;
  console.log(touristBookingStatus);

  const acceptedBookings = bookings.filter((booking) => {
    return booking.status === "accepted";
  });

  const startDateTime = new Date(program.startDate);
  const endDateTime = new Date(program.endDate);
  const formattedStartDate = format(startDateTime, "dd MMM yyyy");
  const formattedEndDate = format(endDateTime, "dd MMM yyyy");

  const generateButton = (status: BookingStatusInterface | undefined) => {
    switch (status) {
      case "accepted":
        return (
          <Button
            variant="contained"
            sx={{
              width: "100%",
              fontSize: "1.3rem",
              backgroundColor: COLOR.success,
              "&.Mui-disabled": {
                backgroundColor: COLOR.success,
                color: "white",
              },
            }}
            disabled
          >
            Accepted!
          </Button>
        );
      case "pending":
        return (
          <Button
            variant="contained"
            sx={{
              width: "100%",
              fontSize: "1.3rem",
              backgroundColor: COLOR.yellow,
              "&.Mui-disabled": {
                backgroundColor: COLOR.yellow,
                color: "white",
              },
            }}
            onClick={handleCanCelClick}
          >
            Cancel Booking
          </Button>
        );
      default:
        return (
          <Button
            variant="contained"
            sx={{ width: "100%", fontSize: "1.3rem" }}
            onClick={handleBookingClick}
          >
            Booking
          </Button>
        );
    }
  };

  const handleBookingClick = async () => {
    Swal.fire({
      title: "Please wait...",
      allowOutsideClick: false,
      allowEscapeKey: false,
      showConfirmButton: false,
      willOpen: () => {
        Swal.showLoading();
      },
    });
    try {
      const res = await createBooking(
        { user: user, program: program },
        programId
      );
      Swal.close();
      Swal.fire({
        title: "Booking requested!",
        icon: "success",
        timer: 2000,
      });
    } catch (err: any) {
      console.log(err);
      Swal.close();
      Swal.fire({
        text: err.message,
        icon: "error",
        timer: 2000,
      });
    }
    refetchBooking();
  };

  const handleCanCelClick = async () => {
    Swal.fire({
      title: "Please wait...",
      allowOutsideClick: false,
      allowEscapeKey: false,
      showConfirmButton: false,
      willOpen: () => {
        Swal.showLoading();
      },
    });
    try {
      const bookingId = bookings.find((booking) => booking.user?._id === userId)
        ?._id!;

      const res = await deleteBookingById(bookingId);
      Swal.close();
      Swal.fire({
        text: "Booking cancelled!",
        icon: "success",
        timer: 2000,
      });
    } catch (err: any) {
      console.log(err);
      Swal.close();
      Swal.fire({
        text: err.message,
        icon: "error",
        timer: 2000,
      });
    }
    refetchBooking();
  };

  return (
    <>
      {/* Back button*/}
      <button
        style={{
          padding: `0.5rem 1rem`,
          backgroundColor: "transparent",
          border: "0px",
        }}
        type="button"
        onClick={onGoBack}
      >
        <ChevronLeft style={{ fontSize: "1.5rem", color: "gray" }} />
      </button>

      {/* Location Slideshow */}
      <ImageSlider dayTrips={program.dayTrips!} />

      {/*----------program description----------- */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
          gap: "0.2rem",
          paddingInline: "5%",
          marginTop: "1rem",
          marginBottom: "1.5rem",
        }}
      >
        <div style={{ fontSize: "1.5rem", marginBottom: "0.7rem" }}>
          {program.name}
        </div>
        <Chip
          icon={<LocationOnOutlined />}
          size="small"
          sx={{
            backgroundColor: COLOR.paleblue,
            color: COLOR.text,
            borderRadius: 10,
            // margin: "2px 2px",
            padding: "2px 8px",

            "& .MuiChip-icon": {
              width: "15px",
              height: "15px",
            },
          }}
          label={program.province}
        />

        <div>
          <CalendarMonth
            style={{ ...iconStyle, color: COLOR.primary }}
            fontSize="medium"
          />
          {`${formattedStartDate}, ${program.startTime}`} -{" "}
          {`${formattedEndDate}, ${program.endTime}`}{" "}
        </div>

        <div style={{ color: COLOR.text }}>
          <PeopleAltOutlined style={{ ...iconStyle }} fontSize="medium" />
          {program.num_participant} / {program.max_participant}
        </div>

        <div style={{ color: COLOR.text }}>
          <LanguageOutlined style={{ ...iconStyle }} fontSize="medium" />
          {program.language?.join("/")}
        </div>
      </div>

      <Accordion style={{ paddingInline: "2.5%" }}>
        <AccordionSummary expandIcon={<ExpandMore />}>
          <h3>Description</h3>
        </AccordionSummary>
        <AccordionDetails style={{ marginTop: "-3rem", color: COLOR.text }}>
          <p>{program.description}</p>
        </AccordionDetails>
      </Accordion>

      {/*----------program schedule----------- */}
      <Accordion style={{ paddingInline: "2.5%" }}>
        <AccordionSummary expandIcon={<ExpandMore />}>
          <h3>Schedule</h3>
        </AccordionSummary>

        <AccordionDetails style={{ marginTop: "-1.5rem", paddingLeft: "7.5%" }}>
          {/* render schedule component */}

          {/* Meeting point version timeline */}
          <Timeline
            style={{margin:`0rem 0rem 1.5rem 0rem`, padding:"0"}}
            sx={{
              "& .MuiTimelineItem-root:before": {
                padding: 0,
                margin: 0,
                flex: 0
              }
            }}
          >

            <TimelineItem>
              <TimelineSeparator>
                <TimelineDot style={{padding:"0.4rem",background:COLOR.primary}}>
                  <LocationOnOutlined style={{color:"white"}}/>
                </TimelineDot>
                <TimelineConnector/>
              </TimelineSeparator>
              <TimelineContent sx={{py:"1.05rem"}}>
                <Typography variant="h6" component="span">{program.startTime}&nbsp;&nbsp;•&nbsp;&nbsp;Meeting Point</Typography>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "flex-start",
                    marginTop: "0.5rem",
                    // marginBottom: "0.5rem",
                  }}
                >
                  <div>{program.meetLocation}</div>
                  <Chip
                    icon={<LocationOnOutlined />}
                    size="small"
                    sx={{
                      backgroundColor: COLOR.paleblue,
                      color: COLOR.text,
                      borderRadius: 10,
                      margin: "3px 0px",
                      padding: "2px 8px",
                      "& .MuiChip-icon": {
                        width: "15px",
                        height: "15px",
                      },
                    }}
                    label={program.meetProvince}
                  />
                  {program.descriptionOfMeetLocation && (
                    <div style={{ fontSize: "0.85rem", color: COLOR.text }}>
                      {program.descriptionOfMeetLocation}
                    </div>
                  )}
                </div>
              </TimelineContent>
            </TimelineItem>

            <TimelineItem>
              <TimelineSeparator>
                <TimelineDot style={{padding:"0.4rem",background:"lightcyan"}}>
                  <MapOutlinedIcon style={{color:"dimgray"}}/>
                </TimelineDot>
                <TimelineConnector/>
              </TimelineSeparator>
              <TimelineContent sx={{py:"1.05rem"}}>
                <Typography variant="h6" component="span">Attractions / Activities</Typography>
                <ScheduleDetail program={program} dayTrips={program.dayTrips!} />
              </TimelineContent>
            </TimelineItem>

            {/* <ScheduleDetail program={program} dayTrips={program.dayTrips!} /> */}

            <TimelineItem>
              <TimelineSeparator>
                <TimelineDot style={{padding:"0.4rem",background:COLOR.primary}}>
                  <LocationOnOutlined style={{color:"white"}}/>
                </TimelineDot>
                <TimelineConnector/>
              </TimelineSeparator>
              <TimelineContent sx={{py:"1.05rem"}}>
                <Typography variant="h6" component="span">{program.endTime}&nbsp;&nbsp;•&nbsp;&nbsp;Return Point</Typography>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "flex-start",
                    marginTop: "0.5rem",
                    // marginBottom: "0.5rem",
                  }}
                >
                  <div>{program.endLocation}</div>
                  <Chip
                    icon={<LocationOnOutlined />}
                    size="small"
                    sx={{
                      backgroundColor: COLOR.paleblue,
                      color: COLOR.text,
                      borderRadius: 10,
                      margin: "3px 0px",
                      padding: "2px 8px",
                      "& .MuiChip-icon": {
                        width: "15px",
                        height: "15px",
                      },
                    }}
                    label={program.endProvince}
                  />
                  {program.descriptionOfEndLocation && (
                    <div style={{ fontSize: "0.85rem", color: COLOR.text }}>
                      {program.descriptionOfEndLocation}
                    </div>
                  )}
                </div>
              </TimelineContent>
            </TimelineItem>

          </Timeline>

          {/* ======Old version (without timeline)========= */}

          {/* <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-start",
              alignItems: "center",
            }}
          >
            <LocationOnOutlined
              style={{
                padding: "0.5rem",
                width: "1.5rem",
                height: "1.5rem",
                borderRadius: "50%",
                backgroundColor: COLOR.primary,
                color: "white",
              }}
            />
            <h3 style={{ paddingLeft: "2.5%" }}>{program.startTime}</h3>
            <h3 style={{ paddingLeft: "2.5%" }}>Meeting Point</h3>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "flex-start",
              paddingLeft: "15%",
              marginTop: "-0.5rem",
              marginBottom: "0.5rem",
            }}
          >
            <div>{program.meetLocation}</div>
            <Chip
              icon={<LocationOnOutlined />}
              size="small"
              sx={{
                backgroundColor: COLOR.paleblue,
                color: COLOR.text,
                borderRadius: 10,
                margin: "3px 0px",
                padding: "2px 8px",
                "& .MuiChip-icon": {
                  width: "15px",
                  height: "15px",
                },
              }}
              label={program.meetProvince}
            />
            {program.descriptionOfMeetLocation && (
              <div style={{ fontSize: "0.85rem", color: COLOR.text }}>
                {program.descriptionOfMeetLocation}
              </div>
            )}
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-start",
              alignItems: "center",
            }}
          >
            <MapOutlinedIcon
              style={{
                padding: "0.5rem",
                width: "1.5rem",
                height: "1.5rem",
                borderRadius: "50%",
                backgroundColor: "lightcyan",
                color: "dimgray",
              }}
            />
            <h3 style={{ paddingLeft: "2.5%" }}>Attractions / Activities</h3>
          </div>

          <ScheduleDetail program={program} dayTrips={program.dayTrips!} />

          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-start",
              alignItems: "center",
            }}
          >
            <LocationOnOutlined
              style={{
                padding: "0.5rem",
                width: "1.5rem",
                height: "1.5rem",
                borderRadius: "50%",
                backgroundColor: COLOR.primary,
                color: "white",
              }}
            />
            <h3 style={{ paddingLeft: "2.5%" }}>{program.endTime}</h3>
            <h3 style={{ paddingLeft: "2.5%" }}>Return Point</h3>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "flex-start",
              paddingLeft: "15%",
              marginTop: "-0.5rem",
              marginBottom: "0.5rem",
            }}
          >
            <div>{program.endLocation}</div>
            <Chip
              icon={<LocationOnOutlined />}
              size="small"
              sx={{
                backgroundColor: COLOR.paleblue,
                color: COLOR.text,
                borderRadius: 10,
                margin: "3px 0px",
                padding: "2px 8px",
                "& .MuiChip-icon": {
                  width: "15px",
                  height: "15px",
                },
              }}
              label={program.endProvince}
            />
            {program.descriptionOfEndLocation && (
              <div style={{ fontSize: "0.85rem", color: COLOR.text }}>
                {program.descriptionOfEndLocation}
              </div>
            )}
          </div> */}
        </AccordionDetails>
      </Accordion>
      {isGuide && (
        <Accordion style={{ paddingInline: "2.5%" }}>
          <AccordionSummary expandIcon={<ExpandMore />}>
            <h3>Participants</h3>
          </AccordionSummary>
          <AccordionDetails
            style={{
              marginTop: "-2.5rem",
              marginBottom: "0rem",
              color: COLOR.text,
            }}
          >
            <ParticipantsDetail bookings={acceptedBookings} />
          </AccordionDetails>
        </Accordion>
      )}
      {!isGuide && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            margin: "1em",
          }}
        >
          {{
            accepted: (
              <>
                <Button
                  variant="contained"
                  sx={{
                    width: "100%",
                    fontSize: "1.3rem",
                    backgroundColor: COLOR.success,
                    "&.Mui-disabled": {
                      backgroundColor: COLOR.success,
                      color: "white",
                    },
                  }}
                  disabled
                >
                  Accepted!
                </Button>
              </>
            ),
            pending: (
              <>
                <Button
                  variant="contained"
                  sx={{
                    width: "100%",
                    fontSize: "1.3rem",
                    backgroundColor: COLOR.yellow,
                    "&.Mui-disabled": {
                      backgroundColor: COLOR.yellow,
                      color: "white",
                    },
                  }}
                  onClick={handleCanCelClick}
                >
                  Cancel Booking
                </Button>
              </>
            ),
            declined: (
              <>
                <Button
                  variant="contained"
                  sx={{
                    width: "100%",
                    fontSize: "1.3rem",
                    backgroundColor: COLOR.error,
                    "&.Mui-disabled": {
                      backgroundColor: COLOR.error,
                      color: "white",
                    },
                  }}
                  disabled
                >
                  Declined
                </Button>
              </>
            ),
          }[touristBookingStatus] || (
            <>
              <Button
                variant="contained"
                sx={{ width: "100%", fontSize: "1.3rem" }}
                onClick={handleBookingClick}
              >
                Book
              </Button>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default ProgramDetail;
