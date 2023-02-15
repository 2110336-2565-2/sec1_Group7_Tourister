import * as yup from "yup";

export type FormData = {
    startDate: Date;
    startTime: string;
    endDate: Date;
    endTime: string;
    price: string;
};
  
export const defaultValues = {
    // startDate: "",
    // startTime: "",
    // endDate: "",
    // endTime: "",
    //price: ''
};
  
  export const validationSchema = yup.object().shape({
    startDate: yup.date().required("Please enter the start date of the trip"),
    startTime: yup.string().required('Please enter your start time'),
    endDate: yup.date().required('Please enter your end date'),
    endTime: yup.string().required('Please enter your end time'),
    price: yup.string().required("Please enter price")
  
    // accountType: yup.string().required("Please choose your account type"),
    // email: yup.string().required("Please enter email"),
    // password: yup.string().required("Please enter password"),

});