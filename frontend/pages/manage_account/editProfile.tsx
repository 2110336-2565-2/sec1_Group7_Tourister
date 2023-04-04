import EditProfile from "@/components/manage_account/editProfile/editProfile";
import NavBar from "@/components/layout/navBar";
import { AuthProvider } from "@/components/AuthProvider";
import { NotificationProvider } from "@/components/notification/NotificationProvider";

export default function Page() {
  return (
  <AuthProvider>
    <NotificationProvider>
    <>
      <NavBar/>
      <EditProfile/>
    </>
    </NotificationProvider>
  </AuthProvider>
  );
}
