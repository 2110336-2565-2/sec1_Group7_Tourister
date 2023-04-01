// import { UserInterface } from "@/interfaces/UserInterface";
// import GuideNavBar from "@/components/layout/guideNavBar";
// import UserNavBar from "@/components/layout/userNavBar";
// import { Fragment } from "react";


// export default function navBar() {
//     let user:UserInterface
//     if (typeof window !== 'undefined') {
//       // console.log('we are running on the client');
//       user = JSON.parse(localStorage.getItem("user")||`{}`)
//     } else {
//       // console.log('we are running on the server');
//       user = JSON.parse(`{}`)
//     }
//   return (
//     <Fragment>
//         {user.isGuide?(<GuideNavBar/>):(<UserNavBar/>)}
//     </Fragment>
//   );
// }

import { Fragment } from "react";
import { useAuth } from "@/components/AuthProvider"
import { AuthContextInterface } from "@/interfaces/AuthContextInterface"
import GuideNavBar from "@/components/layout/guideNavBar";
import UserNavBar from "@/components/layout/userNavBar";

export default function navBar() {
  const authUserData: AuthContextInterface = useAuth();
  const isGuide: boolean = authUserData.user?.isGuide || false;
  const userId:string = authUserData.user?._id!

  return (
    <Fragment>
      {isGuide ? <GuideNavBar userId={userId} /> : <UserNavBar userId={userId} />}
    </Fragment>
  );
}
