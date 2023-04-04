import ProgramPending2 from "@/components/request/programPending/programPending";
import NavBar from "@/components/layout/navBar";
import { AuthProvider } from "@/components/AuthProvider";
import { NotificationProvider } from "@/components/notification/NotificationProvider";

export default function Page() {
  return (
  <AuthProvider role="guide">
    <NotificationProvider>
    <>
      <NavBar/>
      {/* <h1>Tourister</h1> */}
      <ProgramPending2/>
    </>
    </NotificationProvider>
  </AuthProvider>
  );
}
