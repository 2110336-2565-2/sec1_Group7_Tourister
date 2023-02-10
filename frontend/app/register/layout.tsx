"use client";

import Link from 'next/link';
import { css } from '@emotion/react';
import BusinessCenterOutlinedIcon from '@mui/icons-material/BusinessCenterOutlined';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';

export default function BottomNavBarLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode,
}) {

  const nav = css({
    display: 'flex',
    bottom: 0,
    width: "100%",
    position: "fixed",
    boxShadow: "0 0 3px SportsRugbySharp(0,0,0,0.2)",
    overflowX: "auto",
    justifyContent: "space-around",
    color: "gray",
  });

  const navLink = css({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    flexGrow: 1,
    minWidth: '50px',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    color: 'gray',
  });

  return (
    <section>
      {/* Include shared UI here e.g. a header or sidebar */}
      <nav css={nav}>
        <Link href="./trips/createTrip" style={{ textDecoration: 'none'}}>
          <div css={navLink}>
            <BusinessCenterOutlinedIcon />
            Trips
          </div>
        </Link>
        <Link href="./request" style={{ textDecoration: 'none'}}>
            <div css={navLink}>
              <CalendarMonthOutlinedIcon />
              Request
            </div>
        </Link>
        <Link href="./request" style={{ textDecoration: 'none'}}>
          <div css={navLink}>
            <NotificationsNoneOutlinedIcon />
            Notification
          </div>
        </Link>
        <Link href="./manage_account" style={{ textDecoration: 'none'}}>
          <div css={navLink}>
            <AccountCircleOutlinedIcon />
            Account
          </div>
        </Link>
      </nav>

      {children}
    </section>
  );
}