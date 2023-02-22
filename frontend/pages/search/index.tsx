import Searching from "@/components/search/searchForm";
import UserNavBar from "@/components/layout/userNavBar";
import { AuthProvider } from "@/components/AuthProvider";

export default function Page() {
    return (
      <AuthProvider role="tourist">
      <>
        <UserNavBar/>
        {/* <h1>Searching</h1> */}
        <Searching/>
      </>
      </AuthProvider>
    );
  }
  