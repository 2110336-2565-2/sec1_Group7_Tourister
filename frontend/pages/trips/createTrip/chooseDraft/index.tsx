import ChooseDraft from "@/components/trips/createTrip/chooseDraft";
import NavBar from "@/components/layout/navBar";
import { AuthProvider } from "@/components/AuthProvider";

export default function Page() {
  return (
  <AuthProvider role="guide">
  <>
    <NavBar/>
    <ChooseDraft/>
  </>
  </AuthProvider>
  );
}

