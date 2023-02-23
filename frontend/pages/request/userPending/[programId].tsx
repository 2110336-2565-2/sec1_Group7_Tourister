import { useRouter } from "next/router";
import UserPending from "@/components/request/userPending/userPending";
import NavBar from "@/components/layout/navBar";
import { AuthProvider } from "@/components/AuthProvider";

export default function Page() {
  // const router = useRouter();
  // const { programId } = router.query;
  // console.log(programId);

  return (
    <AuthProvider role="tourist">
    <>
      <NavBar />
      <UserPending />
      {/* <h1>{programName}</h1> */}
    </>
    </AuthProvider>
  );
}

