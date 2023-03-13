"use client";
import { Button, Tab, Tabs, CircularProgress, Stack } from "@mui/material";
// import Button from '@mui/material-next/Button';
import * as React from "react";
import { useState, useEffect, useContext } from "react";
import Box from "@mui/material/Box";
import { COLOR } from "@/theme/globalTheme";
import {
  getAllProgramsFromGuide,
  getAllPrograms,
} from "@/services/programService";
import { ProgramCardForGuide } from "@/components/program/ProgramCardForGuide";
import { ProgramInterface } from "../../interfaces/ProgramInterface";
import Link from "next/link";
import { SecondaryButtonWhite } from "@/css/styling";
import styled from "styled-components";

import { useAuth } from "@/components/AuthProvider";
import { AuthContextInterface } from "@/interfaces/AuthContextInterface";

const UnFoundLabel = styled.p`
  margin: 0.7rem 1rem 0.5rem 1rem;
`;

interface LinkTabProps {
  label?: string;
  href?: string;
}

function LinkTab(props: LinkTabProps) {
  return (
    <Tab
      // sx={{ '&.Mui-selected': { borderBottom: '5px solid ${COLOR.primary}' } }}
      style={{
        // borderBottom: `4px solid ${COLOR.primary}`,
        textTransform: "capitalize",
        fontWeight: "bold",
      }}
      component="a"
      onClick={(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        event.preventDefault();
      }}
      {...props}
    />
  );
}

const Landing = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [ongoingTrips, setOngoingTrips] = useState<ProgramInterface[]>([]);
  const [upcomingTrips, setUpcomingTrips] = useState<ProgramInterface[]>([]);
  const [completeTrips, setCompleteTrips] = useState<ProgramInterface[]>([]);
  // const authUserData:AuthContextInterface = useAuth()
  // const userId:string = authUserData.user?._id!

  useEffect(() => {
    const guide = JSON.parse(localStorage.getItem("user") || "{}");
    const guideId = guide._id;
    //console.log(guideId);
    const fetchTripsData = async () => {
      setLoading(true);
      try {
        //const response = await getAllPrograms();
        const response = await getAllProgramsFromGuide(guideId, {
          sortBy: "date",
        });
        const programs = response.data || [];

        // get today's date
        const todayWithoutTime = new Date();
        todayWithoutTime.setHours(0, 0, 0, 0);
        // console.log(programs);
        // console.log(todayWithoutTime);

        // filter the programs based on their start and end dates
        const ongoingTrips = programs.filter((program) => {
          const startDate = new Date(program.startDate);
          const endDate = new Date(program.endDate);
          return startDate <= todayWithoutTime && endDate >= todayWithoutTime;
        });
        //console.log("OngoingTrips");
        //console.log(ongoingTrips);

        const upcomingTrips = programs.filter((program) => {
          const startDate = new Date(program.startDate);
          return startDate > todayWithoutTime;
        });
        //console.log("upcomingTrips");
        //console.log(upcomingTrips);

        const completeTrips = programs.filter((program) => {
          const endDate = new Date(program.endDate);
          return endDate < todayWithoutTime;
        });
        //console.log("completeTrips");
        //console.log(completeTrips);

        // set the filtered programs to the appropriate state
        setOngoingTrips(ongoingTrips);
        setUpcomingTrips(upcomingTrips);
        setCompleteTrips(completeTrips);
      } catch (error) {
        console.error(error);
      }
      setLoading(false);
    };
    fetchTripsData();
  }, []);

  const OngoingTrips = () => {
    return (
      <>
        {loading ? (
          <Stack alignItems="center">
            <CircularProgress />
          </Stack>
        ) : (
          <>
            {ongoingTrips.length > 0 ? (
              ongoingTrips.map((program) => (
                <ProgramCardForGuide
                  key={program._id}
                  program={program}
                  isComplete={false}
                />
              ))
            ) : (
              <>
                <UnFoundLabel>
                  You don't have any ongoing trips at the moment.{" "}
                </UnFoundLabel>
                <UnFoundLabel>
                  Keep creating and publishing trips for tourists to book and
                  enjoy!
                </UnFoundLabel>
              </>
            )}
          </>
        )}
      </>
    );
  };

  const UpcomingTrips = () => {
    return (
      <>
        {loading ? (
          <Stack alignItems="center">
            <CircularProgress />
          </Stack>
        ) : (
      <>
        {upcomingTrips.length > 0 ? (
          upcomingTrips.map((program) => (
            <ProgramCardForGuide
              key={program._id}
              program={program}
              isComplete={false}
            />
          ))
        ) : (
          <>
            <UnFoundLabel>No Upcoming Trips</UnFoundLabel>
            <UnFoundLabel>
              Don't worry though - there are always more adventures to be
              created!{" "}
            </UnFoundLabel>
            </>
            )}
          </>
        )}
      </>
    );
  };

  const CompleteTrips = () => {
    return (
      <>
        {loading ? (
          <Stack alignItems="center">
            <CircularProgress />
          </Stack>
        ) : (
      <>
        {completeTrips.length > 0 ? (
          completeTrips.map((program) => (
            <ProgramCardForGuide
              key={program._id}
              program={program}
              isComplete={true}
            />
          ))
        ) : (
          <>
            <UnFoundLabel>
              Keep creating amazing trips for tourists.
            </UnFoundLabel>
            <UnFoundLabel>They'll show up in this tab soon!</UnFoundLabel>
            </>
            )}
          </>
        )}
      </>
    );
  };

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
  };

  return (
    <>
      <Box sx={{ width: "100%" }}>
        <SecondaryButtonWhite
          href="/trips/createTrip"
          variant="contained"
          style={{
            transform: "translateY(-30px)",
            margin: "0 auto",
            display: "flex",
          }}
        >
          New Trips
        </SecondaryButtonWhite>
        <Tabs
          value={selectedTab}
          onChange={handleChange}
          variant="fullWidth"
          scrollButtons={false}
          aria-label="scrollable prevent tabs example"
          style={{
            transform: "translateY(-15px)",
            margin: "0 auto",
            display: "flex",
          }}
        >
          <LinkTab label="Ongoing" href="/trips/ongoing" />
          <LinkTab label="Upcoming" href="/trips/upcoming" />
          <LinkTab label="Complete" href="/trips/successful" />
        </Tabs>
        {/* render appropriate list of trips based on selected tab */}
        {selectedTab === 0 && <OngoingTrips />}
        {selectedTab === 1 && <UpcomingTrips />}
        {selectedTab === 2 && <CompleteTrips />}
      </Box>
    </>
  );
};

export default Landing;
