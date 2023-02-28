import { ProgramInterface } from "@/interfaces/ProgramInterface";
import { FC } from "react";
import { getProgramById } from "@/services/programService";
import * as React from "react";
import  {useState } from "react";


interface IProgramDetailProps {
  program: ProgramInterface,
  onGoBack: () => void;
}


const ProgramDetail: FC<IProgramDetailProps> = ({program, onGoBack }) => {

  

  if (!program) {
    return <div>Loading...</div>;
  }

  return (
    <>
        <>
          <h2>{program.name}</h2>
          <p>Province: {program.province}</p>
          <p>Number of Participants: {program.num_participant}</p>
          <p>Max Participants: {program.max_participant}</p> 
        </>
      <button onClick={onGoBack}>Go Back</button>
    </>
  );
};

// const ProgramDetail = () => {
//   return (
//     <>
//       <div>
//         <h2>{program.name}</h2>
//       </div>
//     </>
//   );
// };

export default ProgramDetail;
