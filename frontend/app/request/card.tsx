import React from "react";

export default function Card(props: any) {
  return (
    <div
      className="card"
      style={{ display: "flex", alignItems: "center", flexDirection: "column" }}
    >
      <img src={`../images/${props.item.profileImg}`} className="card--image" />
      <div className="card--fullname">
        <span>{props.item.name} </span>
        <span> {props.item.surname}</span>
      </div>
      <div className="card--contact">
        <h4>Contact: </h4>
        <div>{props.item.contact}</div>
      </div>
      <div className="card--request">
        <h4>Request:</h4>
        <span>{props.item.request}</span>
      </div>
      <div className="card--tripname">
        <span>{props.item.trip_name}</span>
      </div>
      <div className="card--tripname">
        <span>{props.item.date}</span>
      </div>
    </div>
  );
}
