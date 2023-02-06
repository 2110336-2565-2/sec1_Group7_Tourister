import React from "react";
import Card from "./card";
import data from "./data";

export default function Cards() {
  const cards = data.map((item) => {
    return <Card key={item.id} item={item} />;
  });

  return (
    <>
      <h1>REQUEST</h1>
      <section className="cards-list">{cards}</section>
    </>
  );
}
