"use client";
import {Button,Tab, Tabs } from "@mui/material";
// import Button from '@mui/material-next/Button';
import * as React from "react";
import Box from "@mui/material/Box";
import { COLOR } from "@/theme/globalTheme";
import { getAllPrograms } from "@/services/programService";
import { ProgramCardForGuide } from "@/components/program/ProgramCardForGuide";

interface LinkTabProps {
  label?: string;
  href?: string;
}

function LinkTab(props: LinkTabProps) {
  return (
    <Tab
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
  const [ongoingTrips, setOngoingTrips] = React.useState([]);
  const [upcomingTrips, setUpcomingTrips] = React.useState([]);
  const [completeTrips, setCompleteTrips] = React.useState([]);

  React.useEffect(() => {
    const fetchTripsData = async () => {
      const response = await getAllPrograms();
      const programs = response.data;
  
      // get today's date
      const today = new Date();
      console.log(programs);
      console.log(today);
       
      // filter the programs based on their start and end dates
      const ongoingTrips = programs.filter((program) => {
        const startDate = new Date(program.startDate);
        const endDate = new Date(program.endDate);
        return startDate <= today && endDate >= today;
      });
      console.log("OngoingTrips");
      console.log(ongoingTrips);

      const upcomingTrips = programs.filter((program) => {
        const startDate = new Date(program.startDate);
        return startDate > today;
      });
      console.log("upcomingTrips");
      console.log(upcomingTrips);
      
      
      const completeTrips = programs.filter((program) => {
        const endDate = new Date(program.endDate);
        return endDate < today;
      });
      console.log("completeTrips");
      console.log(completeTrips);

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
        {ongoingTrips.map((program) => (
          <ProgramCardForGuide key={program._id} program={program} />
        ))}
      </>
    );
  };

  const UpcomingTrips = () => {
    return (
      <>
        {upcomingTrips.map((program) => (
          <ProgramCardForGuide key={program._id} program={program} />
        ))}
      </>
    );
  };

  const CompleteTrips = () => {
    return (
      <>
        {completeTrips.map((program) => (
          <ProgramCardForGuide key={program._id} program={program} />
        ))}
      </>
    );
  };

  
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
  };

 
  return (
    <>
    <Box
      sx={{
        width: 1,
        height: '25%' ,
        backgroundColor: COLOR.background,
        borderBottomLeftRadius:18,
        borderBottomRightRadius:18,

        // '&:hover': {
        //   backgroundColor: 'primary.main',
        //   opacity: [0.9, 0.8, 0.7],
        // },
        alignItems : 'center',
        textAlign: 'center',
      }}
    >
        <h5>Hello Guide,</h5>
        <h4>Name Surname</h4>
        <Button href="/trips/createTrip" variant="contained" color = 'primary'  >
            Create Trip
        </Button>
    </Box>
      
     
      <Box sx={{ width: "100%" }}>
        <Tabs
          value={selectedTab}
          onChange={handleChange}
          variant="fullWidth"
          scrollButtons={false}
          aria-label="scrollable prevent tabs example"
        >
            <LinkTab label="Ongoing" href="/trips/ongoing" />
            <LinkTab label="Upcoming" href="/trips/upcoming" />
            <LinkTab label="Complete" href="/trips/successful" />
          </Tabs>
          {/* render appropriate list of trips based on selected tab */}
          {selectedTab === 0 && <OngoingTrips/>}
          {selectedTab === 1 && <UpcomingTrips/>}
          {selectedTab === 2 && <CompleteTrips/>}
      </Box>
    </>
  );
};
export default Landing;

