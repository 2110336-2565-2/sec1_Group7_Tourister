import { Paper, BottomNavigation, BottomNavigationAction,Badge } from "@mui/material";
import BusinessCenterOutlinedIcon from "@mui/icons-material/BusinessCenterOutlined";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { useState ,useEffect} from "react";
import { useRouter } from "next/router";
import { getAllNotificationsFromUser } from "@/services/notificationService";

interface guideNavBarProps {
  userId: string;
}

export default function GuideNavBar({ userId }: guideNavBarProps) {
  const router = useRouter();
  const [path, setPath] = useState<String | null>(router.pathname);
  const [notificationCount, setNotificationCount] = useState<number>(0);


  const handleChange = (event: any, newPathname: String) => {
    setPath(newPathname);
  };

  const onLink = (href: string) => {
    router.push(href);
  };

  useEffect(() => {
    console.log("start use Effect in userNavBar")
    const fetchNotifications = async () => {
      console.log("fetching notifications");
      try {
        const res = await getAllNotificationsFromUser(userId); 
        const newNotifications = res.data;
        const newNotificationCount = newNotifications?.filter(notification => !notification.isRead).length;
        console.log("new noti count",newNotificationCount)
        setNotificationCount(newNotificationCount ?? 0);
      } catch (error) {
        console.error(error);
      }
    }

    fetchNotifications();

    const interval = setInterval(fetchNotifications, 60000); // fetch notifications every minute

    return () => clearInterval(interval);
  }, [userId]);
  
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
            icon={
              <Badge badgeContent={notificationCount} color="secondary">
                <NotificationsNoneOutlinedIcon fontSize="large"/>
              </Badge>
            } 
            onClick={()=>onLink("/notification")}
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
