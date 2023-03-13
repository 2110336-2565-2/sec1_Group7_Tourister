import * as React from "react";
import { FC } from "react";
import { ProgramInterface } from "@/interfaces/ProgramInterface";
import { AttractionInterface } from "@/interfaces/AttractionInterface";
import { format } from "date-fns";
import { COLOR } from "@/theme/globalTheme";
import { LocationOnOutlined, LoyaltyOutlined, LabelOffOutlined  } from "@mui/icons-material";
import { Chip } from "@mui/material";

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
            <div
              style={{
                display: "flex",
                width: "fit-content",
                gap: ".5rem",
                border: `0.1rem solid ${COLOR.primary}`,
                borderRadius: "1.2rem",
              }}
            >
              {/* Day */}
              <div
                style={{
                  display: "flex",
                  padding: ".3rem .6rem",
                  borderRadius: "1rem",
                  background: COLOR.primary,
                }}
              >
                <label style={{ color: "white" }}>{`Day ${index + 1}`}</label>
              </div>
              <label style={{ marginTop: ".25rem", paddingRight: "2rem" }}>
                {formattedtDate}
              </label>
            </div>
            {/* Each attraction */}
            {attractions.map((attraction, index) => (
              <div
                style={{ display: "flex", alignItems: "center" }}
                key={index}
              >
                <div style={{ marginRight: "10px" }}>
                <div>{attraction.time}</div>
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
                </div>
                <div>
                  <div>{attraction.location}</div>
                  <Chip
                    icon={<LocationOnOutlined />}
                    size="small"
                    sx={{
                      backgroundColor: COLOR.paleblue,
                      color: COLOR.text,
                      borderRadius: 10,
                      margin: "2px 8px",
                      padding: "2px 8px",
                      "& .MuiChip-icon": {
                        width: "15px",
                        height: "15px",
                      },
                    }}
                    label={program.province}
                  />

                  {(attraction.option==="Admission included")&&
                  <Chip
                  icon={<LoyaltyOutlined style={{color: COLOR.primary}} />}
                  size="small"
                    sx={{
                      backgroundColor: "transparent",
                      color: COLOR.text,
                      borderRadius: 10,
                      margin: "2px 8px",
                      padding: "2px 8px",
                      "& .MuiChip-icon": {
                        width: "15px",
                        height: "15px",
                      },
                    }}
                    label={attraction.option}
                  />
                }
                {(attraction.option==="Admission not needed")&&
                  <Chip
                    icon={<LoyaltyOutlined/>}
                    size="small"
                    sx={{
                      backgroundColor: "transparent",
                      color: COLOR.text,
                      borderRadius: 10,
                      margin: "2px 8px",
                      padding: "2px 8px",
                      "& .MuiChip-icon": {
                        width: "15px",
                        height: "15px",
                      },
                    }}
                    label={attraction.option}
                  />
                }
                
                {(attraction.option==="Admission not included")&&
                  <Chip
                    icon={<LabelOffOutlined/>}
                    size="small"
                    sx={{
                      backgroundColor: "transparent",
                      color: COLOR.text,
                      borderRadius: 10,
                      margin: "2px 8px",
                      padding: "2px 8px",
                      "& .MuiChip-icon": {
                        width: "15px",
                        height: "15px",
                      },
                    }}
                    label={attraction.option}
                  />
                }
                </div>
              </div>
            ))}

         
          </div>
        );
      })}
    </>
  );
};

export default ScheduleDetail;
