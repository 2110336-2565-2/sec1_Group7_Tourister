import Searching from "@/components/search/searchForm";
import NavBar from "@/components/layout/navBar";
import { AuthProvider } from "@/components/AuthProvider";

export default function Page() {
    return (
      <AuthProvider role="tourist">
      <>
        <NavBar/>
        {/* <h1>Searching</h1> */}
        <Searching/>
      </>
      </AuthProvider>
    );
  }
  