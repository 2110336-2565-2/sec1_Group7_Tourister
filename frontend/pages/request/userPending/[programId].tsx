import UserPending from "@/components/request/userPending/userPending";
import NavBar from "@/components/layout/navBar";
import { AuthProvider } from "@/components/AuthProvider";
import { NotificationProvider } from "@/components/notification/NotificationProvider";

export default function Page() {

  return (
    <AuthProvider role="guide">
      <NotificationProvider>
      <>
        <NavBar />
        <UserPending />
      </>
      </NotificationProvider>
    </AuthProvider>
  );
}

