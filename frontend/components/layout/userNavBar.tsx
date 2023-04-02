import { Paper, BottomNavigation, BottomNavigationAction, Badge } from '@mui/material';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import ConfirmationNumberOutlinedIcon from '@mui/icons-material/ConfirmationNumberOutlined';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import { useState , useEffect} from 'react';
import { useRouter } from 'next/router';
import { getAllNotificationsFromUser } from '@/services/notificationService';
interface UserNavBarProps {
  userId: string;
}

export default function UserNavBar({ userId }: UserNavBarProps) {
  const router = useRouter();
  const [path, setPath] = useState<String|null>(router.pathname)
  const [notificationCount, setNotificationCount] = useState<number>(0);
  // console.log("usernavbar",userId);
  
  const handleChange = (event: any, newPathname:String) => {
    setPath(newPathname)
  }
  
  const onLink = (href: string) => {
    router.push(href)
  };
  
  useEffect(() => {
    console.log("start use Effect in userNavBar")
    const fetchNotifications = async () => {
      console.log("fetching notifications");
      if (!userId) return; // if userId is undefined, exit early
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

  // useEffect(() => {

  //   console.log("start use Effect in userNavBar")
  //   const interval = setInterval(async () => {
  //     console.log("enter loop of interval")
  //     try {
  //       // console.log("checkID before call getNoti",userId);
  //       const res = await getAllNotificationsFromUser(userId); 
  //       const newNotifications = res.data;
  //       const newNotificationCount = newNotifications?.filter(notification => !notification.isRead).length;
  //       console.log("new noti count",newNotificationCount)
  //       setNotificationCount(newNotificationCount ?? 0);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   }, 60000); // fetch notifications every minute

  //   return () => clearInterval(interval);
  // }, [userId]); // run effect only once on component mount

  // console.log("notification count", notificationCount);

  return (
    <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, color:"light", zIndex:100}} elevation={8}>
        <BottomNavigation
          showLabels
          value={path}
          onChange={handleChange}
          >
          <BottomNavigationAction 
            label="Search" 
            value="/search" 
            icon={<SearchOutlinedIcon fontSize="large"/>} 
            onClick={()=>onLink("/search")}
            />
          <BottomNavigationAction 
            label="Booking" 
            value="/booking" 
            icon={<ConfirmationNumberOutlinedIcon fontSize="large"/>} 
            onClick={()=>onLink("/booking")}
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
            icon={<AccountCircleOutlinedIcon fontSize="large"/>} 
            onClick={()=>onLink("/manage_account")}
            />
      </BottomNavigation>
    </Paper>
  );
}