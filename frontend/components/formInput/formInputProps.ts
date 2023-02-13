export interface FormInputProps {
    name: string;
    control: any;
    label: string;
    setValue?: any;
    showPassword?: boolean;
    handleClickShowPassword?: () => void;
    handleMouseDownPassword?: (event: React.MouseEvent<HTMLButtonElement>) => void;
    options?: option[];
    readonly?: boolean;
}

type option = {
    label: string;
    value: string;
}