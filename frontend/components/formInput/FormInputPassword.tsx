import { Controller } from "react-hook-form";
import { TextField, FormControl, InputLabel, OutlinedInput, InputAdornment, IconButton } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { FormInputProps } from "./formInputProps";
export const FormInputPassword = ({name, control, label, showPassword, handleClickShowPassword, handleMouseDownPassword} : FormInputProps ) => {
    return (
        <Controller
            name={name}
            control={control}
            render={({
            field: { onChange, value },
            fieldState: { error },
            formState,
            })=>(
            <TextField
                label='Password'
                variant="outlined"
                type={showPassword ? "text" : "password"} // <-- This is where the magic happens
                onChange={onChange}
                size="small"
                fullWidth
                error={Boolean(error)}
                helperText={error ? error.message : null}
                InputProps={{ // <-- This is where the toggle button is added.
                    endAdornment: (
                    <InputAdornment position="end">
                    <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                    >
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                    </InputAdornment>
                    )
                }}
            />
            )
            }
        />
        )
    }