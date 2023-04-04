import { Paper, BottomNavigation, BottomNavigationAction, Badge } from '@mui/material';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import ConfirmationNumberOutlinedIcon from '@mui/icons-material/ConfirmationNumberOutlined';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import { useState , useEffect} from 'react';
import { useRouter } from 'next/router';
import { getAllNotificationsFromUser } from '@/services/notificationService';
import { useNotification } from '../notification/NotificationProvider';

interface UserNavBarProps {
  userId: string;
}

export default function UserNavBar({ userId }: UserNavBarProps) {
  const router = useRouter();
  const [path, setPath] = useState<String|null>(router.pathname)

  const { newNotificationCount } = useNotification();
  
  const handleChange = (event: any, newPathname:String) => {
    setPath(newPathname)
  }
  
  const onLink = (href: string) => {
    router.push(href)
  };

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
              <Badge badgeContent={newNotificationCount} color="secondary">
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