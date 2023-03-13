import { useState } from "react";
import styled from "styled-components";
import Link from "next/link";

import { Tab, Tabs } from "@mui/material";
import Box from "@mui/material/Box";
import { Button } from "@mui/material";
import RestoreIcon from '@mui/icons-material/Restore';

import { BookingFilterInterface } from "@/interfaces/filter/BookingFilterInterface";

import { COLOR } from "@/theme/globalTheme";

import { AuthProvider } from "@/components/AuthProvider";
import NavBar from "@/components/layout/navBar";
import { BookingProgramList } from "@/components/booking/BookingProgramList";

const HistoryButton = styled(Button)`
  align-self: flex-end; 
  border-radius: 1em;
  margin-top: 2em;
  margin-right: 1em; 
  color:${COLOR.background};
  border-color:${COLOR.background};
`

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
        <div style={{display:"flex", flexDirection:"column", alignItems:"center",justifyContent:"center"}}>
        <HistoryButton
          startIcon={<RestoreIcon/>} 
          // onClick={showAdvanceSearchPopup} 
          // href="/search"
          variant="outlined"
        >
          <Link href="/booking/history" style={{textDecoration:'none', color:COLOR.background}}>History</Link>
        </HistoryButton>
        <h1 style={{textAlign:"center", marginTop:"0"}}>Booking</h1>
        </div>
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