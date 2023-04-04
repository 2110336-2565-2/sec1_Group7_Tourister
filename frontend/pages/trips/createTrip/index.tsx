import CreateTrip from "@/components/trips/createTrip/createTrip";
import NavBar from "@/components/layout/navBar";
import { AuthProvider } from "@/components/AuthProvider";
import { NotificationProvider } from "@/components/notification/NotificationProvider";

export default function Page() {
  return (
  <AuthProvider role="guide">
    <NotificationProvider>
    <>
      <NavBar/>
      <CreateTrip/>
    </>
    </NotificationProvider>
  </AuthProvider>
  );
}

