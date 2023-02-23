import Page from "@/components/request/programPending/programPending";
import NavBar from "@/components/layout/navBar";
import { AuthProvider } from "@/components/AuthProvider";

export default function requestPage() {
  return (
    <AuthProvider role="tourist">
    <>
      <NavBar />
      <Page />
    </>
    </AuthProvider>
  );
}
