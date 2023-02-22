import { useRouter } from "next/router";
import UserPending from "@/components/request/userPending/userPending";
import GuideNavBar from "@/components/layout/guideNavBar";

export default function Page() {
  // const router = useRouter();
  // const { programId } = router.query;
  // console.log(programId);

  return (
    <>
      <GuideNavBar />
      <UserPending />
      {/* <h1>{programName}</h1> */}
    </>
  );
}

