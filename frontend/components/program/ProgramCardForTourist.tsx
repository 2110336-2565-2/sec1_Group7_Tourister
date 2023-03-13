import { useRouter } from "next/router";

import { ProgramInterface } from "@/interfaces/ProgramInterface";
import { BookingStatusInterface } from "@/interfaces/BookingInterface";

import { COLOR } from "@/theme/globalTheme";
import { EventOutlined, GroupOutlined } from "@mui/icons-material";
import { CardMedia } from "@mui/material";
import styled from "styled-components";

import { LocationTag } from "./LocationTag";

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 1.5rem 1rem 1.5rem;
  border-radius: 1rem;
  padding: 0.8rem 1.2rem 0.8rem 1.2rem;
  box-shadow: 2px 3px 7px 0px rgba(0, 0, 0, .3);
`

interface IProgramInterface {
  program: ProgramInterface,
  bookingStatus?: BookingStatusInterface,
}
function renderBookingStatus(bookingStatus:BookingStatusInterface, endDate:Date){
  switch(bookingStatus){
    case "accepted":
      if(endDate.getTime() < new Date().getTime()){
        return <div style={{marginLeft:"auto", paddingRight: "0.6rem"}}><label style={{color: COLOR.success}}>Completed</label></div>
      }
      return <div style={{marginLeft:"auto", paddingRight: "0.6rem"}}><label style={{color: COLOR.primary}}>Accepted</label></div>
    case "pending":
      return <div style={{marginLeft:"auto", paddingRight: "0.6rem"}}><label style={{color: COLOR.yellow}}>Pending</label></div>
    case "declined":
      return <div style={{marginLeft:"auto", paddingRight: "0.6rem"}}><label style={{color: COLOR.secondary}}>Declined</label></div>
  }
}

export const ProgramCardForTourist = ({program, bookingStatus}:IProgramInterface) => {
  const startDate = new Date(program.startDate)
  const endDate = new Date(program.endDate)

  const router = useRouter();

  const handleClick = () => {
    router.push(`/trips/programDetail/${program._id}`);
  };

  return <> 
  <div onClick={handleClick}>
  <CardContainer>
    <div style={{ alignSelf:"flex-end", color:"gray", display:"flex", justifyContent:"center", alignItems:"center", marginBottom: "0.5rem"}}>
      <GroupOutlined/>
      <label style={{ fontSize: "1rem", padding: "0 0.6rem" }}> {program.num_participant}/{program.max_participant} </label>
    </div>
    <CardMedia 
      image= {/* program.image ||*/ "https://t3.ftcdn.net/jpg/01/32/94/50/240_F_132945016_nfxSTTLLFGlgxb35E7kTn09oQ3bvZqeD.jpg"} // TODO: add program image
      style={{ height: "40vw", width: "100%", objectFit: "cover", borderRadius: "15px"}}
      />
    <h4 style={{ margin:"0.3rem 0", wordWrap:"break-word" }}>{program.name}</h4>
    <LocationTag location={program.province} />
    <label style={{ margin:"0.5rem 0", wordWrap:"break-word", color:"gray", fontSize:"0.8rem" }}>{program.description}</label>
    <div style={{ display:"flex", flexDirection:"row", justifyContent:"center", alignItems:"center" }}>
      <CardMedia 
        image= {/* {guide image here} || */ "https://cdn-icons-png.flaticon.com/512/7723/7723210.png"} // TODO: add guide profile image
        style={{ height: "22px", width: "22px"}}
        />
      <label style={{color: "grey", fontSize: "0.7rem", paddingLeft: "0.6rem"}}>{program.guide.name} {program.guide.surname}</label>
      {
        bookingStatus
        ? ( 
          renderBookingStatus(bookingStatus, endDate)
          )
          : (
            <div style={{marginLeft:"auto", paddingRight: "0.6rem"}}>THB <label style={{color: COLOR.primary}}>{program.price}</label></div>
            )
          }
    </div>
    <hr style={{border: "1px solid", borderColor: COLOR.paleblue, width: "100%"}}/>
    <div style={{fontSize: "0.8rem", display:"flex", alignItems:"center"}}>
      <EventOutlined style={{ color: COLOR.primary, width: "1.3rem", height: "1.3rem", padding: "0 0.5rem"}}/>
      <label>
        {startDate.toLocaleDateString('en-GB', { year:"numeric", month:"short", day:"numeric" })}{program.startTime == null ? "":" , "}{program.startTime} - {endDate.toLocaleDateString('en-GB', { year:"numeric", month:"short", day:"numeric" })}{program.endTime == null ? "":" , "}{program.endTime}
      </label>
    </div>
  </CardContainer>
  </div>
  </>
}