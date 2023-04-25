import Landing from "@/components/trips/Landing";
import NavBar from "@/components/layout/navBar";
// import { UserInterface } from "@/interfaces/UserInterface";
// import { useEffect, useState, useReducer } from "react";
import { AuthProvider } from "@/components/AuthProvider";
import { COLOR } from "@/theme/globalTheme";
import styled from "styled-components";
import Image from 'next/image';
import guide from "@/images/guide.png";
import { Avatar } from "@mui/material";
import { UserInterface } from "@/interfaces/UserInterface";
import { useEffect, useState, useReducer } from "react";
import { NotificationProvider } from "@/components/notification/NotificationProvider";




const Heading = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 5rem 2rem 3.5rem 2rem;
  background-color: ${COLOR.background};
  border-radius: 0 0 2rem 2rem;
  color: white;
`

export default function Page() {
  const [user, setUser] = useState<UserInterface | null>(null)

  useEffect(()=>{
    setUser(JSON.parse(localStorage.getItem('user')||""));
  },[])

  return (
    <AuthProvider role="guide">
      <NotificationProvider>
      <>
        <NavBar/>
        <Heading>
          <Avatar 
            style={{ marginRight: "1rem" ,width:"70px",height:"70px"}}
            src={user?.profilePic ? `${user.profilePic}` : undefined}
            />
          <div>
            <div style={{marginBottom:"0.5rem", fontSize:"1rem"}}>Hello Guide,</div>

            {/* <h3 style={{margin:"0", overflowWrap:"break-word", fontSize:"1.5rem"}}>{guide?.name} {guide?.surname}</h3> */}
            <h3 style={{margin:"0", overflowWrap:"break-word", fontSize:"1.5rem"}}>{user?.name} {user?.surname}</h3>
          </div>
        </Heading>
        <Landing/>
      </>
      </NotificationProvider>
    </AuthProvider>
  );
}