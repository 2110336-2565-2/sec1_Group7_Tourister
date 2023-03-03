import { COLOR } from "@/theme/globalTheme";
import { LocationOnOutlined } from "@mui/icons-material";

export const LocationTag = ({location}:{location:string}) => {
  return (
    <div style={{
      backgroundColor: COLOR.paleblue, 
      color: "gray", 
      width: "fit-content", 
      borderRadius: "5vmin", 
      padding: "0.2rem 0.6rem", 
      display:"flex", 
      justifyContent:"center", 
      alignItems:"center"
    }}>
      <LocationOnOutlined style={{ width: "0.9rem", height: "0.9rem" }}/>
      <label style={{ padding: "0 0.1rem 0 0.3rem", fontSize: "0.7rem" }}>{location}</label>
    </div>
  );
};