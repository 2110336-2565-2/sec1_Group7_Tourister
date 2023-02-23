import ProgramPending from "@/components/request/programPending/programPending";
import NavBar from "@/components/layout/navBar";
import { AuthProvider } from "@/components/AuthProvider";

export default function Page() {
  return (
  <AuthProvider role="guide">
  <>
    <NavBar/>
    <h1>Tourister</h1>
    <ProgramPending/>
  </>
  </AuthProvider>
  );
}
