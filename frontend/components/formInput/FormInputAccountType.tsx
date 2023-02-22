import {
    Avatar,
    FormControl,
    FormControlLabel,
    FormLabel,
    Radio,
    RadioGroup,
  } from "@mui/material";
  import { Controller } from "react-hook-form";
  import { FormInputProps } from "./formInputProps";
  import Image from 'next/image';
  import tourist from "../../images/tourist.png";
  import guide from "../../images/guide.png";
import { COLOR } from "@/theme/globalTheme";
  
  export const FormInputAccountType  = ({ name, control, label, options }: FormInputProps) => {
    const generateRadioOptions = () => {
      return options && options.map((singleOption, index) => (
        <FormControlLabel 
            style={{ 
                width: "115px", 
                height: "115px",
                marginLeft: "11px", 
                marginRight: "11px",
                border: "1px solid gray",
                // borderStyle: "solid",
                // borderWidth: "1px",
                // borderColor: "gray",
                borderRadius: "10px"
            }}
            key={index}
            value={singleOption.value}
            label={
                <div style={{ textAlign: "center", display: "grid" }}>
                    <Image 
                        style={{ marginLeft: "auto", marginRight: "auto" }}
                        alt = {singleOption.label} 
                        src={singleOption.label == "tourist" ? tourist : guide} 
                        width={50} 
                        height={50} 
                    />
                    <label style = {{ textTransform: "capitalize" }}>{singleOption.label}</label>
                </div>
            }
            labelPlacement = "bottom"
            control={<Radio 
                style={{ 
                    alignSelf: "flex-end", 
                    paddingLeft: "0px", 
                    paddingBottom: "1px",
                    paddingRight: "7px", 
                    paddingTop: "5px",
                }} />}
        />
      ));
    };
  
    return (
      <FormControl component="fieldset">
        <FormLabel component="legend">{label}</FormLabel>
        <Controller
          name={name}
          control={control}
          render={({
            field: { onChange, value },
            fieldState: { error },
            formState,
          }) => (
            <RadioGroup style={{ display: "block", alignSelf: "center" }} value={value} onChange={onChange}>
              {generateRadioOptions()}
            </RadioGroup>
          )}
        />
      </FormControl>
    );
  };