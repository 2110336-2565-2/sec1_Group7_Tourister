import { Fragment } from "react";
import { useAuth } from "@/components/AuthProvider"
import { AuthContextInterface } from "@/interfaces/AuthContextInterface"
import GuideNavBar from "@/components/layout/guideNavBar";
import UserNavBar from "@/components/layout/userNavBar";

export default function NavBar() {
  const authUserData: AuthContextInterface = useAuth();
  const isGuide: boolean = authUserData.user?.isGuide || false;
  const userId:string = authUserData.user?._id!

  return (
    <Fragment>
      {isGuide ? <GuideNavBar userId={userId} /> : <UserNavBar userId={userId} />}
    </Fragment>
  );
}
