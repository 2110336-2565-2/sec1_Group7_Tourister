"use client";
import {Button,Tab, Tabs } from "@mui/material";
// import Button from '@mui/material-next/Button';
import * as React from "react";
import Box from "@mui/material/Box";

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
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <>
    <Box
      sx={{
        width: 1,
        height: '25%' ,
        backgroundColor: '#2385C1',
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
        <Button href="/trips/createTrip" variant="contained" color="inherit" >
            Create Trip
        </Button>
    </Box>
      
     
      <Box sx={{ width: "100%" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          variant="fullWidth"
          scrollButtons={false}
          aria-label="scrollable prevent tabs example"
        >
            <LinkTab label="Ongoing" href="/trips/ongoing" />
            <LinkTab label="Upcoming" href="/trips/upcoming" />
            <LinkTab label="Successful" href="/trips/successful" />
            <LinkTab label="Failed" href="/trips/failed" />
          </Tabs>
      </Box>
    </>
  );
};
export default Landing;

