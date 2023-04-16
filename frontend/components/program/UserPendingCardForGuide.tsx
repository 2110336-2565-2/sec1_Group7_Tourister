import Box from "@mui/material/Box";
import { NextRouter, useRouter } from "next/router";
import { ProgramInterface } from "@/interfaces/ProgramInterface";
import { FC, Fragment } from "react";
import { COLOR } from "@/theme/globalTheme";
import Link from "next/link";
import styled from "styled-components";
import { CalendarMonth, LocationOnOutlined } from "@mui/icons-material";
import { format } from "date-fns";
import { Chip } from "@mui/material";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import { UserCardInterface } from "@/interfaces/UserCardInterface";
import Image from "next/image";
import tourist from "../../images/tourist.png";
import { Button } from "@mui/material";

interface UserPendingInterface {
  user: UserCardInterface;
  isComplete: boolean;
  isDraft?: boolean;
  handleFunction?: () => void;
}

export const UserPendingCardForGuide: FC<any> = ({
  user,
  isComplete,
  isDraft = false,
  handleFunction,
}) => {
  const statusChange = (a: any, b: any) => {}
  return (
    <>
      {/* <Link key={user._id} href={`/trips/userDetail/${user._id}`}> */}
      <div
        key={user._id}
        style={{
          height: "150px",
          // margin: "0",
          // paddingTop: "20px",
          // paddingBottom: "20px",
          borderBottom: `1px solid grey`,
          padding: "2em 1em 0.25em 2em ",
        }}
      >
        <div>
          {isDraft ? (
            <button type="button" onClick={handleFunction}>
              <DriveFileRenameOutlineIcon />
            </button>
          ) : (
            <Fragment />
          )}
          <div style={{ display: "inline-block", float: "left" }}>
            <Image
              alt="tourist"
              style={{ marginLeft: "auto", marginRight: "auto" }}
              // alt={singleOption.label}
              src={tourist}
              width={50}
              height={50}
            />
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
                    {user.name} {user.surname}
                  </td>
                </tr>
                <tr>
                  <td
                    style={{
                      fontWeight: "lighter",
                      transform: "translateY(-15px) translateX(10px)",
                    }}
                  >
                    Tel: {user.phoneNumber}
                  </td>
                </tr>
                <div>{user.request}</div>
                <Button
                  type="button"
                  variant="outlined"
                  onClick={() => statusChange(user.bookingId, "declined")}
                  style={{ 
                    transform: "translateX(-10px)", 
                    borderRadius: "10px", borderColor: COLOR.background,
                    margin: "4px 10px", color: COLOR.background, 
                  }}
                >
                  DECLINED
                </Button>
                <Button
                  type="button"
                  variant="contained"
                  onClick={() => statusChange(user.bookingId, "accepted")}
                  style={{ 
                    transform: "translateX(-10px)",
                    borderRadius: "10px", margin: "4px 10px" 
                  }}
                >
                  ACCEPT
                </Button>
              </tbody>
            </table>
          </div>
        </div>

        <br></br>
        <br></br>
        <br></br>
        <br></br>
      </div>
    </>
  );
};