import Landing from "@/components/trips/Landing";
import NavBar from "@/components/layout/navBar";
// import { UserInterface } from "@/interfaces/UserInterface";
// import { useEffect, useState, useReducer } from "react";
import { AuthProvider } from "@/components/AuthProvider";
import { COLOR } from "@/theme/globalTheme";
import styled from "styled-components";
import Image from 'next/image';
import guide from "@/images/guide.png";


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
  // const [guide, setGuide] = useState<GuideInterface | null>(null)

  // useEffect(()=>{
  //   setGuide(JSON.parse(localStorage.getItem('guide')||""));
  // },[])

  return (
    <AuthProvider role="guide">
    <>
      <NavBar/>
      <Heading>
        <Image 
          style={{ marginRight: "1rem" }}
          alt = "guide" 
          src={guide} 
          width={70} 
          height={70} 
        />
        <div>
          <div style={{marginBottom:"0.5rem", fontSize:"1rem"}}>Hello Guide,</div>

          {/* <h3 style={{margin:"0", overflowWrap:"break-word", fontSize:"1.5rem"}}>{guide?.name} {guide?.surname}</h3> */}
          <h3 style={{margin:"0", overflowWrap:"break-word", fontSize:"1.5rem"}}>Name Surname</h3>
        </div>
      </Heading>
      <Landing/>
    </>
    </AuthProvider>
  );
}