import * as React from "react";
import { FC } from "react";
import { ProgramInterface } from "@/interfaces/ProgramInterface";
import { AttractionInterface } from "@/interfaces/AttractionInterface";
import { format } from "date-fns";
import { COLOR } from "@/theme/globalTheme";
import {
  LocationOnOutlined,
  LoyaltyOutlined,
  LabelOffOutlined,
} from "@mui/icons-material";
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
        // console.log(attractions);

        return (
          <div key={index}>
            {/* Day N*/}
            <div
              style={{
                display: "flex",
                width: "fit-content",
                gap: ".5rem",
                border: `0.1rem solid ${COLOR.primary}`,
                borderRadius: "0.75rem",
                marginBottom: "1.5rem",
              }}
            >
              <div
                style={{
                  display: "flex",
                  padding: ".3rem .9rem",
                  borderRadius: "0.6rem",
                  background: COLOR.primary,
                }}
              >
                <label style={{ color: "white" }}>{`Day ${index + 1}`}</label>
              </div>

              <div style={{ display: "flex", alignSelf: "center" }}>
                <label style={{ paddingInline: `0.9rem 2rem` }}>
                  {formattedtDate}
                </label>
              </div>
            </div>

            {/* Each attraction */}
            {attractions.map((attraction, index) => (
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-start",
                  alignItems: "flex-start",
                  flexDirection: "row",
                  gap: "1.25rem",
                  paddingLeft: "7.5%",
                  marginBottom: "1.75rem",
                }}
                key={index}
              >
                {/* Picture box */}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <div style={{ alignSelf: "center" }}>{attraction.time}</div>
                  <img
                    style={{
                      width: "4.75rem",
                      height: "4.75rem",
                      borderRadius: "0.5rem",
                    }}
                    src={`data:image/jpeg;base64,${attraction.file}`}
                    alt={attraction.location}
                  />
                </div>

                {/* Attraction info box */}
                <div>
                  <div>{attraction.location}</div>
                  <Chip
                    icon={<LocationOnOutlined />}
                    size="small"
                    sx={{
                      backgroundColor: COLOR.paleblue,
                      color: COLOR.text,
                      borderRadius: 10,
                      margin: "2px 0px",
                      padding: "2px 8px",
                      "& .MuiChip-icon": {
                        width: "15px",
                        height: "15px",
                      },
                    }}
                    label={attraction.province}
                  />

                  {attraction.option === "Admission included" && (
                    <Chip
                      icon={
                        <LoyaltyOutlined style={{ color: COLOR.primary }} />
                      }
                      size="small"
                      sx={{
                        backgroundColor: "transparent",
                        color: COLOR.text,
                        borderRadius: 10,
                        margin: "2px 0px",
                        padding: "2px 8px",
                        "& .MuiChip-icon": {
                          width: "15px",
                          height: "15px",
                        },
                      }}
                      label={attraction.option}
                    />
                  )}
                  {attraction.option === "Admission not needed" && (
                    <Chip
                      icon={<LoyaltyOutlined />}
                      size="small"
                      sx={{
                        backgroundColor: "transparent",
                        color: COLOR.text,
                        borderRadius: 10,
                        margin: "2px 0px",
                        padding: "2px 8px",
                        "& .MuiChip-icon": {
                          width: "15px",
                          height: "15px",
                        },
                      }}
                      label={attraction.option}
                    />
                  )}

                  {attraction.option === "Admission not included" && (
                    <Chip
                      icon={<LabelOffOutlined />}
                      size="small"
                      sx={{
                        backgroundColor: "transparent",
                        color: COLOR.text,
                        borderRadius: 10,
                        margin: "2px 0px",
                        padding: "2px 8px",
                        "& .MuiChip-icon": {
                          width: "15px",
                          height: "15px",
                        },
                      }}
                      label={attraction.option}
                    />
                  )}
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
