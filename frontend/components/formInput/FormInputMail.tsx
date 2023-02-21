import { Controller} from "react-hook-form";
import { FormInputProps } from "./formInputProps";
import { TextField, InputAdornment } from "@mui/material";
import { MailOutlined } from "@mui/icons-material";

export const FormInputMail = ({ name, control}: FormInputProps) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({
        field: { onChange, value },
        fieldState: { error },
        formState,
      }) => (
        <TextField
          helperText={error ? error.message : null}
          size="small"
          error={Boolean(error)}
          onChange={onChange}
          value={value}
          fullWidth
          placeholder="Email"
          variant="outlined"
          InputProps={{
            startAdornment: (
                <InputAdornment position="start">
                    <MailOutlined/>
                </InputAdornment>
            )
          }}
        />
      )}
    />
  );
};