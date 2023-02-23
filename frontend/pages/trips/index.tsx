import Landing from "@/components/trips/Landing";
import NavBar from "@/components/layout/navBar";
import { AuthProvider } from "@/components/AuthProvider";

export default function Page() {
    return (
      <AuthProvider role="guide">
      <>
        <NavBar/>
        {/* <h1>Trips</h1> */}
        <Landing/>
      </>
      </AuthProvider>
    );
  }
  