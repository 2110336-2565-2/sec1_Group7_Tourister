import Box from "@mui/material/Box";
import { useRouter } from 'next/router';
import { ProgramInterface } from "@/interfaces/ProgramInterface";
import { FC } from "react";
import { COLOR } from "@/theme/globalTheme";
import Link from "next/link";
import styled from "styled-components";
import { CalendarMonth, LocationOn } from "@mui/icons-material";
import { format } from "date-fns";


interface IProgramInterface {
  program: ProgramInterface,
  isComplete: boolean,
}

export const ProgramCardForGuide: FC<IProgramInterface> = ({ program, isComplete }) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/trips/programDetail/${program._id}`);
  };

  const participants = () => {
    if (isComplete) {
      return (
        <>
          <div style={{ color: COLOR.success, textAlign: "right", fontWeight: "bold", transform:"translateY(-15px)" }}>Complete</div>
        </>
      );
    } else {
      return (
        <>
          <div style={{ color: COLOR.primary, transform:"translateY(-45px)", margin: "0 18em", display: "flex"}}>
            <div style={
              {backgroundColor: 'transparent', padding: "8px 16px 8px", fontWeight: "bold",
              border: '1px solid grey', borderRadius: 10, textAlign: "center"}
            }>
              {program.num_participant}/{program.max_participant}
            </div>
          </div>
        </>
      );
    }
  }

  const startDateTime = new Date(program.startDate);
  const endDateTime = new Date(program.endDate);
  const formattedStartDate = format(startDateTime, "dd MMM yyyy");
  const formattedEndDate = format(endDateTime, "dd MMM yyyy");

  return (
    <>
      {/* <Link key={program._id} href={`/trips/programDetail/${program._id}`}> */}
      <div
        key={program._id} onClick={handleClick}
        style={{ borderBottom: "2px solid #E0EFF8", padding: "1em 1.5em 0em" }}
        >
        <div>
          <div style={{display: "inline-block", float: "left"}}>
          <img src="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/15/33/fb/5c/pattaya.jpg?w=700&h=500&s=1"
            alt="mock-img"
            style={{ width: '75px', height: '75px', padding: "0px 10px", borderRadius: 12 }}
          />
          </div>
          <div style={{display: "inline-block", float: "left", padding: "10px"}}>
            <table>
              <tr><td style={{fontWeight: "bold", transform:"translateY(-15px) translateX(10px)"}}>
                {program.name}
              </td></tr>
              <tr><td style={{transform:"translateY(-10px)"}}>
                <div style={
                  {backgroundColor: '#E0EFF8', padding: "2px 20px 2px", fontSize: 12, color: 'grey',
                  border: '1px solid white', borderRadius: 15, textAlign: "center"}
                }>
                  <LocationOn style={{color:'grey', fontSize:15, transform:"translateY(2px) translateX(-5px)"}} /> 
                  {program.province}
                </div>
              </td></tr>
            </table>
          </div>
        </div>

        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <div style={{display: "inline-block"}}>
          <>
          <CalendarMonth style={{color:'#257aff', padding:"0px 10px", transform:"translateY(5px)"}} fontSize="medium" /> 
          {formattedStartDate}, {program.startTime} to 
          </>
        </div>
        <div>
          <>
          <CalendarMonth style={{color:'#344CB1', padding:"0px 10px", transform:"translateY(5px)"}} fontSize="medium" /> 
          {formattedEndDate}, {program.endTime}
          </>
        </div>
        {participants()}
      </div>
    </>
  );
}