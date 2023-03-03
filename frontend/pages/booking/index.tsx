import { useState } from "react";

import { Tab, Tabs } from "@mui/material";
import Box from "@mui/material/Box";

import { BookingFilterInterface } from "@/interfaces/filter/BookingFilterInterface";

import { AuthProvider } from "@/components/AuthProvider";
import NavBar from "@/components/layout/navBar";
import { BookingProgramList } from "@/components/booking/BookingProgramList";

export default function Page() {
  const [selectedTab, setSelectedTab] = useState(0)
  const [bookingFilter, setBookingFilter] = useState<BookingFilterInterface>({status:"pending"})

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
    switch (newValue) {
      case 0:
        setBookingFilter({status:"pending"});
        break;
      case 1:
        setBookingFilter({status:"accepted"});
        break;
      default:
        setBookingFilter({status:"pending"});
    }
  }

  return (
    <AuthProvider role="tourist">
      <>
        <NavBar/>
        <h1 style={{textAlign:"center"}}>Booking</h1>
        <Box sx={{ width: "100%" }}>
          <Tabs
            value={selectedTab}
            onChange={handleChange}
            variant="fullWidth"
            scrollButtons={false}
            // aria-label="scrollable prevent tabs example"
          >
            <Tab label="Pending" />
            <Tab label="Accepted"/>
          </Tabs>
          {/* render appropriate list of trips based on selected tab */}
          {/* {selectedTab === 0 && <>Pending</>}
          {selectedTab === 1 && <>Accepted</>} */}
          <BookingProgramList bookingFilter={bookingFilter}/>
        </Box>
      </>
    </AuthProvider>
  )
}