import { useRouter } from 'next/router';
import { ProgramInterface } from "@/interfaces/ProgramInterface";
import { FC } from "react";
import { COLOR } from "@/theme/globalTheme";
import Link from "next/link";

interface IProgramInterface {
  program: ProgramInterface,
  isComplete: boolean,
}

export const ProgramCardForGuide: FC<IProgramInterface> = ({ program, isComplete }) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/trips/programDetail/${program._id}`);
  };

  const participants = () => {
    if (isComplete) {
      return (
        <>
          <div style={{ color: COLOR.success, textAlign: "right" }}>complete</div>
        </>
      );
    } else {
      return (
        <>
          {/* border: "0.5px solid gray",  */}
          <div style={{ color: COLOR.primary, textAlign: "right", transform:"translateY(-20px)" }}>
            {program.num_participant}/{program.max_participant}
          </div>
        </>
      );
    }
  }

  return (
    <>
      {/* <Link key={program._id} href={`/trips/programDetail/${program._id}`}> */}
      <div
        key={program._id} onClick={handleClick}
        style={{ display: "flex", flexDirection: "column", border: "1px solid black", padding: "1.5em" }}
      >
        <div>
          <img src="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/15/33/fb/5c/pattaya.jpg?w=700&h=500&s=1"
            alt="mock-img"
            style={{ width: '75px', height: '75px' }}
          />
        </div>
        <div>{program.name}</div>
        <div>{program.province}</div>
        <div><>{program.startDate} to</></div>
        <div><>{program.endDate}</></div>
        {participants()}
      </div>
      {/* </Link>   */}
    </>
  );
}