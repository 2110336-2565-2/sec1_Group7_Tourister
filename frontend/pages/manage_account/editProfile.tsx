import EditProfile from "@/components/manage_account/editProfile/editProfile";
import NavBar from "@/components/layout/navBar";
import { AuthProvider } from "@/components/AuthProvider";

export default function Page() {
  return (
  <AuthProvider>
  <>
    <NavBar/>
    <EditProfile/>
  </>
  </AuthProvider>
  );
}
