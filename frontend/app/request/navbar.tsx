"use client";

import React from "react";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  function handleClickPage(e: any) {
    navigate("/pending");
  }
  function handleClickAccpeted(e: any) {
    navigate("/accepted");
  }
  function handleClickDeclined(e: any) {
    navigate("/declined");
  }
  return (
    <nav>
      <div className="nav">
        <button className="nav__pending-page" onClick={handleClickPage}>
          Pending
        </button>
        <button className="nav__accepted-page" onClick={handleClickAccpeted}>
          Accepted
        </button>
        <button className="nav__declined-page" onClick={handleClickDeclined}>
          Declined
        </button>
      </div>
    </nav>
  );
}
