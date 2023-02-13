"use client";
import { Button, Tab, Tabs } from "@mui/material";
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
      <Button href="/trips/createTrip" variant="contained">
        Create Trip
      </Button>
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

