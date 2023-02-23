import EditProfile from "@/components/manage_account/editProfile/editProfile";
import NavBar from "@/components/layout/navBar";
import { AuthProvider } from "@/components/AuthProvider";

export default function Page() {
  return (
  <AuthProvider>
  <>
    <NavBar/>
    <h1>Tourister</h1>
    <EditProfile/>
  </>
  </AuthProvider>
  );
}
