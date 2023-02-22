import { ProgramInterface } from "@/interfaces/ProgramInterface";
import { FC } from "react";

interface IProgramInterface {
  program: ProgramInterface,
}

export const ProgramCardForUser:FC<IProgramInterface> = ({program}) => {
  return <> 
  <div style={{display:"flex", flexDirection:"column",border:"1px solid black"}}>
    <div>{program.num_participant}/{program.max_participant}</div>
    <div>{program.name}</div>
    <div>{program.province}</div>
    <div>{program.description}</div>
    <div>
    <div>{program.guide?.name} {program.guide?.surname}</div>
    <div>{program.price}</div>
    </div>
  </div>
  </>
}