import UserPending from "@/components/request/userPending/userPending";
import NavBar from "@/components/layout/navBar";
import { AuthProvider } from "@/components/AuthProvider";

export default function Page() {

  return (
    <AuthProvider role="guide">
    <>
      <NavBar />
      <UserPending />
    </>
    </AuthProvider>
  );
}

