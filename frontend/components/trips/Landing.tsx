"use client";
import { Button, Tab, Tabs } from "@mui/material";
// import Button from '@mui/material-next/Button';
import * as React from "react";
import Box from "@mui/material/Box";
import { COLOR } from "@/theme/globalTheme";
import { getAllProgramsFromGuide, getAllPrograms } from "@/services/programService";
import { ProgramCardForGuide } from "@/components/program/ProgramCardForGuide";
import { useContext } from "react";
import { ProgramInterface } from "../../interfaces/ProgramInterface";
import Link from 'next/link';
import { SecondaryButtonWhite } from "@/css/styling";


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
          fontWeight: "bold"
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
  const [selectedTab, setSelectedTab] = React.useState(0);
  const [trips, setTrips] = React.useState([]);
  const [ongoingTrips, setOngoingTrips] = React.useState<ProgramInterface[]>([]);
  const [upcomingTrips, setUpcomingTrips] = React.useState<ProgramInterface[]>([]);
  const [completeTrips, setCompleteTrips] = React.useState<ProgramInterface[]>([]);


  React.useEffect(() => {
    const guide = JSON.parse(localStorage.getItem('user') || '{}');
    const guideId = guide._id;
    //console.log(guideId);

    const fetchTripsData = async () => {

      //const response = await getAllPrograms();
      const response = await getAllProgramsFromGuide(guideId);
      const programs = response.data || [];

      // get today's date
      const today = new Date();
      // console.log(programs);
      // console.log(today);

      // filter the programs based on their start and end dates
      const ongoingTrips = programs.filter((program) => {
        const startDate = new Date(program.startDate);
        const endDate = new Date(program.endDate);
        return startDate <= today && endDate >= today;
      });
      //console.log("OngoingTrips");
      //console.log(ongoingTrips);

      const upcomingTrips = programs.filter((program) => {
        const startDate = new Date(program.startDate);
        return startDate > today;
      });
      //console.log("upcomingTrips");
      //console.log(upcomingTrips);


      const completeTrips = programs.filter((program) => {
        const endDate = new Date(program.endDate);
        return endDate < today;
      });
      //console.log("completeTrips");
      //console.log(completeTrips);

      // set the filtered programs to the appropriate state
      setOngoingTrips(ongoingTrips);
      setUpcomingTrips(upcomingTrips);
      setCompleteTrips(completeTrips);
    };

    fetchTripsData();
  }, []);


  const OngoingTrips = () => {
    return (
      <>
        {ongoingTrips.length > 0 ? (
          ongoingTrips.map((program) => (
            <ProgramCardForGuide key={program._id} program={program} isComplete={false} />
          ))
        ) : (
          <>
            <p>You don't have any ongoing trips at the moment. </p>
            <p>Keep creating and publishing trips for tourists to book and enjoy!</p>
          </>
        )}
      </>
    )

  };

  const UpcomingTrips = () => {
    return (
      <>
        {upcomingTrips.length > 0 ? (
          upcomingTrips.map((program) => (
            <ProgramCardForGuide key={program._id} program={program} isComplete={false} />
          ))
        ) : (
          <>
            <p>No Upcoming Trips</p>
            <p>Don't worry though - there are always more adventures to be created! </p>
          </>
        )}

      </>
    );
  };

  const CompleteTrips = () => {
    return (
      <>
        {completeTrips.length > 0 ? (
          completeTrips.map((program) => (
            <ProgramCardForGuide key={program._id} program={program} isComplete={true} />
          ))
        ) : (
          <>
            <p>Keep creating amazing trips for tourists.</p>
            <p>They'll show up in this tab soon!</p>
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
      <Box sx={{ width: "100%"}}>
        <SecondaryButtonWhite 
        href="/trips/createTrip" variant="contained" 
        style={{transform:"translateY(-30px)", margin: "0 auto", display: "flex"}}
        >
          New Trips
        </SecondaryButtonWhite>
        <Tabs
          value={selectedTab}
          onChange={handleChange}
          variant="fullWidth"
          scrollButtons={false}
          aria-label="scrollable prevent tabs example"
          style={{transform:"translateY(-15px)", margin: "0 auto", display: "flex"}}
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