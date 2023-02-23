import CreateTrip from "@/components/trips/createTrip/createTrip";
import NavBar from "@/components/layout/navBar";
import { AuthProvider } from "@/components/AuthProvider";

export default function Page() {
  return (
  <AuthProvider role="guide">
  <>
    <NavBar/>
    <CreateTrip/>
  </>
  </AuthProvider>
  );
}

