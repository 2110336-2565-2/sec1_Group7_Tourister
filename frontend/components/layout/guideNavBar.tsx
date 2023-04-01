import { Paper, BottomNavigation, BottomNavigationAction } from "@mui/material";
import BusinessCenterOutlinedIcon from "@mui/icons-material/BusinessCenterOutlined";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { useState } from "react";
import { useRouter } from "next/router";

interface guideNavBarProps {
  userId: string;
}

export default function GuideNavBar({ userId }: guideNavBarProps) {
  const router = useRouter();
  const [path, setPath] = useState<String | null>(router.pathname);

  const handleChange = (event: any, newPathname: String) => {
    setPath(newPathname);
  };

  const onLink = (href: string) => {
    router.push(href);
  };

  return (
    <Paper
      sx={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        color: "light",
        zIndex: 100,
      }}
      elevation={5}
    >
      <BottomNavigation showLabels value={path} onChange={handleChange}>
        <BottomNavigationAction
          label="Trips"
          value="/trips"
          icon={<BusinessCenterOutlinedIcon fontSize="large" />}
          onClick={() => onLink("/trips")}
        />
        <BottomNavigationAction
          label="Request"
          value="/request"
          icon={<CalendarMonthOutlinedIcon fontSize="large" />}
          onClick={() => onLink("/request/programPending")}
        />
        <BottomNavigationAction
          label="Notication"
          value="/notification"
          icon={<NotificationsNoneOutlinedIcon fontSize="large" />}
          onClick={() => onLink("/notification")}
        />
        <BottomNavigationAction
          label="Account"
          value="/manage_account"
          icon={<AccountCircleOutlinedIcon fontSize="large" />}
          onClick={() => onLink("/manage_account")}
        />
      </BottomNavigation>
    </Paper>
  );
}
