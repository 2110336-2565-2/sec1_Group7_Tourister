import { UserInterface } from "@/interfaces/UserInterface";
import GuideNavBar from "@/components/layout/guideNavBar";
import UserNavBar from "@/components/layout/userNavBar";
import { Fragment } from "react";


export default function navBar() {
    let user:UserInterface
    if (typeof window !== 'undefined') {
      // console.log('we are running on the client');
      user = JSON.parse(localStorage.getItem("user")||`{}`)
    } else {
      // console.log('we are running on the server');
      user = JSON.parse(`{}`)
    }
  return (
    <Fragment>
        {user.isGuide?(<GuideNavBar/>):(<UserNavBar/>)}
    </Fragment>
  );
}