import Page from "@/components/request/programPending/programPending";
import NavBar from "@/components/layout/navBar";
import { AuthProvider } from "@/components/AuthProvider";
import { NotificationProvider } from "@/components/notification/NotificationProvider";

export default function requestPage() {
  return (
    <AuthProvider role="guide">
      <NotificationProvider>
      <>
        <NavBar />
        <Page />
      </>
      </NotificationProvider>
    </AuthProvider>
  );
}
