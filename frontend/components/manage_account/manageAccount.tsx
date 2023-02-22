import { useState, MouseEvent } from "react";
import Link from "next/link";
import { COLOR } from "@/theme/globalTheme";
import styled from "styled-components";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SwapHorizOutlinedIcon from "@mui/icons-material/SwapHorizOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import NavigateNextOutlinedIcon from "@mui/icons-material/NavigateNextOutlined";

type AccountType = "tourist" | "guide";

const ProfileBox = styled.div`
  width: 80%;
  height: 10rem;
  border-radius: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0.1rem 0.1rem 0.5rem 0 rgba(0, 0, 0, 0.5);
  margin-bottom: 1rem;
`;

const Button = styled.button`
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: 4.75rem;
  background: none;
  border: none;
  padding: 0;
`;

const manageAccount = () => {
  const user = JSON.parse(localStorage.getItem("user") || `{}`);
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const accountType = user.isGuide ? "Guide" : "Tourist";
  return (
    <form
      style={{ display: "flex", alignItems: "center", flexDirection: "column" }}
      onSubmit={handleSubmit}
    >
      <ProfileBox style={{ backgroundColor: COLOR.primary }}>
        <div>
          <h2>{`hello ${accountType}`}</h2>
          <h1>{`${user.name} ${user.surname}`}</h1>
          {/* </div>
        <div> */}
          <h4>Total</h4>
          <h1>{`THB ${user.balance}`}</h1>
        </div>
      </ProfileBox>
      <Link
        href="./manage_account/editProfile"
        style={{ width: "100%", textDecoration: "none" }}
        passHref
      >
        <Button>
          <PersonOutlinedIcon
            style={{ width: "20%", color: "gray" }}
          ></PersonOutlinedIcon>
          <h3
            style={{
              width: "60%",
              paddingTop: "0.1rem",
              textAlign: "left",
              fontFamily: "Poppins",
              fontSize: "1.05rem",
            }}
          >
            Edit Profile
          </h3>
          <NavigateNextOutlinedIcon
            style={{ width: "20%", color: "gray" }}
          ></NavigateNextOutlinedIcon>
        </Button>
      </Link>
      <Link href="" style={{ width: "100%", textDecoration: "none" }} passHref>
        <Button>
          <SwapHorizOutlinedIcon style={{ width: "20%", color: "gray" }} />
          <h3
            style={{
              width: "60%",
              paddingTop: "0.1rem",
              textAlign: "left",
              fontFamily: "Poppins",
              fontSize: "1.05rem",
            }}
          >
            Transfer Funds
          </h3>
          <NavigateNextOutlinedIcon style={{ width: "20%", color: "gray" }} />
        </Button>
      </Link>
      <Link href="" style={{ width: "100%", textDecoration: "none" }} passHref>
        <Button>
          <LogoutOutlinedIcon style={{ width: "20%", color: "gray" }} />
          <h3
            style={{
              width: "60%",
              paddingTop: "0.1rem",
              textAlign: "left",
              fontFamily: "Poppins",
              fontSize: "1.05rem",
            }}
          >
            Log Out
          </h3>
          <NavigateNextOutlinedIcon style={{ width: "20%", color: "gray" }} />
        </Button>
      </Link>
    </form>
  );
};

export default manageAccount;
