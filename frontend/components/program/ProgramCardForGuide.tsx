import Box from "@mui/material/Box";
import { NextRouter, useRouter } from "next/router";
import { ProgramInterface } from "@/interfaces/ProgramInterface";
import { FC, Fragment } from "react";
import { COLOR } from "@/theme/globalTheme";
import Link from "next/link";
import styled from "styled-components";
import { BorderColorOutlined, CalendarMonth, LocationOnOutlined } from "@mui/icons-material";
import { format } from "date-fns";
import { Chip } from "@mui/material";
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import DeleteIcon from '@mui/icons-material/Delete';

interface IProgramInterface {
  program: ProgramInterface;
  isComplete: boolean;
  isDraft?: boolean;
  handleFunction?: () => void;
  handleFunction2?: () => void;
}


export const ProgramCardForGuide= ({
  program,
  isComplete,
  isDraft=false,
  handleFunction,
  handleFunction2,
}:IProgramInterface) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/trips/programDetail/${program._id}`);
  };

  const participants = () => {
    if (isDraft){
      return <Fragment/>
    }
    if (isComplete) {
      return (
        <>
          <div
            style={{
              color: COLOR.success,
              textAlign: "right",
              fontWeight: "bold",
              transform: "translateY(-15px)",
            }}
          >
            Complete
          </div>
        </>
      );
    } else {
      return (
        <>
          <div
            style={{
              color: COLOR.primary,
              transform: "translateY(-45px)",
              margin: "0 18em",
              display: "flex",
            }}
          >
            <div
              style={{
                backgroundColor: "transparent",
                padding: "8px 16px 8px",
                fontWeight: "bold",
                border: "1px solid grey",
                borderRadius: 10,
                textAlign: "center",
                letterSpacing: "1.5px",
                transform: "translateX(-10px)"
              }}
            >
              {program.num_participant}/{program.max_participant}
            </div>
          </div>
        </>
      );
    }
  };

  const startDateTime = new Date(program.startDate);
  const endDateTime = new Date(program.endDate);
  // const formattedStartDate = format(startDateTime, "dd MMM yyyy");
  // const formattedEndDate = format(endDateTime, "dd MMM yyyy");
  const formattedStartDate = startDateTime.toLocaleDateString('en-GB', { year:"numeric", month:"short", day:"numeric" });
  const formattedEndDate = endDateTime.toLocaleDateString('en-GB', { year:"numeric", month:"short", day:"numeric" });

  return (
    <>
      {/* <Link key={program._id} href={`/trips/programDetail/${program._id}`}> */}
      <div
        key={program._id}
        onClick={isDraft?()=>{}:handleClick}
        style={{ 
          height: "180px",
          borderBottom: `2px solid ${COLOR.paleblue}`, 
          padding: "1em 1em 0.25em 1em" 
        }}
      >
        <div>
          {isDraft? (
            // <PopupState variant="popover" popupId="popup-menu">
            //   {(popupState) => (
            //     <React.Fragment>
            //       <IconButton
            //         style = {{padding:"0", marginTop:"0", float:"right"}}
            //         {...bindTrigger(popupState)}
            //       >
            //         <MoreVert/>
            //       </IconButton>
            //       <Menu {...bindMenu(popupState)} sx={{"& .MuiMenuItem-root":{padding:"0 15px", width:"100px"}}}>
            //         <MenuItem onClick={() => {popupState.close; handleFunction;}}>Edit</MenuItem>
            //         <MenuItem onClick={() => {popupState.close; handleFunction2;}}>Delete</MenuItem>
            //       </Menu>
            //     </React.Fragment>
            //   )}
            // </PopupState>
            <div>
              <button 
                style={{
                  width:"25px", height:"25px", margin:"0 0 5px auto", float:"right",
                  borderWidth:"1px", borderColor:"lightgrey", borderRadius:"50%", 
                  color:"grey", display:"flex", justifyContent:"center", alignItems:"center"
                }}
                type="button" onClick={handleFunction2}>
                  <DeleteIcon style={{width:"15px", height:"15px"}}/>
              </button>
              <button 
                style={{
                  width:"25px", height:"25px", margin:"0 5px 5px auto", float:"right",
                  borderWidth:"1px", borderColor:"lightgrey", borderRadius:"50%", 
                  color:"grey", display:"flex", justifyContent:"center", alignItems:"center"
                }}
                type="button" onClick={handleFunction}>
                  <BorderColorOutlined style={{width:"15px", height:"15px"}}/>
              </button>
            </div>
          ):(<Fragment/>)}
          <div style={{ display: "inline-block", float: "left" }}>
            {program.dayTrips && program.dayTrips[0]?(
            <img
                src={`data:image/jpeg;base64,${program.dayTrips[0].attractions[0].file}`}
                alt="first-img-of-trip"
              style={{
                width: "75px",
                height: "75px",
                padding: "0px 10px",
                borderRadius: 12,
              }}
            />
            ):(
              <img
                  src={"https://dynamic-media-cdn.tripadvisor.com/media/photo-o/15/33/fb/5c/pattaya.jpg?w=700&h=500&s=1"}
                  alt="first-img-of-trip"
                style={{
                  width: "75px",
                  height: "75px",
                  padding: "0px 10px",
                  borderRadius: 12,
                }}
              />)}
          </div>
          <div
            style={{ display: "inline-block", float: "left", padding: "10px" }}
          >
            <table>
              <tbody>
                <tr>
                  <td
                    style={{
                      fontWeight: "bold",
                      transform: "translateY(-15px) translateX(10px)",
                    }}
                  >
                    {program.name}
                  </td>
                </tr>
                <tr>
                  <td style={{ transform: "translateY(-10px)" }}>
                    <Chip
                      icon={<LocationOnOutlined />}
                      size="small"
                      sx={{
                        backgroundColor: COLOR.paleblue,
                        color: COLOR.text,
                        borderRadius: 10,
                        margin: "2px 8px",
                        padding: "2px 8px",

                        "& .MuiChip-icon": {
                          width: "15px",
                          height: "15px",
                        },
                      }}
                      label={program.province}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <div style={{ display: "inline-block" }}>
          <>
            <CalendarMonth
              style={{
                color: COLOR.primary,
                padding: "0px 10px",
                transform: "translateY(5px)",
              }}
              fontSize="medium"
            />
            {formattedStartDate}, {program.startTime} to
          </>
        </div>
        <div>
          <>
            <CalendarMonth
              style={{
                color: COLOR.background,
                padding: "0px 10px",
                transform: "translateY(5px)",
              }}
              fontSize="medium"
            />
            {formattedEndDate}, {program.endTime}
          </>
        </div>
        {participants()}
      </div>
    </>
  );
};
