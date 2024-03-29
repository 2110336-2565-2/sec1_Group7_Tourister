import { Input } from "@mui/material";
import { Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import { FormLabel } from "@mui/material";
import { Tab } from "@mui/material";
import { COLOR } from "@/theme/globalTheme";

export const PrimaryButton = styled(Button)({
  background: "#257AFF",
  border: 0,
  borderRadius: 12,
  boxShadow: "0 3px 5px 2px rgba(0, 0, 0, .4)",
  height: 50,
  width: 280,
  padding: "10px 30px",
  margin: 15,
  color: "white",
  fontSize: "20px",
  fontWeight: "bold",
  textTransform: "capitalize",
});

export const PrimaryButtonwithoutShadow = styled(Button)({
  background: "#257AFF",
  border: 0,
  borderRadius: 12,
  padding: ".2rem 2rem",
  color: "white",
  fontSize: "20px",
  fontWeight: "600",
  textTransform: "capitalize",
});

export const SecondaryButton = styled(Button)({
  background: "#FFFFFF",
  borderRadius: 12,
  borderColor:"#257AFF",
  borderWidth: 3,
  borderStyle: "solid",
  padding: ".2rem 2rem",
  color: "#257AFF",
  fontSize: "20px",
  fontWeight: "600",
  textTransform: "capitalize",
});

export const SecondaryButtonWhite = styled(Button)({
  background: "#FFFFFF",
  borderRadius: 5,
  height: 55,
  width: 193,
  borderColor:"#FFFFFF",
  padding: ".2rem 2rem",
  color: "#000000",
  fontFamily: "sans-serif",
  fontSize: "15px",
  fontWeight: "900",
  textTransform: "uppercase",
});

// fontWeight: 'bold', asterisk: {color: 'red'}
export const RequireFormLabel = styled(FormLabel)({
  required: true,
  color: "black",
  fontSize: 15,
});

export const StyledInput = styled(Input)({
  width: 370,
  fontSize: 20,
  color: COLOR.primary,
  fontWeight: "bold",
  margin: "auto", 
  padding: "5px 10px 0px 10px", 
  transform: "translateX(20px)",
  border: "1px solid lightgrey",
  borderRadius: "5px",
  '&.Mui-selected': {
    borderColor: COLOR.primary
  }
});

// NOTE error in animation
const StyledTab = styled(Tab)(({ theme }) => ({
  '&.Mui-selected': {
    borderBottom: `4px solid ${COLOR.primary}`
  },
  textTransform: "capitalize",
  fontWeight: "bold"
}));