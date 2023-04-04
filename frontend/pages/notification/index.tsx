import NavBar from "@/components/layout/navBar";
import { AuthProvider } from '@/components/AuthProvider';
import { NotificationList } from "@/components/notification/NotificationList";
import { NotificationProvider } from "@/components/notification/NotificationProvider";

export default function Page() {
  return (
    <AuthProvider>
      <NotificationProvider>
      <>
        <NavBar/>
        <div style={{paddingTop:"3rem",paddingBottom:"0.9rem",justifyContent:"center"}}>
          <h1 style={{textAlign:"center",fontWeight:"bolder"}}>Notification</h1>
        </div>
        <NotificationList/>
      </>
      </NotificationProvider>
    </AuthProvider>
  );
}

