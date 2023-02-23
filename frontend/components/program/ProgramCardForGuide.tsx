import { ProgramInterface } from "@/interfaces/ProgramInterface";
import { FC } from "react";

interface IProgramInterface {
  program: ProgramInterface,
}

export const ProgramCardForGuide:FC<IProgramInterface> = ({program}) => {
  return <> 
  <div key={program._id} style={{display:"flex", flexDirection:"column",border:"1px solid black"}}>
    <div>{program.name}</div>
    <div>{program.province}</div>
    <div>{program.num_participant}/{program.max_participant}</div>
    <div><>{program.startDate} to {program.endDate}</></div>
  </div>
  </>
}