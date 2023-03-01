import { Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import { FormLabel } from "@mui/material";

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
