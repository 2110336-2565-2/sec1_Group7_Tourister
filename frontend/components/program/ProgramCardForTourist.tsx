import { ProgramInterface } from "@/interfaces/ProgramInterface";
import { FC } from "react";
import styled from "styled-components";

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid black;
  margin: 1rem 1.5rem;
  border-radius: 1rem;
  padding: 0.5rem;
`

interface IProgramInterface {
  program: ProgramInterface,
}

export const ProgramCardForTourist:FC<IProgramInterface> = ({program}) => {
  return <> 
  <CardContainer>
    <div style={{alignSelf:"flex-end"}}>{program.num_participant}/{program.max_participant}</div>
    <h4 style={{margin:"0", wordWrap:"break-word"}}>{program.name}</h4>
    <div>{program.province}</div>
    <p style={{margin:"0", wordWrap:"break-word", color:"gray"}}>{program.description}</p>
    <div style={{display:"flex", flexDirection:"row", }}>
      <div >{program.guide.name} {program.guide.surname}</div>
      <div style={{marginLeft:"auto"}}>{program.price}</div>
    </div>
  </CardContainer>
  </>
}