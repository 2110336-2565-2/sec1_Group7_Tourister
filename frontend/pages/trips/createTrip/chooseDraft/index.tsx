import ChooseDraft from "@/components/trips/createTrip/chooseDraft";
import NavBar from "@/components/layout/navBar";
import { AuthProvider } from "@/components/AuthProvider";
import { NotificationProvider } from "@/components/notification/NotificationProvider";

export default function Page() {
  return (
  <AuthProvider role="guide">
    <NotificationProvider>
    <>
      <NavBar/>
      <ChooseDraft/>
    </>
    </NotificationProvider>
  </AuthProvider>
  );
}

