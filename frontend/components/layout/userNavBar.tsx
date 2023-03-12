import { Paper, BottomNavigation, BottomNavigationAction } from '@mui/material';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import ConfirmationNumberOutlinedIcon from '@mui/icons-material/ConfirmationNumberOutlined';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import { useState } from 'react';
import { useRouter } from 'next/router';

export default function userNavBar() {
  const router = useRouter();
  const [path, setPath] = useState<String|null>(router.pathname)

  const handleChange = (event: any, newPathname:String) => {
    setPath(newPathname)
  }
  
  const onLink = (href: string) => {
    router.push(href)
  };

  return (
    <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, color:"light", zIndex:100}} elevation={5}>
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
            icon={<NotificationsNoneOutlinedIcon fontSize="large"/>} 
            onClick={()=>onLink("/search")}
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