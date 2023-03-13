import * as React from "react";
import { FC } from "react";
import { ProgramInterface } from "@/interfaces/ProgramInterface";
import { AttractionInterface } from "@/interfaces/AttractionInterface";
import { format } from "date-fns";

interface IScheduleDetailProps {
  program: ProgramInterface;
  dayTrips: { date: string; attractions: AttractionInterface[] }[];
}

const ScheduleDetail: FC<IScheduleDetailProps> = ({ program, dayTrips }) => {
  return (
    <>
      {dayTrips.map((day, index) => {
        const attractions = day.attractions;
        const DateTime = new Date(day.date);
        const formattedtDate = format(DateTime, "dd MMM yyyy");
        console.log(attractions);

        return (
          <div key={index}>
            <h3>Day {index + 1}</h3>
            <p>{formattedtDate}</p>
            <ul>
              {attractions.map((attraction, index) => (
                <li key={index}>
                  <p>{attraction.time}</p>
                  <h4>{attraction.location}</h4>
                  <p>{attraction.province}</p>
                  <img
                    style={{
                      width: "75px",
                      height: "75px",
                      padding: "0px 10px",
                      borderRadius: 12,
                    }}
                    src={`data:image/jpeg;base64,${attraction.file}`}
                    alt={attraction.location}
                  />
                </li>
              ))}
            </ul>
          </div>
        );
      })}
    </>
  );
};

export default ScheduleDetail;
